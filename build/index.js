const { extractProps } = require('./lib');;
const { attributesRe } = require('./lib/res');;

const execRes = (re, s) => {
  const res = re.exec(s);
  if (!res) return res;
  const [, ...args] = res;
  return args;
};
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
  const end1 = /\s*\/>/;
  const end2 = new RegExp(`>([\\s\\S]+?)?</${tag}>`);
  const re = new RegExp(`<${tag}${attributesRe.source}?(?:${end1.source}|${end2.source})`, 'gu');
  const r = [];
  let t;

  while (t = execRes(re, string)) {
    if (!t.length) continue;
    const [_p = '', _c = ''] = t;

    const p = _p.replace(/\/$/, '').trim();

    const props = extractProps(p);
    const item = {
      props,
      content: _c
    };
    r.push(item);
  }

  return r;
};

module.exports=extractTags;
;

module.exports.extractProps = extractProps