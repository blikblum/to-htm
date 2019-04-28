import { compile as hbsToJSX } from '../../handlebars-to-jsx'
import { transform, registerPlugin } from '@babel/standalone'
import prettier from 'prettier/standalone'
import prettierBabel from 'prettier/parser-babylon'
import prettierHtml from 'prettier/parser-html'
import jsxToHtmBabelPlugin from '../../babel-plugin-transform-jsx-to-htm'
import reactToHtmlAttrsBabelPlugin from '../../babel-plugin-transform-react-to-html-attrs'

registerPlugin('jsx-to-htm', jsxToHtmBabelPlugin)
registerPlugin('react-to-html-attrs', reactToHtmlAttrsBabelPlugin)

export const htmTransform = (src, options = {}) => {
  const {sourceType = 'jsx', toJSX, reactAttributes, ...hbsToJSXOptions} = options

  const jsx = sourceType === 'handlebars' ? hbsToJSX(src, hbsToJSXOptions) : src

  if (toJSX) {
    return prettier.format(jsx, {parser: 'babel', plugins: [prettierBabel]})
  }

  const babelPlugins = ['jsx-to-htm']
  if (!reactAttributes) babelPlugins.unshift('react-to-html-attrs')

  const { code } = transform(jsx, {
    plugins: babelPlugins
  })

  return prettier.format(code, {parser: 'babel', plugins: [prettierBabel, prettierHtml]})
}
