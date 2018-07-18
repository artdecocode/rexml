"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rexml;

var _util = require("util");

const LOG = (0, _util.debuglog)('rexml');
/**
 * Simple XML parsing with a regular expression.
 * @param {Config} config Configuration object.
 * @param {string} config.type The type.
 */

async function rexml(config = {}) {
  const {
    type
  } = config;
  LOG('rexml called with %s', type);
  return type;
}
/**
 * @typedef {Object} Config
 * @property {string} type The type.
 */
//# sourceMappingURL=index.js.map