import { debuglog } from 'util'

const LOG = debuglog('rexml')

/**
 * Simple XML parsing with a regular expression.
 * @param {Config} config Configuration object.
 * @param {string} config.type The type.
 */
export default async function rexml(config = {}) {
  const {
    type,
  } = config
  LOG('rexml called with %s', type)
  return type
}

/**
 * @typedef {Object} Config
 * @property {string} type The type.
 */
