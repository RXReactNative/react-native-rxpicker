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

export default class RXAddressPicker extends Component {
  static propTypes = {
    ...RXPicker.propTypes,
    addressList: PropTypes.array,
    selectValues: PropTypes.string,
  }

  static defaultProps = {
    ...RXPicker.defaultProps,
    addressList: [],
  }

  constructor(props) {
    super(props);
    this.addressList = props.addressList || [];
    let selectValues = props.selectValues || '';
    let result = AddressUtil.getNameWithCodes(this.addressList, selectValues) || {};

    let provinceArray = result.provinceArray || [];
    this.provinceIndex = result.provinceIndex || 0;
    this.provinceCode = result.provinceCode || 0;
    this.provinceName = result.provinceName || '';

    let cityArray = result.cityArray || [];
    this.cityIndex = result.cityIndex|| 0;
    this.cityCode = result.cityCode || 0;
    this.cityName = result.cityName || '';

    let areaArray = result.areaArray || [];
    this.areaIndex = result.areaIndex|| 0;
    this.areaCode = result.areaCode || 0;
    this.areaName = result.areaName || '';

    this.allProvinceArray = result.allProvinceArray || [];
    this.allCityArray = result.allCityArray || [];
    this.allAreaArray = result.allAreaArray || [];

    // alert('provinceName='+this.provinceName+',cityName='+ this.cityName+',areaName='+this.areaName);

    this.state = {
      provinceArray,
      cityArray,
      areaArray,
    }
  }

  onChange = (scrollIndex = 0, targetItemIndex = 0) => {
    const { onChange } = this.props;
    // console.log('onChange=> scrollIndex='+scrollIndex+',,,targetItemIndex='+targetItemIndex);
    onChange && onChange(scrollIndex, targetItemIndex);

    if (scrollIndex === 0) {
      this.provinceIndex = targetItemIndex;
      let provinceDict = this.allProvinceArray[this.provinceIndex] || {};
      this.provinceCode = provinceDict.cityId || 0;
      this.provinceName = provinceDict.cityName || '';

      let cityDict = AddressUtil.getArrayWithParent(this.allCityArray, this.provinceCode) || {};
      let cityArray = cityDict.array || [];
      this.cityIndex = cityDict.index || 0;
      this.cityCode = cityDict.id || 0;
      this.cityName = cityDict.name || '';

      let areaDict = AddressUtil.getArrayWithParent(this.allAreaArray, this.cityCode) || {};
      let areaArray = areaDict.array || [];
      this.areaIndex = areaDict.index || 0;
      this.areaCode = areaDict.id || 0;
      this.areaName = areaDict.name || '';
      this.setState({cityArray, areaArray});
    }
    else if (scrollIndex === 1) {
      this.cityIndex = targetItemIndex;
      let cityDict = AddressUtil.getArrayWithCityName(this.state.cityArray, this.cityIndex, this.allCityArray) || {};
      this.cityArray = cityDict.array || [];
      this.cityCode = cityDict.id || 0;
      this.cityName = cityDict.name || '';

      let areaDict = AddressUtil.getArrayWithParent(this.allAreaArray, this.cityCode) || {};
      let areaArray = areaDict.array || [];
      this.areaIndex = areaDict.index || 0;
      this.areaCode = areaDict.id || 0;
      this.areaName = areaDict.name || '';
      this.setState({areaArray});
    }
    else if (scrollIndex === 2) {
      this.areaIndex = targetItemIndex;
      let areaDict = AddressUtil.getArrayWithCityName(this.state.areaArray, this.areaIndex, this.allAreaArray) || {};
      this.areaCode = areaDict.id || 0;
      this.areaName = areaDict.name || '';
    }
  }

  onConfirm = () => {
    const { onConfirm } = this.props;
    setTimeout(() => {
      let params = {
        provinceCode: this.provinceCode,
        provinceName: this.provinceName,
  
        cityCode: this.cityCode,
        cityName: this.cityName,
  
        areaCode: this.areaCode,
        areaName: this.areaName,
      }
      // alert('provinceName='+this.provinceName+',cityName='+ this.cityName+',areaName='+this.areaName);
      onConfirm && onConfirm(params);
    }, 1000);
  }

  render() {
    const { ...other } = this.props;
    const { provinceArray, cityArray, areaArray } = this.state;
    return <RXPicker 
            {...other}
            style={ {paddingBottom: 20} }
            title={'选择地区'}

            // 数据源
            list={[ provinceArray, cityArray, areaArray ]}

            // 选中的
            value={[this.provinceIndex, this.cityIndex, this.areaIndex]}

            // 分区比例，注意和list数据源长度保持一致 (如果一致的，可以不写)
            // proportion={ [1, 1, 1] }
            // 选中项距离顶部的偏移个数
            offsetCount={ 2 }
            onChange={this.onChange}
            onConfirm={this.onConfirm}
          />
  }
}











