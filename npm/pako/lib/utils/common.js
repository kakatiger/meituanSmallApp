var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r) {
    return typeof r;
} : function(r) {
    return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
}, t = "function" == typeof Symbol && "symbol" == r(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : r(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : r(t);
}, n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;

exports.assign = function(r) {
    for (var n = Array.prototype.slice.call(arguments, 1); n.length; ) {
        var o = n.shift();
        if (o) {
            if ("object" !== (void 0 === o ? "undefined" : t(o))) throw new TypeError(o + "must be non-object");
            for (var e in o) o.hasOwnProperty(e) && (r[e] = o[e]);
        }
    }
    return r;
}, exports.shrinkBuf = function(r, t) {
    return r.length === t ? r : r.subarray ? r.subarray(0, t) : (r.length = t, r);
};

var o = {
    arraySet: function(r, t, n, o, e) {
        if (t.subarray && r.subarray) r.set(t.subarray(n, n + o), e); else for (var f = 0; f < o; f++) r[e + f] = t[n + f];
    },
    flattenChunks: function(r) {
        var t, n, o, e, f, y;
        for (t = o = 0, n = r.length; t < n; t++) o += r[t].length;
        for (y = new Uint8Array(o), t = e = 0, n = r.length; t < n; t++) f = r[t], y.set(f, e), 
        e += f.length;
        return y;
    }
}, e = {
    arraySet: function(r, t, n, o, e) {
        for (var f = 0; f < o; f++) r[e + f] = t[n + f];
    },
    flattenChunks: function(r) {
        return [].concat.apply([], r);
    }
};

exports.setTyped = function(r) {
    r ? (exports.Buf8 = Uint8Array, exports.Buf16 = Uint16Array, exports.Buf32 = Int32Array, 
    exports.assign(exports, o)) : (exports.Buf8 = Array, exports.Buf16 = Array, exports.Buf32 = Array, 
    exports.assign(exports, e));
}, exports.setTyped(n);