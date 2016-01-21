import Ember from 'ember';

export default Ember.Component.extend({
  queue: {},
  actions: {
    setBPM: function(bpm) {
      WX.Transport.setBPM(bpm);
    },

    getBPM: function() {
      return WX.Transport.getBPM();
    },

    start: function() {
      WX.Transport.start();

    },

    addBuffer: function(id) {

    }
  }
});
