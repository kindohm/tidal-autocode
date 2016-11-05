'use babel';

import TidalAutocodeGrammar from './tidal-autocode-grammar';

var tracery = require('tracery-grammar');

export default {

  evalGrammar: function(){
    var grammar = tracery.createGrammar(TidalAutocodeGrammar);
    var text = grammar.flatten('#origin#');
    return text;
  }

}
