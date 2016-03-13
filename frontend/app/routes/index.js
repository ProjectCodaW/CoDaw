import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        var messages = this.store.findAll('message');
        var tracks = [
            {id:1, sounds:["../assets/DirectBass.mp3"]},
            {id:2, sounds:["../assets/Drums.mp3"]},
            {id:3, sounds:["../assets/FenderChords.mp3"]},
            {id:4, sounds:["../assets/FenderSolo.mp3"]},
            {id:5, sounds:["../assets/FenderTones.mp3"]},
            {id:6, sounds:["../assets/Keyboards.mp3"]},
            {id:7, sounds:["../assets/PowerChord.mp3"]},
            {id:8, sounds:["../assets/TaylorChords.mp3"]}
        ];
        var consumer = this.get('cableService').createConsumer('ws://localhost:3000/websocket');

        return {tracks:tracks,messages:messages,consumer:consumer};
    }

});
