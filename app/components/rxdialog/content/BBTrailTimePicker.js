
'use strict'
import React from 'react'
import { View } from 'react-native'

import RXDialogPicker from '../core/RXDialogPicker'


// 本地 采用
import {
  // RXDate,
  RXTrailTimePicker,
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

export default class BBTrailTimePicker extends RXDialogPicker {
  constructor(props){
    super(props);

    let now = new Date();
    this.state = ({
      selectValues: now, // 当前日期
      limitDay: 30, // 最少天数 (最早从这月出，到今天，，，不会到上个月)
    })

    this.pickerAnimal = new RXSlideAnimation({slideFrom : 'top'});
  }

  static defaultProps = {
    superCallBack: () => {},
    onChangeText: (e) => {},
    overClickEnable: true, // 可以点击
  }


  createContentView() {
    const { onChangeText } = this.props;
    const {selectValues, limitDay} = this.state;
    return (
      <View style={{width, backgroundColor: '#fff'}}>
        <RXTrailTimePicker
          style={{flex:1}}
          title={'分时时间选择'}
          selectValues={selectValues}
          limitDay={limitDay}
          dismiss={()=> this._superCallBack(-1)}
          onConfirm={(result) => { // 按照 需求自定义
            console.log('BBDoublePicker result=>', result)
            if (result === selectValues) return;
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