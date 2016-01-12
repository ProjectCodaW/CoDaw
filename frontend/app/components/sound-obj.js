import Ember from 'ember';
//FIXME: get wavesurfer from app config
//import Wavesurfer from 'wavesurfer';
//import Wavesurfer from '../../bower_components/wavesurfer.js/dist/wavesurfer.min.js';
export default Ember.Component.extend({
  fname: 'default.wav',
  id: '#aWave',
  start: 0,
  startCrop: 0,
  endCrop: 0,
  soundColor: 'green',
  soundProgressColor: 'purple',
  wavesurfer: Wavesurfer.create({
    container: this.id,
    waveColor: this.soundColor,
    progressColor: this.soundProgressColor
  }),
  actions: {
    load(fname) {
      this.wavesurfer.load(fname);
    },

    play() {
      this.wavesurfer.play();
    },

    pause() {
      this.wavesurfer.pause();
    }

  }
});
