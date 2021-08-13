/**
 * @this rxpicker
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 *
 *
**/

'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import PropTypes from "prop-types";

// popup-dialog
// 1 全局放入组件
import { OverlayView } from './components/popup-dialog/core/PDOverlay'
// 2 控制显示内容、关闭显示
import PDOverlay from './components/popup-dialog/core/PDOverlay'

// popup-dialog views
import AASinglePicker from './components/popup-dialog/content/AASinglePicker'

import { IFIphoneX } from 'react-native-rxdialog'

export default class PopupDialogDemo extends Component {
  static propTypes = {
    ...View.propTypes,
    dismiss: PropTypes.func,
  }

  static defaultProps = {
    ...View.defaultProps,
    dismiss: () => { },
  }


  constructor(props) {
    super(props);
    this.state = ({
    })
  }

  click(action = 0) {
    if (action === 0) {
      const { dismiss } = this.props;
      dismiss && dismiss();
    }
    else if (action === 1) {
      PDOverlay.show(
        <AASinglePicker />,
        {
          type: 'bottom',
          onTouchOutside: () => {
            PDOverlay.dismiss();
          }
        }
      )
    }
    else if (action === 2) {

    }
    else if (action === 3) {

    }
  }

  _getTipText(title = '', top = 30) {
    return (
      <Text style={{
        height: 20, backgroundColor: 'orange', color: 'black',
        marginTop: top, textAlign: 'center',
        fontSize: 14, lineHeight: 20
      }}>
        {title}
      </Text>
    )
  }

  _getView(title = '', action = 0) {
    return (
      <TouchableOpacity onPress={() => { this.click(action) }}>
        <View style={styles.container}>
          <Text style={styles.text}> {title} </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f0f4f7' }}>
        <Text style={styles.tip}>{"react-native-rxpicker"}</Text>
        <ScrollView style={{ flex: 1 }}>
          {this._getTipText('RXDialog extensions', 5)}
          {this._getView('show RXDialog ...', 0)}
          {this._getTipText('popup-dialog extensions')}
          {this._getView('SinglePicker', 1)}
          {this._getView('DoublePicker', 2)}
          {this._getView('trailTimPicker', 3)}
          {this._getView('addressPicker', 4)}
          {this._getView('picker', 5)}
        </ScrollView>

        {/* 这个可以放入 项目入口, 不用每个页面 放入 */}
        <OverlayView />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tip: {
    paddingVertical: 20,
    fontSize: 24,
    color: 'blue',
    paddingTop: IFIphoneX(40, 10, 10),
    lineHeight: 30,
    textAlign: 'center',
    backgroundColor: 'orange',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    height: 40,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    color: 'blue',
    lineHeight: 30,
  }
})