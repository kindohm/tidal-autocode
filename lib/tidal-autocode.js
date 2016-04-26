'use babel';

import TidalAutocodeGrammar from './tidal-autocode-grammar';
import { CompositeDisposable } from 'atom';

var tracery = require('tracery-grammar');

export default {
  subscriptions: null,

  config: {
    "sampleList": {
      type: "string",
      default: "bd,sn,hh,odx,drum,arpy,jvbass,~"
    }
  },

  activate(state) {

    // load samples from config
    var sampleList = atom.config.get("tidal-autocode.sampleList").split(",");
    TidalAutocodeGrammar.s = [];
    for (var i = 0; i < sampleList.length; i++){
      var sample = sampleList[i].trim();
      TidalAutocodeGrammar.s.push(`${sample}`);
    }

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tidal-autocode:generate': () => this.generate()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {};
  },

  generate() {
    console.log('TidalAutocode was toggled!');

    var editor = atom.workspace.getActiveTextEditor();
    if (editor){
      var grammar = tracery.createGrammar(TidalAutocodeGrammar);
      var text = grammar.flatten('#origin#');
      editor.insertText(`${text}`)
    }
  }

};
