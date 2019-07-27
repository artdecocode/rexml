import { deepEqual } from '@zoroaster/assert'
import { extractProps } from '../../src/lib'
import { extractProps as newExtractProps } from '../../src'

const context = {
  att: 'att',
  att2: 'att2',
  value: 'hello',
  number: 100,
}

/** @typedef {context} C */

/** @type {Object.<string, (c: C )>} */
export const new_api = {
  'extracts empty string attributes'({ att, att2 }) {
    const s = `${att}="" ${att2}`
    const res = newExtractProps(s)
    deepEqual(res, {
      [att]: '',
      [att2]: true,
    })
  },
}

/** @type {Object.<string, (c: C )>} */
const T = {
  context,
  'extracts a single attribute'({ att, value }) {
    const s = `${att}="${value}"`
    const res = extractProps(s)
    deepEqual(res, {
      [att]: value,
    })
  },
  'extracts multiple attributes'({ att, att2, value }) {
    const s = `${att}="${value}" ${att2}='${value}'`
    const res = extractProps(s)
    deepEqual(res, {
      [att]: value,
      [att2]: value,
    })
  },
  'extracts multiple attributes w/ inverse quotes'({ att, att2, value }) {
    const v1 = `'${value}'`
    const v2 = `"${value}"`
    const s = `${att}="${v1}" ${att2}='${v2}'`
    const res = extractProps(s)
    deepEqual(res, {
      [att]: v1,
      [att2]: v2,
    })
  },
  'extracts empty attributes'({ att, att2, value }) {
    const s = `${att}="${value}" ${att2}='${value}' test`
    const res = extractProps(s)
    deepEqual(res, {
      [att]: value,
      [att2]: value,
      test: true,
    })
  },
  'extracts attributes with new lines'({ att, att2, value }) {
    const s = `test
${att}="${value}"
${att2}='${value}'`
    const res = extractProps(s)
    deepEqual(res, {
      [att]: value,
      [att2]: value,
      test: true,
    })
  },
  'parses true'({ att }) {
    const s = `${att}="true"`
    const res = extractProps(s)
    deepEqual(res, {
      [att]: true,
    })
  },
  'parses false'({ att }) {
    const s = `${att}="false"`
    const res = extractProps(s)
    deepEqual(res, {
      [att]: false,
    })
  },
  'parses number'({ att, number }) {
    const s = `${att}="${number}"`
    const res = extractProps(s)
    deepEqual(res, {
      [att]: number,
    })
  },
  'does not parse'() {
    const s = 't="false" t1="true" t2="123"'
    const res = extractProps(s, false)
    deepEqual(res, {
      t: 'false',
      t1: 'true',
      t2: '123',
    })
  },
}


export default T
