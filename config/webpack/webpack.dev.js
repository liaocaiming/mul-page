const detectPort = require("../utils/detectPort");

const devServer = require("./devServe");

const webpackDevServer = require("webpack-dev-server");

const webpack = require("webpack");

const ip = require('../utils/getIpAddress')();

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const webpackConfig = require("./webpack.base");

const opn = require("opn");

const port = 9000;

const argv = require("yargs").argv;

const { analyzer, proxy, name = "mall" } = argv;

const getRules = require("./getRules");

const entryAndPlugins = require("./getEntrysAndPlugins");
module.exports = function() {
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
      webpackConfig.entry = Object.assign({}, webpackConfig.entry, entry);
      webpackConfig.plugins = webpackConfig.plugins.concat(plugins);
      webpackConfig.module.rules = webpackConfig.module.rules.concat(getRules(name));
      const compiler = webpack(webpackConfig);
      webpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);
      const server = new webpackDevServer(compiler, devServer);
      server.listen(usePort, ip, () => {
        console.log(`listening in ${usePort}`);
        console.log(`listening ip ${ip}`)
        opn(`http://${ip}:${usePort}`);
      });
    });

    // webpackConfig.entry.index.unshift(
    //   `webpack-dev-server/client?http://localhost:${usePort}/`
    // );
  });
};
