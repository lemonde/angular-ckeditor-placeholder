module.exports = function (grunt) {

  /**
   * Configuration.
   */

  grunt.initConfig({
    uglify: {
      default: {
        options: {
          preserveComments: 'some',
          sourceMap: 'angular-ckeditor-placeholder.min.map',
          sourceMappingURL: 'angular-ckeditor-placeholder.min.map'
        },
        files: {
          'angular-ckeditor-placeholder.min.js': 'angular-ckeditor-placeholder.js'
        }
      }
    }
  });

  /**
   * Tasks.
   */

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};