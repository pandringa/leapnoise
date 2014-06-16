var Leap = require('leapjs');
var BlueGel = require("bluegel");

var filter = new BlueGel(new Leap.Controller({enableGestures: true}));

var enabledApplications = ['iTunes', 'Rdio', 'Spotify'];

var application, minDuration;
process.argv.forEach(function(arg){
	var i = enabledApplications.indexOf(arg)
	if(i >= 0) application = enabledApplications[i];
});
// If none match, the filters have built-in defaults

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

filter.on("hold", {state: "start", minDuration: 500}, function(gesture) {
  // the update event will be fired once the hold reaches the minimum duration
  console.log("Activating control!");
  activationFilter.activate();
});
