import Ember from 'ember';
//params [0]: sound index
export function soundObjStart(params/*, hash*/) {
  return 480*4*72 * params[0];
}

export default Ember.Helper.helper(soundObjStart);
