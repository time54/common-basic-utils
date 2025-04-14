#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const libPath = path.join(__dirname, '../lib');

// 获取所有包
function getPackages() {
  return fs.readdirSync(libPath)
    .filter(file => fs.statSync(path.join(libPath, file)).isDirectory())
    .map(dir => {
      const packageJsonPath = path.join(libPath, dir, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        return {
          name: packageJson.name,
          version: packageJson.version,
          dir,
          dependencies: packageJson.dependencies || {},
          peerDependencies: packageJson.peerDependencies || {}
        };
      }
      return null;
    })
    .filter(Boolean);
}

// 询问用户选择要发布的包
async function selectPackages(packages) {
  console.log('\nAvailable packages:');
  packages.forEach((pkg, index) => {
    console.log(`${index + 1}. ${pkg.name}@${pkg.version}`);
  });

  return new Promise((resolve) => {
    rl.question('\nEnter package numbers to publish (comma-separated, or "all"): ', (answer) => {
      if (answer.toLowerCase() === 'all') {
        resolve(packages);
      } else {
        const selected = answer.split(',')
          .map(num => parseInt(num.trim()) - 1)
          .filter(num => num >= 0 && num < packages.length)
          .map(index => packages[index]);
        resolve(selected);
      }
    });
  });
}

// 处理 workspace 依赖
function processWorkspaceDependencies(pkg, allPackages) {
  const packageJsonPath = path.join(libPath, pkg.dir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  let modified = false;

  // 创建一个映射表，用于快速查找包版本
  const packageVersions = {};
  allPackages.forEach(p => {
    packageVersions[p.name] = p.version;
  });

  // 处理 dependencies
  if (packageJson.dependencies) {
    Object.entries(packageJson.dependencies).forEach(([dep, version]) => {
      if (version.startsWith('workspace:')) {
        const actualVersion = packageVersions[dep];
        if (actualVersion) {
          packageJson.dependencies[dep] = `^${actualVersion}`;
          modified = true;
        }
      }
    });
  }

  // 处理 peerDependencies
  if (packageJson.peerDependencies) {
    Object.entries(packageJson.peerDependencies).forEach(([dep, version]) => {
      if (version.startsWith('workspace:')) {
        const actualVersion = packageVersions[dep];
        if (actualVersion) {
          packageJson.peerDependencies[dep] = `^${actualVersion}`;
          modified = true;
        }
      }
    });
  }

  if (modified) {
    // 保存修改后的临时文件
    const tempPackageJsonPath = path.join(libPath, pkg.dir, 'package.json.temp');
    fs.writeFileSync(tempPackageJsonPath, JSON.stringify(packageJson, null, 2));

    // 备份原始文件
    const backupPath = path.join(libPath, pkg.dir, 'package.json.backup');
    fs.copyFileSync(packageJsonPath, backupPath);

    // 替换原始文件
    fs.renameSync(tempPackageJsonPath, packageJsonPath);

    return {
      modified: true,
      backupPath
    };
  }

  return {
    modified: false
  };
}

// 恢复原始 package.json
function restorePackageJson(pkg, backupPath) {
  if (!backupPath) return;

  const packageJsonPath = path.join(libPath, pkg.dir, 'package.json');
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, packageJsonPath);
    fs.unlinkSync(backupPath);
  }
}

// 发布单个包
async function publishPackage(pkg, allPackages) {
  console.log(`\nPublishing ${pkg.name}...`);
  try {
    // 处理依赖
    const { modified, backupPath } = processWorkspaceDependencies(pkg, allPackages);

    // 执行发布
    execSync('npm publish', {
      cwd: path.join(libPath, pkg.dir),
      stdio: 'inherit'
    });

    // 恢复原始 package.json
    if (modified) {
      restorePackageJson(pkg, backupPath);
    }

    console.log(`Successfully published ${pkg.name}@${pkg.version}`);
    return true;
  } catch (error) {
    // 发布失败时也要恢复文件
    if (error.backupPath) {
      restorePackageJson(pkg, error.backupPath);
    }
    console.error(`Failed to publish ${pkg.name}:`, error.message);
    return false;
  }
}

// 主函数
async function main() {
  try {
    // 1. 检查是否登录 npm
    try {
      execSync('npm whoami', { stdio: 'inherit' });
    } catch (error) {
      console.error('Please login to npm first using: npm login');
      process.exit(1);
    }

    // 2. 获取所有包
    const packages = getPackages();
    if (packages.length === 0) {
      console.log('No publishable packages found.');
      process.exit(0);
    }

    const selectedPackages = await selectPackages(packages);
    if (selectedPackages.length === 0) {
      console.log('No packages selected for publishing.');
      process.exit(0);
    }

    console.log('\nSelected packages for publishing:');
    selectedPackages.forEach(pkg => {
      console.log(`- ${pkg.name}@${pkg.version}`);
    });

    rl.question('\nProceed with publishing? (y/n): ', async (answer) => {
      if (answer.toLowerCase() === 'y') {
        const results = [];
        for (const pkg of selectedPackages) {
          const success = await publishPackage(pkg, packages);
          results.push({ pkg, success });
        }

        console.log('\nPublishing Summary:');
        results.forEach(({ pkg, success }) => {
          console.log(`${pkg.name}: ${success ? '✅ Success' : '❌ Failed'}`);
        });
      }
      rl.close();
    });
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

main(); 