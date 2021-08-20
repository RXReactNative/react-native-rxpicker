'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import 'react-native';
import PropTypes from 'prop-types';

import RXPicker from '../core/RXPicker';

export default class RXAddressPicker extends Component {

  constructor(props) {
    super(props);

    _initialiseProps.call(this);

    this.addressList = props.addressList || [];
    const selectValues = props.selectValues || '';
    console.log('add selectValues=', selectValues);
    const result = AddressUtil.getNameWithCodes(this.addressList, selectValues) || {};

    const provinceArray = result.provinceArray || [];
    this.provinceIndex = result.provinceIndex || 0;
    this.provinceCode = result.provinceCode || 0;
    this.provinceName = result.provinceName || '';

    const cityArray = result.cityArray || [];
    this.cityIndex = result.cityIndex || 0;
    this.cityCode = result.cityCode || 0;
    this.cityName = result.cityName || '';

    const areaArray = result.areaArray || [];
    this.areaIndex = result.areaIndex || 0;
    this.areaCode = result.areaCode || 0;
    this.areaName = result.areaName || '';

    this.allProvinceArray = result.allProvinceArray || [];
    this.allCityArray = result.allCityArray || [];
    this.allAreaArray = result.allAreaArray || [];

    // alert('provinceName='+this.provinceName+',cityName='+ this.cityName+',areaName='+this.areaName);

    this.state = {
      provinceArray,
      cityArray,
      areaArray
    };
  }

  render() {
    const other = _objectWithoutProperties(this.props, []);
    const { provinceArray, cityArray, areaArray } = this.state;
    return React.createElement(RXPicker, _extends({}, other, {
      style: { paddingBottom: 20 },
      title: '选择地区'

      // 数据源
      , list: [provinceArray, cityArray, areaArray]

      // 选中的
      , value: [this.provinceIndex, this.cityIndex, this.areaIndex]

      // 分区比例，注意和list数据源长度保持一致 (如果一致的，可以不写)
      // proportion={ [1, 1, 1] }
      // 选中项距离顶部的偏移个数
      , offsetCount: 2,
      onChange: this.onChange,
      onConfirm: this.onConfirm
    }));
  }
}

var _initialiseProps = function () {
  this.onChange = (scrollIndex = 0, targetItemIndex = 0) => {
    const { onChange } = this.props;
    // console.log('onChange=> scrollIndex='+scrollIndex+',,,targetItemIndex='+targetItemIndex);
    onChange && onChange(scrollIndex, targetItemIndex);

    if (scrollIndex === 0) {
      this.provinceIndex = targetItemIndex;
      const provinceDict = this.allProvinceArray[this.provinceIndex] || {};
      this.provinceCode = provinceDict.cityId || 0;
      this.provinceName = provinceDict.cityName || '';

      const cityDict = AddressUtil.getArrayWithParent(this.allCityArray, this.provinceCode) || {};
      const cityArray = cityDict.array || [];
      this.cityIndex = cityDict.index || 0;
      this.cityCode = cityDict.id || 0;
      this.cityName = cityDict.name || '';

      const areaDict = AddressUtil.getArrayWithParent(this.allAreaArray, this.cityCode) || {};
      const areaArray = areaDict.array || [];
      this.areaIndex = areaDict.index || 0;
      this.areaCode = areaDict.id || 0;
      this.areaName = areaDict.name || '';
      this.setState({ cityArray, areaArray });
    } else if (scrollIndex === 1) {
      this.cityIndex = targetItemIndex;
      const cityDict = AddressUtil.getArrayWithCityName(this.state.cityArray, this.cityIndex, this.allCityArray) || {};
      this.cityArray = cityDict.array || [];
      this.cityCode = cityDict.id || 0;
      this.cityName = cityDict.name || '';

      const areaDict = AddressUtil.getArrayWithParent(this.allAreaArray, this.cityCode) || {};
      const areaArray = areaDict.array || [];
      this.areaIndex = areaDict.index || 0;
      this.areaCode = areaDict.id || 0;
      this.areaName = areaDict.name || '';
      this.setState({ areaArray });
    } else if (scrollIndex === 2) {
      this.areaIndex = targetItemIndex;
      const areaDict = AddressUtil.getArrayWithCityName(this.state.areaArray, this.areaIndex, this.allAreaArray) || {};
      this.areaCode = areaDict.id || 0;
      this.areaName = areaDict.name || '';
    }
  };

  this.onConfirm = () => {
    const { onConfirm } = this.props;
    setTimeout(() => {
      const params = {
        provinceCode: this.provinceCode,
        provinceName: this.provinceName,

        cityCode: this.cityCode,
        cityName: this.cityName,

        areaCode: this.areaCode,
        areaName: this.areaName
      };

      onConfirm && onConfirm(params);
    }, 1000);
  };
};

