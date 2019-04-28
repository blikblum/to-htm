const { compile: hbsToJSX } = require('../handlebars-to-jsx')
const babel = require('@babel/core')
const jsxToHtmBabelPlugin = require('../babel-plugin-transform-jsx-to-htm')
const prettier = require('prettier')

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

  return prettier.format(result, {parser: 'babel'})
}

module.exports = {
  htmTransform
}