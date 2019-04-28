const { compile: hbsToJSX } = require('../handlebars-to-jsx')
const babel = require('@babel/core')
const jsxToHtmBabelPlugin = require('../babel-plugin-transform-jsx-to-htm')

const htmTransform = (src, options = {}) => {
  const {sourceType = 'jsx', ...hbsToJSXOptions} = options
  let result

  try {
    const jsx = sourceType === 'handlebars' ? hbsToJSX(src, hbsToJSXOptions) : src

    result = babel.transform(jsx, {
      plugins: [jsxToHtmBabelPlugin]
    }).code
    
  } catch (error) {
    console.error('  Error: ', error.message || error)
    return false
  }  

  return result  
}

module.exports = {
  htmTransform
}