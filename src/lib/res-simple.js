const nameRe = /([^\s>=/]+)/
const valRe = /(?:"([\s\S]*?)"|'([\s\S]*?)')/

export const attributeRe = new RegExp(`${nameRe.source}(?:\\s*=\\s*${valRe.source})?`, 'g')

/**
 * This regex will match all attributes as a string inside of element, e.g., matching `<el attr="abc" bool/>` will result in `attr="abc" bool`.
 */
export const attributesRe = new RegExp(`\\s*((?:${attributeRe.source}\\s*)*)`)
