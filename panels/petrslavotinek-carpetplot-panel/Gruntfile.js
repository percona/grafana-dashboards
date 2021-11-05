module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({

    clean: ['dist'],

    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '!**/*.js', '!**/*.scss', '!img/**/*'],
        dest: 'dist'
      },
      pluginDef: {
        expand: true,
        src: ['plugin.json', 'README.md'],
        dest: 'dist',
      },
      img_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['img/**/*'],
        dest: 'dist/src/'
      },
    },

    watch: {
      rebuild_all: {
        files: ['src/**/*', 'plugin.json'],
        tasks: ['default'],
        options: {
          spawn: false,
          livereload: true
        }
      },
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015'],
        plugins: ['transform-es2015-modules-systemjs', 'transform-es2015-for-of', 'transform-class-properties', 'transform-object-rest-spread'],
      },
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['*.js', '**/*.js'],
          dest: 'dist',
          ext: '.js'
        }]
      },
    },

    sass: {
      dist: {
        files: {
          'dist/css/carpet-plot.css': 'src/css/carpet-plot.scss'
        }
      }
    }

  });

  grunt.registerTask('default', ['clean', 'copy:src_to_dist', 'copy:pluginDef', 'copy:img_to_dist', 'babel', 'sass']);
  // grunt.registerTask('clean', ['clean']);
  // grunt.registerTask('watch', ['watch']);
};