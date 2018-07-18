import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import rexml from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof rexml, 'function')
  },
  async 'calls package without error'() {
    await rexml()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await rexml({
      type: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T
