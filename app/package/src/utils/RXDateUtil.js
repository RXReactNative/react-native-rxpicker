
const YLDateUtil = {

  isTodayHour(date1 = 0, date2 = 0) {
    if (date1 === date2) return true;
    const date1Map = this.formatDateMap(date1);
    const date2Map = this.formatDateMap(date2);
    if (date1Map.year === date2Map.year &&
      date1Map.month === date2Map.month &&
      date1Map.day === date2Map.day &&
      date1Map.hour === date2Map.hour
    ) {
      return true;
    }
    return false;
  },

  getNextDate(day = 0, hours = 12, min = 0, sec = 0, ms = 0) {
    let now = new Date();
    now.setDate(now.getDate() + day);
    now.setHours(hours, min, sec, ms);
    return now;
  },

  weekStringArray: function () {
    return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  },
  /**
   * 日期格式化成字符串
   *
   * @param {*} time   时间戳
   * @param {*} format 格式样式
   */
  formatDateString: function (time, format = 'YY-MM-DD hh:mm:ss') {
    const date = new Date(time);

    const year = date.getFullYear(),
      month = date.getMonth() + 1, // 月份是从0开始的
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
    const preArr = Array.apply(null, Array(10)).map(function (elem, index) {
      return '0' + index;
    }); //// 开个长度为10的数组 格式为 00 01 02 03

    const newTime = format.replace(/YY/g, year)
      .replace(/MM/g, preArr[month] || month)
      .replace(/DD/g, preArr[day] || day)
      .replace(/hh/g, preArr[hour] || hour)
      .replace(/mm/g, preArr[min] || min)
      .replace(/ss/g, preArr[sec] || sec);

    return newTime;
  },

  formatDateMap: function (time) {
    let date = new Date(time);
    if (!date) date = new Date();

    const year = date.getFullYear(),
      month = date.getMonth() + 1, // 月份是从0开始的
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds(),
      week = date.getDay();

    const weekString = this.weekStringArray()[week] || week;

    const preArr = Array.apply(null, Array(10)).map(function (elem, index) {
      return '0' + index;
    });//// 开个长度为10的数组 格式为 00 01 02 03

    const monthString = preArr[month] || month;
    const dayString = preArr[day] || day;
    const hourString = preArr[hour] || hour;
    const minString = preArr[min] || min;
    const secString = preArr[sec] || sec;

    return {
      year, month, day, hour, min, sec, week,

      yearString: '' + year, monthString, dayString,
      hourString, minString, secString,
      weekString,
    };
  }

}

export default YLDateUtil;