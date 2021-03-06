import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        var messages = this.store.findAll('message');
        var tracks = [{id:1, sounds:[1,2,3]},{id:2, sounds:[1]},{id:3, sounds:[1,2]}];
        var consumer = this.get('cableService').createConsumer('ws://localhost:3000/websocket');

        return {tracks:tracks,messages:messages,consumer:consumer};
    }

});
