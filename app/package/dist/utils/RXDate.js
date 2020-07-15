
import { RXConvert2Digit } from './RXUtils';

// 今年
export function RXThisYear() {
  const date = new Date();
  const year = date.getFullYear();
  return year;
}

// 年份
export function RXYearArray() {
  const year = this.RXThisYear();
  var yearArray = [];
  for (let i = year - 20; i < year + 20; i++) {
    yearArray.push(i);
  }
  return yearArray;
}

// 月份
export function RXMonthArray() {
  return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
}

// 时间
export function RXADay24Hours(isConvert2Digit = false) {
  var minuteArray = [];
  for (let i = 0; i <= 24; i++) {
    const index = isConvert2Digit ? RXConvert2Digit(i) : i;
    const time = index + ':00';
    minuteArray.push(time);
  }
  return minuteArray;
}

// 日期
export function RXWeekArray() {
  return ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
}

export function RXDayStringArray() {
  return ['一天', '二天', '三天', '四天', '五天', '六天', '七天'];
}

// 分时
export function RXTimeSharingArray() {
  return ['2次', '4次', '6次', '8次', '12次', '24次'];
}

// 上传时间
export function RXUploadTimeArray() {
  return ['10秒', '15秒', '30秒'];
}
//# sourceMappingURL=RXDate.js.map