/**
 *
 * 参考：
 *  beeshell - ScrollPicker -->  https://github.com/Meituan-Dianping/beeshell
 * 
 */
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from "react";
import { StyleSheet, View, Text, PixelRatio, ScrollView } from "react-native";

import PropTypes from 'prop-types';
import { RXConfigArray } from '../../utils/RXUtils';
import RXPickerStyle from '../RXPickerStyle';

const px = 1 / PixelRatio.get();
const DEFAULT_CONTAINER_HEIGHT = 1;

const variables = {
  mtdBorderColorDark: RXPickerStyle.store.mtdBorderColorDark || "#e5e5e5",
  mtdVSpacingL: RXPickerStyle.store.mtdVSpacingL || 10
};

export default class RXScrollPicker extends Component {

  constructor(props) {
    super(props);

    const data = this.initialize(props);
    this.state = _extends({}, data, {
      targetItemHeight: null,
      containerHeight: null
    });
    this.containerRef = null;
    this.scrollers = [];
    this.targetItemHeight = null;
    this.containerHeight = null;
    this.containerRef = null;
  }

  initialize(props) {
    let { list, proportion, value } = props;
    if (!list || !list.length) {
      throw TypeError("提供有效的 list 参数");
    }
    const { offsetCount } = this.props;
    const placeholderList = RXConfigArray(offsetCount).map(() => {
      return "";
    });
    list = list.map(scrollItem => {
      const tmp = scrollItem.concat();
      [].push.apply(tmp, placeholderList);
      [].unshift.apply(tmp, placeholderList);
      return tmp;
    });
    const length = list.length;
    if (!proportion || !proportion.length || proportion && proportion.length && proportion.length !== length) {
      proportion = RXConfigArray(length).map(() => {
        return 1;
      });
    }
    if (!value || !value.length || value && value.length && value.length !== length) {
      value = RXConfigArray(length).map(() => {
        return 0;
      });
    }
    return {
      list,
      value,
      proportion
    };
  }

