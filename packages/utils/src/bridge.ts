/*
 * @Author: taojinchao
 * @Date: 2025-04-09 14:17:18
 * @LastEditors: taojinchao
 * @LastEditTime: 2025-04-09 20:40:51
 * @Description: 桥接方法
 */

type CallbackFunc = (...args: any[]) => unknown;

export function callNativeAsync(action: string, data: any, callback?: CallbackFunc) {
  document.addEventListener(
    'WebViewJavascriptBridgeReady',
    function () {
      window.WebViewJavascriptBridge.callHandler(action, data, callback);
    },
    false
  );
}
