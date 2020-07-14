/**
 * 
 * link
 * https://github.com/react-native-community/react-native-modal
 * 
 * @flow
 */


'use strict'
import React, { Component } from 'react'
import {View} from 'react-native'

import Modal from "react-native-modal";

export default class BaseModal extends Component {
  static defaultProps = {
    style: {},

    isVisible: false,
    backdropOpacity: 0.2,

    superCallBack : () => {},
    overClickEnable: true,
  }


  constructor(props) {
    super(props);
    this.state = {
    }
  }

  _superCallBack = () => {
    const {superCallBack} = this.props;
    superCallBack && superCallBack();
  }

  createContentView(){
    // 需要子类去实现
    // throw Error('not implemented yet');
    return (
      <TouchableWithoutFeedback
            onPress={()=>{
              this._superCallBack(-1);
            }
          }>
        <View style={{flex: 1, width: width- 40, height: 80, alignItems: 'center', justifyContent: 'center', marginBottom: 50, backgroundColor: 'white'}}>
          <Text style={{padding:10, fontSize: 16, lineHeight: 20, color: 'red'}}>Override this method with subclasses to implement Component(请用子类覆盖该方法实现UI)</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const {style, ...other} = this.props;
    return(
      <View>
        <Modal
          {...other}
          style={[{margin: 0, alignItems:'flex-start', justifyContent: 'flex-start'},
                  style]} 
          onBackdropPress={this._superCallBack}
          onRequestClose={this._superCallBack}>
            {this.createContentView()}
        </Modal>
      </View>
    )
  }
}