function r(r, o) {
    if (o < 65537 && (r.subarray && e || !r.subarray && t)) return String.fromCharCode.apply(null, n.shrinkBuf(r, o));
    for (var f = "", u = 0; u < o; u++) f += String.fromCharCode(r[u]);
    return f;
}

var n = require("./common.js"), t = !0, e = !0;

try {
    String.fromCharCode.apply(null, [ 0 ]);
} catch (r) {
    t = !1;
}

try {
    String.fromCharCode.apply(null, new Uint8Array(1));
} catch (r) {
    e = !1;
}

for (var o = new n.Buf8(256), f = 0; f < 256; f++) o[f] = 252 <= f ? 6 : 248 <= f ? 5 : 240 <= f ? 4 : 224 <= f ? 3 : 192 <= f ? 2 : 1;

o[254] = o[254] = 1, exports.string2buf = function(r) {
    var t, e, o, f, u, a = r.length, i = 0;
    for (f = 0; f < a; f++) 55296 == (64512 & (e = r.charCodeAt(f))) && f + 1 < a && 56320 == (64512 & (o = r.charCodeAt(f + 1))) && (e = 65536 + (e - 55296 << 10) + (o - 56320), 
    f++), i += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
    for (t = new n.Buf8(i), f = u = 0; u < i; f++) 55296 == (64512 & (e = r.charCodeAt(f))) && f + 1 < a && 56320 == (64512 & (o = r.charCodeAt(f + 1))) && (e = 65536 + (e - 55296 << 10) + (o - 56320), 
    f++), t[u++] = e < 128 ? e : (t[u++] = e < 2048 ? 192 | e >>> 6 : (t[u++] = e < 65536 ? 224 | e >>> 12 : (t[u++] = 240 | e >>> 18, 
    128 | e >>> 12 & 63), 128 | e >>> 6 & 63), 128 | 63 & e);
    return t;
}, exports.buf2binstring = function(n) {
    return r(n, n.length);
}, exports.binstring2buf = function(r) {
    for (var t = new n.Buf8(r.length), e = 0, o = t.length; e < o; e++) t[e] = r.charCodeAt(e);
    return t;
}, exports.buf2string = function(n, t) {
    var e, f, u, a, i = t || n.length, h = new Array(2 * i);
    for (e = f = 0; e < i; ) if ((u = n[e++]) < 128) h[f++] = u; else if (4 < (a = o[u])) h[f++] = 65533, 
    e += a - 1; else {
        for (u &= 2 === a ? 31 : 3 === a ? 15 : 7; 1 < a && e < i; ) u = u << 6 | 63 & n[e++], 
        a--;
        h[f++] = 1 < a ? 65533 : u < 65536 ? u : (u -= 65536, h[f++] = 55296 | u >> 10 & 1023, 
        56320 | 1023 & u);
    }
    return r(h, f);
}, exports.utf8border = function(r, n) {
    var t;
    for ((n = n || r.length) > r.length && (n = r.length), t = n - 1; 0 <= t && 128 == (192 & r[t]); ) t--;
    return t < 0 ? n : 0 === t ? n : t + o[r[t]] > n ? t : n;
};