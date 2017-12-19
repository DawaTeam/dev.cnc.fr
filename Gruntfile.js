module.exports = function(grunt) {

  options: {
    cache: false
  };

  var conf = {
    root: "",
    devDir: "dev/",
    prodDir: "prod/",
    includeDir: "includes/",
    scssDir: "scss/",
    cssDir: "css/",
    jsDir: "js/",
    imgDir: "images/",
    iconsDir: "icons/",
    jsFiles: []
  };


  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: ['dev/js/plugins/*'],
        dest: 'prod/js/plugins/plugins.min.js',
      }
    },

    // UglifyJS
    uglify: {
      minify_js: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: conf.devDir + conf.jsDir,
          src: ['**/*.js', '!vendor/*.js', '!plugins/*.js', '!**.min.js'],
          dest: conf.prodDir + conf.jsDir,
          ext: '.min.js'
                }]
      }
    },

    //Compile specified SASS files
    sass: {
      css: {
        options: {
          // compass: true,
          // sourcemap: "auto",
          // style: "compact",
          sourceMap: true,
          outputStyle: "compressed", //nested, expanded, compact, compressed
        },
        files: [{
          expand: true,
          cwd: conf.devDir + conf.scssDir,
          src: ['main.scss'],
          dest: conf.prodDir + conf.cssDir,
          ext: '.min.css'
            }]
      }
    },

    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')
            ]
        },
        dist: {
            src: conf.prodDir + conf.cssDir + '/*.css'
        }
    },

    includes: {
      files: {
        expand: true,
        cwd: conf.devDir,
        src: ['**/*.html', '*.php', '*.html.twig', 'includes/*.html'],
        dest: conf.prodDir,
        options: {
          flatten: true,
          includePath: conf.root + 'includes'
        }
      }
    },

    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: conf.devDir + conf.imgDir,
            src: ['**/*.png'],
            // Could also match cwd line above. i.e. project-directory/img/
            dest: conf.prodDir + conf.imgDir,
            ext: '.png'
                }
              ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: conf.devDir + conf.imgDir,
            src: ['**/*.jpg'],
            // Could also match cwd. i.e. project-directory/img/
            dest: conf.prodDir + conf.imgDir,
            ext: '.jpg'
                }
              ]
      }
    },

    // Automatically run a task when a file changes
    watch: {

      options: {
        debounceDelay: 0,
        spawn: false,
        interval: 5007
      },

      css: {
        files: ["**/*.scss"],
        tasks: ['cssroutine'],
        options: {
          cwd: conf.devDir + conf.scssDir,
          livereload: true,
          spawn: false,
        }

      },
      js: {
        files: ["**/*.js", "**/*.min.js", "!**/node_modules/**"],
        tasks: ['jsroutine'],
        options: {
          cwd: conf.devDir + conf.jsDir,
          livereload: true,
          spawn: false,
        }
      },
      html: {
        files: ['**/*.html', '**/*.php', '**/*.html.twig', '../includes/*.html'],
        tasks: ['build'],
        options: {
          cwd: conf.devDir,
          livereload: true,
          spawn: false,
        }
      },

    },

  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');

  //Watch
  grunt.registerTask('cssroutine', ['newer:sass', 'newer:postcss']);
  grunt.registerTask('jsroutine', ['newer:uglify', 'newer:concat']);
  grunt.registerTask('build', ['newer:includes']);
  //grunt.registerTask('imagemin', ['imagemin']);

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['build', 'cssroutine', 'jsroutine', 'watch']);

};
