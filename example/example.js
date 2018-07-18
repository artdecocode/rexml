/* yarn example/ */
import extractTags from '../src'

const xml = `
<html>
  <div id="1" class="test" contenteditable>
    Hello World
  </div>
</html>
`

const [{ content, props }] = extractTags('div', xml)

console.log(JSON.stringify({
  content,
  props,
}, null, 2))
