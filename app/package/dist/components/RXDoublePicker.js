'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import 'react-native';
import PropTypes from 'prop-types';

import RXPicker from '../core/RXPicker';

export default class RXDoublePicker extends Component {

  constructor(props) {
    super(props);

    this.onChange = (scrollIndex = 0, targetItemIndex = 0) => {
      const { onChange } = this.props;
      // console.log('onChange=> scrollIndex='+scrollIndex+',,,targetItemIndex='+targetItemIndex);
      this.resultIndexArray[scrollIndex - 1] = targetItemIndex;
      onChange && onChange(scrollIndex, targetItemIndex);
    };

    this.onConfirm = () => {
      let { list, onConfirm } = this.props;
      list = list || [];
      if (!this.resultIndexArray || this.resultIndexArray.length > list.length) {
        console.warn('RXDoublePicker 数组越界');
        return;
      }
      const length = this.resultIndexArray.length;
      const resultArray = [];
      for (let i = 0; i < length; i++) {
        const index = this.resultIndexArray[i] || 0;
        const array = list[i] || [];
        if (index > array.length) {
          console.warn('RXDoublePicker 数组越界');
          resultArray.push('');
        } else {
          const value = array[index];
          resultArray.push(value);
        }
      }
      onConfirm && onConfirm(resultArray);
    };

    this.resultIndexArray = [0, 0];
  }

  getValue(index = 0, list = [], selectValue = null, valueKey = null) {
    if (!selectValue) return null;
    if (typeof selectValue === 'string' || typeof selectValue === 'number') {
      for (let i = 0; i < list.length; i++) {
        const item = list[i] || '';
        if (item === selectValue) {
          this.resultIndexArray[index] = i || 0;
          return i;
        }
      }
      return 0;
    } else if (typeof selectValue === 'object' && valueKey) {
      for (let i = 0; i < list.length; i++) {
        const item = list[i] || {};
        const value = item[valueKey];
        if (value === selectValue) {
          this.resultIndexArray[index] = i || 0;
          return i;
        }
      }
      return 0;
    }
  }

  getDoubleValue() {
    const props = this.props || {};
    const selectValues = props.selectValues;
    const valueKey = props.valueKey;
    const list = props.list || [];
    if (!Array.isArray(selectValues)) return null;
    const value = [];
    for (let i = 0; i < list.length; i++) {
      const array = list[i] || [];
      if (selectValues.length > i) {
        const selectValue = selectValues[i];
        value.push(this.getValue(i, array, selectValue, valueKey));
      } else {
        value.push(0);
        this.resultIndexArray[i] = 0;
      }
    }
    return value;
  }

  render() {
    const _props = this.props,
          { style, list } = _props,
          other = _objectWithoutProperties(_props, ['style', 'list']);
    const value = this.getDoubleValue();
    // 前后的 空数组 处理
    const emptyArray = [];
    const lastList = [emptyArray];
    const proportionArray = [1];
    const valueArray = [0].concat(value).concat(0);
    for (let i = 0; i < list.length; i++) {
      const array = list[i] || [];
      lastList.push(array);
      proportionArray.push(1);
    }
    lastList.push(emptyArray);
    proportionArray.push(1);

    return React.createElement(RXPicker, _extends({}, other, {
      style: [{ paddingBottom: 20 }, style]

      // 数据源
      , list: lastList

      // 选中的
      , value: valueArray

      // 分区比例，注意和list数据源长度保持一致 (如果一致的，可以不写)
      , proportion: proportionArray
      // 选中项距离顶部的偏移个数
      , offsetCount: 2,
      onChange: this.onChange,
      onConfirm: this.onConfirm
    }));
  }
}
RXDoublePicker.propTypes = _extends({}, RXPicker.propTypes, {
  selectValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string])),
  valueKey: PropTypes.string
});
RXDoublePicker.defaultProps = _extends({}, RXPicker.defaultProps, {
  list: []
});
//# sourceMappingURL=RXDoublePicker.js.map