export const AddressUtil = {

  getNameWithCodes(array = [], codes = '') {

    if (!array || !Array.isArray(array) || !array.length) {
      return null;
    }

    let codeArray = codes.split(',') || [];
    if (!Array.isArray(codeArray)) {
      codeArray = [0, 0, 0];
    }
    let codeValue_0 = '';
    let codeValue_1 = '';
    let codeValue_2 = '';
    if (codeArray.length > 0) codeValue_0 = codeArray[0] || 0;
    if (codeArray.length > 1) codeValue_1 = codeArray[1] || 0;
    if (codeArray.length > 2) codeValue_2 = codeArray[2] || 0;

    codeValue_0 ? codeValue_0 = parseInt(codeValue_0) : codeValue_0 = 0;
    codeValue_1 ? codeValue_1 = parseInt(codeValue_1) : codeValue_1 = 0;
    codeValue_2 ? codeValue_2 = parseInt(codeValue_2) : codeValue_2 = 0;

    const allDict = AddressUtil.getPCA(array, codeValue_0);
    const provinceArray = allDict.provinceArray || [];
    const provinceIndex = allDict.index || 0;
    const provinceCode = allDict.id || 0;
    const provinceName = allDict.name || '';

    const allProvinceArray = allDict.allProvinceArray || [];
    const allCityArray = allDict.allCityArray || [];
    const allAreaArray = allDict.allAreaArray || [];

    const cityDict = AddressUtil.getArrayWithParent(allCityArray, provinceCode, codeValue_1);
    const cityArray = cityDict.array || [];
    const cityIndex = cityDict.index || 0;
    const cityCode = cityDict.id || 0;
    const cityName = cityDict.name || '';

    const areaDict = AddressUtil.getArrayWithParent(allAreaArray, cityCode, codeValue_2);
    const areaArray = areaDict.array || [];
    const areaIndex = areaDict.index || 0;
    const areaCode = areaDict.code || 0;
    const areaName = areaDict.name || '';
    return {
      allProvinceArray, allCityArray, allAreaArray,

      provinceArray, provinceIndex, provinceCode, provinceName,
      cityArray, cityIndex, cityCode, cityName,
      areaArray, areaIndex, areaCode, areaName
    };
  },

  getPCA(array = [], cityIdValue = '') {
    //{cityId: 3124, cityName: "崇左市", cityLevel: 2, parentId: 3015, cityCode: 144}
    const provinceArray = [];
    const allProvinceArray = [];
    const allCityArray = [];
    const allAreaArray = [];
    array = array || [];
    if (!Array.isArray(array)) {
      console.warn('getArrayName-> `array` not array');
      return { allProvinceArray, allCityArray, allAreaArray, provinceArray, index: 0, id: 0, name: '' };
    }

    let index = 0;
    let id = 0;
    let name = '';
    let firstItem = null;
    for (let i = 0; i < array.length; i++) {
      const item = array[i] || {};
      const cityLevel = item.cityLevel || 0;
      if (cityLevel === 1) {
        const cityName = item.cityName || '';
        if (!id) {
          const cityId = item.cityId || 0;
          if (cityIdValue && cityId === cityIdValue) {
            id = cityId;
            name = cityName;
          } else {
            index++;
          }
        }
        if (!firstItem) {
          firstItem = item;
        }
        provinceArray.push(cityName);
        allProvinceArray.push(item);
      } else if (cityLevel === 2) {
        allCityArray.push(item);
      } else if (cityLevel === 3) {
        allAreaArray.push(item);
      }
    }

    if (!id) {
      index = 0;
      const f = firstItem || {};
      name = f.cityName || '';
      id = f.cityId || 0;
    }

    return { allProvinceArray, allCityArray, allAreaArray, provinceArray, id, index, name };
  },

  getArrayWithParent(array = [], pCityId = 1, cityIdValue = '') {
    if (!Array.isArray(array)) {
      console.warn('getArrayName-> `array` not array');
      return { array: [], index: 0 };
    }
    const newArray = [];
    let index = 0;
    let id = 0;
    let name = '';
    let firstItem = null;
    for (let i = 0; i < array.length; i++) {
      const item = array[i] || {};
      const parentId = item.parentId || 0;
      const cityId = item.cityId || 0;
      const cityName = item.cityName || '';
      if (pCityId && parentId === pCityId) {
        if (!id) {
          if (cityIdValue && cityId === cityIdValue) {
            name = cityName;
            id = cityId;
          } else {
            index++;
          }
        }
        if (!firstItem) {
          firstItem = item;
        }
        newArray.push(cityName);
      }
    }

    if (!id) {
      index = 0;
      const f = firstItem || {};
      name = f.cityName || '';
      id = f.cityId || 0;
    }
    return { array: newArray, index, id, name };
  },

  getArrayWithCityName(array = [], index = 0, allArray = []) {
    let id = 0;
    let name = '';
    if (!Array.isArray(array)) {
      console.warn('getArrayName-> `array` not array');
      return { id, name };
    }
    if (index > array.length) {
      console.warn('getArrayName-> `index > array.length`');
      return { id, name };
    }
    name = array[index] || '';
    let firstItem = null;
    for (let i = 0; i < allArray.length; i++) {
      const item = allArray[i] || {};
      const itemName = item.cityName || '';
      if (!firstItem) {
        firstItem = item;
      }
      if (itemName === name) {
        id = item.cityId || 0;
        break;
      }
    }
    if (!id) {
      const f = firstItem || {};
      name = f.cityName || '';
      id = f.cityId || 0;
    }
    return { id, name };
  }
};

RXAddressPicker.propTypes = _extends({}, RXPicker.propTypes, {
  addressList: PropTypes.array,
  selectValues: PropTypes.string
});

RXAddressPicker.defaultProps = _extends({}, RXPicker.defaultProps, {
  addressList: []
});
//# sourceMappingURL=RXAddressPicker.js.map