/*
 * @Author: taojinchao
 * @Date: 2023-02-07 17:11:29
 * @LastEditors: taojinchao
 * @LastEditTime: 2025-04-14 14:28:40
 * @Description: rollup 配置文件
 */
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import strip from 'rollup-plugin-strip';
// 生成声明文件
import dts from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';
import minimist from 'minimist';
// 暂不需要：帮助 Rollup 解析并导入 node_modules 目录下的第三方模块
// import { nodeResolve } from '@rollup/plugin-node-resolve';
import packageList from './package-list.json';

// 是否是生产环境
const isProd = process.env.NODE_ENV === 'production';
// 获取命令行参数
const { pkg } = minimist(process.argv.slice(2));

// 获取本次筛选后要处理的包
const packageConfigs = packageList.filter(item => {
  if (pkg) {
    // 如果有筛选
    return item.name === pkg;
  }
  return true;
});

// 如果指定了包但找不到，提示错误
if (pkg && packageConfigs.length === 0) {
  console.error(`找不到包 "${pkg}"，可用的包有：${packageList.map(p => p.name).join(', ')}`);
  process.exit(1);
}

// 根据筛选后的包配置生成 rollup 配置
const configs = packageConfigs.map(pkg => {
  /**
   * @description: 出口文件
   * umd模块：兼容的通用模式
   * commonjs模块：使用require和exports（module.exports）引用和导出的交互方式
   * es模块: es6语言层面实现的模块机制, 未来模块标准, import和export (export default)的模块交互
   */
  const output = [];

  // 根据模块类型生成对应的输出配置
  if (pkg.modules.includes('es')) {
    output.push({
      // 指定打包后的文件路径和文件名
      file: `packages/${pkg.name}/lib/index.es.js`,
      format: 'es'
    });
  }

  if (pkg.modules.includes('umd')) {
    output.push({
      file: `packages/${pkg.name}/lib/index.umd.js`,
      format: 'umd',
      name: pkg.name
    });
  }

  /** 
  * @description: 基础插件配置: 用于在打包过程中执行各种任务的工具
  * json(): 用于处理 JSON 文件，它允许你在 Rollup 中直接导入 JSON 文件，并将其转换为 JavaScript 对象
  * typescript(): 会在打包过程中处理 TypeScript 文件，并使用指定的选项进行编译
  */
  const plugins = [
    json(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    // 复制 package.json 到输出目录
    copy({
      targets: [
        {
          src: `packages/${pkg.name}/package.json`,
          dest: `lib/${pkg.name}`
        }
      ]
    })
  ];

  // 生产环境：忽略console，压缩代码
  if (isProd) {
    // 移除 console
    plugins.push(
      strip({
        include: ['**/*.(js|ts)'],
        functions: ['console.*']
      })
    );
    // 压缩代码
    plugins.push(terser());
  }

  // 生成声明文件
  const dtsConfig = {
    input: pkg.from,
    output: {
      file: `packages/${pkg.name}/lib/types/index.d.ts`,
      format: 'es'
    },
    plugins: [dts()]
  };

  return [
    // 打包主文件
    {
      input: pkg.from,
      output,
      plugins
    },
    // 打包声明文件
    dtsConfig
  ];
}).flat();

export default configs;
