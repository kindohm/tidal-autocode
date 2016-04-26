'use babel';

import TidalAutocodeView from './tidal-autocode-view';
import { CompositeDisposable } from 'atom';

export default {

  tidalAutocodeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tidalAutocodeView = new TidalAutocodeView(state.tidalAutocodeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tidalAutocodeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tidal-autocode:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tidalAutocodeView.destroy();
  },

  serialize() {
    return {
      tidalAutocodeViewState: this.tidalAutocodeView.serialize()
    };
  },

  toggle() {
    console.log('TidalAutocode was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
