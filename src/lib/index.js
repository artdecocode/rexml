import { attributeRe } from './res'

const getPropValue = (val) => {
  if (val == 'true') return true
  if (val == 'false') return false
  if (/^\d+$/.test(val)) {
    return parseInt(val, 10)
  }
  return val
}

/**
 * Parse the arguments part of an XML element
 * @param {string} s String to extract attributes from
 */
export const extractProps = (s) => {
  const o = {}
  const re = new RegExp(attributeRe.source, 'gu')
  s.replace(re, (match, name, value) => {
    const v = value === undefined ? true : value
    const val = getPropValue(v)
    o[name] = val
  })
  return o
}
