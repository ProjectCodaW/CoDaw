/**
 * Main thread scheduler for lookahead queueing for transport.
 * Created by Ethan on 1/24/16.
 */
var timerID=null;
var interval=100;

self.onmessage= function(e){
  if (e.data==="start") timerID=setInterval(function(){postMessage("t");},interval);
  else if (e.data.interval) {
    interval=e.data.interval;
    postMessage('Interval set to ' + interval + ' milliseconds');
    if (timerID) {
      clearInterval(timerID);
      timerID=setInterval(function(){postMessage("t");},interval);
    }
  }
  else if (e.data==="stop") {
    clearInterval(timerID);
    timerID=null;
  }
};
postMessage('scheduler ready');
