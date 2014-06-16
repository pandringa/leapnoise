var Leap = require('leapjs');
var BlueGel = require("bluegel");

var filter = new BlueGel(new Leap.Controller({enableGestures: true}));

var enabledApplications = ['iTunes', 'Rdio', 'Spotify'];

// Default values
var application = 'Rdio',
	minDuration = 500;

for(var i=0; i<process.argv.length; i++){
	var arg = process.argv[i];
	var index = enabledApplications.indexOf(arg);
	if(index >= 0) application = enabledApplications[i];

	if( i+1 < process.argv.length && (arg == "--activation" || arg == "--minDuration"))
		minDuration = parseInt( process.argv[i+1] );
};

// import and set up our three filter types
var filterTypes = [
  require("./lib/playpause_filter.js")(application),
  require("./lib/volume_filter.js")(application),
  require("./lib/track_filter.js")(application)
];

var activationFilter = require("./lib/activation_filter.js");

for (var i = 0; i < filterTypes.length; i++) {
  action = filterTypes[i];
  filter.on(action.filterType, action.filterParameters, activationFilter.filter(action));
}

filter.on("hold", {state: "start", minDuration: minDuration}, function(gesture) {
  // the update event will be fired once the hold reaches the minimum duration
  console.log("Activating control!");
  activationFilter.activate();
});
