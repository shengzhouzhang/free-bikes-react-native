
'use strict';

let gulp = require('gulp');
let eslint = require('gulp-eslint');

gulp.task('lint', () => {
  return gulp.src([ 'src/**/*.js', 'specs/**/*.js' ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
