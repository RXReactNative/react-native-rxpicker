/**
 *
 * @flow
 */
import React, { Component } from 'react';
import Dialog, { DialogProps, ScaleAnimation, SlideAnimation } from 'react-native-popup-dialog';

export interface RXOverlayContentView extends DialogProps {
  type: 'center' | 'bottom';
}

export default class OverlayView extends Component<OverlayViewProps> {

  constructor(props) {
    super(props);
    this.state = {
      content: null,
      visible: false,
      config: {
        type: 'center',
      }
    };
  }
  show = (content, config: OverlayViewProps) => {
    this.setState({
      content,
      config: {
        ...this.state.config,
        ...config,
      },
      visible: true,
    });
  };

  dismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    const { content, config, visible } = this.state;
    const { type, ...others } = config;
    if (type === 'bottom') {
      return (
        <Dialog
          visible={visible}
          width={1}
          containerStyle={{ zIndex: 0, justifyContent: 'flex-end' }}
          rounded={false}
          dialogAnimation={
            new SlideAnimation({
              toValue: 0,
              useNativeDriver: true
            })
          }
          {...others}
        >
          {content}
        </Dialog>
      );
    } else {
      return (
        <Dialog
          visible={visible}
          containerStyle={{ zIndex: 0 }}
          dialogStyle={{ backgroundColor: 'transparent' }}
          width={0.8}
          rounded={true}
          dialogAnimation={
            new ScaleAnimation({
              toValue: 0,
              useNativeDriver: true
            })
          }
          {...others}
        >
          {content}
        </Dialog>
      );
    }
  }
}
