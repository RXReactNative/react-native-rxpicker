'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import 'react-native';
import PropTypes from 'prop-types';

import RXDateUtil from '../utils/RXDateUtil';
import RXPicker from '../core/RXPicker';
import { RXConfigArray, RXIsLeapYear, RXConvert2Digit } from '../utils/RXUtils';

export default class RXTrailTimePicker extends Component {

  constructor(props) {
    super(props);

    _initialiseProps.call(this);

    const {
      yearArray, monthArray, dayArray, hourArray,
      yearSelectIndex, monthSelectIndex, daySelectIndex, hourSelectIndex
      // lastHour,
      // preDay, lastYear, lastMonth, lastDay
    } = this.initialize(props);

    this.state = {
      yearArray, monthArray, dayArray, hourArray,
      yearSelectIndex, monthSelectIndex, daySelectIndex, hourSelectIndex
    };
    this.selectMap = RXConfigArray(6);
  }

  initialize(props) {
    let limitDay = props.limitDay || 7;
    let nowDate = RXDateUtil.getNextDate(0, 0);
    let nowDateMap = RXDateUtil.formatDateMap(nowDate);
    let month = nowDateMap.month,
        day = nowDateMap.day;
    var yearShow = false;
    var preDay = 0;
    if (month === 1 && day < limitDay) {
      yearShow = true;
      preDay = limitDay - day;
    }

    let selectDate = props.selectValues || RXDateUtil.getNextDate();
    let selectDateMap = RXDateUtil.formatDateMap(selectDate);
    let selectYear = selectDateMap.year;
    let selectMonth = selectDateMap.month;
    let selectDay = selectDateMap.day;
    let selectHour = selectDateMap.hour;

    this.preDay = preDay;
    this.lastYear = nowDateMap.year; // 年
    this.lastMonth = month; // 月
    this.lastDay = day; // 日
    this.lastHour = nowDateMap.hour; // 小时

    var yearArray = [];
    var yearSelectIndex = 0;
    if (yearShow) {
      yearArray = [nowDateMap.year - 1 + ' 年', nowDateMap.year + ' 年'];
      if (nowDateMap.year === selectYear) {
        yearSelectIndex = 1;
      }
    }

    let selectMothMap = this.getSelectMonth(selectYear, selectMonth);
    let monthArray = selectMothMap.array || [];
    let monthSelectIndex = selectMothMap.selectIndex || 0;

    let selectDayMap = this.getSelectDays(selectYear, selectMonth, selectDay);
    let dayArray = selectDayMap.array || [];
    let daySelectIndex = selectDayMap.selectIndex || 0;

    let selectHourMap = this.getSelectHour(selectYear, selectMonth, selectDay, selectHour);
    let hourArray = selectHourMap.array || [];
    let hourSelectIndex = selectHourMap.selectIndex || 0;

    return {
      yearArray, monthArray, dayArray, hourArray,
      yearSelectIndex, monthSelectIndex, daySelectIndex, hourSelectIndex,
      lastHour: selectHour,
      preDay, lastYear: nowDate.year, lastMonth: month, lastDay: day
    };
  }

  getSelectMonth(year = 0, selectMonth = 0) {
    let nowDate = new Date();
    let nowDateMap = RXDateUtil.formatDateMap(nowDate);
    if (!year) {
      year = nowDateMap.year;
    } else {
      year = this.restoreNum(year);
    }
    var selectIndex = 0;
    if (this.lastYear > year) {
      let preMonth = '12 月';
      return { array: [preMonth], selectIndex };
    } else {
      let lastMonth = nowDateMap.month + ' 月';
      return { array: [lastMonth], selectIndex };
    }
  }

  getSelectDays(year = 0, month = 0, selectDay = 0) {
    let { limitDay } = this.props;
    limitDay = limitDay || 1;
    month = this.restoreNum(month);

    let nowDate = new Date();
    let nowDateMap = RXDateUtil.formatDateMap(nowDate);
    if (!year) {
      year = nowDateMap.year;
    } else {
      year = this.restoreNum(year);
    }

    let dayNum = this.getDay(year, month);

    let nowDay = nowDateMap.day;
    var index = 0;
    var MaxCount = limitDay;
    if (year === nowDateMap.year && month === nowDateMap.month) {
      if (nowDay > limitDay - 1) {
        index = nowDay - limitDay + 1;
      } else {
        MaxCount = nowDay;
        index = 1;
      }
    } else {
      MaxCount = limitDay - nowDay + 1;
      index = dayNum - MaxCount;
    }

    var selectIndex = 0;

    var array = [];
    for (let i = 0; i < MaxCount; i++) {
      let day = index + i;
      if (day === selectDay) selectIndex = i;
      let dateString = day + ' 日 ' + this.getWeek(year, month, day);
      if (dateString === selectDay) selectIndex = i;
      array.push(dateString);
    }
    return { array, selectIndex };
  }

