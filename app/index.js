/**
 * @this rxpicker
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

// popup-dialog - demo
// import PopupDialogDemo from './popupDialog'

// react-native-community/modal
import RNCModal from './rncModal'

// react-native-community/modal 官方 demo
// import ModalTester from './components/react-native-community/modal/demo/ModalTester'

import { IFIphoneX } from 'react-native-rxdialog'

export default class RXPickerDemo extends Component {
  constructor(props) {
    super(props);
    this.state = ({

      showPDdialog: 0,

      singlePickerVisible: false,
      doublePickerVisible: false,
      trailTimPickerVisible: false,
      addressPickerVisible: false,

      addressCodes: '',
      addressNames: '',
    })
  }

  click(action = 0) {
    if (action === 0) {
      this.setState({ singlePickerVisible: true })
    }
    else if (action === 1) {
      this.setState({ doublePickerVisible: true })
    }
    else if (action === 2) {
      this.setState({ trailTimPickerVisible: true })
    }
    else if (action === 3) {
      this.setState({ addressPickerVisible: true })
    }


    else if (action === 4) {
      this.setState({ showPDdialog: 1 })
    }
    else if (action === 5) {
      this.setState({ showPDdialog: 2 })
    }
    else if (action === 5) {
      // this.setState({showPDdialog: 3})
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

  _getDesValue(value) {
    return (
      <View style={styles.desView}>
        <Text style={styles.desText}>{value}</Text>
      </View>
    )
  }


  renderRXDialog() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.tip}>{"react-native-rxpicker"}</Text>
        <ScrollView style={{ flex: 1 }}>
          {this._getTipText('RXDialog extensions', 5)}
          {this._getView('SinglePicker', 0)}
          {this._getView('DoublePicker', 1)}
          {this._getView('trailTimPicker', 2)}
          {this._getView('addressPicker', 3)}
          {this._getDesValue('选择:  ' + (this.state.addressNames || '- - -'))}
          {this._getTipText('popup-dialog extensions')}
          {this._getView('show popup-dialog ...', 4)}
          {this._getTipText('react-native-community/modal extensions')}
          {this._getView('show modal ...', 5)}
          {/* {this._getView('show modal 官方demo', 6)} */}
        </ScrollView>
        <BBSinglePicker
          visible={this.state.singlePickerVisible}
          superCallBack={(index) => {
            console.log('BBSinglePicker superCallBack=>', index)
            this.setState({ singlePickerVisible: false })
          }}
        />
        <BBDoublePicker
          visible={this.state.doublePickerVisible}
          superCallBack={(index) => {
            console.log('BBDoublePicker superCallBack=>', index)
            this.setState({ doublePickerVisible: false })
          }}
        />
        <BBTrailTimePicker
          visible={this.state.trailTimPickerVisible}
          superCallBack={(index) => {
            console.log('BBTrailTimePicker superCallBack=>', index)
            this.setState({ trailTimPickerVisible: false })
          }}
        />
        <BBAddressPicker
          visible={this.state.addressPickerVisible}
          selectValues={this.state.addressCodes}
          onChangeText={(codes, names) => {
            console.log('BBAddressPicker BBAddressPicker =>', codes, names)
            this.setState({
              addressCodes: codes,
              addressNames: names,
            })
          }}
          superCallBack={(index) => {
            console.log('BBAddressPicker superCallBack=>', index)
            this.setState({ addressPickerVisible: false })
          }}
        />
      </View>
    )
  }

  renderPopupDialog() {
    // I haven't started writing yet
    return this.renderRXDialog();
    // return (
    // <PopupDialogDemo
    //   dismiss={()=>{
    //     this.setState({showPDdialog: 0})
    //   }}
    // />
    // )
  }

  renderModal() {
    // I haven't started writing yet
    return (
      <RNCModal
        dismiss={() => {
          this.setState({ showPDdialog: 0 })
        }}
      />
    )
  }

  renderGfModal() {
    // I haven't started writing yet
    return (
      <View />
      // <ModalTester isModalVisible={true} />
    )
  }

  render() {
    const { showPDdialog } = this.state;
    let element = null;
    if (!showPDdialog) {
      element = this.renderRXDialog();
    }
    else if (showPDdialog === 1) {
      element = this.renderPopupDialog();
    }
    else if (showPDdialog === 2) {
      element = this.renderModal();
    }
    else if (showPDdialog === 3) {
      // element = this.renderGfModal();
    }

    return (
      <View style={{ flex: 1, margin: 0, backgroundColor: '#f0f4f7' }}>
        {element}
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
  },
  desView: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'gray',
  },
  desText: {
    fontSize: 10,
    color: 'black',
    lineHeight: 15,
  }
})