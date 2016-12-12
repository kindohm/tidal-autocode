# tidal-autocode package for Atom

Auto-generates sound patterns for the
[TidalCycles livecoding environment](http://tidalcycles.org).

## How to use

- Specify a comma-separated list of samples to use in the package config:

`bd, sd, drum, arpy, awesome, awful, bass, hoover`

- Start the auto-coder with `ctrl-alt-y` (`cmd-alt-y` on Mac)

- Stop the auto-coder with `ctrl-alt-u` (`cmd-alt-y` on Mac)

- Experimental Pause feature: `ctrl-alt-i` (`cmd-alt-i` on Mac)

## FAQ

**Can the code history be saved?**
No, not yet. In experimental builds, new code generations were appended and the
history was maintained. However, the file gets ridiculously long and Atom starts
to run out of memory.

**Can I use my own samples?**
Yes, see instructions above.

**Can I use Dirt or SuperDirt?**
By default it is using classic Dirt with `c1`. This will be configurable in the
future.

There is no support for SuperDirt
yet, but if you really want to you can modify the source code. View the package
code in atom, and find this bit of code in `conductor.js`:

`partTexts += '\n   c' + (i+1).toString() + ' $ \n      ' + parts[i].getText();`

and change the `c` character to `d`:

`partTexts += '\n   d' + (i+1).toString() + ' $ \n      ' + parts[i].getText();`

Save, then restart Atom. Then it will work with SuperDirt.
