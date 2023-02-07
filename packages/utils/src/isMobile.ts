/*
 * @Author: taojinchao
 * @Date: 2023-02-07 14:35:43
 * @LastEditors: taojinchao
 * @LastEditTime: 2023-02-07 14:37:30
 * @Description: 手机号校验
 */
export function isMobile(v: any): boolean {
    return /^1[0-9][0-9]\d{8}$/.test(v);
  }