"use strict";

import React from "react";

const v = React.version || '';

function diffv() {
  if (v === '') {
    return false;
  }
  const va = v.split('.') || [''];
  const v1 = va[0];
  if (v1 === '') {
    return false;
  }
  if (parseInt(v1) >= 17) {
    return true;
  }
  return false;
}

if (diffv() === true) {
  module.exports = require('./diff_rsp/RXScrollPicker_17_after.js');
} else {
  module.exports = require('./diff_rsp/RXScrollPicker.js');
}
//# sourceMappingURL=RXScrollPicker.js.map