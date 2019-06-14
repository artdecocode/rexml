import { extractProps, extractPropsSpec } from '../src'

const s = `id="d2"
class="example"
value="123"
parsable="true"
ignore="false"
2-non-spec
required`

const res = extractProps(s)
console.log(JSON.stringify(res, null, 2))

// don't parse booleans and integers
const res2 = extractProps(s, false)
console.log(JSON.stringify(res2, null, 2))

// conform to the spec
const res3 = extractPropsSpec(s)
console.log(JSON.stringify(res3, null, 2))