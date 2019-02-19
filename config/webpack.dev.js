const detectPort = require("./utils/detectPort");

const webpackConfig = require("./webpack.config");

const devServer = require("./devServe");

const webpackDevServer = require("webpack-dev-server");

const webpack = require("webpack");

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

const opn = require("opn");

const port = 9000;

// webpackConfig.entry.index.unshift(
//   `webpack-dev-server/client?http://localhost:${port}/`
// );
// const compiler = webpack(webpackConfig);
// webpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);
// const server = new webpackDevServer(compiler, devServer);
// server.listen(port, "127.0.0.1", () => {
//   opn(`http://localhost:${port}`);
// });


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
