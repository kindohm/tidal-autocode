'use babel';

//import partGrammar from './part-grammar2';
import Chunk from './chunk';
//var tracery = require('tracery-grammar');

function Part(name) {

    var self = this;
    var currentText = '';
    var cutGroup = Math.floor(Math.random() * 5000);
    var running = false;
    var soundChunk = new Chunk('soundChunk', 'sound', 30000, 60000);
    var soundIndexChunk = new Chunk('soundIndexChunk', 'soundIndex', 7000, 20000);
    var cutChunk = new Chunk('cutChunk', 'cut', 7000, 20000);
    var allChunks = [soundChunk, soundIndexChunk, cutChunk];

    var transformChunks = [];
    for (var i = 0; i < 5; i++){
      var t = new Chunk('transformChunk', 'transform ' + i.toString(), 7000, 20000);
      transformChunks.push(t);
      allChunks.push(t);
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
        // change();
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

        console.log(`Part "${name}" changed`);

        currentText = '';
        for (var i = 0; i < transformChunks.length; i++){
          currentText += transformChunks[i].getText() + '\n';
        }

        currentText += soundChunk.getText() + ' ' +
            soundIndexChunk.getText() + ' ' +
            cutChunk.getText();

        self.events["changed"]
            .forEach(function(item) {
                item(currentText);
            });
    }

    // function generate() {
    //     var sep = '\n   ';
    //     var grammar = tracery.createGrammar(partGrammar);
    //     var text = `${grammar.flatten('#sound#')}${sep}${grammar.flatten('#soundindex#')}${sep}${grammar.flatten("#cut#")}`;
    //     return `${text}`;
    // }

    // function change() {
    //     if (!running) return;
    //     currentText = generate();
    //     console.log(`Part "${name}" changed`);
    //     self.events["changed"]
    //         .forEach(function(item) {
    //             item();
    //         });
    //     var interval = Math.floor(Math.random() * 16000) + 4000;
    //     setTimeout(change, interval);
    // }
    //
    // change();

}

module.exports = Part;
