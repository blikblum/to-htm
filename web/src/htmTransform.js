import { transform, registerPlugin } from '@babel/standalone'
import jsxToHtmBabelPlugin from 'babel-plugin-transform-jsx-to-htm'

const hbsToJSX = () => {
  //todo
}

registerPlugin('jsx-to-htm', jsxToHtmBabelPlugin)

export const htmTransform = (src, options = {}) => {
  const {srcType = 'jsx', ...hbsToJSXOptions} = options

  const jsx = srcType === 'handlebars' ? hbsToJSX(src, hbsToJSXOptions) : src

  const { code } = transform(jsx, {
    plugins: ['jsx-to-htm']
  })

  return code  
}
