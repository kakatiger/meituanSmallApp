function t(t, e, r) {
    return e in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = r, t;
}

var e = require("./get-page-url.js"), r = new Map();

module.exports = {
    start: function(n, o) {
        var a = o || e() || "app", s = r.get(a);
        s ? s[n] || (s[n] = {
            start: Date.now(),
            durations: []
        }, r.set(a, s)) : r.set(a, t({}, n, {
            start: Date.now(),
            durations: []
        }));
        var u = r.get(a);
        u[n].start = Date.now(), r.set(a, u);
    },
    end: function(t, n) {
        var o = n || e() || "app", a = r.get(o);
        if (a && a[t] && a[t].start) {
            var s = Date.now() - a[t].start;
            a[t].durations.push(s), r.set(o, a);
        } else console.error(o + " -- " + t + " -- You need to call 'start' first");
    },
    report: function() {
        r.forEach(function(t, e) {
            console.log("%c" + e + ":", "color: blue;");
            for (var r = Object.keys(t), n = 0; n < r.length; n += 1) !function(e) {
                var n = r[e], o = t[n], a = o.durations.reduce(function(t, e, r) {
                    return t += e, r === o.durations.length - 1 && (t /= o.durations.length), t;
                }, 0);
                console.log("%c" + n + ": " + a, "color: green;");
            }(n);
        });
    }
};