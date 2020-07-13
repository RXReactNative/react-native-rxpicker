/**
 * @this rxinput
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 该项目 ： 主要 - 提供思路 
 * 
 * 
 * -------------------------------------------
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

// RXDialog
import BBSinglePicker from './components/rxdialog/content/BBSinglePicker'
import BBDoublePicker from './components/rxdialog/content/BBDoublePicker'
import BBTrailTimePicker from './components/rxdialog/content/BBTrailTimePicker'
import BBAddressPicker from './components/rxdialog/content/BBAddressPicker'

import { IFIphoneX } from 'react-native-rxdialog'

export default class RXPickerDemo extends Component {
  constructor(props){
    super(props);
    this.state = ({
      singlePickerVisible: false,
      doublePickerVisible: false,
      trailTimPickerVisible: false,
      addressPickerVisible: false,
    })
  }

  click(action = 0) {
    if (action === 0) {
      this.setState({ singlePickerVisible: true})
    }
    else if (action === 1) {
      this.setState({ doublePickerVisible: true})
    }
    else if (action === 2) {
      this.setState({ trailTimPickerVisible: true})
    }
    else if (action === 3) {
      this.setState({ addressPickerVisible: true})
    }
  }

  _getTipText(title='', top = 30) {
    return(
      <Text style={{height: 20, backgroundColor: 'orange', color: 'black',
                    marginTop: top, textAlign: 'center',
                    fontSize: 14, lineHeight: 20}}>
        {title}
      </Text>
    )
  }

  _getView(title='', action=0) {
    return (
      <TouchableOpacity onPress={()=>{this.click(action)}}>
        <View style={styles.container}>
          <Text style={styles.text}> {title} </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return(
      <View style={{flex: 1, margin: 0, backgroundColor: '#f0f4f7'}}>
        <Text style={styles.tip}>{"react-native-rxpicker"}</Text>
        <ScrollView style={{flex: 1}}>
          {this._getTipText('RXDialog extensions', 5)}
          {this._getView('SinglePicker', 0)}
          {this._getView('DoublePicker', 1)}
          {this._getView('trailTimPicker', 2)}
          {this._getView('addressPicker', 3)}
          {this._getTipText('popup-dialog extensions')}
        </ScrollView>
        <BBSinglePicker 
          visible={this.state.singlePickerVisible}
          superCallBack={(index)=>{
            console.log('BBSinglePicker superCallBack=>', index)
            this.setState({ singlePickerVisible: false })
          }}
        />
        <BBDoublePicker
          visible={this.state.doublePickerVisible}
          superCallBack={(index)=>{
            console.log('BBDoublePicker superCallBack=>', index)
            this.setState({ doublePickerVisible: false })
          }}
        />
        <BBTrailTimePicker
          visible={this.state.trailTimPickerVisible}
          superCallBack={(index)=>{
            console.log('BBTrailTimePicker superCallBack=>', index)
            this.setState({ trailTimPickerVisible: false })
          }}
        />
        <BBAddressPicker
          visible={this.state.addressPickerVisible}
          superCallBack={(index)=>{
            console.log('BBAddressPicker superCallBack=>', index)
            this.setState({ addressPickerVisible: false })
          }}
        />
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