export const AddressUtil = {

  getNameWithCodes(array=[], codes='') {

    if (!array || !Array.isArray(array) || !array.length) {
      return null;
    }

    let codeArray = codes.split(',') || [];
    if (!Array.isArray(codeArray)) {
      codeArray = [0,0,0];
    }
    var codeValue_0 = '';
    var codeValue_1 = '';
    var codeValue_2 = '';
    if (codeArray.length > 0) codeValue_0 = codeArray[0] || 0;
    if (codeArray.length > 1) codeValue_1 = codeArray[1] || 0;
    if (codeArray.length > 2) codeValue_2 = codeArray[2] || 0;

    let allDict = AddressUtil.getPCA(array, codeValue_0);
    let provinceArray = allDict.provinceArray || [];
    let provinceIndex = allDict.index || 0;
    let provinceCode = allDict.id || 0;
    let provinceName = allDict.name || '';

    let allProvinceArray = allDict.allProvinceArray || [];
    let allCityArray = allDict.allCityArray || [];
    let allAreaArray = allDict.allAreaArray || [];

    let cityDict = AddressUtil.getArrayWithParent(allCityArray, provinceCode, codeValue_1);
    let cityArray = cityDict.array || [];
    let cityIndex = cityDict.index || 0;
    let cityCode = cityDict.id || 0;
    let cityName = cityDict.name || '';

    let areaDict = AddressUtil.getArrayWithParent(allAreaArray, cityCode, codeValue_2);
    let areaArray = areaDict.array || [];
    let areaIndex = areaDict.index || 0;
    let areaCode = areaDict.code || 0;
    let areaName = areaDict.name || '';
    return {
      allProvinceArray, allCityArray, allAreaArray,

      provinceArray, provinceIndex, provinceCode, provinceName,
      cityArray, cityIndex, cityCode, cityName,
      areaArray, areaIndex, areaCode, areaName
    }
  },

  getPCA(array = [], cityIdValue='') {
    //{cityId: 3124, cityName: "崇左市", cityLevel: 2, parentId: 3015, cityCode: 144}
    let provinceArray = [];
    let allProvinceArray = [];
    let allCityArray = [];
    let allAreaArray = [];
    array = array || [];
    if (!Array.isArray(array)) {
      console.warn('getArrayName-> `array` not array');
      return { allProvinceArray, allCityArray, allAreaArray, provinceArray, index: 0, id: 0, name: ''};
    }

    var index = 0;
    var id = 0;
    var name = '';
    let firstItem = null;
    for (let i = 0; i<array.length; i++) {
      let item = array[i] || {};
      let cityLevel = item.cityLevel || 0;
      if (cityLevel === 1) {
        let cityName = item.cityName || '';
        if (!id) {
          let cityId = item.cityId || 0;
          if (cityIdValue && cityId == cityIdValue) { //相对相等，不是绝对
            id = cityId;
            name = cityName;
          }
          else {
            index++;
          }
        }
        if (!firstItem){
          firstItem = item;
        }
        provinceArray.push(cityName);
        allProvinceArray.push(item);
      }
      else if (cityLevel === 2) {
        allCityArray.push(item);
      }
      else if (cityLevel === 3) {
        allAreaArray.push(item);
      }
    }

    if (!id) {
      index = 0;
      name = firstItem.cityName || '';
      id = firstItem.cityId || 0;
    }

    return { allProvinceArray, allCityArray, allAreaArray, provinceArray, id, index, name };
  },

  getArrayWithParent(array=[], pCityId=1, cityIdValue='') {
    if (!Array.isArray(array)) {
      console.warn('getArrayName-> `array` not array');
      return {array: [], index: 0};
    }
    var newArray = [];
    var index = 0;
    var id = 0;
    var name = '';
    let firstItem = null;
    for (var i = 0; i<array.length; i++) {
      let item = array[i] || {};
      let parentId = item.parentId || 0;
      let cityId = item.cityId || 0;
      let cityName = item.cityName || '';
      if (pCityId && parentId === pCityId) {
        if (!id) {
          if (cityIdValue && cityId == cityIdValue) { //相对相等，不是绝对
            name = cityName;
            id = cityId;
          }
          else {
            index++;
          }
        }
        if (!firstItem){
          firstItem = item;
        }
        newArray.push(cityName);
      }      
    }

    if (!id) {
      index = 0;
      name = firstItem.cityName || '';
      id = firstItem.cityId || 0;
    }
    return {array: newArray, index, id, name};
  },

  getArrayWithCityName(array=[], index=0, allArray=[]) {
    var id = 0;
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
    for (let i=0; i<allArray.length; i++) {
      let item = allArray[i] || {};
      let itemName = item.cityName || '';
      if (!firstItem){
        firstItem = item;
      }
      if (itemName === name) {
        id = item.cityId || 0;
        break;
      }
    }
    if (!id) {
      name = firstItem.cityName || '';
      id = firstItem.cityId || 0;
    }
    return { id, name };
  }
}