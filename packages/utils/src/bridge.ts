/*
 * @Author: taojinchao
 * @Date: 2025-04-09 14:17:18
 * @LastEditors: taojinchao
 * @LastEditTime: 2025-04-09 14:21:00
 * @Description: 桥接方法
 */

type CallbackFunc = (...args: any[]) => unknown;

export function callNativeAsync(action: string, data: string, callback?: CallbackFunc) {
    document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
            window.WebViewJavascriptBridge.callHandler(action, data, callback);
        },
        false
      );
  }