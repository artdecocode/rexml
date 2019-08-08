import { inspect } from 'util'
/* start example */
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

/* end example */
console.log(inspect(res, { breakLength: 35, compact: true }))