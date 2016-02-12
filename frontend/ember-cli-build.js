/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('bower_components/foundation/js/foundation.min.js');
  app.import('bower_components/foundation/css/foundation.min.css');
  app.import('bower_components/wavesurfer.js/dist/wavesurfer.min.js');
  app.import('vendor/WAAX/build/waax.min.js');
  //Gonna need this if we decide to go with mui for our plugin interfaces:
  //app.import('vendor/WAAX/build/mui/bower_components/webcomponentsjs/webcomponents.min.js');
  app.import('vendor/codaw-wavesurfer-overrides.js', {
    destDir: 'engine'
  });
  app.import('vendor/codaw-waax.js', {
    destDir: 'engine'
  });

  //test audio
  app.import('vendor/telephone.wav', {
      destDir: 'assets'
  });

  return app.toTree();
};
