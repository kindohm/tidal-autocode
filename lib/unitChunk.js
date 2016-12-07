'use babel';

var tracery = require('tracery-grammar');
var random = require('./random');

function UnitChunk(name, minWait, maxWait, minSampleWait, maxSampleWait) {

  var grammar;
  var self = this;
  var currentText = '';
  var running = false;
  var timeout;

  var grammarSpec = require(`./../tracery/unitChunk`);
  grammar = tracery.createGrammar(grammarSpec);

  var sample = grammar.flatten("#samples#");

  if (!name) {
    name = random.int(1000,9000);
  }

  self.events = {
    "changed": []
  };

  self.start = function(){
    running = true;
    change();
    changeSample();
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
    var mult = random.int(1,7);
    if (random.int(1,100) > 70){
      return `${sample}(${random.int(3,7)},8)`;
    }else{
      return `${sample}*${mult}`;
    }
  }

  function change() {
    if (!running) return;
    currentText = generate();
    console.log(`${name} changed to ${currentText}`);
    self.events["changed"]
      .forEach(function(item) {
        item();
      });
    var interval = random.int(minWait, maxWait);
    timeout = setTimeout(change, interval);
  }

  function changeSample(){
    if (!running) return;

    if (random.int(1,1000) > 900){
      console.log(`${name} is going to lay out.`);
      clearTimeout(timeout);
      currentText = '';
      setTimeout(function(){
        console.log(`${name} is back in.`);
        change();
        changeSample();
      }, random.int(15000,30000));
    }else{

      sample = grammar.flatten("#samples#");
      console.log(`${name} changed its sample to ${sample}`);
      currentText = generate();
      self.events["changed"]
        .forEach(function(item) {
          item();
        });
      var interval = random.int(minSampleWait, maxSampleWait);
      setTimeout(changeSample, interval);
    }
  }

}

module.exports = UnitChunk;
