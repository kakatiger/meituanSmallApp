var e = require("./utils.js"), t = Object.prototype.hasOwnProperty, r = {
    allowDots: !1,
    allowPrototypes: !1,
    arrayLimit: 20,
    decoder: e.decode,
    delimiter: "&",
    depth: 5,
    parameterLimit: 1e3,
    plainObjects: !1,
    strictNullHandling: !1
}, i = function(e, i) {
    for (var l = {}, o = i.ignoreQueryPrefix ? e.replace(/^\?/, "") : e, a = i.parameterLimit === 1 / 0 ? void 0 : i.parameterLimit, n = o.split(i.delimiter, a), c = 0; c < n.length; ++c) {
        var p, s, d = n[c], u = d.indexOf("]="), y = -1 === u ? d.indexOf("=") : u + 1;
        s = -1 === y ? (p = i.decoder(d, r.decoder), i.strictNullHandling ? null : "") : (p = i.decoder(d.slice(0, y), r.decoder), 
        i.decoder(d.slice(y + 1), r.decoder)), t.call(l, p) ? l[p] = [].concat(l[p]).concat(s) : l[p] = s;
    }
    return l;
}, l = function(e, t, r) {
    for (var i = t, l = e.length - 1; 0 <= l; --l) {
        var o, a = e[l];
        if ("[]" === a) o = (o = []).concat(i); else {
            o = r.plainObjects ? Object.create(null) : {};
            var n = "[" === a.charAt(0) && "]" === a.charAt(a.length - 1) ? a.slice(1, -1) : a, c = parseInt(n, 10);
            !isNaN(c) && a !== n && String(c) === n && 0 <= c && r.parseArrays && c <= r.arrayLimit ? (o = [])[c] = i : o[n] = i;
        }
        i = o;
    }
    return i;
}, o = function(e, r, i) {
    if (e) {
        var o = i.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, a = /(\[[^[\]]*])/g, n = /(\[[^[\]]*])/.exec(o), c = n ? o.slice(0, n.index) : o, p = [];
        if (c) {
            if (!i.plainObjects && t.call(Object.prototype, c) && !i.allowPrototypes) return;
            p.push(c);
        }
        for (var s = 0; null !== (n = a.exec(o)) && s < i.depth; ) {
            if (s += 1, !i.plainObjects && t.call(Object.prototype, n[1].slice(1, -1)) && !i.allowPrototypes) return;
            p.push(n[1]);
        }
        return n && p.push("[" + o.slice(n.index) + "]"), l(p, r, i);
    }
};

module.exports = function(t, l) {
    var a = l ? e.assign({}, l) : {};
    if (null !== a.decoder && void 0 !== a.decoder && "function" != typeof a.decoder) throw new TypeError("Decoder has to be a function.");
    if (a.ignoreQueryPrefix = !0 === a.ignoreQueryPrefix, a.delimiter = "string" == typeof a.delimiter || e.isRegExp(a.delimiter) ? a.delimiter : r.delimiter, 
    a.depth = "number" == typeof a.depth ? a.depth : r.depth, a.arrayLimit = "number" == typeof a.arrayLimit ? a.arrayLimit : r.arrayLimit, 
    a.parseArrays = !1 !== a.parseArrays, a.decoder = "function" == typeof a.decoder ? a.decoder : r.decoder, 
    a.allowDots = "boolean" == typeof a.allowDots ? a.allowDots : r.allowDots, a.plainObjects = "boolean" == typeof a.plainObjects ? a.plainObjects : r.plainObjects, 
    a.allowPrototypes = "boolean" == typeof a.allowPrototypes ? a.allowPrototypes : r.allowPrototypes, 
    a.parameterLimit = "number" == typeof a.parameterLimit ? a.parameterLimit : r.parameterLimit, 
    a.strictNullHandling = "boolean" == typeof a.strictNullHandling ? a.strictNullHandling : r.strictNullHandling, 
    "" === t || null == t) return a.plainObjects ? Object.create(null) : {};
    for (var n = "string" == typeof t ? i(t, a) : t, c = a.plainObjects ? Object.create(null) : {}, p = Object.keys(n), s = 0; s < p.length; ++s) {
        var d = p[s], u = o(d, n[d], a);
        c = e.merge(c, u, a);
    }
    return e.compact(c);
};