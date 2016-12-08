'use babel';

import Part from './part';
import random from './random';
var _ = require('lodash');

function Conductor() {
    var self = this;
    var currentText = '';
    var parts = [];

    self.running = false;
    var partCount = 1;
    for (var i = 0; i < partCount; i++) {
        var part = new Part(i.toString());
        part.on('changed', partChanged);
        parts.push(part);
    }

    self.events = {
        "changed": []
    };

    function partChanged() {
        if (!self.running) return;

        var partTexts = 'do';
        for (var i = 0; i < parts.length; i++){
          partTexts += '\n   c' + (i+1).toString() + ' $ \n      ' + parts[i].getText();
        }

        // var joined = _.join(partTexts, ",\n   ");
        // if (parts.length > 1) {
        //     currentText = `c1 $ stack [\n   ${joined}\n   ]`;
        // } else {
        //     currentText = `c1 $ \n   ${joined}`;
        // }
        currentText = partTexts;

        self.events["changed"]
            .forEach(function(item) {
                item(currentText);
            });
    }

    self.getText = function() {
        return currentText;
    };

    self.start = function() {
        self.running = true;
        for (var i = 0; i < parts.length; i++) {
            parts[i].start();
        }
        partChanged();
    };

    self.stop = function() {
        self.running = false;
        for (var i = 0; i < parts.length; i++) {
            parts[i].stop();
        }
    };

    self.on = function(eventName, callback) {
        if (self.events[eventName]) {
            self.events[eventName].push(callback);
        }
    };

    partChanged();
    saySomething();

    var messages = [`the magical world of computers`,
      `my computer hasn't made this sound since the last time`,
      `science!`,
      `computer music.`,
      `love songs for robots.`];

    function saySomething(){
      if (self.running) console.log(messages[random.int(0,messages.length)]);
      setTimeout(saySomething, random.int(7000,20000));
    }

}

module.exports = Conductor;
