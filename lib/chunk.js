'use babel';

var tracery = require('tracery-grammar');

function Chunk(chunkType, name, minWait, maxWait) {

  var grammar;
  var self = this;
  var currentText = '';
  var running = false;

  var grammarSpec = require(`./../tracery/${chunkType}`);
  grammar = tracery.createGrammar(grammarSpec);

  if (!name) {
    name = Math.floor(Math.random() * 5000);
  }

  self.events = {
    "changed": []
  };

  self.start = function(){
    running = true;
    change();
  };

  self.stop = function(){
    running = false;
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
    var source = `#origin#`;
    var text = `${grammar.flatten(source)}`;
    return text;
  }

  function change() {
    if (!running) return;
    currentText = generate();
    console.log(`Chunk "${name}" changed`);
    self.events["changed"]
      .forEach(function(item) {
        item();
      });
    var interval = Math.floor(Math.random() * maxWait) + minWait;
    setTimeout(change, interval);
  }

  change();

}

module.exports = Chunk;
