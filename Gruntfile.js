module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    rig: {
      browser: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      amd: {
        src: ['src/<%= pkg.name %>-amd.js'],
        dest: 'dist/<%= pkg.name %>-amd.js'
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: '/**\n' +
              ' * <%= pkg.title %> v<%= pkg.version %>\n' +
              ' *\n' +
              ' * Copyright (c) 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
              ' * Distributed under MIT License\n' +
              ' *\n' +
              ' * Documentation and full license available at:\n' +
              ' * <%= pkg.homepage %>' +
              ' *\n' +
              '**/\n'
      },
      browser: {
        src: '<%= rig.browser.dest %>',
        dest: '<%= rig.browser.dest %>'
      },
      amd: {
        src: '<%= rig.amd.dest %>',
        dest: '<%= rig.amd.dest %>'
      }
    },
    uglify: {
      options: {
        banner: '/**\n' +
              ' * <%= pkg.title %> v<%= pkg.version %>\n' +
              ' *\n' +
              ' * Copyright (c) 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
              ' * Distributed under MIT License\n' +
              ' *\n' +
              ' * Documentation and full license available at:\n' +
              ' * <%= pkg.homepage %>' +
              ' *\n' +
              '**/\n',
        mangle: {
          except: ['_', 'Backbone']
        }
      },
      browser: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= rig.browser.dest %>']
        }
      },
      amd: {
        files: {
          'dist/<%= pkg.name %>-amd.min.js': ['<%= rig.amd.dest %>']
        }
      }
    },
    watch: {
      files: '<config:jshint.files>',
      tasks: 'default'
    },
    jshint: {
      files: ['grunt.js', 'src/**/*.js', 'tests/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        node: true,
        globals: {
          define: true,
          Backbone: true,
          _: true,
          jQuery: true,
          $: true
        }
      }
    }
  });

  grunt.registerTask('default', ['rig', 'jshint', 'concat', 'uglify']);

  grunt.loadNpmTasks('grunt-rigger');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
};