  componentDidMount() {
    this.getUIData(this.containerRef, DEFAULT_CONTAINER_HEIGHT).then(data => {
      const { targetItemHeight } = data;
      const containerHeight = this.resizeContainerHeight(targetItemHeight);
      this.setState({
        containerHeight,
        targetItemHeight
      }, () => {
        this.getUIData(this.containerRef, this.state.containerHeight).then(uiData => {
          const { value } = this.state;
          value.forEach((item, index) => {
            this.scrollTo(index, item, false);
          });
        }).catch(e => {
          console.log(e);
        });
      });
    }).catch(e => {
      console.log(e);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      const data = this.initialize(nextProps);
      this.setState(_extends({}, data), () => {
        setTimeout(() => {
          const { value } = this.state;
          value.forEach((item, index) => {
            this.scrollTo(index, item);
          });
        });
      });
    }
  }

  getUIData(element, accurateHeight, maxCount) {
    let count = 0;
    maxCount = maxCount == null ? 20 : maxCount;
    return new Promise((resolve, reject) => {
      let toCheck = null;
      let measure = () => {
        let ret = null;
        element.measure((x, y, width, height, left, top) => {
          // console.log(
          //   `Get container height: ${height}, accurate height: ${accurateHeight} and target item height: ${
          //     this.targetItemHeight
          //   } for ${++count}th.`
          // )
          if (height) {
            // 安卓机器获取高度不精确
            const needToReset = height % 1 === 0 ? false : true;
            let minHeight;
            let maxHeight;
            if (needToReset) {
              minHeight = Math.floor(height);
              maxHeight = minHeight + 1;
            } else {
              minHeight = maxHeight = height;
            }
            if ((minHeight === accurateHeight || maxHeight === accurateHeight) && this.targetItemHeight) {
              ret = {
                rect: {
                  x,
                  y,
                  width,
                  height
                },
                targetItemHeight: this.targetItemHeight
              };
            }
          }
          toCheck(ret);
        });
      };
      toCheck = ret => {
        if (ret) {
          return resolve(ret);
        } else {
          if (count < maxCount) {
            setTimeout(() => {
              measure();
            }, 20);
          } else {
            return reject('获取元素高度失败！');
          }
        }
      };
      measure();
    });
  }

  resizeContainerHeight(targetItemHeight) {
    const { offsetCount } = this.props;
    const ret = targetItemHeight + 2 * (targetItemHeight * offsetCount);
    return ret;
  }

  locateIndicator(targetItemHeight) {
    const { offsetCount } = this.props;
    return React.createElement(View, {
      style: [styles.indicator],
      pointerEvents: 'none'
    }, React.createElement(View, {
      style: [styles.indicator, styles.indicatorMask, {
        bottom: targetItemHeight + offsetCount * targetItemHeight
      }, {
        borderBottomWidth: 1 * px,
        borderBottomColor: variables.mtdBorderColorDark
      }]
    }), React.createElement(View, {
      style: [styles.indicator, styles.indicatorMask, {
        top: targetItemHeight + offsetCount * targetItemHeight
      }, {
        borderTopWidth: 1 * px,
        borderTopColor: variables.mtdBorderColorDark
      }]
    }));
  }

  scrollTo(scrollIndex, targetItemIndex, animated) {
    const { targetItemHeight } = this.state;
    // const { offsetCount } = this.props
    this.scrollProper(scrollIndex, targetItemHeight * targetItemIndex, animated);
  }

  onScroll(scrollIndex, scrollHeight) {
    const targetItemIndex = this.scrollProper(scrollIndex, scrollHeight);
    this.props.onChange && this.props.onChange(scrollIndex, targetItemIndex);
  }

  scrollProper(scrollIndex, scrollHeight, animated) {
    const { targetItemHeight, list } = this.state;
    const { offsetCount } = this.props;
    const scrollListLength = list[scrollIndex].length;
    let newScrollHeight;
    const min = 0;
    const max = (scrollListLength - 2 * offsetCount - 1) * targetItemHeight;
    if (scrollHeight <= min) {
      newScrollHeight = min;
    } else if (scrollHeight >= max) {
      newScrollHeight = max;
    } else {
      const quotient = parseInt(String(scrollHeight / targetItemHeight), 10);
      newScrollHeight = quotient * targetItemHeight;
      const halfHeight = targetItemHeight / 2;
      if (scrollHeight - newScrollHeight > halfHeight) {
        newScrollHeight += targetItemHeight;
      }
    }
    this.scrollers[scrollIndex] && this.scrollers[scrollIndex].scrollTo && this.scrollers[scrollIndex].scrollTo({
      x: 0,
      y: newScrollHeight,
      animated: animated === false ? false : true
    });
    const targetItemIndex = newScrollHeight / targetItemHeight;
    return targetItemIndex;
  }

  render() {
    const { list, proportion, containerHeight, targetItemHeight } = this.state;
    return React.createElement(View, {
      ref: el => {
        this.containerRef = el;
      },
      style: [styles.container, this.props.contentStyle, {
        height: containerHeight || DEFAULT_CONTAINER_HEIGHT
      }]
    }, containerHeight && this.locateIndicator(targetItemHeight), list.map((scrollItem, scrollIndex) => {
      return React.createElement(View, {
        key: scrollIndex,
        style: [styles.proportionWrapper, {
          flex: Number(proportion[scrollIndex])
        }]
      }, React.createElement(ScrollView, {
        ref: c => {
          this.scrollers[scrollIndex] = c;
        },
        style: styles.scroller,
        scrollEventThrottle: 20,
        showsVerticalScrollIndicator: false,
        contentContainerStyle: [styles.scrollerContentContainer],
        // onScrollEndDrag: (e) => { // 由于 react-native-web 版本不同，有的不支持
        //   this.onScroll(scrollIndex, e.nativeEvent.contentOffset.y);
        // },
        onScroll: e => {
          this.onScroll(scrollIndex, e.nativeEvent.contentOffset.y);
        }
      }, scrollItem.map((item, index) => {
        return React.createElement(View, {
          key: index,
          style: [styles.targetItem, {
            height: targetItemHeight
          }],
          onLayout: e => {
            if (item && this.targetItemHeight == null && e.nativeEvent.layout.height) {
              this.targetItemHeight = Math.ceil(e.nativeEvent.layout.height);
              // console.log(
              //   'OnLayout get target item height:',
              //   this.targetItemHeight
              // )
            }
          }
        }, this.props.renderItem ? this.props.renderItem(item, index) : React.createElement(Text, {
          style: [styles.targetItemContent],
          numberOfLines: 1
        }, typeof item === 'object' ? item.label : item));
      })));
    }));
  }
}

RXScrollPicker.propTypes = _extends({}, View.propTypes, {
  // 选择数据源，二维数组，第一层代表列，第二层代表选择项，选择项数据可以是对象（必须包含 label 属性）或者 string、number
  list: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.string, PropTypes.number]))),
  // 选中的数据，一维数组，数组索引代表 list 列，数组值对应 list 行，所以其长度要和数据源 list 长度一致
  value: PropTypes.arrayOf(PropTypes.number),
  // 分区比例，注意和数据源长度保持一致
  proportion: PropTypes.arrayOf(PropTypes.number),
  // 选中项距离顶部的偏移个数
  offsetCount: PropTypes.number,
  // 自定义渲染项
  renderItem: PropTypes.func,
  // 数据变化回调，该函数提供两个索引参数，第一个是列索引，第二个是行索引
  onChange: PropTypes.func
});
RXScrollPicker.defaultProps = _extends({}, View.defaultProps, {
  // renderItem: (e)=> { return null },
  onChange: (scrollIndex = 0, targetItemIndex = 0) => {}
});
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  proportionWrapper: {
    flexDirection: 'column'
  },
  scroller: {
    flex: 1
  },
  scrollerContentContainer: {
    alignItems: 'center'
  },
  targetItem: {
    flexDirection: 'row',
    alignItems: "center"
  },
  targetItemContent: {
    flex: 1,
    paddingVertical: variables.mtdVSpacingL,
    textAlign: "center"
  },
  indicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  indicatorMask: {
    backgroundColor: "rgba(255, 255, 255, 0.75)"
  },
  indicatorTarget: {}
});
//# sourceMappingURL=RXScrollPicker.js.map