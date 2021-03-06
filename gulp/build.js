'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function (options) {
    gulp.task('partials:demo', ['markups'], function () {
        return gulp.src([
            options.src + '/demo/**/*.html',
            options.tmp + '/serve/demo/**/*.html'
        ])
            .pipe($.minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            }))
            .pipe($.angularTemplatecache('templateCacheHtmlDemo.js', {
                root: 'demo',
                module: 'kaiDemo'
            }))
            .pipe(gulp.dest(options.tmp + '/partials/'));
    });
    gulp.task('partials:main', ['markups'], function () {
        return gulp.src([
            options.src + '/{components,services}/**/*.html',
            options.tmp + '/serve/{components,services}/**/*.html'
        ])
            .pipe($.minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            }))
            .pipe($.angularTemplatecache('templateCacheHtmlMain.js', {
                module: 'kai'
            }))
            .pipe(gulp.dest(options.tmp + '/partials/'));
    });

    gulp.task('html', ['inject', 'partials:demo', 'partials:main'], function () {
        var partialsDemoInjectFile = gulp.src(options.tmp + '/partials/templateCacheHtmlDemo.js', {read: false});
        var partialsDemoInjectOptions = {
            starttag: '<!-- inject:partials:demo -->',
            ignorePath: options.tmp + '/partials',
            addRootSlash: false
        };
        var partialsMainInjectFile = gulp.src(options.tmp + '/partials/templateCacheHtmlMain.js', {read: false});
        var partialsMainInjectOptions = {
            starttag: '<!-- inject:partials:main -->',
            ignorePath: options.tmp + '/partials',
            addRootSlash: false
        };

        var htmlFilter = $.filter('*.html');
        var jsFilter = $.filter('**/*.js');
        var cssFilter = $.filter('**/*.css');
        var assets;

        return gulp.src(options.tmp + '/serve/*.html')
            .pipe($.inject(partialsDemoInjectFile, partialsDemoInjectOptions))
            .pipe($.inject(partialsMainInjectFile, partialsMainInjectOptions))
            .pipe(assets = $.useref.assets())
            .pipe($.rev())
            .pipe($.rename(function(p) {
                p.basename = p.basename.replace(/\-.+/g, '');
                p.basename += '-' + new Date() * 1;
            }))
            .pipe(jsFilter)
            .pipe($.ngAnnotate())
            .pipe($.uglify({preserveComments: $.uglifySaveLicense})).on('error', options.errorHandler('Uglify'))
            .pipe(jsFilter.restore())
            .pipe(cssFilter)
            .pipe($.replace('../../bower_components/bootstrap-sass-official/assets/fonts/bootstrap/', '../fonts/'))
            .pipe($.csso())
            .pipe(cssFilter.restore())
            .pipe(assets.restore())
            .pipe($.useref())
            .pipe($.revReplace())
            .pipe(htmlFilter)
            .pipe($.minifyHtml({
                empty: true,
                spare: true,
                quotes: true,
                conditionals: true
            }))
            .pipe(htmlFilter.restore())
            .pipe(gulp.dest(options.dist + '/'))
            .pipe($.size({title: options.dist + '/', showFiles: true}));
    });

    // Only applies for fonts from bower dependencies
    // Custom fonts are handled by the "other" task
    gulp.task('fonts', function () {
        return gulp.src($.mainBowerFiles())
            .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
            .pipe($.flatten())
            .pipe(gulp.dest(options.dist + '/fonts/'));
    });

    gulp.task('other', function () {
        return gulp.src([
            options.src + '/**/*',
            '!' + options.src + '/**/*.{html,css,js,scss,sass,jade}'
        ])
            .pipe(gulp.dest(options.dist + '/'));
    });

    gulp.task('clean', function (done) {
        $.del([options.dist + '/', options.tmp + '/'], done);
    });

    gulp.task('build', ['html', 'fonts', 'other']);
};
