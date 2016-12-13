# TidalCycles Auto-Coder

Auto-generates sound patterns for the
[TidalCycles livecoding environment](http://tidalcycles.org).

Brief demo: [youtube.com/watch?v=wSqE23WgwYE](https://www.youtube.com/watch?v=wSqE23WgwYE).

## How to use

### Configure samples
In the package config, enter a comma-separated list of samples to use:

`bd, sd, drum, arpy, awesome, awful, bass, hoover`

### Start and stop

- start: `ctrl-alt-y`
- stop: `ctrl-alt-u`
- pause: `ctrl-alt-i`

Create a new file with a `.tidal` extension. Start the auto-coder with `ctrl-alt-y`.
The auto-coder will start up TidalCycles and generate code automatically in
your editor. You are now hands-free!

Stop the auto-coder with `ctrl-alt-u`. This will stop code generation **and**
hush all sounds.

Experimental Pause feature: `ctrl-alt-i`. This will pause the code generation,
but Tidal and Dirt will keep playing. Re-start code generation with the *start*
command `ctrl-alt-y`.

### Use SuperDirt or Classic Dirt
Find the "Dirt Prefix" config setting, and enter `d` for SuperDirt or `c` for
Classic Dirt.

## Informative messages

Interesting information about what the auto-coder is doing can be found in
the Atom console output. You can view this output by enabling the developer
tools with the Toggle Developer Tools command `ctrl-shift-i`, then click
the Console tab.

## FAQ
**Can the code history be saved?**

No, not yet. In experimental builds, new code was appended and the
history was maintained. However, the file gets ridiculously long and Atom gets
mad.

**Can I use my own samples?**

Yes, see instructions above.

**Can I use Dirt or SuperDirt?**

See instructions above on configuring for either.

**Can I use Tidal-MIDI?**

Not yet.

**Can I modify the templates used to generate code?**

Not yet. Everything is in Tracery JSON files, but you can't specify your own
files (yet). If you are ambitious, you can modify the JSON files in the `tracery/`
folder, restart Atom, and see what happens.
