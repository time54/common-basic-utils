/*
 * @Author: taojinchao
 * @Date: 2023-03-22 01:06:11
 * @LastEditors: taojinchao
 * @LastEditTime: 2025-04-10 10:56:12
 * @Description: 常用时间方法
 */

/**
 * @description: 获取当前周几
 * @param {string} language: 语言，默认英文
 * @example
 * getDayOfWeek(); // Wednesday
 * getDayOfWeek('zh'); // 星期三
 */
export function getDayOfWeek(language: string = 'en'): string {
  const daysOfWeek: Record<string, string[]> = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    zh: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  };
  const today = new Date();
  const dayOfWeek: string = daysOfWeek[language][today.getDay()] || 'Unknown';
  return dayOfWeek;
}
const THREE = 3;
const FOUR = 4;
/**
   * @description: 标准时间 转 yy-MM-dd hh:mm:ss 形式
   * @param {Date} Date: 标准时间
   * @param {string} delimiter: 分隔符
   * @param {string} format: 格式化时间
   * @example
      const date = new Date();
      const time1 = formatDate(date, "yyyy-MM-dd");
      const time2 = formatDate(date, "yyyy-MM-dd HH:mm:ss");
   */
export function formatDate(date: Date, formatString: string): string {
  let dateShape: string = formatString;
  const dateParts: Record<string, number> = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + THREE) / THREE)
  };
  const re = /(y+)/;
  if (re.test(dateShape)) {
    const match = re.exec(dateShape);
    if (match) {
      const t = match[0];
      dateShape = dateShape.replace(t, `${date.getFullYear()}`.substring(FOUR - t.length));
    }
  }
  for (const key in dateParts) {
    if (Object.prototype.hasOwnProperty.call(dateParts, key)) {
      const regx = new RegExp(`(${key})`);
      const match = regx.exec(dateShape);
      if (regx.test(dateShape) && match) {
        const t = match[0];
        dateShape = dateShape.replace(
          t,
          t.length === 1
            ? dateParts[key].toString()
            : `00${dateParts[key]}`.substring(`${dateParts[key]}`.length).toString()
        );
      }
    }
  }
  return dateShape;
}

/**
   * @description: 判断当前时间是否在两个时间区间内，默认包含时间边界
   * @param {Date} startTime 开始时间
   * @param {Date} endTime 结束时间
   * @param {boolean} includeBoundaries 是否包含边界
   * @example
    const startTime = new Date('2021-08-23 16:00:00');
    const endTime = new Date('2021-08-23 17:00:00');
    const result = isTimeInInterval(startTime, endTime);
    console.log(result); // true
   */
export function isTimeInInterval(
  startTime: Date,
  endTime: Date,
  includeBoundaries: boolean = true
): boolean {
  const currentTime = new Date();
  if (includeBoundaries) {
    return currentTime >= startTime && currentTime <= endTime;
  } else {
    return currentTime > startTime && currentTime < endTime;
  }
}
