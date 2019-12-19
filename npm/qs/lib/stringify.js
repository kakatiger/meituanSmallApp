var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(o) {
    return void 0 === o ? "undefined" : e(o);
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : void 0 === o ? "undefined" : e(o);
}, t = "function" == typeof Symbol && "symbol" === o(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : o(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : o(e);
}, n = require("./utils.js"), r = require("./formats.js"), i = {
    brackets: function(e) {
        return e + "[]";
    },
    indices: function(e, o) {
        return e + "[" + o + "]";
    },
    repeat: function(e) {
        return e;
    }
}, l = Date.prototype.toISOString, f = {
    delimiter: "&",
    encode: !0,
    encoder: n.encode,
    encodeValuesOnly: !1,
    serializeDate: function(e) {
        return l.call(e);
    },
    skipNulls: !1,
    strictNullHandling: !1
}, a = function e(o, t, r, i, l, a, u, c, s, y, d, p) {
    var m = o;
    if ("function" == typeof u) m = u(t, m); else if (m instanceof Date) m = y(m); else if (null === m) {
        if (i) return a && !p ? a(t, f.encoder) : t;
        m = "";
    }
    if ("string" == typeof m || "number" == typeof m || "boolean" == typeof m || n.isBuffer(m)) return a ? [ d(p ? t : a(t, f.encoder)) + "=" + d(a(m, f.encoder)) ] : [ d(t) + "=" + d(String(m)) ];
    var b, v = [];
    if (void 0 === m) return v;
    if (Array.isArray(u)) b = u; else {
        var S = Object.keys(m);
        b = c ? S.sort(c) : S;
    }
    for (var g = 0; g < b.length; ++g) {
        var O = b[g];
        l && null === m[O] || (v = Array.isArray(m) ? v.concat(e(m[O], r(t, O), r, i, l, a, u, c, s, y, d, p)) : v.concat(e(m[O], t + (s ? "." + O : "[" + O + "]"), r, i, l, a, u, c, s, y, d, p)));
    }
    return v;
};

module.exports = function(e, o) {
    var l = e, u = o ? n.assign({}, o) : {};
    if (null !== u.encoder && void 0 !== u.encoder && "function" != typeof u.encoder) throw new TypeError("Encoder has to be a function.");
    var c = void 0 === u.delimiter ? f.delimiter : u.delimiter, s = "boolean" == typeof u.strictNullHandling ? u.strictNullHandling : f.strictNullHandling, y = "boolean" == typeof u.skipNulls ? u.skipNulls : f.skipNulls, d = "boolean" == typeof u.encode ? u.encode : f.encode, p = "function" == typeof u.encoder ? u.encoder : f.encoder, m = "function" == typeof u.sort ? u.sort : null, b = void 0 !== u.allowDots && u.allowDots, v = "function" == typeof u.serializeDate ? u.serializeDate : f.serializeDate, S = "boolean" == typeof u.encodeValuesOnly ? u.encodeValuesOnly : f.encodeValuesOnly;
    if (void 0 === u.format) u.format = r.default; else if (!Object.prototype.hasOwnProperty.call(r.formatters, u.format)) throw new TypeError("Unknown format option provided.");
    var g, O, k = r.formatters[u.format];
    "function" == typeof u.filter ? l = (O = u.filter)("", l) : Array.isArray(u.filter) && (g = O = u.filter);
    var w, D = [];
    if ("object" !== (void 0 === l ? "undefined" : t(l)) || null === l) return "";
    w = u.arrayFormat in i ? u.arrayFormat : "indices" in u ? u.indices ? "indices" : "repeat" : "indices";
    var N = i[w];
    g || (g = Object.keys(l)), m && g.sort(m);
    for (var h = 0; h < g.length; ++h) {
        var j = g[h];
        y && null === l[j] || (D = D.concat(a(l[j], j, N, s, y, d ? p : null, O, m, b, v, k, S)));
    }
    var A = D.join(c), z = !0 === u.addQueryPrefix ? "?" : "";
    return 0 < A.length ? z + A : "";
};