// const api =  require('./api');
const argv = require('yargs').argv;
const { proxy } = argv;
const webpackConfig = require('./webpack.base');
const api = require('../utils/api');

module.exports = {
  contentBase: webpackConfig.output.path,
  compress: true,
  port: 9000,
  historyApiFallback: true,
  // hot: true,
  // open: true,
  // publicPath: webpackConfig.output.publicPath,
  // watchContentBase: true,
  // inline: true,
  // stats: "errors-only", // 只打印错误
  // overlay: {
  //   warnings: true,
  //   errors: true
  // },
  // watchOptions: {
  //   poll: true
  // },
  before(app) {
    if (!proxy) {
      app.use('/api', api())
    }
  }
}