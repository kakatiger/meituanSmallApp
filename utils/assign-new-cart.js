function r(r, e, t) {
    return e in r ? Object.defineProperty(r, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : r[e] = t, r;
}

function e(r) {
    if (Array.isArray(r)) {
        for (var e = 0, t = Array(r.length); e < r.length; e++) t[e] = r[e];
        return t;
    }
    return Array.from(r);
}

var t = Object.assign || function(r) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (r[n] = t[n]);
    }
    return r;
}, n = require("./object-assign.js");

module.exports = function(a, o, i, c, u) {
    var f = [ t({}, o, {
        cart: a
    }) ].concat(e(i.slice(1)));
    return n({}, c, r({}, u, f));
};