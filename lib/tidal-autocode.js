'use babel';

import raver from './raver';
import { CompositeDisposable } from 'atom';
import Conductor from './conductor';

var interval;

export default {
  subscriptions: null,
  // config: {
  //   "sampleList": {
  //     type: "string",
  //     default: "bd,sn,hh,odx,drum,arpy,jvbass,~"
  //   }
  // },

  activate: function(state) {

    // load samples from config
    // var sampleList = atom.config.get("tidal-autocode.sampleList").split(",");

    //c1 $ whenmod 8 6 (|=| vowel "u o") $ (sound $ samples "{saw/2 sq*3 s/2 s*3}%8" (whenmod 5 3 (density 4) $ run 5)) |=| gain "1" |=| delay "0.125 0.0625 0.125 0 0" |=| gain "1" |=| cut "5"TidalAutocodeGrammar.s = [];
    // for (var i = 0; i < sampleList.length; i++){
    //   var sample = sampleList[i].trim();
    //   TidalAutocodeGrammar.s.push(`${sample}`);
    // }

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tidal-autocode:generate': () => this.generate()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tidal-autocode:remix': () => this.remix()
    }));
  },

  deactivate: function() {
    this.subscriptions.dispose();
  },

  serialize: function() {
    return {};
  },

  generate: function() {
    var self = this;
    console.log('TidalAutocode was toggled!');

    var editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      var text = raver.evalGrammar();
      editor.insertText(`${text}`);
    }
  },

  remix: function() {
    console.log('REMIX TOGGLED');


    var editor = atom.workspace.getActiveTextEditor();
    if (editor) {

      var conductor = new Conductor();
      window.conductor = conductor;

      setTimeout(function(){
        var newText = conductor.getText();
        editor.setText(`${newText}`);
        editorView = atom.views.getView(editor);
        atom.commands.dispatch(editorView, 'tidalcycles:eval-multi-line');
      }, 500);

      conductor.on('changed', function(newText){
        editor.setText(`${newText}`);
        editorView = atom.views.getView(editor);
        atom.commands.dispatch(editorView, 'tidalcycles:eval-multi-line');
      });


    }

  }

}
