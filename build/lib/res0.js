const nameRe = /[\p{L}_][\p{L}.\d_-]*/u
const valRe = /(?:"([\s\S]*?)"|'([\s\S]*?)')/

       const attributeRe = new RegExp(`(${nameRe.source})(?:\\s*=\\s*${valRe.source})?`, 'u')

const ar = attributeRe.source.replace(/\(\[/g, '(?:[') // don't need to capture

/**
 * This regex will match all attributes as a string inside of element, e.g., matching `<el attr="abc" bool/>` will result in `attr="abc" bool`.
 */
       const attributesRe = new RegExp(`\\s*((?:${ar}\\s*)*)`, 'u')


module.exports.attributeRe = attributeRe
module.exports.attributesRe = attributesRe