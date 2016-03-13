import Ember from 'ember';

export default Ember.Component.extend({
  classNames:['chat'],

  store: Ember.inject.service(),

  username: null,
  body: null,

  reverseMessages: Ember.computed('messages','messages.[]', function() {
      if(!this.get('messages')){
          return Ember.A();
      }
      return this.get('messages').toArray().reverse();
  }),

  setupSubscription: Ember.on('init', function() {

    var subscription = this.get('consumer').subscriptions.create("MessageChannel", {
      received: (message) => {
        var messageJSON = JSON.parse(message);
        var newMessage = this.get('store').createRecord('message', messageJSON);
        this.get('messages').pushObject(newMessage._internalModel);
      }
    });

    this.set('subscription', subscription);

  }),


  didInsertElement: function() {
      // Place messages fixed at bottom with remaining height after new message box
      var viewportHeight = Ember.$(window).height();
      var elementOffset = Ember.$('.chat .messages').offset().top;
      var diff = (viewportHeight - elementOffset);
      Ember.$('.chat .messages').height(diff);

      // Set width of messages
      var chatWidth = Ember.$('.chat').outerWidth();
    Ember.$('.chat .messages').outerWidth(chatWidth - 24);
  },

  actions: {
    sendMessage() {
        if(this.get('username') !== null && this.get('body') !== null) {
            if(!(this.get('username') === '') || !(this.get('body') === '')) {
                this.get('subscription').send({ username: this.get('username'), body: this.get('body') });
            }
        }
    }
  }

});
