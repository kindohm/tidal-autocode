'use babel';

import TidalAutocode from '../lib/tidal-autocode';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('TidalAutocode', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('tidal-autocode');
  });

  describe('when the tidal-autocode:generate event is triggered', () => {

    it('is a bad test', () => {
    });

  });

});
