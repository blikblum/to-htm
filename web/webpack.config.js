const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { WebpackPluginServe } = require('webpack-plugin-serve')
var CleanPlugin = require('clean-webpack-plugin')
const argv = require('webpack-nano/argv')

const DIST_DIR = 'dist'
const devDevTool = 'source-map' // see https://webpack.js.org/configuration/devtool/ for options
const prodDevTool = false

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html')
  })
]

const { mode = 'production' } = argv

const isProd = mode === 'production'

if (isProd) {
  plugins.push(new CleanPlugin())
  plugins.push(new MiniCSSExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css'
  }))
} else {
  // dev
  plugins.push(new WebpackPluginServe({
    host: 'localhost',
    port: '8081',
    static: path.resolve(__dirname, DIST_DIR),
    liveReload: true,
    hmr: false
  }))
}

module.exports = {
  entry: './web/src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, DIST_DIR)
  },
  mode,
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        isProd ? MiniCSSExtractPlugin.loader : 'style-loader',
        'css-loader'
      ]
    }]
  },  
  plugins: plugins,
  devtool: isProd ? prodDevTool : devDevTool,
  watch: !isProd,
  resolve: {
    mainFields: ['browser', 'main'],
    alias: {
			fs: path.join(__dirname, './fake-fs.js')
		}
  },  
}
