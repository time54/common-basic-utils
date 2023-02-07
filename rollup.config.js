/*
 * @Author: taojinchao
 * @Date: 2023-02-07 17:11:29
 * @LastEditors: taojinchao
 * @LastEditTime: 2023-02-07 19:23:39
 * @Description: rollup 配置文件
 */
import json from "rollup-plugin-json";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json"
export default {
  // 入口文件
  input: "packages/utils/src/index.ts", 
  output: [
    {
      name: pkg.name,
      file: pkg.main,
      format: "umd",
    },
  ],
  plugins: [json(), typescript({ lib: ["es5", "es6", "dom"], target: "es5" })],
};