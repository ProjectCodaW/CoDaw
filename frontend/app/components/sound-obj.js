import Ember from 'ember';

export default Ember.Component.extend({
  fname: 'default.wav',
  id: 'aWave',
  start: 0,
  startCrop: 0,
  endCrop: 0,
  soundColor: 'green',
  soundProgressColor: 'purple',
  wavesurfer: null,
  didInsertElement: function() {
    this.wavesurfer = WaveSurfer.create({
      container: '#'+this.id,
      waveColor: this.soundColor,
      progressColor: this.soundProgressColor
    });
    this.wavesurfer.on('ready', function () {
      this.wavesurfer.play();
    });
    this.wavesurfer.load(this.fname);
  },
  actions: {
    init() {
      this.wavesurfer = WaveSurfer.create({
        container: '#'+this.id,
        waveColor: this.soundColor,
        progressColor: this.soundProgressColor
      });
    },

    load(fname) {
      this.wavesurfer.load(fname);
    },

    play() {
      this.wavesurfer.play();
    },

    pause() {
      this.wavesurfer.pause();
    },

    setWaveColor(color) {
      this.wavesurfer.waveColor = color;
      this.soundColor = color;
    }

  }
});
