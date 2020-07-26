import React from 'react'
import {
  View,
} from 'react-native'

import BaseModal from '../core/BaseModal';
import { DeviceWidth, DeviceHeight } from 'react-native-rxdialog'
const width = DeviceWidth;

// 本地 采用
import {
  RXDate,
  RXSinglePicker,
 } from '../../../../package/index'


// node_modules 采用
// import {
//   // ...
// } from 'react-native-rxpicker'

export default class CCSinglePicker extends BaseModal {
  static defaultProps = {
    ...BaseModal.defaultProps,
    transparent: true,
    deviceHeight: DeviceWidth,
    deviceWidth: DeviceHeight,
    hideModalContentWhileAnimating: true,

    // 不能配合
    // animationIn: 'bounceOutUp',
    // animationOut: 'bounceOutDown',

    // "bounce" | "flash" | "jello" | "pulse" | "rotate" | "rubberBand" | 
    // "shake" | "swing" | "tada" | "wobble" | "bounceIn" | "bounceInDown" |
    // "bounceInUp" | "bounceInLeft" | "bounceInRight" | "bounceOut" | 
    // "bounceOutDown" | "bounceOutUp" | "bounceOutLeft" | "bounceOutRight" |

    // "fadeIn" | "fadeInDown" | "fadeInDownBig" | "fadeInUp" | "fadeInUpBig" |
    // "fadeInLeft" | "fadeInLeftBig" | "fadeInRight" | "fadeInRightBig" |
    // "fadeOut" | "fadeOutDown" | "fadeOutDownBig" | "fadeOutUp" |
    // "fadeOutUpBig" | "fadeOutLeft" | "fadeOutLeftBig" | "fadeOutRight" |
    // "fadeOutRightBig" | "flipInX" | "flipInY" | "flipOutX" | "flipOutY" |

    // "lightSpeedIn" | "lightSpeedOut" |
    // "slideInDown" | "slideInUp" | "slideInLeft" | "slideInRight" |
    // "slideOutDown" | "slideOutUp" | "slideOutLeft" | "slideOutRight" |
    
    //"zoomIn" | "zoomInDown" | "zoomInUp" | "zoomInLeft" | "zoomInRight" |
    // "zoomOut" | "zoomOutDown" | "zoomOutUp" | "zoomOutLeft" | "zoomOutRight"
  }

  constructor(props) {
    super(props);
    this.state = ({
      selectValue: '00:00',
    })
  }

  createContentView() {
    const { onChangeText } = this.props;
    const {selectValue} = this.state;
    return (
      <View style={{width}}>
        <RXSinglePicker
          style={{flex:1}}
          title={'时间选择'}
          list={ RXDate.RXADay24Hours(true) }
          selectValue={selectValue}
          dismiss={()=> this._superCallBack()}
          onConfirm={(result) => { // 按照 需求自定义
            console.log('BBSinglePicker result=>', result)
            if (result === selectValue) {return;}
            this.setState({
              selectValue: result
            })
            onChangeText && onChangeText(result)
            this._superCallBack()
          }}
        />
      </View>
    )
  }
}