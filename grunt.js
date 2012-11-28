/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    clean: ["dist"],

    lint: {
      files: [
        'grunt.js',
        'app/*.js',
        'routes/*.js',
        'models/*.js',
        '*.js'
      ]
    },

    concat: {
      "dist/debug/require.js": [
        "app/components/almond/almond.js",
        "dist/debug/require.js"
      ]
    },

    qunit: {
      files: ['test/**/index.html']
    },

    less: {
      compile: {
        options: {
          paths: ['assets/less']
        },
        files: {
          'assets/css/main.css': 'assets/less/main.less'
        }
      }
    },

    mincss: {
      compress: {
        files: {
          "assets/css/main.css": ["assets/css/main.css"]
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          mainConfigFile: "app/config.js",
          out: "dist/debug/require.js",
          name: "config",
          wrap: false
        }
      }
    },

    watch: {
      qunit: {
        files: ['app/**/**.js', 'test/qunit/test/*.js'],
        tasks: 'qunit'
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: false,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        node: true,
        jQuery: true,
        expr: true
      },
      globals: {
        Modernizr: true,
        define: true,
        $: true
      }
    },

    min: {
      "dist/release/require.js": [
        "dist/debug/require.js"
      ]
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint clean concat min css');
  grunt.registerTask('css', 'less mincss');
  grunt.loadNpmTasks('grunt-contrib');

};

