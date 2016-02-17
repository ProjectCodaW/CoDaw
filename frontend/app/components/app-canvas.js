import Ember from "ember";

export default Ember.Component.extend({
  didInitAttrs() {
    Ember.run.schedule("afterRender", function() {
      Ember.$(document).foundation({
        offcanvas: { close_on_click: true }
      });
    });
  },
  
  socketService: Ember.inject.service('websockets'),
 
  willRender() {
    /*
    * 2) The next step you need to do is to create your actual websocket. Calling socketFor
    * will retrieve a cached websocket if one exists or in this case it
    * will create a new one for us.
    */
    var socket = this.get('socketService').socketFor('ws://localhost:7000/');
 
    /*
    * 3) The final step is to define your event handlers. All event handlers
    * are added via the `on` method and take 3 arguments: event name, callback
    * function, and the context in which to invoke the callback. All 3 arguments
    * are required.
    */
    socket.on('open', this.myOpenHandler);
    socket.on('message', this.myMessageHandler.bind(this));
    socket.on('close', event => { /* anonymous functions work as well */ });
  },
 
  myOpenHandler: function(event) {
    console.log('On open event has been called: ' + event);
  },
 
  myMessageHandler: function(event) {
    console.log('Message: ' + event.data);
  },
 
  actions: {
    sendButtonPressed: function() {
      /*
      * If you need to retrieve your websocket from another function or method you can simply
      * get the cached version at no penalty
      */
      console.log('pressed');
      var socket = this.get('socketService').socketFor('ws://localhost:7000/');
      socket.send('Hello Websocket World');
    }
  }
});