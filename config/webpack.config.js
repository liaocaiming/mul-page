const  helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: helpers.resolve('/src/main.ts')
  },
  output: {
    filename: '[name].js',
    path: helpers.resolve('/dist')
  },

  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' }
    ]
  },

  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: helpers.resolve('/tpl'),
      filename: 'index.html'
    })
  ]
}