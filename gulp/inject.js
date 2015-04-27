'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  gulp.task('inject', ['scripts', 'styles'], function () {

    // demo style
    var injectDemoStyles = gulp.src([
      options.tmp + '/serve/demo/**/*.css',
      '!' + options.tmp + '/serve/demo/vendor.css'
    ], { read: false });

    // main style
    var injectMainStyles = gulp.src([
      options.tmp + '/serve/{components, styles}/**/*.css',
        '!' + options.tmp + '/serve/styles/main.css'
    ], { read: false });

    // demo script
    var injectDemoScripts = gulp.src([
      options.src + '/demo/**/*.js',
      '!' + options.src + '/demo/**/*.spec.js',
      '!' + options.src + '/demo/**/*.mock.js'
    ])
    .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

    // main script
    var injectMainScripts = gulp.src([
      options.src + '/{components,services,directives}/**/*.js',
      '!' + options.src + '/{components,services,directives}/**/*.spec.js',
      '!' + options.src + '/{components,services,directives}/**/*.mock.js'
    ])
      .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));


    var injectDemoOptions = {
      name: 'demo',
      ignorePath: [options.src, options.tmp + '/serve'],
      addRootSlash: false
    };
    var injectMainOptions = {
      name: 'main',
      ignorePath: [options.src, options.tmp + '/serve'],
      addRootSlash: false
    };

    var wiredepOptions = {
      directory: 'bower_components',
      exclude: [/bootstrap-sass-official/, /bootstrap\.css/]
    };

    return gulp.src(options.src + '/*.html')
      .pipe($.inject(injectDemoStyles, injectDemoOptions))
      .pipe($.inject(injectMainStyles, injectMainOptions))
      .pipe($.inject(injectDemoScripts, injectDemoOptions))
      .pipe($.inject(injectMainScripts, injectMainOptions))
      .pipe(wiredep(wiredepOptions))
      .pipe(gulp.dest(options.tmp + '/serve'));

  });
};
