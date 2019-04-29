const  helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const argv = require('yargs').argv
const name = argv.name || 'mobile';
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    index: [helpers.resolve('../src/main.ts')],
  },
  output: {
    filename: '[name].js',
    path: helpers.resolve(`../dist/${name}`),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: {
        //   loaders: {
        //     // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
        //     // the "scss" and "sass" values for the lang attribute to the right configs here.
        //     // other preprocessors should work out of the box, no loader config like this necessary.
        //     'scss': 'vue-style-loader!css-loader!sass-loader',
        //     'less': 'vue-style-loader!css-loader!less-loader',
        //     'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
        //   }
          // other vue-loader options go here
        // }
      },
      { 
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: '/node_modules/',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(vue|tsx?)$/,
        loader: 'string-replace-loader',
        options: {
          multiple: [
            { search: '@src/config/mobile', replace: `@src/config/${name}` }
          ]
        }
      },
      
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          // 'postcss-loader'
        ]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".vue", '.ts', '.less', '.scss'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@shared': helpers.resolve('../src/@shared'),
      '@src': helpers.resolve('../src')
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
    new HtmlWebpackPlugin({
      template: helpers.resolve('../tpl/index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new  webpack.LoaderOptionsPlugin({
      progress: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'age': 111
    })
  ],
}