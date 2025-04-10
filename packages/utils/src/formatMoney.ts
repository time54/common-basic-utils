/*
 * @Author: taojinchao
 * @Date: 2024-01-17 01:23:01
 * @LastEditors: taojinchao
 * @LastEditTime: 2024-01-17 01:26:03
 * @Description: 金额处理类
 */

/**
 * @description 金额加逗号，保留指定位数的小数，正值加 '+'，负值不加
 * @param {number} money 要格式化的金额
 * @param {number} decimalPlaces  保留的小数位数,默认保留2位
 * @param {boolean} showPositiveSign  是否在正值前加 '+'，默认为 true
* @example
  formatMoney(123456.789, 2, true) // +123,456.79
  formatMoney(123456.789, 2, false) // 123,456.79
  formatMoney(-123456.789, 2, true) // -123,456.79
  formatMoney('123', 0, true) // +123
  formatMoney('nod', 0, true) // --
 */

const ONE = 1;
const TWO = 2;
const TEN = 10;
const HUNDRED = 100;
const THOUSAND = 1000;
const TEN_THOUSAND = 10000;
export function formatMoney(
  money: number,
  decimalPlaces: number = TWO,
  showPositiveSign: boolean = true
): string {
  if (typeof money !== 'number' || Number.isNaN(money)) {
    return '--';
  }
  // 金额加逗号
  const formattedNum = money.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // 判断是否需要在正值前加 '+'
  const sign = money >= 0 && showPositiveSign ? '+' : '';

  return `${sign}${formattedNum}`;
}

/**
   * @description 数字转百分比，保留指定位数的小数，正值加 '+'，负值不加
   * @param {number} num 要转换的数字
   * @param {number} decimalPlaces  保留的小数位数,默认保留2位
   * @param {boolean} showPositiveSign  是否在正值前加 '+'，默认为 true
   * @example
    convertToPercentage(0.123456789, 2, true) // +12.35%
    convertToPercentage(0.123456789, 2, false) // 12.35%
    convertToPercentage(-0.123456789, 2, true) // -12.35%
    convertToPercentage('0.123456789', 2, true) // +12.35%
    convertToPercentage('nod', 2, true) // --
   */
export function convertToPercentage(
  num: number | string,
  decimalPlaces: number = TWO,
  showPositiveSign: boolean = true
): string {
  // 尝试将输入转换为数字
  const parsedNum = typeof num === 'number' ? num : Number.parseFloat(num);

  // 检查是否是有效数字
  if (Number.isNaN(parsedNum)) {
    return '--';
  }

  // 将数字转换为百分比，并保留指定位数的小数（四舍五入）
  const percentage = (parsedNum * HUNDRED).toFixed(decimalPlaces);

  // 判断是否需要在正值前加 '+'
  const sign = parsedNum >= 0 && showPositiveSign ? '+' : '';

  return `${sign}${percentage}%`;
}

/**
   * @description 数字转百分比，保留指定位数的小数，正值加 '+'，负值不加
   * @param {number} num 要转换的数字
   * @param {number} decimalPlaces  保留的小数位数,默认保留2位
   * @param {boolean} showPositiveSign  是否在正值前加 '+'，默认为 true
   * @example
    console.log(numberToThousandAndTenThousand(123.456)); // 输出 "123.5"
    console.log(numberToThousandAndTenThousand(1000.123, 2)); // 输出 "1.00k"
    console.log(numberToThousandAndTenThousand(12345.67)); // 输出 "1.2w"
   */
export function numberToThousandAndTenThousand(num: number, precision: number = ONE): string {
  const factor = TEN ** precision;
  // 不需要转换，返回原始数字，且保留指定小数位数
  if (num < THOUSAND) {
    return ((num * factor) / factor).toFixed(precision);
  } else if (num < TEN_THOUSAND) {
    // 小于1万，将数字除以1000，保留指定小数位数
    return `${(num / THOUSAND).toFixed(precision)}k`;
  } else {
    // 大于等于1万，将数字除以10000，保留指定小数位数
    return `${(num / TEN_THOUSAND).toFixed(precision)}w`;
  }
}
