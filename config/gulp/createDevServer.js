const gulp = require('gulp');
const createDevServer = require('../webpack/webpack.dev');
gulp.task('start', createDevServer);