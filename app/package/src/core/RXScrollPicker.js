/**
 * @flow
 */
import rversion from '../utils/rversion'

const RXScrollPicker = rversion(() => {
  return require('./diff_rsp/RXScrollPicker_17_after.js')
}, () => {
  return require('./diff_rsp/RXScrollPicker.js')
})

module.exports =  RXScrollPicker
