const gulp = require('gulp');

const webpackPro = require('../webpack/webpack.prod');

gulp.task('release:prod', webpackPro);