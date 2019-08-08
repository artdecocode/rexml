import { inspect } from 'util'
/* start example */
import extractTags from '../src'

const xml = `<html>
  <div id="d1"/>
  <div id="d2" class="example">Hello World</div>
  <footer>Art Deco, 2019</footer>
</html>
`

const res = extractTags(['div', 'footer'], xml)

/* end example */
console.log(inspect(res, { breakLength: 35, compact: true }))