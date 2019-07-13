const  helpers = require('../utils/helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const argv = require('yargs').argv
const name = argv.name || 'mobile';
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { env = development } = argv;
module.exports = {
  mode: env,
  entry: {

  },
  output: {
    filename: '[name].js',
    path: helpers.resolve(`../../dist/${name}`),
    publicPath: '/'
  },

  module: {
    rules: []
  },

  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".vue", '.ts', '.less', '.scss'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@shared': helpers.resolve('../../src/@shared'),
      '@src': helpers.resolve('../../src')
    }
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    // minimize: [new UglifyJsPlugin()],
    splitChunks:{
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vue',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/vue\/(.*)\.js/
        },
      }
    }
  },

  plugins: [
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      vue: true
    }),
    new CleanWebpackPlugin(),
    new  webpack.LoaderOptionsPlugin({
      progress: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      'age': 111
    })
  ],
}