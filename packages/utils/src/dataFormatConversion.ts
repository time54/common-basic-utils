/*
 * @Author: taojinchao
 * @Date: 2023-03-29 16:46:33
 * @LastEditors: taojinchao
 * @LastEditTime: 2025-04-09 20:12:35
 * @Description: 入参、出参参数格式转化
 */

/**
 * @description: 驼峰转下划线
 * @param {any} obj
 * @example
  const originalObject = {
    firstName: 'John',
    lastName: 'Doe',
    addressInfo: {
      streetAddress: '123 Main St',
      cityInfo: {
        cityName: 'New York',
        zipCode: '10001'
      }
    }
  };
  const convertedObject = convertObjectKeysToUnderscore(originalObject);
  // Output: {
  //   first_name: 'John',
  //   last_name: 'Doe',
  //   address_info: {
  //     street_address: '123 Main St',
  //     city_info: {
  //       city_name: 'New York',
  //       zip_code: '10001'
  //     }
  //   }
  // }
  console.log(convertedObject);
 */
export function convertObjectKeysToUnderscore(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const convertedObj: any = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const convertedKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      convertedObj[convertedKey] = convertObjectKeysToUnderscore(obj[key]);
    }
  }
  return convertedObj;
}

/**
   * @description: 下划线转驼峰
   * @param {any} obj
   * @example
    const originalObject = {
      first_name: 'John',
      last_name: 'Doe',
      address_info: {
        street_address: '123 Main St',
        city_info: {
          city_name: 'New York',
          zip_code: '10001'
        }
      }
    };
    const convertedObject = convertObjectKeysToCamelCase(originalObject);
    // Output: {
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   addressInfo: {
    //     streetAddress: '123 Main St',
    //     cityInfo: {
    //       cityName: 'New York',
    //       zipCode: '10001'
    //     }
    //   }
    // }
    console.log(convertedObject);
   */
export function convertObjectKeysToCamelCase(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const result: any = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
      result[camelCaseKey] = convertObjectKeysToCamelCase(obj[key]);
    }
  }
  return result;
}
