import { resolve } from 'path'
import { debuglog } from 'util'

const LOG = debuglog('rexml')

const FIXTURE = resolve(__dirname, '../fixture')

/**
 * A testing context for the package.
 */
export default class Context {
  async _init() {
    LOG('init context')
  }
  /**
   * Extract matches from the string using `replace` and return an object with keys.
   * @param {string} s String to find matches in
   * @param {RegExp} re Regular Expression
   * @param {string[]} keys The sequence of keys corresponding to the matches.
   * @return {Object.<string, string>} The parsed matches in a hash.
   * @example
   *
   * export default {
   *  context: Context,
   *  async 'matches the badge snippet'({ getMatches }) {
   *    const p = 'documentary'
   *    const g = `%NPM: ${p}%`
   *    const { pack } = getMatches(g, badgeRe, ['pack'])
   *    equal(pack, p)
   *  },
   * }
   */
  getMatches(s, re, keys) {
    const m = []
    s.replace(re, (match, ...args) => {
      const o = {}
      const p = args.slice(0, args.length - 2)
      for (let i = 0; i < p.length; i++) {
        const a = p[i]
        const c = keys[i]
        if (c && a) o[c] = a
      }
      m.push(o)
    })
    return m
  }
  /**
   * Example method.
   */
  example() {
    return 'OK'
  }
  /**
   * Path to the fixture file.
   */
  get FIXTURE() {
    return resolve(FIXTURE, 'test.txt')
  }
  get SNAPSHOT_DIR() {
    return resolve(__dirname, '../snapshot')
  }
  async _destroy() {
    LOG('destroy context')
  }
}
