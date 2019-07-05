var gulp = require('gulp');

gulp.task('timeout', function (done) {
    setTimeout(function () {
        console.log(1111);
        done();
    }, 10);
});
gulp.task('default', ['timeout'], () => {
    console.log('timerout')
});

require('./config/gulp/createDevServer');