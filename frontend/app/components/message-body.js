import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    var setup = CD.view.makeTimeLink;
    this.$().html(setup(this.$().html()));
  }

});
