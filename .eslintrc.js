/*
 * @Author: taojinchao
 * @Date: 2025-04-09 17:22:08
 * @LastEditors: taojinchao
 * @LastEditTime: 2025-04-10 10:39:36
 * @Description: 
 */
module.exports = {
  root: true,
  env: { // 指定代码运行的环境
    node: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',  // 使用 TypeScript 解析器
  plugins: ['@typescript-eslint'],      // 使用 TypeScript ESLint 插件
  extends: [                            // 继承的规则集
    'eslint:recommended',               // ESLint 推荐规则
    'plugin:@typescript-eslint/recommended'  // TypeScript 推荐规则
  ],
  rules: {
    // 代码质量规则
    'no-console': 'warn',                 // 警告使用 console
    'no-debugger': 'warn',                // 警告使用 debugger
    'no-unused-vars': 'warn',             // 警告未使用的变量
    'no-undef': 'error',                  // 禁止使用未定义的变量
  }
};
