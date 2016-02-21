import Ember from 'ember';

export default Ember.Component.extend({
  cableService: Ember.inject.service('cable'),
  store: Ember.inject.service(),

  username: 'guest',
  body: 'message body',

  setupSubscription: Ember.on('init', function() {
    var consumer = this.get('cableService').createConsumer('ws://localhost:3000/websocket');

    var subscription = consumer.subscriptions.create("MessageChannel", {
      received: (message) => {
        var messageJSON = JSON.parse(message);
        var newMessage = this.get('store').createRecord('message', messageJSON);
        this.get('messages').pushObject(newMessage._internalModel);
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
