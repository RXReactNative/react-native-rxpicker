
'use strict'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

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
  RXPickerStyle
} from '../../../package/index'

import {
  RXSlideAnimation,

  DeviceWidth,
} from 'react-native-rxdialog'
const width = DeviceWidth;

export default class BBDoublePicker extends RXDialogPicker {
  constructor(props) {
    super(props);
    this.state = ({
      selectValues: [],
      valueKey: '',
    })

    this.pickerAnimal = new RXSlideAnimation({ slideFrom: 'right' });
  }

  static defaultProps = {
    superCallBack: () => { },
    onChangeText: (e) => { },
    overClickEnable: true, // 可以点击
  }


  createContentView() {
    const { onChangeText } = this.props;
    // const {selectValues, valueKey} = this.state;
    const { selectValues } = this.state;

    // No click events were written
    // Just to show the ability to support customization
    const diyHeaderView = (
      <View style={styles.tabBarView}>
        <Text style={styles.tabBarViewLeft}>close</Text>
        <Text style={styles.tabBarViewCenter}>请选择时间</Text>
        <Text style={styles.tabBarViewRight}>go</Text>
      </View>
    )

    return (
      <View style={{ width, backgroundColor: '#fff' }}>
        <RXDoublePicker
          style={{ flex: 1 }}
          headerView={diyHeaderView}
          title={'日期 + 时间选择'}
          list={[RXDate.RXWeekArray(), RXDate.RXADay24Hours(true)]}
          selectValues={selectValues}
          // valueKey={valueKey} // 可不传，因每列数据源，不是 对象数组
          dismiss={() => this._superCallBack(-1)}
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

const styles = StyleSheet.create({
  tabBarView: {
    alignItems: 'center',
    flexDirection: 'row',
    height: RXPickerStyle.store.tabBarView.height,
  },
  tabBarViewLeft: {
    color: 'green',
    paddingHorizontal: RXPickerStyle.store.btnRightBar.paddingHorizontal,
  },
  tabBarViewCenter: {
    flex: 1,
    textAlign: 'center',
    color: 'red',
  },
  tabBarViewRight: {
    color: 'pink',
    paddingHorizontal: RXPickerStyle.store.btnRightBar.paddingHorizontal,
  },
})