function n(n) {
    var e = [];
    for (var r in n) n.hasOwnProperty(r) && e.push(encodeURIComponent(r) + "=" + encodeURIComponent(n[r]));
    return e.join("&");
}

function e(n) {
    if (n && t.push(n), 1 < t.length && n) ; else {
        var r = t[0], o = r.complete;
        r.complete = function(n) {
            t.shift(), t.length && e(), o && o.call(this, n);
        }, wx.request(r);
    }
}

function r() {
    return 65535 * Math.random();
}

function o() {
    return Math.ceil(r()).toString(16);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.serialize = n, exports.requestQueue = e, exports.rnd = r, exports.rndSeed = o, 
exports.MSID = function() {
    var n = [], e = new Date().getTime();
    return n.push(e.toString(16)), n.push(o()), n.push(o()), n.push(o()), n.join("-");
}, exports.getReportVersions = function(e) {
    var r = e.wxAppVersion, o = void 0 === r ? "Unknown" : r, t = e.version, i = t.wxVersion, s = void 0 === i ? "Unknown" : i, u = t.wxLibVersion;
    return n({
        wxVersion: s,
        wxLibVersion: void 0 === u ? "Unknown" : u,
        wxAppVersion: o
    });
}, exports.stringify = function(n, e) {
    if (!e) return n;
    var r = [];
    for (var o in e) e.hasOwnProperty(o) && r.push(o + "=" + e[o]);
    return ~n.indexOf("?") ? n + "&" + r.join("&") : n + "?" + r.join("&");
}, exports.extend = function(n, e) {
    var r = {}, o = void 0;
    for (o in n) r[o] = n[o];
    for (o in e) e.hasOwnProperty(o) && void 0 !== e[o] && (r[o] = e[o]);
    return r;
};

var t = [];