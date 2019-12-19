module.exports = function(r, e, o, t) {
    for (var u = 65535 & r | 0, f = r >>> 16 & 65535 | 0, n = 0; 0 !== o; ) {
        for (o -= n = 2e3 < o ? 2e3 : o; f = f + (u = u + e[t++] | 0) | 0, --n; ) ;
        u %= 65521, f %= 65521;
    }
    return u | f << 16 | 0;
};