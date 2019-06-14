import { equal, deepEqual } from '@zoroaster/assert'
import Context from '../context'
import { attributeRe, attributesRe } from '../../src/lib/res'

const c = {
  att: 'att',
  att2: 'att2',
  value: 'hello',
}

/** @typedef {c} C */

/** @type {Object.<string, (c: Context, a: C )>} */
const T = {
  context: [Context, c],
  'matches attribute by "'({ getMatches }, { att, value }) {
    const s = `${att}="${value}"`
    const res = getMatches(s, attributeRe, ['att', 'value'])
    deepEqual(res, [{
      att,
      value,
    }])
  },
  'matches attribute by " with \''({ getMatches }, { att, value }) {
    const v = `'${value}'`
    const s = `${att}="${v}"`
    const res = getMatches(s, attributeRe, ['att', 'value'])
    deepEqual(res, [{
      att,
      value: v,
    }])
  },
  'matches attribute by \''({ getMatches }, { att, value }) {
    const s = `${att}='${value}'`
    const res = getMatches(s, attributeRe, ['att', '_', 'value'])
    deepEqual(res, [{
      att,
      value,
    }])
  },
  'matches attribute with >'({ getMatches }, { att, value }) {
    const v = `${value} >`
    const s = `${att}="${v}"`
    const res = getMatches(s, attributeRe, ['att', 'value'])
    deepEqual(res, [{
      att,
      value: v,
    }])
  },
  'matches attribute without a value'({ getMatches }, { att }) {
    const s = `${att}`
    const res = getMatches(s, attributeRe, ['att'])
    deepEqual(res, [{
      att,
    }])
  },
  'matches attribute with new line'({ getMatches }, { att, value }) {
    const v = `${value}
${value}`
    const s = `${att}="${v}"`
    const res = getMatches(s, attributeRe, ['att', 'value'])
    deepEqual(res, [{
      att,
      value: v,
    }])
  },
  'matches attribute with new line in assignment'({ getMatches }, { att, value }) {
    const v = `${value}
${value}`
    const s = `${att}
    = "${v}"`
    const res = getMatches(s, attributeRe, ['att', 'value'])
    deepEqual(res, [{
      att,
      value: v,
    }])
  },
}

/** @type {Object.<string, (c: Context, a: C )>} */
export const Attributes = {
  context: [Context, c],
  'matches multiple attributes'({ getMatches }, { att, att2, value } ) {
    const s = `${att}="${value}" ${att2}='${value}'`
    const [{ attributes }] = getMatches(s, attributesRe, ['attributes'])
    equal(attributes, s)
  },
  'matches multiple attributes with \'>\''({ getMatches }, { att, att2, value } ) {
    const v = `${value} >`
    const s = `${att}="${v}" ${att2}='${v}'`
    const [{ attributes }] = getMatches(s, attributesRe, ['attributes'])
    equal(attributes, s)
  },
  'matches multiple attributes with new line'({ getMatches }, { att, att2, value } ) {
    const v = `${value} >`
    const s = `${att}="${v}"
${att2}='${v}'`
    const [{ attributes }] = getMatches(s, attributesRe, ['attributes'])
    equal(attributes, s)
  },
}

export default T
