/**
 * 
 * 
 * @flow
 */
'use strict'
import React, {Component} from 'react';
import { } from 'react-native';
import PropTypes from 'prop-types';

import RXPicker from '../core/RXPicker';

export default class RXDoublePicker extends Component {
  static propTypes = {
    ...RXPicker.propTypes,
    selectValues: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,
        PropTypes.string,
      ])
    ),
    valueKey: PropTypes.string,
  }

  static defaultProps = {
    ...RXPicker.defaultProps,
    list: [],
  }

  constructor(props) {
    super(props);

    this.resultIndexArray = [0, 0];

    let value = this.getDoubleValue(props);
    this.state = {
      value,
    }
  }

  getValue(index = 0, list = [], selectValue = null, valueKey = null) {
    if (!selectValue) return null;
    if (typeof selectValue === 'string' || typeof selectValue === 'number') {
      for (var i = 0; i < list.length; i++) {
        let item = list[i] || '';
        if (item === selectValue) {
          this.resultIndexArray[index] = i || 0;
          return i;
        }
      }
      return 0;
    }
    else if (typeof selectValue === 'object' && valueKey) {
      for (var i = 0; i < list.length; i++) {
        let item = list[i] || {};
        let value = item[valueKey];
        if (value === selectValue) {
          this.resultIndexArray[index] = i || 0;
          return i;
        }
      }
      return 0;
    }
  }

  getDoubleValue(props) {
    let selectValues = props.selectValues;
    let valueKey = props.valueKey;
    const list = props.list || [];
    if (!Array.isArray(selectValues)) return null;
    var value = [];
    for (var i = 0; i < list.length; i++) {
      const array = list[i] || [];
      if (selectValues.length > i) {
        let selectValue = selectValues[i];
        value.push(this.getValue(i, array, selectValue, valueKey));
      }
      else {
        value.push(0)
        this.resultIndexArray[i] = 0;
      }
    }
    return value;
  }

  onChange = (scrollIndex = 0, targetItemIndex = 0) => {
    const { onChange } = this.props;
    // console.log('onChange=> scrollIndex='+scrollIndex+',,,targetItemIndex='+targetItemIndex);
    this.resultIndexArray[scrollIndex - 1] = targetItemIndex;
    onChange && onChange(scrollIndex, targetItemIndex);
  }

  onConfirm = () => {
    let { list, onConfirm } = this.props;
    list = list || [];
    if (!this.resultIndexArray || this.resultIndexArray.length > list.length) {
      console.warn('YLDoublePicker 数组越界');
      return;
    }
    let length = this.resultIndexArray.length;
    var resultArray = [];
    for (var i = 0; i < length; i++) {
      let index = this.resultIndexArray[i] || 0;
      let array = list[i] || [];
      if (index > array.length) {
        console.warn('YLDoublePicker 数组越界');
        resultArray.push('');
      }
      else {
        let value = array[index];
        resultArray.push(value);
      }
    }
    onConfirm && onConfirm(resultArray);
  }

  render() {
    const { style, list, ...other } = this.props;
    const { value } = this.state;
    // 前后的 空数组 处理
    let emptyArray = [];
    let lastList = [emptyArray];
    var proportionArray = [1];
    var valueArray = ([0].concat(value)).concat(0);
    for (var i = 0; i < list.length; i++) {
      let array = list[i] || [];
      lastList.push(array);
      proportionArray.push(1);
    }
    lastList.push(emptyArray)
    proportionArray.push(1);

    return <RXPicker 
            {...other}
            style={[{paddingBottom: 20}, style]}

            // 数据源
            list={ lastList }

            // 选中的
            value={valueArray}
            
            // 分区比例，注意和list数据源长度保持一致 (如果一致的，可以不写)
            proportion={ proportionArray }
            // 选中项距离顶部的偏移个数
            offsetCount={ 2 }
            onChange={this.onChange}
            onConfirm={this.onConfirm}
          />
  }
}