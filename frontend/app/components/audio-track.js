import Ember from 'ember';

export default Ember.Component.extend({
    //id: function() { return "track-" + (Math.random() * 10000).toFixed(0)},
    didInsertElement: function(){
        // Scroll the mute and solo buttons as we scroll up and down
        var topOffset = parseInt($(".mute-solo").css('margin-top'));

        Ember.$('.tracks-box').scroll(function(){
            Ember.$('.mute-solo').css({
                'margin-top': -Ember.$(this).scrollTop() + topOffset
            });
        });

        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $('#' + this.id).addClass('animated fadeIn').one(animationEnd, function() {
          $('#' + this.id).removeClass('animated fadeIn');
        });
    },

  click: function(evt) {
    console.log(this.$());
    console.log(this.id + ": i was clicked at " + evt.clientX + "!");
    console.log("our div is at " + this.$().offset().left);
    var pxPerTick= 0.01; //this will be gotten from the CD.view constant
    //this.sendAction("drawPing", pxPerTick * (evt.clientX - $(this).offset.x), "Rails A.B. Geller", "#444");
    this.drawPing( (evt.clientX - this.$().offset().left)/pxPerTick, "Rails A.B. Geller", "#444");
  },

  drawPing(tick, userName, userColor) {
    console.log("i was called at tick " + tick +"!");
    var me = this.$();
    var pxPerTick= 0.01; //this will be gotten from the CD.view constant
    var div =  "ping" + tick;
    me.append("<div id='" + div + "' class='ping'></div>");
    var ping = Ember.$('#' + div);
    console.log(ping);
    ping.css({"position": "absolute",
      "top":"0px",
      "left": tick*pxPerTick + "px",
      "height": "100%",
      "width": "80px",
      "opacity": 0.3,
      "background-color": userColor
    });
    ping.append("<h4>"+ userName +"</h4>");


    //start animatin'
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    ping.addClass('animated fadeIn').one(animationEnd, function() {
      ping.removeClass('animated fadeIn');
      ping.addClass('animated flip').one(animationEnd, function() {
        ping.removeClass('animated flip');
        ping.addClass('animated flip').one(animationEnd, function() {
          ping.removeClass('animated flip');
          ping.addClass('animated flip').one(animationEnd, function() {
            ping.removeClass('animated flip');
            ping.addClass('animated flipOutY').one(animationEnd, function() {
              ping.removeClass('animated flipOutY');
              //I'm done
              ping.remove();
            });
          });
        });
      });
    });

  },

  actions: {

  }
});
