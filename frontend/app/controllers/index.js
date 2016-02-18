import Ember from 'ember';

export default Ember.Controller.extend({
    socketIOService: Ember.inject.service('socket-io'),
    
    actions: {
        sendButtonPressed: function() {            
            var socket = this.get('socketIOService').socketFor('ws://localhost:7000/');
            socket.emit('boom', 'boom');
        }
    }
});
