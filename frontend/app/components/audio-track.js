import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement: function(){
        // Scroll the mute and solo buttons as we scroll up and down
        var topOffset = parseInt($(".mute-solo").css('margin-top'));
        
        Ember.$('.tracks-box').scroll(function(){
            Ember.$('.mute-solo').css({
                'margin-top': -Ember.$(this).scrollTop() + topOffset
            });
        });
    }
    
});
