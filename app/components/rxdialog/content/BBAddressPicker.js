
'use strict'
import React from 'react'
import { View } from 'react-native'

import RXDialogPicker from '../core/RXDialogPicker'


// 本地 采用
import {
  RXAddressPicker,
} from '../../../package/index'

// data
import AddressArray from '../../../assets/data/address'


// node_modules 采用
// import {
//   // ...
// } from 'react-native-rxpicker'

import {
  RXSlideAnimation,

  DeviceWidth,
} from 'react-native-rxdialog'

const width = DeviceWidth;

export default class BBAddressPicker extends RXDialogPicker {
  constructor(props) {
    super(props);
    this.state = ({
      addressList: AddressArray,
    })

    this.pickerAnimal = new RXSlideAnimation({ slideFrom: 'left' });
  }

  static defaultProps = {
    superCallBack: () => { },
    onChangeText: (e) => { },
    overClickEnable: false,// no no  不可以点击
    selectValues: '',
  }

  createContentView() {
    const { onChangeText, selectValues } = this.props;
    const { addressList } = this.state;
    // console.log('current selectValues=', selectValues)
    return (
      <View style={{ width, backgroundColor: '#fff' }}>
        <RXAddressPicker
          style={{ flex: 1 }}
          title={'时间选择'}
          addressList={addressList}
          selectValues={selectValues}
          dismiss={() => this._superCallBack(-1)}
          onConfirm={(result) => { // 按照 需求自定义
            console.log('BBAddressPicker result=>', result)
            const provinceCode = result.provinceCode
            const cityCode = result.cityCode
            const areaCode = result.areaCode
            const codes = provinceCode + ',' + cityCode + ',' + areaCode

            const provinceName = result.provinceName
            const cityName = result.cityName
            const areaName = result.areaName
            const names = provinceName + ' ' + cityName + ' ' + areaName

            if (codes === selectValues) {
              this._superCallBack(-1)
              return;
            }
            onChangeText && onChangeText(codes, names)
            this._superCallBack(1)
          }}
        />
      </View>
    )
  }

}