  getDay(year, month) {
    let dayNum = 0;
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        dayNum = 31;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        dayNum = 30;
        break;
      case 2:
        dayNum = RXIsLeapYear(year) ? 29 : 28;
        break;
      default:
        dayNum = 0;
    }
    return dayNum;
  }

  restoreNum(numString) {
    if (typeof numString === 'string') {
      numString = numString.split(' ')[0] || numString;
      numString = parseInt(numString);
      if (isNaN(numString)) {
        numString = 0;
      }
    }
    return numString;
  }

  render() {
    const _props = this.props,
          { title } = _props,
          other = _objectWithoutProperties(_props, ['title']);
    const {
      yearArray, monthArray, dayArray, hourArray,
      yearSelectIndex, monthSelectIndex, daySelectIndex, hourSelectIndex
    } = this.state;
    let yearShow = yearArray.length;

    let list = yearShow ? [yearArray, monthArray, dayArray, hourArray] : [monthArray, dayArray, hourArray];

    let value = yearShow ? [yearSelectIndex, monthSelectIndex, daySelectIndex, hourSelectIndex] : [monthSelectIndex, daySelectIndex, hourSelectIndex];
    let proportion = yearShow ? [0.5, 0.5, 2, 0, 5] : [0.5, 2, 0, 5];
    return React.createElement(RXPicker, _extends({}, other, {
      style: { paddingBottom: 20 },
      title: title
      // 数据源
      , list: list

      // 选中的
      , value: value

      // 分区比例，注意和list数据源长度保持一致
      , proportion: proportion

      // 选中项距离顶部的偏移个数
      , offsetCount: 2,
      onChange: this.onChange,
      onConfirm: this.onConfirm
    }));
  }
}
RXTrailTimePicker.propTypes = _extends({}, RXPicker.propTypes, {
  selectValues: PropTypes.object,
  limitDay: PropTypes.number
});
RXTrailTimePicker.defaultProps = _extends({}, RXPicker.defaultProps, {
  limitDay: 7
});

