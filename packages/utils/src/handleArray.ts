/*
 * @Author: taojinchao
 * @Date: 2023-08-01 14:19:07
 * @LastEditors: taojinchao
 * @LastEditTime: 2024-01-17 01:35:08
 * @Description: 数组相关处理
 */

/**
 * @description 合并2个数组，根据key的val值去重，返回去重后的新数组
 * @param {any[]} arr1 数组1
 * @param {any[]} arr2 数组2
 * @param {string} key 去重的key
 * @example
    const arr1 = [{ a: 1, b: 2 }, { a: 2, b: 3 }];
    const arr2 = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
    const arr3 = mergeArraysAndRemoveDuplicatesByKey(arr1, arr2, 'a');
    console.log(arr3); // [{ a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }]
 */
export const mergeArraysAndRemoveDuplicatesByKey = (
  arr1: any[],
  arr2: any[],
  key: string
): any[] => {
  const mergedMap = new Map<any, any>();
  arr1.forEach(obj => mergedMap.set(obj[key], obj));
  arr2.forEach(obj => mergedMap.set(obj[key], obj));
  return Array.from(mergedMap.values());
};
