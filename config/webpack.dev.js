const detectPort = require("./utils/detectPort");

const webpackConfig = require("./webpack.config");

const devServer = require("./devServe");

const webpackDevServer = require("webpack-dev-server");

const webpack = require("webpack");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

const opn = require("opn");

const port = 9000;

const argv = require('yargs').argv;

const { analyzer, proxy } = argv;

// webpackConfig.entry.index.unshift(
//   `webpack-dev-server/client?http://localhost:${port}/`
// );
// const compiler = webpack(webpackConfig);
// webpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);
// const server = new webpackDevServer(compiler, devServer);
// server.listen(port, "127.0.0.1", () => {
//   opn(`http://localhost:${port}`);
// });

if (analyzer)  {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}
 
if (proxy) {
  Object.assign(devServer, {
    
  })
}
detectPort(port).then(usePort => {
  console.log(usePort)
  webpackConfig.entry.index.unshift(
    `webpack-dev-server/client?http://localhost:${usePort}/`
  );
  const compiler = webpack(webpackConfig);
  webpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);
  const server = new webpackDevServer(compiler, devServer);
  server.listen(usePort, "127.0.0.1", () => {
    console.log(`listening in ${usePort}`)
    opn(`http://localhost:${usePort}`);
  });
});
