
export function RXConfigArray(length = 0) {
  var tempArray = [];
  for (let i = 0; i < length; i++) {
    tempArray.push(i);
  }
  return tempArray;
}

export function RXConfigMap(length = 0) {
  var tempMap = {};
  for (let i = 0; i < length; i++) {
    tempMap[i] = 0;
  }
  return tempMap;
}

export function RXIsLeapYear(year) {
  year = parseInt(year, 10);
  if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
    return true;
  } else {
    return false;
  }
}

/**
  * 格式化正整数，保留到十位数
  * 
  *   9 -> 09
  *   1 -> 01
  **/
export function RXConvert2Digit(num) {
  if (!num) return "00";
  if (typeof num === 'string') {
    num = parseInt(num);
    if (isNaN(num)) num = 0;
  }
  if (num == 0) return "00";
  if (num > 9) return num;
  return "0" + num;
}
//# sourceMappingURL=RXUtils.js.map