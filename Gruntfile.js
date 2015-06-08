/*global module:false*/
module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: [
            'bower_components/raphael/raphael.js',
            'lib/Graphite.js',
            'lib/core/Class.js',
            'lib/core/Utils.js',
            'lib/core/BaseObject.js',
            'lib/core/EventEmitter.js',
            'lib/core/Hermes.js',
            'lib/engines/RapahelEngine.js',
            'lib/engines/RenderEngine.js',
            'lib/models/Vertice.js',
            'lib/models/Link.js',
            'lib/models/Graph.js',
            'lib/views/View.js',
            'lib/views/BaseView.js',
            'lib/views/CompositeView.js',
            'lib/views/VerticeView.js',
            'lib/views/LinkView.js',
            'lib/views/GraphView.js'
        ],
        dest: 'dist/<%= pkg.name %>.v<%= pkg.version %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.v<%= pkg.version %>.min.js'
      }
    },
    jshint: {
      options: grunt.file.readJSON('.jshintrc'),
      lib_test: {
        src: ['lib/{,*/}*.js']
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'nyan'
        },
        src: ['test/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });



  // Default task.
  grunt.registerTask('build', ['concat']);
  grunt.registerTask('default', ['mochaTest', 'concat', 'uglify']);

  // Specific tasks
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('hint', ['jshint']);

};
