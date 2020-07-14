import React from 'react'
import {
  View,
  Text,
} from 'react-native'

import BaseModal from '../core/BaseModal';

export default class CCSinglePicker extends BaseModal {
  static defaultProps = {
    transparent: true,
    animationType: 'slide',
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  createContentView() {
    return (
      <View>
        <Text>11212</Text>
        <Text>11212</Text>
        <Text>11212</Text>
        <Text>11212</Text>
      </View>
    )
  }
}