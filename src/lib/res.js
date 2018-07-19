export const attributeRe = /([\p{L}_][\p{L}.\d_-]*)(?:\s*=\s*["']([\s\S]*?)["'])?/u

const ar = attributeRe.source.replace(/\(\[/g, '(?:[') // don't need to capture
export const attributesRe = new RegExp(`\\s*((?:${ar}\\s*)*)`, 'u')
