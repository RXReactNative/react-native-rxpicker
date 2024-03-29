/**
 * @this RXPicker
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 *
 * -------------------------------------------
 *
 * react-native-rxpicker    本身就是 ui展示库，没有动画
 *
 * 而 此文件，就为了 给 picker 的库 添加 动画
 *
 *
 *
 * 如果不需要动画，也可以直接用，不一定需要封装一下
**/

'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'

import {
  RXFadeAnimation,
  RXSlideAnimation,

  DeviceWidth,
  DeviceHeight,
} from 'react-native-rxdialog'

// import {
//   RXPickerStyle
// } from '../../../package/index'

const width = DeviceWidth;
const height = DeviceHeight;

export default class RXDialogPicker extends Component {
  constructor(props) {
    super(props);

    this.overlayAnimal = new RXFadeAnimation();
    this.pickerAnimal = new RXSlideAnimation({ slideFrom: 'bottom' });

    // 仅配置一次，如果配置多次，，相同的key.value 以最后一个为准
    // RXPickerStyle.initApi({ // 你可以打开
    //   btnLeftBar: { text: '取消' },
    //   btnRightBar: { text: '确定' },
    //   titleText: { text: '请选择' }
    // })
  }

  static defaultProps = {
    visible: false,
    style: {},
    superCallBack: (e) => { },
    overClickEnable: true,
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.props;
    if (visible !== nextProps.visible && nextProps.visible) {
      Keyboard.dismiss();
      this._doAnimal(1, () => {
      });
    }
  }

  createContentView() {
    // 需要子类去实现
    // throw Error('not implemented yet');
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this._superCallBack(-1);
        }
        }>
        <View style={{ flex: 1, width: width - 40, height: 80, alignItems: 'center', justifyContent: 'center', marginBottom: 50, backgroundColor: 'white' }}>
          <Text style={{ padding: 10, fontSize: 16, lineHeight: 20, color: 'red' }}>Override this method with subclasses to implement Component(请用子类覆盖该方法实现UI)</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _superCallBack(action = 0) {
    console.log('_superCallBack->action=>', action)
    if (action !== 0) {
      this._doAnimal(0, () => {
        if (this.props.superCallBack) {
          this.props.superCallBack(action);
        }
      })
    }
  }

  _doAnimal(toValue: number, onFinished?: Function = () => { }) {
    this.overlayAnimal.toValue(toValue);
    this.pickerAnimal.toValue(toValue, onFinished)
  }

  _overlay() {
    const { overClickEnable } = this.props;
    return (
      <Animated.View style={[styles.overlay, this.overlayAnimal.animations]}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (overClickEnable) {
              this._superCallBack(-1);
            }
          }
          }>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      </Animated.View>
    )
  }

  _content() {
    return (
      <Animated.View style={[styles.dialog, this.pickerAnimal.animations]}>
        {this.createContentView()}
      </Animated.View>
    )
  }


  render() {
    if (this.props.visible) {
      return (
        <View style={[styles.container, styles.dialog]}>
          {this._overlay()}
          {this._content()}
        </View>
      )
    }
    return null;
  }
}



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'flex-end',
    overflow: 'visible', // hidden  visible scroll
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  dialog: {
    overflow: 'visible', // hidden  visible scroll
    position: 'absolute',
  },

})
