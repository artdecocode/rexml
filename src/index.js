const execRes = (re, s) => {
  const res = re.exec(s)
  if (!res) return res
  const [, ...args] = res
  return args
}

const extractProps = (s) => {
  const propsRe = /(\w+)="(.*?)"/g
  let t
  const r = []
  while ((t = propsRe.exec(s)) !== null) {
    const [, key, value] = t
    r.push({
      key,
      value: getPropValue(value),
    })
  }
  const tt = s.replace(propsRe, '').trim().split(' ')
    .filter(a => a)
    .reduce((a, k) => ({ ...a, [k]: true }), {})
  return r.reduce((acc, { key, value }) => ({
    ...acc,
    [key]: value,
  }), tt)
}

const getPropValue = (val) => {
  if (val == 'true') return true
  if (val == 'false') return false
  if (/^\d+$/.test(val)) {
    return parseInt(val, 10)
  }
  return val
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
export const extractTags = (tag, string) => {
  const re = new RegExp(`<${tag}( .[^>]+)?(?: /)?>(?:([\\s\\S]+?)</${tag}>)?`, 'g')
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
