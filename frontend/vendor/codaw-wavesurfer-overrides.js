/**
 * WAVESURFER OVERRIDES
 * This is really hacky, overriding some functions so that we can call play on them
 * Created by Ethan on 1/25/16.
 */

if(WaveSurfer === null) console.error('ERROR: Import wavesurfer.js before this script!');

var DELAY = 2.0;
console.log('loading overrides 2...');
WaveSurfer.WebAudio.play = function (when, start, end) {
  // need to re-create source on each playback
  this.createSource();

  var adjustedTime = this.seekTo(start, end);

  start = adjustedTime.start;
  end = adjustedTime.end;

  this.scheduledPause = end;

  this.source.start(when, start, end - start);

  this.setState(this.PLAYING_STATE);

  this.fireEvent('play');
};

WaveSurfer.play = function (when, start, end) {
  this.backend.play(when, start, end);
};

WaveSurfer.WebAudio.state.playing = {
  init: function () {
    this.addOnAudioProcess();
  },
  getPlayedPercents: function () {
    var duration = this.getDuration();
    return ((this.getCurrentTime() - DELAY) / duration) || 0;
  },
  getCurrentTime: function () {
    return this.startPosition + this.getPlayedTime();
  }
};

//a breadcrumb for import stages
WaveSurfer.overridden = true;
