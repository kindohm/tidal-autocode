'use babel';

import Part from './part';
var _ = require('lodash');

function Conductor() {
  var self = this;
  var currentText = '';
  var parts = [];
  for (var i = 0; i < 4; i++) {
    var part = new Part();
    part.on('changed', partChanged);
    parts.push(part);
  }

  self.events = {
    "changed": []
  };


  function partChanged() {
    console.log('conductor.partChanged()');
    var partTexts = _.map(parts, part => {
      return part.getText();
    });

    var joined = _.join(partTexts, ",\n");
    currentText = `c1 $ stack [\n${joined}\n]`;

    self.events["changed"]
      .forEach(function(item) {
        item(currentText);
      });
  }

  self.getText = function(){
    return currentText;
  };



  self.on = function(eventName, callback) {
    if (self.events[eventName]) {
      self.events[eventName].push(callback);
    }
  };

  partChanged();

}

module.exports = Conductor;
