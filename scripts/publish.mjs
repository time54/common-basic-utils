#!/usr/bin/env node

import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

// 发布顺序
const packages = [
  'packages/utils',
  'packages/moni-business'
];

async function publish() {
  const registry = 'http://10.10.12.229:4873/';

  // 先构建
  console.log('开始构建...');
  execSync('pnpm run build:prod', { stdio: 'inherit' });
  console.log('构建完成\n');

  // 发布包
  for (const pkg of packages) {
    const pkgPath = resolve(rootDir, pkg);
    console.log(`\n发布 ${pkg}...`);

    try {
      execSync(`npm publish --registry ${registry} --access public`, {
        cwd: pkgPath,
        stdio: 'inherit'
      });
      console.log(`${pkg} 发布成功\n`);
    } catch (error) {
      console.error(`${pkg} 发布失败`);
      process.exit(1);
    }
  }

  console.log('所有包发布完成！');
}

publish().catch(error => {
  console.error('发布失败:', error);
  process.exit(1);
}); 