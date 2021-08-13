
/**
 * 改变组件内容，采用这种方式
 *
 * @flow
 */


import React from 'react'
import { View } from 'react-native'
// 本地 采用
import {
  RXDate,
  RXSinglePicker,
} from '../../../package/index'

// node_modules 采用
// import {
//   // ...
// } from 'react-native-rxpicker'

import PDOverlay from '../core/PDOverlay'
import { DeviceWidth } from 'react-native-rxdialog'
const width = DeviceWidth;

export default class AASinglePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      selectValue: '00:00',
    })
  }

  render() {
    const { onChangeText } = this.props;
    const { selectValue } = this.state;
    return (
      // 下面 width， alignSelf 是比不可少的，因为 popup-dialog 采用绝对布局方式
      <View style={{ width, backgroundColor: '#fff', alignSelf: 'center' }}>
        <RXSinglePicker
          style={{ width, backgroundColor: 'orange' }}
          LineSeparatorStyle={{ height: 2, backgroundColor: 'blue' }}
          contentStyle={{ backgroundColor: 'yellow' }}
          title={'2 - 时间选择'}
          list={RXDate.RXADay24Hours(true)}
          selectValue={selectValue}
          dismiss={() => PDOverlay.dismiss()}
          onConfirm={(result) => { // 按照 需求自定义
            console.log('AASinglePicker result=>', result)
            if (result === selectValue) { return; }
            this.setState({
              selectValue: result
            })
            onChangeText && onChangeText(result)
            PDOverlay.dismiss()
          }}
        />
      </View>
    )
  }
}