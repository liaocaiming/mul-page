const webpackConfig = require('./webpack.config');

const devServer = require('./devServe');

const  webpackDevServer = require('webpack-dev-server');

const webpack = require('webpack');

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

webpackConfig.entry.index.unshift('webpack-dev-server/client?http://localhost:9000/');

const compiler = webpack(webpackConfig)

webpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);

const server = new webpackDevServer(compiler, devServer);

const opn = require('opn');

server.listen(9000, '127.0.0.1', () => {
  opn('http://localhost:9000')
})