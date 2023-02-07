/*
 * @Author: taojinchao
 * @Date: 2023-02-07 17:11:29
 * @LastEditors: taojinchao
 * @LastEditTime: 2023-02-07 20:40:17
 * @Description: rollup 配置文件
 */
import json from "rollup-plugin-json";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json"
export default {
  // 入口文件
  input: "packages/utils/src/index.ts",
  // 出口文件 umd模块：兼容的通用模式 commonjs模块：使用require和exports（module.exports）引用和导出的交互方式 
  // es模块: es6语言层面实现的模块机制, 未来模块标准, import和export (export default)的模块交互
  output: [
    {
      name: pkg.name,
      file: pkg.main,
      format: "umd",
    },
    {
      file: pkg.common,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  plugins: [json(), typescript({ lib: ["es5", "es6", "dom"], target: "es5" })],
};