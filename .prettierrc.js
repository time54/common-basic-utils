/*
 * @Author: taojinchao
 * @Date: 2025-04-09 17:20:15
 * @LastEditors: taojinchao
 * @LastEditTime: 2025-04-09 20:16:14
 * @Description:
 */
module.exports = {
  // 使用单引号
  singleQuote: true,
  // 句尾使用分号
  semi: true,
  // 每行代码最大长度
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用 tab 缩进
  useTabs: false,
  // 箭头函数参数只有一个时是否要有小括号
  arrowParens: 'avoid',
  // 对象大括号内两边是否加空格
  bracketSpacing: true,
  // 行尾换行符
  endOfLine: 'auto',
  // 对象属性是否使用引号
  quoteProps: 'as-needed',
  // 是否在文件顶部插入一个特殊的 @format 标记
  insertPragma: false,
  // 是否在文件顶部插入一个特殊的 @prettier 标记
  requirePragma: false,
  // 是否在对象，数组括号与文字之间加空格
  bracketSameLine: false,
  // 是否在 vue 中缩进 script 和 style 标签
  vueIndentScriptAndStyle: false,
  // 是否在文件末尾插入一个空行
  trailingComma: 'none'
};
