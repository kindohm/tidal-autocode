'use babel';

import partGrammar from './part-grammar';
var tracery = require('tracery-grammar');

function Part(name) {

  var self = this;
  var currentText = '';
  var cutGroup = Math.floor(Math.random() * 5000);

  if (!name) {
    name = Math.floor(Math.random() * 5000);
  }

  self.events = {
    "changed": []
  };

  self.on = function(eventName, callback) {
    if (self.events[eventName]) {
      self.events[eventName].push(callback);
    }
  };

  self.getText = function() {
    return currentText;
  };

  function generate() {
    var grammar = tracery.createGrammar(partGrammar);
    var text = grammar.flatten('#origin#');
    return `${text} |=| cut "${cutGroup}"`;
  }

  function change() {
    currentText = generate();
    console.log(`Part "${name}" changed to ${currentText}`);
    self.events["changed"]
      .forEach(function(item) {
        item();
      });
    var interval = Math.floor(Math.random() * 24000) + 8000;
    setTimeout(change, interval);
  }

  change();

}

module.exports = Part;
