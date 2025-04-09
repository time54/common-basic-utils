/*
 * @Author: taojinchao
 * @Date: 2023-05-22 16:22:04
 * @LastEditors: taojinchao
 * @LastEditTime: 2024-03-30 15:11:45
 * @Description: 加解密类
 */

import { AesModeType, AesPaddingType } from './types/enums';

// 兼容安卓5.0版本
function loadJS(callback: any, errorCallback: any) {
  if (window.CryptoJS) {
    callback();
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://cdn.bootcdn.net/ajax/libs/crypto-js/4.0.0/crypto-js.min.js';
  script.async = true;
  // 在脚本加载完成后执行回调函数
  script.onload = callback;
  // 在脚本加载失败时执行错误回调函数
  script.onerror = errorCallback;
  document.body.appendChild(script);
}

/**
 * @description: aes 加密
 * @param {string} publicKey 加密公钥
 * @param {string} vectorIv 向量iv
 * @param {string} data 要加密的数据
 */
export function encryptAES(data: string, publicKey: string, vectorIv: string, mode: AesModeType = AesModeType.CBC, padding: AesPaddingType = AesPaddingType.PKCS7) {
  return new Promise((resolve, reject) => {
    loadJS(() => {
      const key = window.CryptoJS.enc.Utf8.parse(publicKey);
      const iv = window.CryptoJS.enc.Utf8.parse(vectorIv);
      try {
        const encryptData = window.CryptoJS.AES.encrypt(data, key, {
          iv,
          mode: window.CryptoJS.mode[mode],
          padding: window.CryptoJS.pad[padding],
        });
        const encryptedMessage = encryptData.toString();
        resolve(encryptedMessage);
      } catch (error) {
        reject(error);
      }
    }, () => {
      // 在 loadJS 失败时也调用 reject
      reject(new Error('js脚本加载出错'));
    });
  });
}

/**
 * @description: aes 解密
 * @param {string} publicKey 加密公钥
 * @param {string} vectorIv 向量iv
 * @param {string} data 要解密的数据
 */
export function decryptAES(data: string, publicKey: string, vectorIv: string,mode: AesModeType = AesModeType.CBC, padding: AesPaddingType = AesPaddingType.PKCS7) {
  return new Promise((resolve, reject) => {
    loadJS(() => {
      const key = window.CryptoJS.enc.Utf8.parse(publicKey);
      const iv = window.CryptoJS.enc.Utf8.parse(vectorIv);
      try {
        const decryptedData = window.CryptoJS.AES.decrypt(data, key, {
          iv,
          mode: window.CryptoJS.mode[mode],
          padding: window.CryptoJS.pad[padding],
        });
        const decryptedMessage = decryptedData.toString(window.CryptoJS.enc.Utf8);
        resolve(decryptedMessage);
      } catch (error) {
        reject(error);
      }
    }, () => {
      // 在 loadJS 失败时也调用 reject
      reject(new Error('js脚本加载出错'));
    });
  });
}
