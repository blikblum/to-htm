import { compile as hbsToJSX } from 'handlebars-to-jsx'
import { transform, registerPlugin } from '@babel/standalone'
import jsxToHtmBabelPlugin from '../../babel-plugin-transform-jsx-to-htm'

registerPlugin('jsx-to-htm', jsxToHtmBabelPlugin)

export const htmTransform = (src, options = {}) => {
  const {sourceType = 'jsx', toJSX, ...hbsToJSXOptions} = options

  const jsx = sourceType === 'handlebars' ? hbsToJSX(src, hbsToJSXOptions) : src

  if (toJSX) {
    return jsx
  }

  const { code } = transform(jsx, {
    plugins: ['jsx-to-htm']
  })

  return code  
}
