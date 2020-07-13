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

import BBSinglePicker from './components/rxdialog/content/BBSinglePicker'

import { IFIphoneX } from 'react-native-rxdialog'

export default class RXPickerDemo extends Component {
  constructor(props){
    super(props);
    this.state = ({
      singlePickerVisible: false,
    })
  }

  click(action = 0) {
    if(action === 0) {
      this.setState({ singlePickerVisible: true})
    }
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
      <View style={{flex: 1, backgroundColor: '#f0f4f7'}}>
        <Text style={styles.tip}>{"react-native-rxpicker"}</Text>
        <ScrollView style={{flex: 1}}>
          {this._getView('SinglePicker', 0)}
        </ScrollView>
        <BBSinglePicker 
          visible={this.state.singlePickerVisible}
          superCallBack={(index)=>{
            console.log('superCallBack=>', index)
            this.setState({ singlePickerVisible: false })
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