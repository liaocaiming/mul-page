
const webpackConfig = require("./webpack.base");

const argv = require('yargs').argv

const { name = "mall" } = argv;

const getRules = require("./getRules");

const entryAndPlugins = require("./getEntrysAndPlugins");

const webpack = require("webpack");

const zip = require('../utils/zip');

module.exports = function prod() {
  entryAndPlugins(name).then(option => {
    const { entry, plugins } = option;
    webpackConfig.entry = Object.assign({}, webpackConfig.entry, entry);
    webpackConfig.plugins = webpackConfig.plugins.concat(plugins);
    webpackConfig.module.rules = webpackConfig.module.rules.concat(getRules(name));
    const compiler = webpack(webpackConfig);
    compiler.run((err, status) => {
      if (err) {
        return
      }
      zip(webpackConfig.output.path, 'mall')
    })
  });
}

prod();
