var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r) {
    return typeof r;
} : function(r) {
    return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
}, o = "function" == typeof Symbol && "symbol" == r(Symbol.iterator) ? function(o) {
    return void 0 === o ? "undefined" : r(o);
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : void 0 === o ? "undefined" : r(o);
}, t = "function" == typeof Symbol && "symbol" === o(Symbol.iterator) ? function(r) {
    return void 0 === r ? "undefined" : o(r);
} : function(r) {
    return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : void 0 === r ? "undefined" : o(r);
}, e = Object.prototype.hasOwnProperty, n = function() {
    for (var r = [], o = 0; o < 256; ++o) r.push("%" + ((o < 16 ? "0" : "") + o.toString(16)).toUpperCase());
    return r;
}(), u = function(r) {
    for (var o; r.length; ) {
        var t = r.pop();
        if (o = t.obj[t.prop], Array.isArray(o)) {
            for (var e = [], n = 0; n < o.length; ++n) void 0 !== o[n] && e.push(o[n]);
            t.obj[t.prop] = e;
        }
    }
    return o;
}, c = function(r, o) {
    for (var t = o && o.plainObjects ? Object.create(null) : {}, e = 0; e < r.length; ++e) void 0 !== r[e] && (t[e] = r[e]);
    return t;
};

module.exports = {
    arrayToObject: c,
    assign: function(r, o) {
        return Object.keys(o).reduce(function(r, t) {
            return r[t] = o[t], r;
        }, r);
    },
    compact: function(r) {
        for (var o = [ {
            obj: {
                o: r
            },
            prop: "o"
        } ], e = [], n = 0; n < o.length; ++n) for (var c = o[n], i = c.obj[c.prop], f = Object.keys(i), y = 0; y < f.length; ++y) {
            var p = f[y], a = i[p];
            "object" === (void 0 === a ? "undefined" : t(a)) && null !== a && -1 === e.indexOf(a) && (o.push({
                obj: i,
                prop: p
            }), e.push(a));
        }
        return u(o);
    },
    decode: function(r) {
        try {
            return decodeURIComponent(r.replace(/\+/g, " "));
        } catch (o) {
            return r;
        }
    },
    encode: function(r) {
        if (0 === r.length) return r;
        for (var o = "string" == typeof r ? r : String(r), t = "", e = 0; e < o.length; ++e) {
            var u = o.charCodeAt(e);
            45 === u || 46 === u || 95 === u || 126 === u || 48 <= u && u <= 57 || 65 <= u && u <= 90 || 97 <= u && u <= 122 ? t += o.charAt(e) : u < 128 ? t += n[u] : u < 2048 ? t += n[192 | u >> 6] + n[128 | 63 & u] : u < 55296 || 57344 <= u ? t += n[224 | u >> 12] + n[128 | u >> 6 & 63] + n[128 | 63 & u] : (e += 1, 
            u = 65536 + ((1023 & u) << 10 | 1023 & o.charCodeAt(e)), t += n[240 | u >> 18] + n[128 | u >> 12 & 63] + n[128 | u >> 6 & 63] + n[128 | 63 & u]);
        }
        return t;
    },
    isBuffer: function(r) {
        return null != r && !!(r.constructor && r.constructor.isBuffer && r.constructor.isBuffer(r));
    },
    isRegExp: function(r) {
        return "[object RegExp]" === Object.prototype.toString.call(r);
    },
    merge: function r(o, n, u) {
        if (!n) return o;
        if ("object" !== (void 0 === n ? "undefined" : t(n))) {
            if (Array.isArray(o)) o.push(n); else {
                if ("object" !== (void 0 === o ? "undefined" : t(o))) return [ o, n ];
                (u.plainObjects || u.allowPrototypes || !e.call(Object.prototype, n)) && (o[n] = !0);
            }
            return o;
        }
        if ("object" !== (void 0 === o ? "undefined" : t(o))) return [ o ].concat(n);
        var i = o;
        return Array.isArray(o) && !Array.isArray(n) && (i = c(o, u)), Array.isArray(o) && Array.isArray(n) ? (n.forEach(function(n, c) {
            e.call(o, c) ? o[c] && "object" === t(o[c]) ? o[c] = r(o[c], n, u) : o.push(n) : o[c] = n;
        }), o) : Object.keys(n).reduce(function(o, t) {
            var c = n[t];
            return e.call(o, t) ? o[t] = r(o[t], c, u) : o[t] = c, o;
        }, i);
    }
};