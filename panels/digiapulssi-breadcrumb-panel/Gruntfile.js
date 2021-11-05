module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-pug');

    grunt.initConfig({

        clean: {
            dist: ['dist'],
            src: ['src/*.js', 'src/*.d.ts', 'src/*.map']
        },

        copy: {
            src_to_dist: {
                cwd: 'src',
                expand: true,
                src: ['**/*', '!**/*.js', '!**/*.pug', '!**/*.scss', '!img', '!img/**/*'],
                dest: 'dist'
            },
            pluginDef: {
                expand: true,
                src: [ 'plugin.json', 'README.md' ],
                dest: 'dist',
            },
            img_to_dist: {
                cwd: 'src',
                expand: true,
                src: ['img/**/*'],
                dest: 'dist/src/'
            }
        },

        watch: {
            rebuild_all: {
                files: ['src/**/*', 'plugin.json'],
                tasks: ['default'],
                options: {spawn: false}
            },
        },

        pug: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    'dist/module.html': 'src/module.pug',
                    'dist/editor.html': 'src/editor.pug'
                }
            }
        },

        sass: {
            dist: {
                files: {
                    'dist/breadcrumb.css': 'src/breadcrumb.scss'
                }
            }
        },

        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'src',
                options: {
                    target: 'es6',
                    sourceMap: true,
                    declaration: true
                }
            }
        },

        babel: {
            options: {
                sourceMap: true,
                presets:  ["es2015"],
                plugins: ['transform-es2015-modules-systemjs', "transform-es2015-for-of"],
            },
            dist: {
                files: [{
                    cwd: 'src',
                    expand: true,
                    src: ['*.js'],
                    dest: 'dist',
                    ext:'.js'
                }]
            },
        },

    });

    grunt.registerTask('default', ['clean:dist', 'copy:src_to_dist', 'copy:pluginDef', 'copy:img_to_dist',
                                    'pug', 'sass', 'typescript', 'babel', 'clean:src']);
};
