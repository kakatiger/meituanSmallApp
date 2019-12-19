var e = require("./enum.js");

exports.getBaseUrl = function(r) {
    var t = r.serverType, n = r.env, o = e.SERVER_TYPE_URL[t] || e.SERVER_TYPE_URL[e.SERVER_TYPE.DIANPING];
    return (r.ishttps ? "https:" : "http:") + (o[n] || o[e.ENV.PRODUCT]);
};

var r = -1;

wx.getNetworkType({
    success: function(t) {
        var n = String(t.networkType).toLowerCase();
        r = e.NETWORK_TYPE[n];
    }
});

var t = /(?:^|&)act=[^?&=]*/gi;

exports.buildActionUrl = function(e, n, o, s) {
    var a = "";
    return a += "&actTime=" + new Date().valueOf() + "&net_type=" + r, e.replace(t, ""), 
    e + a + "&act=" + o;
}, exports.getCurrentPageName = function() {
    var e = getCurrentPages(), r = e[e.length - 1];
    return String(r && r.route);
};

var n = [];

exports.addCleanImpressionFn = function(e) {
    n.push(e);
}, exports.clearImpression = function(e) {
    e || (e = exports.getCurrentPageName()), n.forEach(function(r) {
        r && r(e);
    });
}, exports.clearAllImpression = function() {
    n.forEach(function(e) {
        e && e(null, !0);
    });
}, exports.removeCleanImpressionFn = function(e) {
    for (var r = n.length; -1 < r; r--) n[r] === e && n.splice(r, 1);
};