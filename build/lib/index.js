"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractProps = void 0;

var _res = require("./res");

const getPropValue = val => {
  if (val == 'true') return true;
  if (val == 'false') return false;

  if (/^\d+$/.test(val)) {
    return parseInt(val, 10);
  }

  return val;
};
/**
 * Parse the arguments part of an XML element
 * @param {string} s String to extract attributes from
 */


const extractProps = s => {
  const o = {};
  const re = new RegExp(_res.attributeRe.source, 'gu');
  s.replace(re, (match, name, doubleQuoteVal, singleQuoteVal) => {
    const value = singleQuoteVal || doubleQuoteVal;
    const v = value === undefined ? true : value;
    const val = getPropValue(v);
    o[name] = val;
  });
  return o;
};

exports.extractProps = extractProps;
//# sourceMappingURL=index.js.map