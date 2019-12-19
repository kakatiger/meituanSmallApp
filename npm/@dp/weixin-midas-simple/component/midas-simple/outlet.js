var r = require("./event.js"), e = require("./utils.js");

exports.triggerScroll = r.triggerScroll, exports.clearImpression = function(r) {
    e.clearImpression(r);
}, exports.clearAllImpression = function() {
    e.clearAllImpression();
};