'use babel';

var tracery = require('tracery-grammar');
var random = require('./random');

function Chunk(chunkType, name, minWait, maxWait) {

  var grammar;
  var self = this;
  var currentText = '';
  var running = false;
  var canSleep = chunkType === 'transformChunk';

  var grammarSpec = require(`./../tracery/${chunkType}`);
  grammar = tracery.createGrammar(grammarSpec);

  if (!name) {
    name = random.int(1000,9000);
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

    if (canSleep && random.int(0,1000) > 700){
      console.log(`${name} is going to lay out.`);
      return '';
    }

    var source = `#origin#`;
    var text = `${grammar.flatten(source)}`;
    return text;
  }

  function change() {
    if (!running) return;
    currentText = generate();
    console.log(`${name} made a change.`);
    self.events["changed"]
      .forEach(function(item) {
        item();
      });
    var interval = random.int(minWait, maxWait);
    setTimeout(change, interval);
  }

  change();
}

module.exports = Chunk;
