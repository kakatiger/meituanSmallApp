var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(n) {
    return void 0 === n ? "undefined" : e(n);
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : void 0 === n ? "undefined" : e(n);
};

!function(e) {
    function t() {}
    function o(e) {
        if ("object" !== n(this)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof e) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], 
        l(e, this);
    }
    function i(e, n) {
        for (;3 === e._state; ) e = e._value;
        0 !== e._state ? (e._handled = !0, o._immediateFn(function() {
            var t = 1 === e._state ? n.onFulfilled : n.onRejected;
            if (null !== t) {
                var o;
                try {
                    o = t(e._value);
                } catch (t) {
                    return void u(n.promise, t);
                }
                r(n.promise, o);
            } else (1 === e._state ? r : u)(n.promise, e._value);
        })) : e._deferreds.push(n);
    }
    function r(e, t) {
        try {
            if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
            if (t && ("object" === (void 0 === t ? "undefined" : n(t)) || "function" == typeof t)) {
                var i = t.then;
                if (t instanceof o) return e._state = 3, e._value = t, void f(e);
                if ("function" == typeof i) return void l((r = i, c = t, function() {
                    r.apply(c, arguments);
                }), e);
            }
            e._state = 1, e._value = t, f(e);
        } catch (t) {
            u(e, t);
        }
        var r, c;
    }
    function u(e, n) {
        e._state = 2, e._value = n, f(e);
    }
    function f(e) {
        2 === e._state && 0 === e._deferreds.length && o._immediateFn(function() {
            e._handled || o._unhandledRejectionFn(e._value);
        });
        for (var n = 0, t = e._deferreds.length; n < t; n++) i(e, e._deferreds[n]);
        e._deferreds = null;
    }
    function c(e, n, t) {
        this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof n ? n : null, 
        this.promise = t;
    }
    function l(e, n) {
        var t = !1;
        try {
            e(function(e) {
                t || (t = !0, r(n, e));
            }, function(e) {
                t || (t = !0, u(n, e));
            });
        } catch (e) {
            if (t) return;
            t = !0, u(n, e);
        }
    }
    var d = setTimeout;
    o.prototype.catch = function(e) {
        return this.then(null, e);
    }, o.prototype.then = function(e, n) {
        var o = new this.constructor(t);
        return i(this, new c(e, n, o)), o;
    }, o.all = function(e) {
        var t = Array.prototype.slice.call(e);
        return new o(function(e, o) {
            function i(u, f) {
                try {
                    if (f && ("object" === (void 0 === f ? "undefined" : n(f)) || "function" == typeof f)) {
                        var c = f.then;
                        if ("function" == typeof c) return void c.call(f, function(e) {
                            i(u, e);
                        }, o);
                    }
                    t[u] = f, 0 == --r && e(t);
                } catch (f) {
                    o(f);
                }
            }
            if (0 === t.length) return e([]);
            for (var r = t.length, u = 0; u < t.length; u++) i(u, t[u]);
        });
    }, o.resolve = function(e) {
        return e && "object" === (void 0 === e ? "undefined" : n(e)) && e.constructor === o ? e : new o(function(n) {
            n(e);
        });
    }, o.reject = function(e) {
        return new o(function(n, t) {
            t(e);
        });
    }, o.race = function(e) {
        return new o(function(n, t) {
            for (var o = 0, i = e.length; o < i; o++) e[o].then(n, t);
        });
    }, o._immediateFn = "function" == typeof setImmediate && function(e) {
        setImmediate(e);
    } || function(e) {
        d(e, 0);
    }, o._unhandledRejectionFn = function(e) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e);
    }, o._setImmediateFn = function(e) {
        o._immediateFn = e;
    }, o._setUnhandledRejectionFn = function(e) {
        o._unhandledRejectionFn = e;
    }, "undefined" != typeof module && module.exports ? module.exports = o : e.Promise || (e.Promise = o);
}(void 0);