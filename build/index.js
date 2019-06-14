let mismatch = require('mismatch'); if (mismatch && mismatch.__esModule) mismatch = mismatch.default;
const { extractProps, getPropValue } = require('./lib');
const { attributesRe } = require('./lib/res');
const { attributesRe: simple, attributeRe: simpleAttribute } = require('./lib/res-simple');

const execRes = (re, s) => {
  const res = re.exec(s)
  if (!res) return res
  const [, ...args] = res
  return args
}

/**
 * Extract member elements from an XML string. Numbers and booleans will be parsed into their JS types.
 * @param {string} tag Which tag to extract, e.g., `div`.
 * @param {string} string The XML string.
 * @example
 *
 * const xml = `
<html>
  <div id="1" class="test" contenteditable>
    Hello World
  </div>
</html>
`
 * const [{ content, props }] = extractTag('div', xml)
 * // content: Hello World
 * // props: { id: 1, class: 'test', contenteditable: true }
 */
const extractTags = (tag, string) => {
  const end1 = /\s*\/>/
  const end2 = new RegExp(`>([\\s\\S]+?)?</${tag}>`)
  const re = new RegExp(`<${tag}${simple.source}?(?:${end1.source}|${end2.source})`, 'g')
  const r = []

  const matches = mismatch(re, string, ['attributes', 'v', 'v1', 'v2', 'content'])
  const res = matches.map(({ attributes = '', content = '' }) => {
    const attrs = attributes.replace(/\/$/, '').trim()
    const m = mismatch(simpleAttribute, attrs, ['key', 'val', 'def', 'f'])
    const props = m
      .reduce((acc, { key, val }) => {
        if (!val) {
          acc[key] = true
          return acc
        }
        acc[key] = getPropValue(val)
        return acc
      }, {})
    return { content, props }
  })
  return res
  // return res.reduce((acc, { v1, v2 }) => {
  //   const val = getPropValue(v2)
  //   acc[v1] = val
  //   return acc
  // }, {})
  debugger
  // let t
  // while ((t = execRes(re, string))) {
  //   if (!t.length) continue
  //   const [_p = '', _c = ''] = t
  //   const p = _p.replace(/\/$/, '').trim()
  //   const props = extractProps(p)
  //   const item = {
  //     props,
  //     content: _c,
  //   }
  //   r.push(item)
  // }
  return r
}

module.exports=extractTags


module.exports.extractProps = extractProps