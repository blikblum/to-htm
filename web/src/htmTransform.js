import { compile as hbsToJSX } from 'handlebars-to-jsx'
import { transform, registerPlugin } from '@babel/standalone'
import jsxToHtmBabelPlugin from '../../babel-plugin-transform-jsx-to-htm'

registerPlugin('jsx-to-htm', jsxToHtmBabelPlugin)

export const htmTransform = (src, options = {}) => {
  const {sourceType = 'jsx', ...hbsToJSXOptions} = options

  const jsx = sourceType === 'handlebars' ? hbsToJSX(src, hbsToJSXOptions) : src

  const { code } = transform(jsx, {
    plugins: ['jsx-to-htm']
  })

  return code  
}
