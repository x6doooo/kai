'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

module.exports = function (options) {
    gulp.task('styles', function () {
        var sassOptions = {
            style: 'expanded'
        };

        var injectDemoFiles = gulp.src([
            options.src + '/demo/**/*.scss',
            options.src + '/demo/**/*.sass',
            '!' + options.src + '/demo/index.scss'
        ], {read: false});

        var injectMainFiles = gulp.src([
            options.src + '/{components,styles}/**/*.scss',
            options.src + '/{components,styles}/**/*.sass',
            '!' + options.src + '/styles/main.scss',
            '!' + options.src + '/styles/vendor.scss',
            '!' + options.src + '/styles/bootstrap.scss'
        ], {read: false});

        var injectDemoOptions = {
            transform: function (filePath) {
                filePath = filePath.replace(options.src + '/demo/', '');
                return '@import \'' + filePath + '\';';
            },
            starttag: '// injector',
            endtag: '// endinjector',
            addRootSlash: false
        };
        var injectMainOptions = {
            transform: function (filePath) {
                filePath = filePath.replace(options.src + '/components/', '../components/');
                filePath = filePath.replace(options.src + '/styles/', '../styles/');
                return '@import \'' + filePath + '\';';
            },
            starttag: '// injector',
            endtag: '// endinjector',
            addRootSlash: false
        };

        var indexFilter = $.filter('index.scss');
        var mainFilter = $.filter(['main.scss', 'vendor.scss']);

        return gulp.src([
            options.src + '/demo/index.scss',
            options.src + '/styles/vendor.scss',
            options.src + '/styles/main.scss'
        ])
            .pipe(indexFilter)
            .pipe($.inject(injectDemoFiles, injectDemoOptions))
            .pipe($.sourcemaps.init())
            .pipe($.sass(sassOptions)).on('error', options.errorHandler('Sass'))
            .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(options.tmp + '/serve/demo/'))
            .pipe(indexFilter.restore())
            .pipe(mainFilter)
            .pipe($.inject(injectMainFiles, injectMainOptions))
            .pipe($.sourcemaps.init())
            .pipe($.sass(sassOptions)).on('error', options.errorHandler('Sass'))
            .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(options.tmp + '/serve/styles/'))
            .pipe(mainFilter.restore())
            .pipe(browserSync.reload({stream: true}));
    });
};
