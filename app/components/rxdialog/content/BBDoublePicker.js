
'use strict'
import React, { Component } from 'react'
import { View } from 'react-native'

import RXDialogPicker from '../core/RXDialogPicker'

// 本地 采用
import {
  RXDate,
  RXDoublePicker,
 } from '../../../package/index'


// node_modules 采用
// import {
//   // ...
// } from 'react-native-rxpicker'

import {
  RXSlideAnimation,

  DeviceWidth,
} from 'react-native-rxdialog'
const width = DeviceWidth;

export default class BBDoublePicker extends RXDialogPicker {
  constructor(props){
    super(props);
    this.state = ({
      selectValues: [],
      valueKey: '',
    })

    this.pickerAnimal = new RXSlideAnimation({slideFrom : 'right'});
  }

  static defaultProps = {
    superCallBack: () => {},
    onChangeText: (e) => {},
    overClickEnable: true, // 可以点击
  }


  createContentView() {
    const { onChangeText } = this.props;
    const {selectValues, valueKey} = this.state;
    return(
      <View style={{width, backgroundColor: '#fff'}}>
        <RXDoublePicker
          style={{flex:1}}
          title={'日期 + 时间选择'}
          list={ [RXDate.RXWeekArray() ,RXDate.RXADay24Hours(true)] }
          selectValues={selectValues}
          // valueKey={valueKey} // 可不传，因每列数据源，不是 对象数组
          dismiss={()=> this._superCallBack(-1)}
          onConfirm={(result) => { // 按照 需求自定义
            console.log('BBDoublePicker result=>', result)
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