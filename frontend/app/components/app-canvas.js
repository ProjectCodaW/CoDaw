import Ember from "ember";

export default Ember.Component.extend({
  didInitAttrs() {
    Ember.run.schedule("afterRender", function() {
      Ember.$(document).foundation({
        offcanvas: { close_on_click: true }
      });
    });
  },

  didInsertElement: function() {
    this.$('.track-parent').css({width: CD.songLength * CD.view.pxPerTick});
  }
});
