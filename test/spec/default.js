import { equal, deepEqual } from '@zoroaster/assert'
import Context from '../context'
import rexml, { extractProps, extractTagsSpec } from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof rexml, 'function')
  },
  'extractProps is a function'() {
    equal(typeof extractProps, 'function')
  },
  'extracts attributes with > in the value'() {
    const content = 'this is a test>'
    const xml = `<el test="${content}"></el>`
    const res = rexml('el', xml)
    deepEqual(res, [
      {
        content: '',
        props: {
          test: content,
        },
      },
    ])
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
  'extracts xml with various white-spaces'() {
    const xml = `
<html lang = "en"
>
  <div />
  <div
  />
  <div type  =
  " test
  "
  > Hello
World
  </div>
</html>
    `
    const els = rexml('div', xml)
    deepEqual(els, [
      {
        props: {},
        content: '',
      },
      {
        props: {},
        content: '',
      },
      {
        props: { type: ' test\n  ' },
        content: ' Hello\nWorld\n  ',
      },
    ])
  },
}

export default T

export const spec = {
  'extracts xml with various white-spaces'() {
    const xml = `
<html lang = "en"
>
  <div />
  <div
  />
  <div type  =
  " test
  "
  > Hello
World
  </div>
</html>
    `
    const els = extractTagsSpec('div', xml)
    deepEqual(els, [
      {
        props: {},
        content: '',
      },
      {
        props: {},
        content: '',
      },
      {
        props: { type: ' test\n  ' },
        content: ' Hello\nWorld\n  ',
      },
    ])
  },
}


{/* <div
/>
<div type  =
" test
"
> Hello
World
</div> */}
