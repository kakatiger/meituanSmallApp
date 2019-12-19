var t = function(t, r) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return function(t, r) {
        var e = [], n = !0, a = !1, i = void 0;
        try {
            for (var o, u = t[Symbol.iterator](); !(n = (o = u.next()).done) && (e.push(o.value), 
            !r || e.length !== r); n = !0) ;
        } catch (t) {
            a = !0, i = t;
        } finally {
            try {
                !n && u.return && u.return();
            } finally {
                if (a) throw i;
            }
        }
        return e;
    }(t, r);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, r = require("./starts-with.js"), e = function() {
    try {
        var t = top.document.createElement("canvas");
        t.width = 1, t.height = 1;
        var e = t.toDataURL("image/webp");
        return r(e, "data:image/webp");
    } catch (t) {
        return !1;
    }
}(), n = /^https?:\/\/p\d\.meituan.net\//, a = /^\d+\.\d+\./, i = 0, o = function(t) {
    var r = t / 750;
    return Math.min(Math.max(.2, .2 * Math.round(r / .2)), 2);
};

module.exports = function(r) {
    var u = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, h = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0, c = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 80;
    if (!r) return r;
    if (0 === i) {
        var d = getApp().store.getState().wx, l = d.windowWidth, v = d.pixelRatio;
        0 < l && 0 < v && (i = o(l * v));
    }
    var s = u, f = h;
    0 !== i && (s = Math.round(i * u), f = Math.round(i * h));
    var p = n.exec(r);
    if (!p) return r;
    var w = t(p, 1)[0], m = r.slice(w.length);
    if (a.test(m)) return r;
    var g = "" + w + s + "." + f + "." + c + "/" + m, y = ".webp" === r.slice(-5);
    return !e || y ? g : g + ".webp";
};