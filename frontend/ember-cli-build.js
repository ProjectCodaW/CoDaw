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

  //animate.css
  app.import('vendor/animate.min.css');

  //Wavsurfer import
  app.import('bower_components/wavesurfer.js/src/wavesurfer.js');
  app.import('bower_components/wavesurfer.js/src/util.js');
  app.import('bower_components/wavesurfer.js/src/webaudio.js');
  app.import('bower_components/wavesurfer.js/src/mediaelement.js');
  app.import('bower_components/wavesurfer.js/src/drawer.js');
  app.import('bower_components/wavesurfer.js/src/drawer.canvas.js');
  app.import('bower_components/wavesurfer.js/src/html-init.js');


  app.import('bower_components/lodash/dist/lodash.min.js')

  //WAAX import
  app.import('vendor/WAAX/src/waax.js');
  app.import('vendor/WAAX/src/waax.extension.js');
  app.import('vendor/WAAX/src/waax.util.js');
  app.import('vendor/WAAX/src/waax.core.js');
  app.import('vendor/WAAX/src/waax.timebase.js');
  app.import('vendor/WAAX/src/mui/mui.js');

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
  
  app.import('vendor/DirectBass.mp3', {
      destDir:'assets'
  });
  app.import('vendor/Drums.mp3', {
      destDir:'assets'
  });
  app.import('vendor/FenderChords.mp3', {
      destDir:'assets'
  });
  app.import('vendor/FenderSolo.mp3', {
      destDir:'assets'
  });
  app.import('vendor/FenderTones.mp3', {
      destDir:'assets'
  });
  app.import('vendor/Keyboards.mp3', {
      destDir:'assets'
  });
  app.import('vendor/PowerChord.mp3', {
      destDir:'assets'
  });
  app.import('vendor/TaylorChords.mp3', {
      destDir:'assets'
  });

  return app.toTree();
};
