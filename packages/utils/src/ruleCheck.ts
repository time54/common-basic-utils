/*
 * @Author: taojinchao
 * @Date: 2023-03-16 01:26:09
 * @LastEditors: taojinchao
 * @LastEditTime: 2025-04-09 19:42:46
 * @Description: 规则校验类
 */
const eleven = 11;
/**
 * @description: 身份证校验
 * @param {string} idCard 身份证号码
 * @example
   const idCard = '110101199003074672';
   const result = validateIDCard(idCard);
   console.log(result); // true
 */
export function validateIDCard(idCard: string): boolean {
  // 正则表达式匹配身份证号码格式
  const pattern = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}(\d|X)$/;
  if (!pattern.test(idCard)) {
    console.log('Pattern mismatch:', idCard);
    return false;
  }
  // 获取身份证号码中的各个数字和最后一位校验码
  const nums = idCard.slice(0, -1).split('').map(Number);
  const lastCode = idCard.slice(-1);
  // 计算校验码
  // eslint-disable-next-line no-magic-numbers
  const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const codes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  let sum = 0;
  for (let i = 0; i < factors.length; i++) {
    sum += nums[i] * factors[i];
  }
  const codeIndex = sum % eleven;
  // 检查校验码是否匹配
  console.log('Calculated code:', codes[codeIndex], 'Expected code:', lastCode);
  return lastCode === codes[codeIndex];
}

/**
 * @description: 手机号校验
 * @param {string} phoneNumber 手机号
 * @example
 * const phoneNumber = '18888888888';
 * const result = validatePhoneNumber(phoneNumber);
 * console.log(result); // true
 */
export function validatePhoneNumber(phoneNumber: string): boolean {
  const regex = /^1[3456789]\d{9}$/;
  return regex.test(phoneNumber);
}
