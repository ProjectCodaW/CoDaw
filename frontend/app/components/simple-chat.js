import Ember from 'ember';

export default Ember.Component.extend({
  cableService: Ember.inject.service('cable'),

  // instead of an empty array, this should make a request to /messages
  // and load the resulting array into messages.
  messages: [],
  username: 'guest',
  body: 'message body',

  setupSubscription: Ember.on('init', function() {
    var consumer = this.get('cableService').createConsumer('ws://localhost:3000/websocket');

    var subscription = consumer.subscriptions.create("MessageChannel", {
      received: (message) => {
        var parsedMessage = JSON.parse(message);
        this.get('messages').pushObject(parsedMessage);
      }
    });

    this.set('subscription', subscription);

  }),

  actions: {
    sendMessage() {
      this.get('subscription').send({ username: this.get('username'), body: this.get('body') });
    }
  }

});
