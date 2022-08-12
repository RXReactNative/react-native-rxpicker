/**
 * @flow
 */
"use strict"
import React from "react"

const rversion = function(lib1, lib2) {
  const v = React.version || ''

  function diffv() {
    if (v === '') {
      return false
    }
    const va = v.split('.') || ['', '']
    const v1 = va[0]
    const v2 = va[1]
    if (v1 === '') {
      return false
    }
    const pv1 = parseInt(v1) || 0
    const pv2 = parseInt(v2) || 0
    if (pv1 > 16) {
      return true
    } else if (pv1 === 16 && pv2 >= 3) {
      return true
    }
    return false
  }

  function fn(f) {
    if (f && typeof f === 'function') {
      return f()
    }
    return null
  }

  if (diffv() === true) {
    return fn(lib1)
  } else {
    return fn(lib2)
  }
}

module.exports = rversion
