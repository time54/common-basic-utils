/*
 * @Author: taojinchao
 * @Date: 2023-02-07 17:11:29
 * @LastEditors: taojinchao
 * @LastEditTime: 2024-04-10 13:45:28
 * @Description: rollup 配置文件
 */
import json from "rollup-plugin-json";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json"

export default {
  // 要打包文件的入口文件
  input: "packages/utils/src/index.ts",
  /**
   * @description: 出口文件
   * umd模块：兼容的通用模式
   * commonjs模块：使用require和exports（module.exports）引用和导出的交互方式
   * es模块: es6语言层面实现的模块机制, 未来模块标准, import和export (export default)的模块交互
   */
  output: [
    {
      // 当入口文件有export时，'umd'格式必须指定name
      // 这样，在通过<script>标签引入时，才能通过name访问到export的内容。
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
  /**
   * @description: 用于在打包过程中执行各种任务的工具
   * json(): 用于处理 JSON 文件，它允许你在 Rollup 中直接导入 JSON 文件，并将其转换为 JavaScript 对象
   * typescript(): 会在打包过程中处理 TypeScript 文件，并使用指定的选项进行编译
   */
  plugins: [json(), typescript({ lib: ["es5", "es6", "dom"], target: "es5" })],
};