'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function(options) {
  gulp.task('watch', ['markups', 'inject'], function () {

    gulp.watch([options.src + '/*.html', 'bower.json'], ['inject']);

    gulp.watch([
      options.src + '/**/*.css',
      options.src + '/**/*.scss',
      options.src + '/**/*.sass'
    ], function(event) {
      if(isOnlyChange(event)) {
        gulp.start('styles');
      } else {
        gulp.start('inject');
      }
    });

    gulp.watch(options.src + '/**/*.js', function(event) {
      if(isOnlyChange(event)) {
        gulp.start('scripts');
      } else {
        gulp.start('inject');
      }
    });

    gulp.watch(options.src + '/**/*.jade', ['markups']);

    gulp.watch(options.src + '/**/*.html', function(event) {
      browserSync.reload(event.path);
    });
  });
};
