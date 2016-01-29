/**
 * Created by Ethan Geller on 1/24/16.
 * Extension of WAAX library for Project Codaw.
 */

if(WX === null) console.error("ERROR: Load WAAX before codaw-waax.js.");
if(WaveSurfer.overridden === null) console.error("ERROR: Load codaw-wavesurfer-overrides.js before codaw-waax.js.");


/* Properties */
CD = {};
//our total queue of sounds
CD.sounds = [];

//our immediate queue
CD.immediate = [];

CD.playing = [];
CD.paused = [];

//flag to check if we're ready to start rolling
CD.immediateQueueReady = false;

//time to lookahead and queue up any possible future audio events (in seconds)
CD.lookaheadTime = 0.1;

CD.timerWorker = null;

if(WX._ctx === null) CD.ctx = new AudioContext();
else CD.ctx = WX._ctx;

/*
* addSound: Add a sound to the transport queue.
*
* arguments:
*   tick: start time of the sound in ticks.
*   s: start offset to play from in ticks.
*   e: place where we should stop playing in audio buffer in ticks.
*   n: pointer to the node object that we need to play.
*
*
* For example, adding from the sound-obj component:
*   CD.addSound(this.start, this.startCrop, this.endCrop, this.wavesurfer);
* */
CD.addSound = function(tick, s, e, n) {
  CD.sounds.push({time: tick, start: s, end: e, node: n});
  return CD.sounds.length;
};

/*
* modifySound(idx): Modify the sound held at position idx.
*
* arguments:
*   idx: index originally returned by addSound().
*   tick: new start time of the sound in ticks.
*   s: new start offset to play from in ticks.
*   e: new place where we should stop playing the buffer in ticks.
*   n: pointer to the node object that we need to play.
 */
CD.modifySound = function(idx, tick, s, e, n) {
  CD.sounds[idx] = {time: tick, start: s, end: e, node: n};
};

/*
* removeSound(idx): Remove the sound at position idx.
*
* arguments:
*   idx: index of sound returned from CD.addSound().
 */
CD.removeSound = function(idx) {
  CD.sounds[idx] = null;
};

/*********************
 * BACKEND STUFF
 *********************/

/*
* fillImmediate(t): fill the immediate queue with sounds that will happen within our lookahead time.
*
* arguments:
*   t: tick we are looking in the immediate future from
* */
CD.fillImmediate = function(t) {
  for(i = 0; i < CD.sounds.length; i++) {
    if(t<=CD.sounds[i].time && CD.sounds[i].time < (t+CD.lookaheadTime)){
      CD.immediate.push(CD.sounds[i]);
    }
  }
  CD.immediateQueueReady = true;
};

/*
* flushImmediate(): flush the immediate buffer, queue up events on the audio thread
 */
CD.flushImmediate = function() {
  while(CD.immediate.length){
    var x = CD.immediate.pop();
    x.node.play(CD.ctx.currentTime + WX.Transport.tick2sec(x.time - WX.Transport.getNow()),
      WX.Transport.tick2sec(x.start),
      x.node.getDuration() + WX.Transport.tick2sec(x.end));
    CD.playing.push(x);
    console.log('time to play it: '+WX.Transport.tick2sec(x.time - WX.Transport.getNow()));
  }
  CD.immediateQueueReady = false;
};

/*
* clearImmediate(): empty out the immediate buffer
 */
CD.clearImmediate = function() {
  CD.immediate = [];
  CD.immediateQueueReady = false;
};

/*
* schedule(): callback function for scheduler on main thread that is perpetually sending messages to the audio thread.
 */
CD.schedule = function() {
  CD.fillImmediate(WX.Transport.getNow() + CD.lookaheadTime);
  CD.flushImmediate();
};


/*
 * play(): play the transport.
 * */
CD.play = function() {
  if(!CD.immediateQueueReady) CD.fillImmediate(WX.Transport.getNow());
  if(CD.paused.length)
    CD.resumePausedAudio();
  WX.Transport.start();
  CD.timerWorker.postMessage("start");
};

CD.resumePausedAudio = function() {
  for(var i = 0; i < CD.paused.length; i++) {
    var x = CD.paused[i];
    if(x.when !== null) {
      x.node.play(CD.ctx.currentTime + WX.Transport.tick2sec(x.time - WX.Transport.getNow()),
        WX.Transport.tick2sec(x.start + x.when),
        x.node.getDuration() - WX.Transport.tick2sec(x.end + x.when));
      CD.playing.push(x);
      CD.paused[i].when = null;
    }
  }
  CD.paused = [];
};

/*
* pause(): pause the transport.
 */
CD.pause = function() {
  CD.clearImmediate();
  WX.Transport.pause();
  CD.timerWorker.postMessage("stop");
  CD.prepareForPause();
  CD.fillImmediate(WX.Transport.getNow());
};

CD.prepareForPause = function() {
  for(var i = 0; i < CD.playing.length; i++) {
    var x = CD.playing[i];
    if(x.node.isPlaying) {
      x.node.pause();
      x.when = WX.Transport.getNow() - x.time;
      CD.paused.push(x);
    }
  }
  CD.playing = [];
};

/*
* seek(): seek to t in the timeline, in ticks.
 */
CD.seek = function(t) {
  CD.clearImmediate();
  WX.Transport.setNow(t);
  CD.playing = [];
  CD.paused = [];
  CD.recheckForPausedSounds();
  CD.fillImmediate(t);
};

CD.recheckForPausedSounds = function() {
  for(var i = 0; i < CD.sounds.length; i ++) {
    var x = CD.sounds[i];
    if(x.time < WX.Transport.getNow() &&
      WX.Transport.getNow() < (WX.Transport.sec2tick(x.node.getDuration()) - x.end) ) {
        x.when = WX.Transport.getNow() - x.time;
        CD.paused.push(x);
    }
  }
};

CD.init = function() {
  CD.timerWorker = new Worker("engine/codaw-scheduler.js");

  CD.timerWorker.onmessage = function(e) {
    if (e.data == "t") {
      CD.schedule();
    }
    else
      console.log("CodawScheduler: " + e.data);
  };
  //want to make sure we're passing by value
  var lookahead_by_ms = CD.lookaheadTime * 1000;
  CD.timerWorker.postMessage({"interval":lookahead_by_ms});
};

window.addEventListener("load", CD.init );
