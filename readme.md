LeapNoise
=======

A simple LeapMotion app for controlling iTunes/Rdio/Spotify via AppleScript, built using the
[BlueGel](http://github.com/arsduo/bluegel.js) framework.

Usage:

Start with `npm start` (after `npm install`, of course). 
It defaults to Rdio, but to use iTunes/Spotify  run with the application name (e.g. `npm start iTunes`)
If you want to change the default activation time, add the '-activation' flag (e.g. `npm start iTunes -activation 500`)


* To enable gesture control, hold you hand in place over the sensor for a second. 
* To move tracks, swipe forward and backward.
* To play/pause, swipe away from your body (quickly, like you're poking
someone), or press down.
