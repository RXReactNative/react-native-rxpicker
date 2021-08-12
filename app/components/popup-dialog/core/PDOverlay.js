/**
 *
 * @flow
 *
 */
import React, { Component } from 'react'
// import { View } from 'react-native';
// import Pup from 'react-native-popup-dialog';

import RXOverlayContentView, { OverlayViewProps } from './RXOverlayContentView'


let _dialog;
export class OverlayView extends Component {
  render() {
    return <RXOverlayContentView ref={e => (_dialog = e)} />
  }
}

export default {
  show: (content: JSX, config: OverlayViewProps) => {
    _dialog.show(content, config)
  },

  dismiss: () => {
    _dialog.dismiss()
  }
}
