
'use strict'
import React from 'react'
import { View } from 'react-native'

import RXDialogPicker from '../core/RXDialogPicker'

import { DeviceWidth } from 'react-native-rxdialog'

// 本地 采用
import {
  RXDate,
  RXSinglePicker,
} from '../../../package/index'


// node_modules 采用
// import {
//   // ...
// } from 'react-native-rxpicker'

const width = DeviceWidth;

export default class BBSinglePicker extends RXDialogPicker {
  constructor(props) {
    super(props);
    this.state = ({
      selectValue: '00:00',
    })
  }

  static defaultProps = {
    superCallBack: () => { },
    onChangeText: (e) => { },
    overClickEnable: false,// no no  不可以点击
  }


  createContentView() {
    const { onChangeText } = this.props;
    const { selectValue } = this.state;
    return (
      <View style={{ width, backgroundColor: '#fff' }}>
        <RXSinglePicker
          style={{ flex: 1 }}
          title={'时间选择'}
          list={RXDate.RXADay24Hours(true)}
          selectValue={selectValue}
          dismiss={() => this._superCallBack(-1)}
          onConfirm={(result) => { // 按照 需求自定义
            console.log('BBSinglePicker result=>', result)
            if (result === selectValue) {
              console.log('当前选择，是上一次的结果，不可点击确定')
              return;
            }
            this.setState({
              selectValue: result
            })
            onChangeText && onChangeText(result);
            this._superCallBack(-1);
          }}
        />
      </View>
    )
  }

}