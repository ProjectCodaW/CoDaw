import Ember from 'ember';

export function soundObjId(params/*, hash*/) {
  return "sound-obj-" + params[0] + "-" + params[1];
  
  // returns 'sound-obj-tracknum-soundnum'
}

export default Ember.Helper.helper(soundObjId);