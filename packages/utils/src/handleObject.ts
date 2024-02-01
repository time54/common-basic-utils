/*
 * @Author: taojinchao
 * @Date: 2023-03-06 15:35:45
 * @LastEditors: taojinchao
 * @LastEditTime: 2024-01-17 01:36:37
 * @Description: 对象相关处理
 */

/**
 * @description 对象/数组深拷贝(如果要拷贝其他类型的对象（例如 Date、RegExp...），需要进行额外的判断和处理)
 * @example
  const obj = { a: 1, b: { c: 2 } };
  const obj2 = deepCopy(obj);
  obj2.b.c = 3;
  console.log(obj.b.c); // 2
 */
  export function deepCopy<T>(obj: T): T {
    // 如果不是对象，直接返回原始值
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    // 根据类型创建一个新对象
    const result: any = Array.isArray(obj) ? [] : {};
    // 递归拷贝每个属性
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = deepCopy(obj[key]);
      }
    }
    return result;
  }
  