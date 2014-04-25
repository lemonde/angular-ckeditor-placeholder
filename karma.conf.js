module.exports = function (config) {
  config.set({
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],
    frameworks: ['mocha'],
    singleRun: false,
    autoWatch: true,
    colors: true,
    reporters: ['dots'],
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/ckeditor/ckeditor.js',
      'bower_components/angular-ckeditor/angular-ckeditor.js',

      {
        pattern: 'bower_components/ckeditor/**/*',
        watched: false,
        included: false,
        served: true
      },

      'node_modules/lodash/dist/lodash.js',
      'node_modules/chai/chai.js',
      'node_modules/chai-jquery/chai-jquery.js',

      'angular-ckeditor-placeholder.js',
      'test/*.js'
    ],
    logLevel: config.LOG_ERROR
  });
};