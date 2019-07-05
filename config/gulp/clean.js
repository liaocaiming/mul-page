const gulp = require('gulp');
const clean = require('gulp-clean');

gulp.task('clean', (done) => {
  gulp.src(feAppConfig.paths.dist, { read: false, allowEmpty: true }).pipe(clean());
  done();
  return;
})