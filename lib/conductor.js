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

        var partTexts = _.map(parts, part => {
            return part.getText();
        });

        var joined = _.join(partTexts, ",\n   ");
        if (parts.length > 1) {
            currentText = `c1 $ stack [\n   ${joined}\n   ]`;
        } else {
            currentText = `c1 $ \n   ${joined}`;
        }

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

    function saySomething(){
      if (self.running) console.log('the magical world of computers');
      setTimeout(saySomething, random.int(7000,20000));
    }

}

module.exports = Conductor;
