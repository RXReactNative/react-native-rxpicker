/**
 *
 *
 * @flow
 */
'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes, { element } from 'prop-types';
import RXPickerStyle from './RXPickerStyle'
import RXScrollPicker from './RXScrollPicker';

export default class RXPicker extends Component {
  static propTypes = {
    ...RXScrollPicker.propTypes,
    headerView: PropTypes.any,
    title: PropTypes.string,
    titleStyle: PropTypes.object, // TextPropTypes.style 需要 react-native-web 支持，故使用object
    leftTitle: PropTypes.string,
    leftStyle: PropTypes.object,  // TextPropTypes.style 需要 react-native-web 支持，故使用object
    rightTitle: PropTypes.string,
    rightStyle: PropTypes.object, // TextPropTypes.style 需要 react-native-web 支持，故使用object
    LineSeparatorStyle: PropTypes.object, // TextPropTypes.style 需要 react-native-web 支持，故使用object
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
  }
  static defaultProps = {
    ...RXScrollPicker.defaultProps,
    headerView: null,
    dismiss: (e) => { },
    onConfirm: (e) => { },
  }

  constructor(props) {
    super(props);
  }

  dismiss = () => {
    const { dismiss } = this.props;
    dismiss && dismiss();
  }

  onConfirm = () => {
    const { onConfirm } = this.props;
    onConfirm && onConfirm();
  }

  renderButton(title = '', index = 0) {
    let { leftStyle, rightStyle } = this.props;
    var style = {};
    if (index === 0) {
      style = [styles.btnLeftBar].concat(leftStyle);
    } else {
      style = [styles.btnRightBar].concat(rightStyle);
    }
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => { index ? this.onConfirm() : this.dismiss() }}>
        <Text style={style}>{title}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { style, headerView, leftTitle, rightTitle, title, titleStyle, LineSeparatorStyle, ...other } = this.props;

    let tabBarView = headerView
    if (!tabBarView || !(tabBarView && React.isValidElement(tabBarView))) {
      tabBarView = (
        <View style={styles.tabBarView}>
          {this.renderButton(leftTitle ? leftTitle : RXPickerStyle.store.btnLeftBar.text, 0)}
          <Text style={[styles.titleText, titleStyle]}>{title ? title : RXPickerStyle.store.titleText.text}</Text>
          {this.renderButton(rightTitle ? rightTitle : RXPickerStyle.store.btnRightBar.text, 1)}
        </View>
      )
    }

    return (
      <View style={[styles.container, style]}>
        {tabBarView}
        <View style={[{ height: 1, backgroundColor: '#f0ebeb' }, LineSeparatorStyle]} />
        <RXScrollPicker {...other} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: RXPickerStyle.store.container.width,
    alignSelf: 'center',
  },
  tabBarView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: RXPickerStyle.store.tabBarView.height,
  },
  btnLeftBar: {
    fontSize: RXPickerStyle.store.btnLeftBar.fontSize,
    color: RXPickerStyle.store.btnLeftBar.color,
    paddingHorizontal: RXPickerStyle.store.btnLeftBar.paddingHorizontal,
  },
  btnRightBar: {
    fontSize: RXPickerStyle.store.btnRightBar.fontSize,
    color: RXPickerStyle.store.btnRightBar.color,
    paddingHorizontal: RXPickerStyle.store.btnRightBar.paddingHorizontal,
  },
  titleText: {
    flex: 1,
    textAlign: RXPickerStyle.store.titleText.textAlign,
    fontSize: RXPickerStyle.store.titleText.fontSize,
    color: RXPickerStyle.store.titleText.color,
  },
});