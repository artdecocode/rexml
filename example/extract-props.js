import { extractProps } from '../src'

const res = extractProps('id="d2" class="example" required')

console.log(JSON.stringify(res, null, 2))
