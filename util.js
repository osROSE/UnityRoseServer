'use strict';

module.exports.toHex = function(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
}

module.exports.toHex32 = function(d) {
  var hex = Number(d).toString(16);
  hex = "00000000".substr(0, 8 - hex.length) + hex; 
  return hex;

}