'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import 'react-native';
import PropTypes from 'prop-types';

import RXPicker from '../core/RXPicker';

export default class RXSinglePicker extends Component {

  constructor(props) {
    super(props);

    this.onChange = (scrollIndex = 0, targetItemIndex = 0) => {
      const { onChange } = this.props;
      // console.log('onChange=> scrollIndex='+scrollIndex+',,,targetItemIndex='+targetItemIndex);
      this.resultIndex = targetItemIndex;
      onChange && onChange(scrollIndex, targetItemIndex);
    };

    this.onConfirm = () => {
      let { list, onConfirm } = this.props;
      list = list || [];
      if (this.resultIndex > list.length) {
        console.warn('RXSinglePicker 数组越界');
        return;
      }
      // console.log('this.resultIndex='+this.resultIndex);
      const item = list[this.resultIndex] || '';
      onConfirm && onConfirm(item);
    };

    this.resultIndex = 0;
  }

  getValue() {
    const props = this.props || {};
    const selectValue = props.selectValue;
    const valueKey = props.valueKey;

    const list = props.list || [];
    if (!selectValue) {
      return null;
    }
    if (typeof selectValue === 'string' || typeof selectValue === 'number') {
      for (let i = 0; i < list.length; i++) {
        const item = list[i] || '';
        if (item === selectValue) {
          this.resultIndex = i || 0;
          return [i];
        }
      }
      return null;
    } else if (typeof selectValue === 'object' && valueKey) {
      for (let i = 0; i < list.length; i++) {
        const item = list[i] || {};
        const value = item[valueKey];
        if (value === selectValue) {
          this.resultIndex = i || 0;
          return [i];
        }
      }
      return null;
    }
  }

  render() {
    const _props = this.props,
          { style, list } = _props,
          other = _objectWithoutProperties(_props, ['style', 'list']);
    const value = this.getValue();
    return React.createElement(RXPicker, _extends({}, other, {
      style: [{ paddingBottom: 20 }, style]

      // 数据源
      , list: [list]

      // 选中的
      , value: value

      // 分区比例，注意和list数据源长度保持一致 (如果一致的，可以不写)
      // proportion={ [1, 1, 1] }
      // 选中项距离顶部的偏移个数
      , offsetCount: 2,
      onChange: this.onChange,
      onConfirm: this.onConfirm
    }));
  }
}
RXSinglePicker.propTypes = _extends({}, RXPicker.propTypes, {
  list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string])),
  selectValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  valueKey: PropTypes.string
});
RXSinglePicker.defaultProps = _extends({}, RXPicker.defaultProps, {
  list: []
});
//# sourceMappingURL=RXSinglePicker.js.map