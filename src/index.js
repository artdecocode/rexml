import mismatch from 'mismatch'
import { extractProps as extractPropsSpec, getPropValue } from './lib'
import { attributesRe } from './lib/res'
import { attributesRe as simple, attributeRe as simpleAttribute } from './lib/res-simple'

const execRes = (re, s) => {
  const res = re.exec(s)
  if (!res) return res
  const [, ...args] = res
  return args
}

/**
 * Extract member elements from an XML string. Numbers and booleans will be parsed into their JS types.
 * @param {string|!Array<string>} tag Which tag to extract, e.g., `div`. Can also pass an array of tags, in which case the name of the tag will also be returned.
 * @param {string} string The XML string.
 * @example
 *
 * const xml = `
 * <html>
 *   <div id="1" class="test" contenteditable>
 *     Hello World
 *   </div>
 * </html>
 * `
 * const [{ content, props }] = extractTag('div', xml)
 * // content: Hello World
 * // props: { id: 1, class: 'test', contenteditable: true }
 */
const extractTags = (tag, string) => {
  const tags = Array.isArray(tag) ? tag : [tag]
  const t = tags.join('|')
  const end1 = /\s*\/>/
  const end2 = />([\s\S]+?)?<\/\1>/
  const re = new RegExp(`<(${t})${simple.source}?(?:${end1.source}|${end2.source})`, 'g')

  const matches = mismatch(re, string, ['t', 'a', 'v', 'v1', 'v2', 'c'])
  const res = matches.map(({ 't': tagName, 'a': attributes = '', 'c': content = '' }) => {
    const attrs = attributes.replace(/\/$/, '').trim()
    const props = extractProps(attrs)
    return { content, props, tag: tagName }
  })
  return res
}

/**
 * Extracts the properties from the attributes part of the tag and returns them as an object. It will parse values if not specified otherwise.
 * @param {string} string The attribute part of the tag.
 * @param {boolean} parseValue Whether to transform the value into its value.
 */
export const extractProps = (string, parseValue = true) => {
  const m = mismatch(simpleAttribute, string, ['key', 'val', 'def', 'f'])
  const props = m
    .reduce((acc, { 'key': key, 'val': val }) => {
      if (val === undefined) {
        acc[key] = true
        return acc
      }
      acc[key] = parseValue ? getPropValue(val) : val
      return acc
    }, {})
  return props
}

/**
 * Extract member elements from an XML string using the complex regular expression to match attributes that confirms to the XML spec. Numbers and booleans will be parsed into their JS types.
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
export const extractTagsSpec = (tag, string) => {
  const end1 = /\s*\/>/
  const end2 = new RegExp(`>([\\s\\S]+?)?</${tag}>`)
  const re = new RegExp(`<${tag}${attributesRe.source}?(?:${end1.source}|${end2.source})`, 'gu')
  const r = []

  let t
  while ((t = execRes(re, string))) {
    if (!t.length) continue
    const [_p = '', _c = ''] = t
    const p = _p.replace(/\/$/, '').trim()
    const props = extractProps(p)
    const item = {
      props,
      content: _c,
    }
    r.push(item)
  }
  return r
}

export default extractTags
export { extractPropsSpec }