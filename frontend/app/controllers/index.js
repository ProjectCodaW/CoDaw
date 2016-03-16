import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
      playTracks: function() {
          while(!CD.isPlaying)CD.play();
      },
      stopTracks: function() {
          while(CD.isPlaying) CD.pause();
          CD.seek(0);
          for (var i = 0; i < CD.sounds.length; i++) {
              CD.sounds[i].node.seekTo(0);
          }
      },
      pauseTracks: function() {
        while(CD.isPlaying)CD.pause();
      }
    }
});
