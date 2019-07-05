
const webpackConfig = require("./webpack.config");

const webpack = require("webpack");

const compiler = webpack(webpackConfig);

const zip = require('../utils/zip');

compiler.run((err, status) => {
  if (err) {
    return
  }
  console.log('成功 ');
  zip(webpackConfig.output.path, 'mall')
})