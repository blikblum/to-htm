const { compile: hbsToJSX } = require('handlebars-to-jsx')
const babel = require('@babel/core')
const jsxToHtmBabelPlugin = require('babel-plugin-transform-jsx-to-htm')

const htmTransform = (src, options = {}) => {
  const {srcType = 'jsx', ...hbsToJSXOptions} = options

  const jsx = srcType === 'handlebars' ? hbsToJSX(src, hbsToJSXOptions) : src

  const { code } = babel.transform(jsx, {
    plugins: [jsxToHtmBabelPlugin]
  })

  return code  
}

module.exports = {
  htmTransform
}