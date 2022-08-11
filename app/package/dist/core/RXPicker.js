'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import RXPickerStyle from './RXPickerStyle';
import RXScrollPicker from './RXScrollPicker';

export default class RXPicker extends Component {

  constructor(props) {
    super(props);

    this.dismiss = () => {
      const { dismiss } = this.props;
      dismiss && dismiss();
    };

    this.onConfirm = () => {
      const { onConfirm } = this.props;
      onConfirm && onConfirm();
    };
  }

  renderButton(title = '', index = 0) {
    const { leftStyle, rightStyle } = this.props;
    var style = {};
    if (index === 0) {
      style = [styles.btnLeftBar].concat(leftStyle);
    } else {
      style = [styles.btnRightBar].concat(rightStyle);
    }
    return React.createElement(
      TouchableOpacity,
      { activeOpacity: 0.5, onPress: () => {
          index ? this.onConfirm() : this.dismiss();
        } },
      React.createElement(
        Text,
        { style: style },
        title
      )
    );
  }

  render() {
    const _props = this.props,
          { style, headerView, leftTitle, rightTitle, title, titleStyle, LineSeparatorStyle } = _props,
          other = _objectWithoutProperties(_props, ['style', 'headerView', 'leftTitle', 'rightTitle', 'title', 'titleStyle', 'LineSeparatorStyle']);

    let tabBarView = headerView;
    if (!tabBarView || !(tabBarView && React.isValidElement(tabBarView))) {
      tabBarView = React.createElement(
        View,
        { style: styles.tabBarView },
        this.renderButton(leftTitle ? leftTitle : RXPickerStyle.store.btnLeftBar.text, 0),
        React.createElement(
          Text,
          { style: [styles.titleText, titleStyle] },
          title ? title : RXPickerStyle.store.titleText.text
        ),
        this.renderButton(rightTitle ? rightTitle : RXPickerStyle.store.btnRightBar.text, 1)
      );
    }

    return React.createElement(
      View,
      { style: [styles.container, style] },
      tabBarView,
      React.createElement(View, { style: [{ height: 1, backgroundColor: '#f0ebeb' }, LineSeparatorStyle] }),
      React.createElement(RXScrollPicker, other)
    );
  }
}

RXPicker.propTypes = _extends({}, RXScrollPicker.propTypes, {
  headerView: PropTypes.any,
  title: PropTypes.string,
  titleStyle: PropTypes.object, // TextPropTypes.style 需要 react-native-web 支持，故使用object
  leftTitle: PropTypes.string,
  leftStyle: PropTypes.object, // TextPropTypes.style 需要 react-native-web 支持，故使用object
  rightTitle: PropTypes.string,
  rightStyle: PropTypes.object, // TextPropTypes.style 需要 react-native-web 支持，故使用object
  LineSeparatorStyle: PropTypes.object, // TextPropTypes.style 需要 react-native-web 支持，故使用object
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
});
RXPicker.defaultProps = _extends({}, RXScrollPicker.defaultProps, {
  headerView: null,
  dismiss: e => {},
  onConfirm: e => {}
});
const styles = StyleSheet.create({
  container: {
    width: RXPickerStyle.store.container.width,
    alignSelf: 'center'
  },
  tabBarView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: RXPickerStyle.store.tabBarView.height
  },
  btnLeftBar: {
    fontSize: RXPickerStyle.store.btnLeftBar.fontSize,
    color: RXPickerStyle.store.btnLeftBar.color,
    paddingHorizontal: RXPickerStyle.store.btnLeftBar.paddingHorizontal
  },
  btnRightBar: {
    fontSize: RXPickerStyle.store.btnRightBar.fontSize,
    color: RXPickerStyle.store.btnRightBar.color,
    paddingHorizontal: RXPickerStyle.store.btnRightBar.paddingHorizontal
  },
  titleText: {
    flex: 1,
    textAlign: RXPickerStyle.store.titleText.textAlign,
    fontSize: RXPickerStyle.store.titleText.fontSize,
    color: RXPickerStyle.store.titleText.color
  }
});
//# sourceMappingURL=RXPicker.js.map