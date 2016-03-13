import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
      playTracks: function() {
          CD.play();
      },
      stopTracks: function() {
          CD.seek(0);
          CD.pause();
          for (var i = 0; i < CD.sounds.length; i++) {
              CD.sounds[i].node.seekTo(0);
          }
      },
      pauseTracks: function() {
          CD.pause();
      }
    }
});
