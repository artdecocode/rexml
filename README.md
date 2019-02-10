# rexml

[![npm version](https://badge.fury.io/js/rexml.svg)](https://npmjs.org/package/rexml)

`rexml` is a Node.js package for simple XML parsing with a regular expression. It's been tested to work for simple use cases.

```sh
yarn add -E rexml
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`rexml(tag: string, string: string): {content, props}[]`](#rexmltag-stringstring-string-content-props)
  * [`extractProps(string: string): Object<string,(boolean|string)>`](#extractpropsstring-string-objectstringbooleanstring)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import rexml from 'rexml'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true" width="15"></a></p>

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
      "id": "d1",
      "class": "example",
      "contenteditable": true
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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true" width="15"></a></p>

### `extractProps(`<br/>&nbsp;&nbsp;`string: string,`<br/>`): Object<string,(boolean|string)>`

Extracts the properties from the attributes part of the tag and returns them as an object.

```javascript
import { extractProps } from 'rexml'

const res = extractProps('id="d2" class="example" required')

console.log(JSON.stringify(res, null, 2))
```

```json
{
  "id": "d2",
  "class": "example",
  "required": true
}
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>
      © <a href="https://artd.eco">Art Deco</a>  
      2019
    </th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif" alt="Tech Nation Visa" />
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks">Tech Nation Visa Sucks</a>
    </th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>