import { deepEqual } from 'zoroaster/assert'
import { extractProps } from '../../src/lib'

const context = {
  att: 'att',
  att2: 'att2',
  value: 'hello',
  number: 100,
}

/** @typedef {context} C */

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
}


export default T
