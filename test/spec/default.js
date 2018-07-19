import { equal, deepEqual } from 'zoroaster/assert'
import Context from '../context'
import rexml from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof rexml, 'function')
  },
  'extracts tags'() {
    const c = 'Hello World'
    const xml = `
  <html>
    <div id="1" class="t" contenteditable>${c}</div>
  </html>
  `
    const [{ content, props }] = rexml('div', xml)
    deepEqual(props, {
      contenteditable: true,
      class: 't',
      id: 1,
    })
    equal(content, c)
  },
  'extracts self-closing tags with full tags'() {
    const c = 'Hello World'
    const xml = `
<html>
  <div id="1" class="t" contenteditable />
  <div id="2" class="t">${c}</div>
</html>
`
    const res = rexml('div', xml)
    deepEqual(res, [
      {
        content: '',
        props: {
          contenteditable: true,
          class: 't',
          id: 1,
        },
      },
      {
        content: c,
        props: {
          class: 't',
          id: 2,
        },
      },
    ])
  },
  'extracts tags with new lines'() {
    const c = 'Hello World'
    const xml = `
<html>
  <div
    id="1"
    class="t"
    contenteditable />
  <div id="2" class="t">${c}</div>
</html>
`
    const res = rexml('div', xml)
    deepEqual(res, [
      {
        content: '',
        props: {
          contenteditable: true,
          class: 't',
          id: 1,
        },
      },
      {
        content: c,
        props: {
          class: 't',
          id: 2,
        },
      },
    ])
  },
}

export default T
