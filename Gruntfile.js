module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        license: grunt.file.read('LICENSE-MIT'),
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n<%= license %>'
            },
            main: {
                files: {
                    /*
                    '*.css': [
                        '*.css'
                    ],*/
                    'dest/kai.src.js': [
                        'src/core.init.js',
                        'src/core.class.js',
                        'src/core.types.js',
                        'src/core.each.js',
                        'src/utils.uniqid.js',
                        'src/utils.time.js',
                        'src/datastructure.linkedlist.js',
                        'src/web.ajax.js'
                    ]
                }
            }
        },
        cssmin: {
            main: {
                files: {
          //          '*.css': ['*.css']
                }
            }
        },
        uglify: {
            options: {
                sourceMap: true,
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n<%= license %>'
            },
            main: {
                files: {
                    'dest/kai.min.js': ['dest/kai.src.js']
                }
            }
        },
        clean: {
            build: ['~temp']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['clean']);
    grunt.registerTask('build', ['concat:main', 'cssmin:main', 'uglify:main', 'clean:build']);
};

