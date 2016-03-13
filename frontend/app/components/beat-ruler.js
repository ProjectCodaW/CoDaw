import Ember from 'ember';

export default Ember.Component.extend({
  class: "beat-ruler",
  fontPercentage: 0.2,
  spacePercentage: 0.92,

  bgColors: ["#CC5151", "#A3CC51", "#391959", "#219186", "#BFB791"],

  text: function () {
    var pxPerMeasure = CD.view.pxPerTick*480*4;
    var nMeasures = WX.tick2mbst(CD.songLength).measure;
    console.log("n measures: " + nMeasures);
    var txt = '';
    for (var i = 1; i <= nMeasures + 1; i++) {
      if (i < 10) txt = txt + ('<div id="meas-' +
        i +
        '" class="transport-measure" ' +
        'style="position: absolute; ' +
        'justify-content: space-around; ' +
        'width: '+ pxPerMeasure+
        '; top: 0px; left: '+
        pxPerMeasure * (i - 1) +
        'px;' +
        'background-color: '+ this.bgColors[i%this.bgColors.length] +
        ';">' + '<strong>' + i + '</strong>' + '|||' + '</div>');
      else if (i < 100) txt = txt + ('<div id="meas-' + i +
        '" class="transport-measure" ' +
        'style="position: absolute; ' +
        'justify-content: space-around; ' +
        'width: '+ pxPerMeasure+ '; ' +
        'top: 0px; ' +
        'left: ' + (pxPerMeasure * (i - 1)) + 'px; ' +
        'background-color: '+ this.bgColors[i%this.bgColors.length] +';">' +
        '<span ' +
        'style="letter-spacing: 0px; ' +
        'font-size: ' + (this.fontSize() / 1.2).toFixed(2) + 'px; ' +
        'margin-right: '+this.letterSpacing()+'px; ' +
        '"><strong>' + i +
        '</strong></span>' + '|||' + '</div>');
      else if (i < 1000) txt = txt + ('<div id="meas-' + i + '" class="transport-measure" ' +
        'style="position: absolute; ' +
        'justify-content: space-around; ' +
        'width: '+ CD.view.pxPerTick * 480+
        '; ' +
        'top: 0px; left: '+
        pxPerMeasure * (i - 1) +'px;' +
        'background-color: '+ this.bgColors[i%this.bgColors.length] +'">' +
        '<span style="letter-spacing: 0px; ' +
        'font-size: ' + (this.fontSize() / 1.4).toFixed(2) + 'px;' +
        'margin-right: '+this.letterSpacing()+'px;">' +
        '<strong>' + i + '</strong></span>' + '|||' + '</div>');
    }
    return txt;
  },
  fontSize: function () {
    return ((CD.view.pxPerTick * 480) * this.fontPercentage);
  },
  letterSpacing: function () {
    return ((CD.view.pxPerTick * 480) * this.spacePercentage);
  },

  didInsertElement: function () {
    this.$().css({
      "font-size": this.fontSize(),
      "letter-spacing": this.letterSpacing(),
      //"width": CD.songLength * CD.view.pxPerTick
    });

    //this.$(this.id + ' .transport-measure .meas-double').css({
    //  "letter-spacing": this.letterSpacing()/2,
    //  "font-size": this.fontSize()/2,
    //});
    //this.$(this.id + ' .transport-measure .meas-triple').css({
    //  "letter-spacing": this.letterSpacing()/3,
    //  "font-size": this.fontSize()/3,
    //});
    for (var i = 1; i <= WX.tick2mbst(CD.songLength).measure; i++) {
      this.$('#meas-' + i).css({
        position: "absolute",
        top: 0,
        left: CD.view.pxPerTick * 480 * (i - 1)
      });
    }
    this.$().html(this.text());
  }


});
