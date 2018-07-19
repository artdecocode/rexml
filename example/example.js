/* yarn example/ */
import extractTags from '../src'

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
