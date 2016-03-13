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
    this.$().css({
      position: "absolute",
      left: this.start * CD.view.pxPerTick,
      top: "5px"
    })
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
      console.log('px per tick: '+ CD.view.pxPerTick + ' width: ' + CD.view.getWavesurferWidth(me.wavesurfer));
      me.setWidth(CD.view.getWavesurferWidth(me.wavesurfer));

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


  /*MARK: NON-EMBER FUNCTIONS*/
  setWidth: function(pixels) {
    this.$().css({width:pixels});
    //this.wavesurfer.drawBuffer();

    this.wavesurfer.empty();
    this.wavesurfer.load(this.fname);
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
        this.$().css({
          left: this.start * CD.view.pxPerTick,
        })
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
