'use strict';

module.exports = exports = function(buf) {
  for(var i = 0; i < buf.length; i++) {
    buf.writeInt8(0, 1);
  }
};
