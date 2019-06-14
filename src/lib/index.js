import { attributeRe } from './res'

export const getPropValue = (val) => {
  if (val == 'true') return true
  if (val == 'false') return false
  if (/^\d+$/.test(val)) {
    return parseInt(val, 10)
  }
  return val
}

/**
 * Parse the arguments part of an XML element
 * @param {string} string String to extract attributes from.
 * @param {boolean} parseValue Parse `true` and `false` values into a boolean, and numbers into integers. Default `true`.
 */
export const extractProps = (string, parseValue = true) => {
  const o = {}
  const re = new RegExp(attributeRe.source, 'gu')
  string.replace(re, (match, name,  doubleQuoteVal, singleQuoteVal) => {
    const value = singleQuoteVal || doubleQuoteVal
    const v = value === undefined ? true : value
    const val = parseValue ? getPropValue(v) : v
    o[name] = val
  })
  return o
}
