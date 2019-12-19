var e = require("../actions/wx.js"), t = require("../store.js"), n = require("../npm/promise-polyfill/promise.js"), o = require("../utils/fix-coords.js"), r = require("../utils/wx.js"), i = require("../utils/object-assign.js"), u = r.getUserInfo, s = r.getSystemInfo, c = r.getNetworkType, g = r.getLocation, a = function(n) {
    return getApp().store && getApp().store !== t && (t = getApp().store), t.dispatch((0, 
    e.set)(n)), n;
}, p = {
    onAccelerometerChange: function() {
        return new n(function(e, t) {
            setTimeout(t, 500), wx.onAccelerometerChange(e);
        });
    },
    onCompassChange: function() {
        return new n(function(e, t) {
            setTimeout(t, 500), wx.onCompassChange(e);
        });
    },
    getUserInfo: u,
    getSystemInfo: s,
    getNetworkType: c
}, f = Object.keys(p).reduce(function(e, t) {
    var n = p[t];
    return e[t] = function(e) {
        return n(e).then(a);
    }, e;
}, {});

f.getLocation = function() {
    return g({
        type: "gcj02"
    }).then(function(e) {
        var t = o(e), n = t.latitude, r = t.longitude, u = i({}, e, {
            latitude: n,
            longitude: r,
            orig_latitude: e.latitude,
            orig_longitude: e.longitude
        });
        return a(u), u;
    });
}, "undefined" != typeof top && setTimeout(function() {
    try {
        var e = top.navigator.userAgent;
        a({
            ua: e
        });
    } catch (e) {
        console.error(e);
    }
}), module.exports = i({}, r, f);