import { transform, registerPlugin } from '@babel/standalone'
import jsxToHtmBabelPlugin from 'babel-plugin-transform-jsx-to-htm'

registerPlugin('jsx-to-htm', jsxToHtmBabelPlugin)

const { code } = transform('<div>{variable}</div>', {
  plugins: ['jsx-to-htm']
})

console.log(code)