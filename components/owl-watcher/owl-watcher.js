var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
}, t = require("../../utils/get-page-url.js");

module.exports = function(r) {
    return e({}, r, {
        addSpeedTrackStartTime: function(e) {
            getApp().owl.pageSpeed.start(t(), e);
        },
        addSpeedTrackEndTime: function(e) {
            getApp().owl.pageSpeed.end(t(), e);
        },
        addWatcherSpeedPoint: function(e, r) {
            getApp().owl.pageSpeed.addPoint({
                position: e,
                duration: Date.now() - r
            }, t());
        }
    });
};