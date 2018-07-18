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
}

export default T
