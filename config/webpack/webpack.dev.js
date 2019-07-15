const detectPort = require("../utils/detectPort");

const devServer = require("./devServe");

const webpackDevServer = require("webpack-dev-server");

const webpack = require("webpack");

const ip = require('../utils/getIpAddress')();

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const webpackConfig = require("./webpack.base");

const getAppHtml = require('./getAppHtml');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const mutilPage = require('../constants/mutilPage');

const opn = require("opn");

const port = 9000;

const argv = require("yargs").argv;

const { analyzer, proxy, name = "mall" } = argv;

const getRules = require("./getRules");

const entryAndPlugins = require("./getEntrysAndPlugins");



module.exports = function() {

  const isMutil = mutilPage.indexOf(name) !== -1;

  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  if (analyzer) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
  }

  if (proxy) {
    Object.assign(devServer, {});
  }
  detectPort(port).then(usePort => {
    entryAndPlugins(name).then(option => {
      const { entry, plugins } = option;
      Object.keys(entry).forEach(key => {
        entry[key].unshift(
          `webpack-dev-server/client?http://${ip}:${usePort}/`
        );
      });

      if (isMutil) {
        const filename = `main.html`;

        plugins.push(new HtmlWebpackPlugin({
          templateContent: getAppHtml(plugins),
          filename,
        }))
      }
      

      webpackConfig.entry = Object.assign({}, webpackConfig.entry, entry);
      webpackConfig.plugins = webpackConfig.plugins.concat(plugins);
      webpackConfig.module.rules = webpackConfig.module.rules.concat(getRules(name));
      const compiler = webpack(webpackConfig);
      webpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);
      const server = new webpackDevServer(compiler, devServer);
      server.listen(usePort, ip, () => {
        console.log(`listening in ${usePort}`);
        console.log(`listening ip ${ip}`)
        if (isMutil) {
          opn(`http://${ip}:${usePort}/${filename}`);
        } else {
          opn(`http://${ip}:${usePort}`);
        }
      });
    });
  });
};
