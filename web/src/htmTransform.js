import { compile as hbsToJSX } from '../../handlebars-to-jsx'
import { transform, registerPlugin } from '@babel/standalone'
import prettier from 'prettier/standalone'
import prettierBabel from 'prettier/parser-babylon'
import prettierHtml from 'prettier/parser-html'
import jsxToHtmBabelPlugin from '../../babel-plugin-transform-jsx-to-htm'

registerPlugin('jsx-to-htm', jsxToHtmBabelPlugin)

export const htmTransform = (src, options = {}) => {
  const {sourceType = 'jsx', toJSX, ...hbsToJSXOptions} = options

  const jsx = sourceType === 'handlebars' ? hbsToJSX(src, hbsToJSXOptions) : src

  if (toJSX) {
    return prettier.format(jsx, {parser: 'babylon', plugins: [prettierBabel]})
  }

  const { code } = transform(jsx, {
    plugins: ['jsx-to-htm']
  })

  return prettier.format(code, {parser: 'babylon', plugins: [prettierBabel, prettierHtml]})
}
