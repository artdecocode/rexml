# rexml

[![npm version](https://badge.fury.io/js/rexml.svg)](https://npmjs.org/package/rexml)

`rexml` is a Node.js package for simple XML parsing with a regular expression. It's been tested to work for simple use cases.

```sh
yarn add -E rexml
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`rexml(tag: string, string: string): {content, props}[]`](#rexmltag-stringstring-string-content-props)

## API

The package is available by importing its default function:

```js
import rexml from 'rexml'
```

### `rexml(`<br/>&nbsp;&nbsp;`tag: string,`<br/>&nbsp;&nbsp;`string: string,`<br/>`): {content, props}[]`

Extract tags from the XML string. The tags are returned as an array with objects containing `content` and `props` properties. The content is the inner content of the tag, and `props` is the attributes specified inside the tag.

```javascript
/* yarn example/ */
import extractTags from 'rexml'

const xml = `
<html>
  <div id="d1"
    class="example"
    contenteditable />
  <div id="d2" class="example">Hello World</div>
</html>
`

const res = extractTags('div', xml)

console.log(JSON.stringify(res, null, 2))
```

```json
[
  {
    "props": {
      "contenteditable": true,
      "id": "d1",
      "class": "example"
    },
    "content": ""
  },
  {
    "props": {
      "id": "d2",
      "class": "example"
    },
    "content": "Hello World"
  }
]
```

---

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz
