import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return [{id:1, sounds:[1,2,3]},{id:2, sounds:[1]},{id:3, sounds:[1,2]}];
    }
});
