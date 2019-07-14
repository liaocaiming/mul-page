const detectPort = require("../utils/detectPort");

const devServer = require("./devServe");

const webpackDevServer = require("webpack-dev-server");

const webpack = require("webpack");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const webpackConfig = require("./webpack.base");

const opn = require("opn");

const port = 9000;

const argv = require("yargs").argv;

const { analyzer, proxy, name = "mall" } = argv;

const getRules = require("./getRules");

const entryAndPlugins = require("./getEntrysAndPlugins");
// webpackConfig.entry.index.unshift(
//   `webpack-dev-server/client?http://localhost:${port}/`
// );
// const compiler = webpack(webpackConfig);
// webpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);
// const server = new webpackDevServer(compiler, devServer);
// server.listen(port, "127.0.0.1", () => {
//   opn(`http://localhost:${port}`);
// });
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
          `webpack-dev-server/client?http://localhost:${usePort}/`
        );
      });
      webpackConfig.entry = Object.assign({}, webpackConfig.entry, entry);
      webpackConfig.plugins = webpackConfig.plugins.concat(plugins);
      webpackConfig.module.rules = webpackConfig.module.rules.concat(getRules(name));
      const compiler = webpack(webpackConfig);
      webpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);
      const server = new webpackDevServer(compiler, devServer);
      server.listen(usePort, "127.0.0.1", () => {
        console.log(`listening in ${usePort}`);
        opn(`http://localhost:${usePort}`);
      });
    });

    // webpackConfig.entry.index.unshift(
    //   `webpack-dev-server/client?http://localhost:${usePort}/`
    // );
  });
};
