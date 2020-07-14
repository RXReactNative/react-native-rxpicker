
'use strict'
import React, { Component } from 'react'
import { View } from 'react-native'

import RXDialogPicker from '../core/RXDialogPicker'

import { DeviceWidth } from 'react-native-rxdialog'

// 本地 采用
import {
  RXDate,
  RXAddressPicker,
 } from '../../../package/index'


// node_modules 采用
// import {
//   // ...
// } from 'react-native-rxpicker'

const width = DeviceWidth;

export default class BBAddressPicker extends RXDialogPicker {
  constructor(props){
    super(props);
    this.state = ({
      addressList: [],
      selectValues: '',
    })
  }

  static defaultProps = {
    superCallBack: () => {},
    onChangeText: (e) => {},
    overClickEnable: false,// no no  不可以点击
  }


  createContentView() {
    const { onChangeText } = this.props;
    const {addressList, selectValues} = this.state;
    return(
      <View style={{width, backgroundColor: '#fff'}}>
        <RXAddressPicker
          style={{flex:1}}
          title={'时间选择'}
          addressList={addressList}
          selectValues={selectValues}
          dismiss={()=> this._superCallBack(-1)}
          onConfirm={(result) => { // 按照 需求自定义
            console.log('BBAddressPicker result=>', result)
            if(result === selectValues) return;
            this.setState({
              selectValues: result
            })
            onChangeText && onChangeText(result)
            this._superCallBack(-1)
          }}
        />
      </View>
    )
  }

}