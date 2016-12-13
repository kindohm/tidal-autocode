'use babel';

import Chunk from './chunk';
import UnitChunk from './unitChunk';

var indexMinWait = 10000;
var indexMaxWait = 30000;
var cutMinWait = 10000;
var cutMaxWait = 30000;
var transformMinWait = 15000;
var transformMaxWait = 40000;
var unitMinWait = 15000;
var unitMaxWait = 40000;
var sampleMinWait = 20000;
var sampleMaxWait = 50000;

function Part(name) {

    var self = this;
    var numberOfTransformChunks = 5;
    var numberOfUnitChunks = 4;
    var currentText = '';
    var running = false;
    var soundIndexChunk = new Chunk('soundIndexChunk', 'soundIndex', indexMinWait, indexMaxWait);
    var cutChunk = new Chunk('cutChunk', 'cut', cutMinWait, cutMaxWait);
    var allChunks = [soundIndexChunk, cutChunk];
    var transformChunks = [];
    var unitChunks = [];

    for (var i = 0; i < numberOfTransformChunks; i++){
      var t = new Chunk('transformChunk', 'transform ' + i.toString(), transformMinWait, transformMaxWait);
      transformChunks.push(t);
      allChunks.push(t);
    }

    for (var i = 0; i < numberOfUnitChunks; i++){
      var u = new UnitChunk('unit ' + i.toString(), unitMinWait, unitMaxWait, sampleMinWait, sampleMaxWait);
      unitChunks.push(u);
      allChunks.push(u);
    }

    for (var i = 0; i < allChunks.length; i++) {
        allChunks[i].on('changed', chunkChanged);
    }

    if (!name) {
        name = Math.floor(Math.random() * 5000);
    }

    self.events = {
        "changed": []
    };

    self.start = function() {
        running = true;
        for (var i = 0; i < allChunks.length; i++) {
            allChunks[i].start();
        }
    };

    self.stop = function() {
        running = false;
        for (var i = 0; i < allChunks.length; i++) {
            allChunks[i].stop();
        }
    };

    self.on = function(eventName, callback) {
        if (self.events[eventName]) {
            self.events[eventName].push(callback);
        }
    };

    self.getText = function() {
        return currentText;
    };

    function chunkChanged() {
        if (!running) return;

        currentText = '';
        for (var i = 0; i < transformChunks.length; i++){
          if (transformChunks[i].getText() !== ''){
            currentText += `${transformChunks[i].getText()}\n      `;
          }
        }

        currentText += 'slow 2 $ s \"';

        for (var i = 0; i < unitChunks.length; i++){
          currentText += unitChunks[i].getText() + ' ';
        }

        currentText += `\"\n      ${soundIndexChunk.getText()}\n      ${cutChunk.getText()}`;

        self.events["changed"]
            .forEach(function(item) {
                item(currentText);
            });
    }

}

module.exports = Part;
