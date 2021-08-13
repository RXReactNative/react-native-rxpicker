/**
 *
 *
 * @flow
 */
'use strict'
import React, { Component } from 'react';
import { } from 'react-native';
import PropTypes from 'prop-types';

import RXPicker from '../core/RXPicker';

export default class RXSinglePicker extends Component {
  static propTypes = {
    ...RXPicker.propTypes,
    list: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,
        PropTypes.string,
      ])
    ),
    selectValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    valueKey: PropTypes.string,
  }

  static defaultProps = {
    ...RXPicker.defaultProps,
    list: [],
  }

  constructor(props) {
    super(props);

    this.resultIndex = 0;

    let value = this.getValue(props);
    this.state = {
      value,
    }
  }

  getValue(props) {
    let selectValue = props.selectValue;
    let valueKey = props.valueKey;

    const list = props.list || [];
    if (!selectValue) {
      return null;
    }
    if (typeof selectValue === 'string' || typeof selectValue === 'number') {
      for (var i = 0; i < list.length; i++) {
        let item = list[i] || '';
        if (item === selectValue) {
          this.resultIndex = i || 0;
          return [i];
        }
      }
      return null;
    }
    else if (typeof selectValue === 'object' && valueKey) {
      for (var i = 0; i < list.length; i++) {
        let item = list[i] || {};
        let value = item[valueKey];
        if (value === selectValue) {
          this.resultIndex = i || 0;
          return [i];
        }
      }
      return null;
    }
  }

  onChange = (scrollIndex = 0, targetItemIndex = 0) => {
    const { onChange } = this.props;
    // console.log('onChange=> scrollIndex='+scrollIndex+',,,targetItemIndex='+targetItemIndex);
    this.resultIndex = targetItemIndex;
    onChange && onChange(scrollIndex, targetItemIndex);
  }

  onConfirm = () => {
    let { list, onConfirm } = this.props;
    list = list || [];
    if (this.resultIndex > list.length) {
      console.warn('YLSinglePicker 数组越界');
      return;
    }
    // console.log('this.resultIndex='+this.resultIndex);
    let item = list[this.resultIndex] || '';
    onConfirm && onConfirm(item);
  }

  render() {
    const { style, list, ...other } = this.props;
    const { value } = this.state;
    return <RXPicker
      {...other}
      style={[{ paddingBottom: 20 }, style]}

      // 数据源
      list={[list]}

      // 选中的
      value={value}

      // 分区比例，注意和list数据源长度保持一致 (如果一致的，可以不写)
      // proportion={ [1, 1, 1] }
      // 选中项距离顶部的偏移个数
      offsetCount={2}
      onChange={this.onChange}
      onConfirm={this.onConfirm}
    />
  }
}