import Ember from "ember";

export default Ember.Component.extend({
  didInitAttrs() {
    Ember.run.schedule("afterRender", function() {
      Ember.$(document).foundation({
        offcanvas: { close_on_click: true }
      });
    });
  },

  socketIOService: Ember.inject.service('socket-io'),

  willRender() {
    var socket = this.get('socketIOService').socketFor('ws://localhost:7000/');
    var pingSocket = this.get('socketIOService').socketFor('ws://localhost:7000/pings');
    socket.on('connect', () => {});
    socket.on('open', this.myOpenHandler);
    socket.on('message', this.myMessageHandler.bind(this));
    pingSocket.on('ping', this.receivePing.bind(this));
  },

  myOpenHandler: function(event) {
    console.log('On open event has been called: ' + event);
  },

  myMessageHandler: function(event) {

    console.log('Message: ' + event.data);
  },

  receivePing: function(event) {
    console.log('drawing a ping at ' + event.track + ':' + event.tick);
    this.drawPing(event.userName, event.userColor, event.track, event.tick);
  },

  drawPing: function(userName, userColor, track, tick) {
    //stub
  }
});
