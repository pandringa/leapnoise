var AppleScriptInterface = require("./applescript_interface.js");

var PlayPauseFilter = {
  filterType: "swipe",
  filterApplication: "", // Default to iTunes
  filterParameters: {
    state: "stop",
    // set a higher window so that we don't pick up the hand going back to rest
    // as reverting a volume change
    duplicateWindow: 1000
  },

  filter: function(gesture) {
    var dominantMovement = gesture.dominantMovement;
    if (dominantMovement.direction == "z" || dominantMovement.direction == "y") {
      // we only want this in one direction or you'll switch it when you
      // bring your arm back to neutral
      // z is front-to-back, so < 0 == away from your body
      if (dominantMovement.distance < 0) {
        AppleScriptInterface.exec('tell application "' + this.filterApplication + '" to playpause');
      }
    }
  }
}

module.exports = function(application){
  var filter = PlayPauseFilter;
  if(application && application != undefined)
    filter.filterApplication = application;
  return filter;
}
