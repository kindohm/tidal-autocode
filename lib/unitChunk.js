'use babel';

var tracery = require('tracery-grammar');
var random = require('./random');

function UnitChunk(name, minWait, maxWait, minSampleWait, maxSampleWait) {

  var samples = getSamples().split(',');
  console.log('samples', samples);
  var grammar;
  var self = this;
  var currentText = '';
  var running = false;
  var timeout;

  var grammarSpec = require(`./../tracery/unitChunk`);
  grammar = tracery.createGrammar(grammarSpec);

  var sample = getNewSample();

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
    var vals = [1,2,2,4,8];
    var mult = vals[random.int(0,vals.length)];
    return `${sample}*${mult}`;
  }

  function getSamples() {
       return atom.config.get('tidal-autocode.samples');
  }

  function getNewSample(){
    return samples[random.int(0,samples.length)].trim(); // grammar.flatten("#samples#");
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

      sample = getNewSample(); //grammar.flatten("#samples#");
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
