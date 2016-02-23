import Ember from 'ember';

export default Ember.Component.extend({
  fname: 'default.wav', //url of the audio file we're loading
  id: 'aWave', //name of the container to create

  start: 0, //Tick that sound starts on in project
  startCrop: 0, //how far into the sound we are cropped to
  endCrop: 0, //how much of the end we've truncated
  soundColor: 'green',
  soundProgressColor: 'purple',
  placeInCD: -1,
  wavesurfer: null,

  /*MARK: OVERRIDES*/
  didInsertElement: function() {
    this.wavesurfer = WaveSurfer.create({
      container: '#'+this.id,
      waveColor: this.soundColor,
      progressColor: this.soundProgressColor,
      fillParent: true
    });

    //animate entrance
    var me = this;
    this.wavesurfer.on('ready', function() {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $('#'+ me.id).addClass('animated bounceInRight').one(animationEnd, function() {
        $('#'+ me.id).removeClass('animated bounceInRight');
      });
      me.wavesurfer.un('ready');
    });


    this.wavesurfer.load(this.fname);
    this.wavesurfer.url = this.fname;
    this.placeInCD = CD.addSound(this.start, this.startCrop, this.endCrop, this.wavesurfer);
    
    // Redraw buffer after load
    var soundobj = this;
    this.wavesurfer.on('ready', function() {
        soundobj.setWidth(CD.view.getWavesurferWidth(soundobj.wavesurfer)+'px');
    });
    
  },

  click: function() {
    CD.play();
  },
  
  /*MARK: NON-EMBER FUNCTIONS*/
  setWidth: function(pixels) {
    Ember.$('#' + this.id).width(pixels);
    this.wavesurfer.drawBuffer();
  },

  /*MARK: ACTIONS*/
  actions: {
    init() {
      this.wavesurfer = WaveSurfer.create({
        container: '#'+this.id,
        context: CD.ctx,
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
    },

    onUpdate() {
      if(this.placeInCD >= 0) {
        CD.modifySound(this.placeInCD, this.start, this.startCrop, this.endCrop, this.wavesurfer);
      }
    },

    animateEntrance() {
      var me = this;
      this.wavesurfer.on('ready', function() {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#'+ me.id).addClass('animated bounceInRight').one(animationEnd, function() {
          $('#'+ me.id).removeClass('animated bounceInRight');
        });
        me.wavesurfer.un('ready');
      });
    }

  }
});
