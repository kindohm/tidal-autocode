'use babel';

import raver from './raver';
import {
    CompositeDisposable
} from 'atom';
import Conductor from './conductor';

var conductor;

export default {
    subscriptions: null,

    config: {
           "samples": {
               type: "string",
               default: "k, b, cp, ch, peri"
           },
           "dirtPrefix":{
             type: "string",
             default: "d",
             title: "Dirt Prefix",
             description: "Enter 'd' if you use d1. Enter 'c' if you use c1."
           },
           "numberOfPatterns":{
             type: "integer",
             default: 1
           }
       },
    activate: function(state) {

        this.subscriptions = new CompositeDisposable();

        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'tidal-autocode:start': () => this.start(),
            'tidal-autocode:stop': () => this.stop(),
            'tidal-autocode:pause': () => this.pause()
        }));
    },

    deactivate: function() {
        this.subscriptions.dispose();
    },

    serialize: function() {
        return {};
    },

    stop: function() {
        console.log('autocode stop');
        atom.commands.dispatch(editorView, 'tidalcycles:hush');
        if (conductor) conductor.stop();
    },

    pause: function(){
      console.log('autocode pause');
      if (conductor && conductor.running){
        conductor.stop();
      }
    },

    start: function() {
        if (conductor && conductor.running) {
            console.log('already running');
            return;
        }
        console.log('autocode start');

        var editor = atom.workspace.getActiveTextEditor();
        if (editor) {

            if (!conductor) {
                conductor = new Conductor();

                conductor.on('changed', function(newText) {
                    // editor.setText(`${newText}\n\n${editor.getText()}`);
                    editor.setText(`${newText}`);
                    editor.moveToTop();
                    editorView = atom.views.getView(editor);
                    atom.commands.dispatch(editorView, 'tidalcycles:eval-multi-line');
                });
            }

            conductor.start();

        }

    }

}