var _initialiseProps = function () {
  this.getWeek = (year, month, day) => {
    if (typeof month === 'string') {
      month = month.split(' ')[0] || month;
    }
    let date = new Date();
    if (!year) {
      year = date.getFullYear();
    } else {
      year = this.restoreNum(year);
    }
    date.setFullYear(year, month - 1, day);
    let week = date.getDay();
    let weekString = RXDateUtil.weekStringArray()[week] || week;
    return weekString;
  };

  this.getSelectHour = (year = 0, month = 0, day = 0, selectHour = 0) => {
    month = this.restoreNum(month);
    day = this.restoreNum(day);
    if (typeof selectHour === 'string') {
      let tempHour = selectHour.split(':') || [selectHour];
      tempHour = parseInt(tempHour);
      if (isNaN(tempHour)) {
        tempHour = 0;
      }
      selectHour = tempHour;
    }

    let nowDate = new Date();
    let nowDateMap = RXDateUtil.formatDateMap(nowDate);
    let maxHour = 24;
    if (!year) {
      year = nowDateMap.year;
    }
    if (year === nowDateMap.year && month === nowDateMap.month && day === nowDateMap.day) {
      maxHour = nowDateMap.hour;
    }
    var array = [];
    var selectIndex = selectHour > maxHour ? maxHour : 0;
    for (let i = 0; i <= maxHour; i++) {
      if (i === selectHour) selectIndex = i;
      let hourString = RXConvert2Digit(i) + ':00';
      array.push(hourString);
    }
    return { array, selectIndex };
  };

  this.onChange = (scrollIndex = 0, targetItemIndex = 0) => {
    // const { onChange } = this.props;
    const {
      yearArray, monthArray, dayArray, hourArray,
      yearSelectIndex, monthSelectIndex, daySelectIndex, hourSelectIndex
    } = this.state;
    let yearShow = yearArray.length;
    if (yearShow && scrollIndex === 0) {
      // 年份
      let selectYear = yearArray[targetItemIndex];

      let selectMothMap = this.getSelectMonth(selectYear);
      let tempMonthArray = selectMothMap.array || [];
      let tempMonthSelectIndex = selectMothMap.selectIndex || 0;
      let selectMonth = tempMonthArray[tempMonthSelectIndex];

      let selectDay = dayArray[daySelectIndex];
      let selectDayMap = this.getSelectDays(selectYear, selectMonth, selectDay);
      let tempDayArray = selectDayMap.array || [];
      let tempDaySelectIndex = selectDayMap.selectIndex || 0;

      let selectHour = hourArray[hourSelectIndex];
      let selectHourMap = this.getSelectHour(selectYear, selectMonth, selectDay, selectHour);
      let tempHourArray = selectHourMap.array || [];
      let tempHourSelectIndex = selectHourMap.selectIndex || 0;
      this.setState({
        yearSelectIndex: targetItemIndex,
        monthArray: tempMonthArray, monthSelectIndex: tempMonthSelectIndex,
        dayArray: tempDayArray, daySelectIndex: tempDaySelectIndex,
        hourArray: tempHourArray, hourSelectIndex: tempHourSelectIndex
      });
    } else if (yearShow && scrollIndex === 1 || !yearShow && scrollIndex === 0) {
      // 月份
      var selectYear = new Date().getFullYear();
      if (yearShow) {
        selectYear = yearArray[yearSelectIndex];
      }
      let selectMonth = monthArray[targetItemIndex];

      let selectDay = dayArray[daySelectIndex];
      let selectDayMap = this.getSelectDays(selectYear, selectMonth, selectDay);
      let tempDayArray = selectDayMap.array || [];
      let tempDaySelectIndex = selectDayMap.selectIndex || 0;

      let selectHour = hourArray[hourSelectIndex];
      let selectHourMap = this.getSelectHour(selectYear, selectMonth, selectDay, selectHour);
      let tempHourArray = selectHourMap.array || [];
      let tempHourSelectIndex = selectHourMap.selectIndex || 0;
      this.setState({
        monthSelectIndex: targetItemIndex,
        dayArray: tempDayArray, daySelectIndex: tempDaySelectIndex,
        hourArray: tempHourArray, hourSelectIndex: tempHourSelectIndex
      });
    } else if (yearShow && scrollIndex === 2 || !yearShow && scrollIndex === 1) {
      // 日
      var selectYear = new Date().getFullYear();
      if (yearShow) {
        selectYear = yearArray[yearSelectIndex];
      }
      let selectMonth = monthArray[monthSelectIndex];

      let selectDay = dayArray[targetItemIndex];

      let selectHour = hourArray[hourSelectIndex];
      let selectHourMap = this.getSelectHour(selectYear, selectMonth, selectDay, selectHour);
      let tempHourArray = selectHourMap.array || [];
      let tempHourSelectIndex = selectHourMap.selectIndex || 0;
      this.setState({
        daySelectIndex: targetItemIndex,
        hourArray: tempHourArray, hourSelectIndex: tempHourSelectIndex
      });
    } else if (yearShow && scrollIndex === 3 || !yearShow && scrollIndex === 2) {
      // 小时
      this.setState({
        hourSelectIndex: targetItemIndex
      });
    }
  };

  this.onConfirm = () => {
    const { onConfirm } = this.props;
    const {
      yearArray, monthArray, dayArray, hourArray,
      yearSelectIndex, monthSelectIndex, daySelectIndex, hourSelectIndex
    } = this.state;
    let currentDate = new Date();
    let yearShow = yearArray.length;
    var year = currentDate.getFullYear();
    if (yearShow) {
      year = this.restoreNum(yearArray[yearSelectIndex]) || year;
    }

    let month = this.restoreNum(monthArray[monthSelectIndex]) || 2;
    let day = this.restoreNum(dayArray[daySelectIndex]) || 1;

    let hourString = hourArray[hourSelectIndex] || '12:00';
    let hour = hourString.split(':')[0] || 0;
    currentDate.setFullYear(year, month - 1, day);
    currentDate.setHours(hour, 0, 0, 0);
    onConfirm && onConfirm(currentDate);
  };
};
//# sourceMappingURL=RXTrailTimePicker.js.map