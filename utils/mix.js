module.exports = function(r) {
    for (var t = arguments.length, e = Array(1 < t ? t - 1 : 0), n = 1; n < t; n++) e[n - 1] = arguments[n];
    for (var o = r, a = e.length - 1; -1 < a; --a) {
        var u = (0, e[a])(o);
        u && (o = u);
    }
    return o;
};