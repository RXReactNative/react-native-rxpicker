/**
 *
 * @flow
 */
'use strict'
import React from 'react';
import { Button, Text, View } from 'react-native';
import Modal from 'react-native-modal';

export default class ModalTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      isModalVisible: false
    })
  }

  toggleModal = () => {
    const isModalVisible = !this.state.isModalVisible;
    this.setState({ isModalVisible })
  }

  render() {
    const { isModalVisible } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Button title="Show modal" onPress={this.toggleModal} />

        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>Hello!</Text>

            <Button title="Hide modal" onPress={this.toggleModal} />
          </View>
        </Modal>
      </View>
    );
  }
}