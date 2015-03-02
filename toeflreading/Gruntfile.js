module.exports = function(grunt) {
  var replaceJs = function(content, srcpath) {
    return content.replace(new RegExp('/\.js', 'gm'), '.min.js');
  };
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build'],
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'static/scripts/reading.js',
        dest: 'build/static/scripts/reading.min.js'
      }
    },
    copy: [{
          cwd: 'lib',
          src: '**/*',
          dest: 'build/lib',
          expand: true,
          options: {
            process: replaceJs          
          }
        },
        {
          cwd: 'bower_components',
          src: '**/*',
          dest: 'build/static',
          expand: true,
          options: {
            process: replaceJs          
          }
        },
        {
          cwd: 'static',
          src: '**/*',
          dest: 'build/static',
          expand: true,
          options: {
            process: replaceJs          
          }
        },
        {
          src: 'server.js',
          dest: 'build/server.js'
        }]
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load copy plugin
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'uglify', 'copy']);
};
