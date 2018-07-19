import { equal, deepEqual } from 'zoroaster/assert'
import Context from '../context'
import rexml from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof rexml, 'function')
  },
  'extracts tags without attributes'() {
    const content = 'Hello World'
    const xml = `<html>${content}</html>`
    const res = rexml('html', xml)
    deepEqual(res, [
      {
        content,
        props: {},
      },
    ])
  },
  'extracts tags without content'() {
    const xml = '<html lang="en"></html>'
    const res = rexml('html', xml)
    deepEqual(res, [
      {
        content: '',
        props: { lang: 'en' },
      },
    ])
  },
  'extracts a tag with attributes and content'() {
    const content = 'Hello World'
    const xml = `
<html>
  <div id="1" class="t" contenteditable>${content}</div>
</html>
  `
    const res = rexml('div', xml)
    deepEqual(res, [
      {
        content,
        props: {
          contenteditable: true,
          class: 't',
          id: 1,
        },
      },
    ])
  },
  'extracts tags with attributes and content'() {
    const content = 'Hello World'
    const xml = `
<html>
  <div id="1" class="t" contenteditable>${content}</div>
  <div id="2" class="t">${content}</div>
</html>
  `
    const res = rexml('div', xml)
    deepEqual(res, [
      {
        content,
        props: {
          contenteditable: true,
          class: 't',
          id: 1,
        },
      },
      {
        content,
        props: {
          class: 't',
          id: 2,
        },
      },
    ])
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
    const content = 'Hello World'
    const xml = `
<html>
  <div
    id="1"
    class="t"
    contenteditable />
  <div id="2" class="t">${content}</div>
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
        content,
        props: {
          class: 't',
          id: 2,
        },
      },
    ])
  },
}

export default T
