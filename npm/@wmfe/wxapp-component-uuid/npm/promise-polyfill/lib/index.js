function n() {}

function t(n, t) {
    return function() {
        n.apply(t, arguments);
    };
}

function e(n) {
    if (!(this instanceof e)) throw new TypeError("Promises must be constructed via new");
    if ("function" != typeof n) throw new TypeError("not a function");
    this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], 
    c(n, this);
}

function o(n, t) {
    for (;3 === n._state; ) n = n._value;
    0 !== n._state ? (n._handled = !0, e._immediateFn(function() {
        var e = 1 === n._state ? t.onFulfilled : t.onRejected;
        if (null !== e) {
            var o;
            try {
                o = e(n._value);
            } catch (e) {
                return void i(t.promise, e);
            }
            r(t.promise, o);
        } else (1 === n._state ? r : i)(t.promise, n._value);
    })) : n._deferreds.push(t);
}

function r(n, o) {
    try {
        if (o === n) throw new TypeError("A promise cannot be resolved with itself.");
        if (o && ("object" === (void 0 === o ? "undefined" : s(o)) || "function" == typeof o)) {
            var r = o.then;
            if (o instanceof e) return n._state = 3, n._value = o, void u(n);
            if ("function" == typeof r) return void c(t(r, o), n);
        }
        n._state = 1, n._value = o, u(n);
    } catch (o) {
        i(n, o);
    }
}

function i(n, t) {
    n._state = 2, n._value = t, u(n);
}

function u(n) {
    2 === n._state && 0 === n._deferreds.length && e._immediateFn(function() {
        n._handled || e._unhandledRejectionFn(n._value);
    });
    for (var t = 0, r = n._deferreds.length; t < r; t++) o(n, n._deferreds[t]);
    n._deferreds = null;
}

function f(n, t, e) {
    this.onFulfilled = "function" == typeof n ? n : null, this.onRejected = "function" == typeof t ? t : null, 
    this.promise = e;
}

function c(n, t) {
    var e = !1;
    try {
        n(function(n) {
            e || (e = !0, r(t, n));
        }, function(n) {
            e || (e = !0, i(t, n));
        });
    } catch (n) {
        if (e) return;
        e = !0, i(t, n);
    }
}

var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
}, s = "function" == typeof Symbol && "symbol" == l(Symbol.iterator) ? function(n) {
    return void 0 === n ? "undefined" : l(n);
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : void 0 === n ? "undefined" : l(n);
}, a = setTimeout;

e.prototype.catch = function(n) {
    return this.then(null, n);
}, e.prototype.then = function(t, e) {
    var r = new this.constructor(n);
    return o(this, new f(t, e, r)), r;
}, e.prototype.finally = function(n) {
    var t = this.constructor;
    return this.then(function(e) {
        return t.resolve(n()).then(function() {
            return e;
        });
    }, function(e) {
        return t.resolve(n()).then(function() {
            return t.reject(e);
        });
    });
}, e.all = function(n) {
    return new e(function(t, e) {
        function o(n, u) {
            try {
                if (u && ("object" === (void 0 === u ? "undefined" : s(u)) || "function" == typeof u)) {
                    var f = u.then;
                    if ("function" == typeof f) return void f.call(u, function(t) {
                        o(n, t);
                    }, e);
                }
                r[n] = u, 0 == --i && t(r);
            } catch (u) {
                e(u);
            }
        }
        if (!n || void 0 === n.length) throw new TypeError("Promise.all accepts an array");
        var r = Array.prototype.slice.call(n);
        if (0 === r.length) return t([]);
        for (var i = r.length, u = 0; u < r.length; u++) o(u, r[u]);
    });
}, e.resolve = function(n) {
    return n && "object" === (void 0 === n ? "undefined" : s(n)) && n.constructor === e ? n : new e(function(t) {
        t(n);
    });
}, e.reject = function(n) {
    return new e(function(t, e) {
        e(n);
    });
}, e.race = function(n) {
    return new e(function(t, e) {
        for (var o = 0, r = n.length; o < r; o++) n[o].then(t, e);
    });
}, e._immediateFn = "function" == typeof setImmediate && function(n) {
    setImmediate(n);
} || function(n) {
    a(n, 0);
}, e._unhandledRejectionFn = function(n) {
    "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", n);
}, module.exports = e;