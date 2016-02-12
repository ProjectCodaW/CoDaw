import Ember from 'ember';

export function trackId(params/*, hash*/) {
  return "track-" + params[0];
}

export default Ember.Helper.helper(trackId);
