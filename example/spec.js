import { extractTagsSpec } from '../src'

const xml = `
<html>
  <div id="d1" class="example" contenteditable />
  <div 5-non-spec>Attributes cannot start with a number.</div>
</html>`

const res = extractTagsSpec('div', xml)

console.log(JSON.stringify(res, null, 2))