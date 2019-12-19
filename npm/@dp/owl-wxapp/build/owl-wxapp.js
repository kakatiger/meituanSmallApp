var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : e(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
};

!function(e, n) {
    "object" === ("undefined" == typeof exports ? "undefined" : t(exports)) && "object" === ("undefined" == typeof module ? "undefined" : t(module)) ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : "object" === ("undefined" == typeof exports ? "undefined" : t(exports)) ? exports["owl-wxapp"] = n() : e["owl-wxapp"] = n();
}("undefined" != typeof self ? self : void 0, function() {
    return function(e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
        }
        var n = {};
        return t.m = e, t.c = n, t.d = function(e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            });
        }, t.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default;
            } : function() {
                return e;
            };
            return t.d(n, "a", n), n;
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, t.p = "", t(t.s = 8);
    }([ function(e, t, n) {
        (function(t) {
            var r, o = n(4), i = n(14), a = n(15), u = Array.prototype.slice, s = {};
            r = void 0 !== t && t.console ? t.console : "undefined" != typeof window && window.console ? window.console : {};
            for (var c = [ [ function() {}, "log" ], [ function() {
                r.log.apply(r, arguments);
            }, "info" ], [ function() {
                r.log.apply(r, arguments);
            }, "warn" ], [ function() {
                r.warn.apply(r, arguments);
            }, "error" ], [ function(e) {
                s[e] = a();
            }, "time" ], [ function(e) {
                var t = s[e];
                if (!t) throw new Error("No such label: " + e);
                var n = a() - t;
                r.log(e + ": " + n + "ms");
            }, "timeEnd" ], [ function() {
                var e = new Error();
                e.name = "Trace", e.message = o.format.apply(null, arguments), r.error(e.stack);
            }, "trace" ], [ function(e) {
                r.log(o.inspect(e) + "\n");
            }, "dir" ], [ function(e) {
                if (!e) {
                    var t = u.call(arguments, 1);
                    i.ok(!1, o.format.apply(null, t));
                }
            }, "assert" ] ], f = 0; f < c.length; f++) {
                var l = c[f], p = l[0], g = l[1];
                r[g] || (r[g] = p);
            }
            e.exports = r;
        }).call(t, n(3));
    }, function(e, t, n) {
        function r(e) {
            var t = [];
            for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
            return t.join("&");
        }
        function o() {
            return 65535 * Math.random();
        }
        function i() {
            return Math.ceil(o()).toString(16);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.serialize = r, t.requestQueue = function e(t) {
            if (t && a.push(t), 1 < a.length && t) ; else {
                var n = a[0], r = n.complete;
                n.complete = function(t) {
                    a.shift(), a.length && e(), r && r.call(this, t);
                }, wx.request(n);
            }
        }, t.rnd = o, t.rndSeed = i, t.MSID = function() {
            var e = [], t = new Date().getTime();
            return e.push(t.toString(16)), e.push(i()), e.push(i()), e.push(i()), e.join("-");
        }, t.getReportVersions = function(e) {
            var t = e.wxAppVersion, n = void 0 === t ? "Unknown" : t, o = e.version, i = o.wxVersion, a = void 0 === i ? "Unknown" : i, u = o.wxLibVersion;
            return r({
                wxVersion: a,
                wxLibVersion: void 0 === u ? "Unknown" : u,
                wxAppVersion: n
            });
        }, t.stringify = function(e, t) {
            if (!t) return e;
            var n = [];
            for (var r in t) t.hasOwnProperty(r) && n.push(r + "=" + t[r]);
            return ~e.indexOf("?") ? e + "&" + n.join("&") : e + "?" + n.join("&");
        }, t.extend = function(e, t) {
            var n = {}, r = void 0;
            for (r in e) n[r] = e[r];
            for (r in t) t.hasOwnProperty(r) && void 0 !== t[r] && (n[r] = t[r]);
            return n;
        };
        var a = [];
    }, function(e, t, n) {
        function r() {
            var e = getCurrentPages() || [];
            return e.length ? e[e.length - 1].__route__ : "app";
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function(e, t) {
                var n = [], r = !0, o = !1, i = void 0;
                try {
                    for (var a, u = e[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), 
                    !t || n.length !== t); r = !0) ;
                } catch (e) {
                    o = !0, i = e;
                } finally {
                    try {
                        !r && u.return && u.return();
                    } finally {
                        if (o) throw i;
                    }
                }
                return n;
            }(e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        };
        t.getPageUrl = r, t.getEnv = function() {
            var e = r();
            return new Promise(function(t, n) {
                Object.keys(i).length ? t(Object.assign({
                    pageUrl: e
                }, i)) : Promise.all([ (wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(e) {
                    e && (i.network = e.networkType);
                }), new Promise(function(e, t) {
                    wx.getNetworkType({
                        success: function(t) {
                            e(t.networkType);
                        },
                        fail: function() {
                            e("unknown network");
                        }
                    }), setTimeout(function() {
                        e("unknown network");
                    }, 2e3);
                })), new Promise(function(e, t) {
                    wx.getSystemInfo({
                        success: function(t) {
                            var n = t.system, r = void 0 === n ? "" : n, o = t.version, i = void 0 === o ? "Unknown" : o, a = t.SDKVersion, u = void 0 === a ? "Unknown" : a, s = r.toLowerCase().match(/ios/) ? "iOS" : "Android";
                            e({
                                os: s,
                                wxVersion: i,
                                wxLibVersion: u
                            });
                        },
                        fail: function() {
                            e("unknown system");
                        }
                    });
                }) ]).then(function(n) {
                    var r = o(n, 2), a = r[0], u = r[1];
                    i = Object.assign({}, u, {
                        container: "MicroMessenger"
                    }, {
                        network: a
                    }, {
                        unionId: ""
                    }), t(Object.assign({}, i, {
                        pageUrl: e
                    }));
                }).catch(function() {
                    t({});
                });
            });
        };
        var i = {};
    }, function(e, n) {
        var r;
        r = function() {
            return this;
        }();
        try {
            r = r || Function("return this")() || (0, eval)("this");
        } catch (e) {
            "object" === ("undefined" == typeof window ? "undefined" : t(window)) && (r = window);
        }
        e.exports = r;
    }, function(e, n, r) {
        (function(e, o, i) {
            function a(e, t) {
                var r = {
                    seen: [],
                    stylize: s
                };
                return 3 <= arguments.length && (r.depth = arguments[2]), 4 <= arguments.length && (r.colors = arguments[3]), 
                g(t) ? r.showHidden = t : t && n._extend(r, t), v(r.showHidden) && (r.showHidden = !1), 
                v(r.depth) && (r.depth = 2), v(r.colors) && (r.colors = !1), v(r.customInspect) && (r.customInspect = !0), 
                r.colors && (r.stylize = u), c(r, e, r.depth);
            }
            function u(e, t) {
                var n = a.styles[t];
                return n ? "[" + a.colors[n][0] + "m" + e + "[" + a.colors[n][1] + "m" : e;
            }
            function s(e, t) {
                return e;
            }
            function c(e, t, r) {
                if (e.customInspect && t && E(t.inspect) && t.inspect !== n.inspect && (!t.constructor || t.constructor.prototype !== t)) {
                    var o = t.inspect(r, e);
                    return y(o) || (o = c(e, o, r)), o;
                }
                var i = function(e, t) {
                    if (v(t)) return e.stylize("undefined", "undefined");
                    if (y(t)) {
                        var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                        return e.stylize(n, "string");
                    }
                    return h(t) ? e.stylize("" + t, "number") : g(t) ? e.stylize("" + t, "boolean") : d(t) ? e.stylize("null", "null") : void 0;
                }(e, t);
                if (i) return i;
                var a, u = Object.keys(t), s = (a = {}, u.forEach(function(e, t) {
                    a[e] = !0;
                }), a);
                if (e.showHidden && (u = Object.getOwnPropertyNames(t)), k(t) && (0 <= u.indexOf("message") || 0 <= u.indexOf("description"))) return f(t);
                if (0 === u.length) {
                    if (E(t)) {
                        var b = t.name ? ": " + t.name : "";
                        return e.stylize("[Function" + b + "]", "special");
                    }
                    if (m(t)) return e.stylize(RegExp.prototype.toString.call(t), "regexp");
                    if (w(t)) return e.stylize(Date.prototype.toString.call(t), "date");
                    if (k(t)) return f(t);
                }
                var S, O = "", x = !1, P = [ "{", "}" ];
                return p(t) && (x = !0, P = [ "[", "]" ]), E(t) && (O = " [Function" + (t.name ? ": " + t.name : "") + "]"), 
                m(t) && (O = " " + RegExp.prototype.toString.call(t)), w(t) && (O = " " + Date.prototype.toUTCString.call(t)), 
                k(t) && (O = " " + f(t)), 0 !== u.length || x && 0 != t.length ? r < 0 ? m(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special") : (e.seen.push(t), 
                S = x ? function(e, t, n, r, o) {
                    for (var i = [], a = 0, u = t.length; a < u; ++a) j(t, String(a)) ? i.push(l(e, t, n, r, String(a), !0)) : i.push("");
                    return o.forEach(function(o) {
                        o.match(/^\d+$/) || i.push(l(e, t, n, r, o, !0));
                    }), i;
                }(e, t, r, s, u) : u.map(function(n) {
                    return l(e, t, r, s, n, x);
                }), e.seen.pop(), function(e, t, n) {
                    return 60 < e.reduce(function(e, t) {
                        return t.indexOf("\n"), e + t.replace(/\u001b\[\d\d?m/g, "").length + 1;
                    }, 0) ? n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1];
                }(S, O, P)) : P[0] + O + P[1];
            }
            function f(e) {
                return "[" + Error.prototype.toString.call(e) + "]";
            }
            function l(e, t, n, r, o, i) {
                var a, u, s;
                if ((s = Object.getOwnPropertyDescriptor(t, o) || {
                    value: t[o]
                }).get ? u = s.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : s.set && (u = e.stylize("[Setter]", "special")), 
                j(r, o) || (a = "[" + o + "]"), u || (e.seen.indexOf(s.value) < 0 ? -1 < (u = d(n) ? c(e, s.value, null) : c(e, s.value, n - 1)).indexOf("\n") && (u = i ? u.split("\n").map(function(e) {
                    return "  " + e;
                }).join("\n").substr(2) : "\n" + u.split("\n").map(function(e) {
                    return "   " + e;
                }).join("\n")) : u = e.stylize("[Circular]", "special")), v(a)) {
                    if (i && o.match(/^\d+$/)) return u;
                    a = (a = JSON.stringify("" + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), 
                    e.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), 
                    e.stylize(a, "string"));
                }
                return a + ": " + u;
            }
            function p(e) {
                return Array.isArray(e);
            }
            function g(e) {
                return "boolean" == typeof e;
            }
            function d(e) {
                return null === e;
            }
            function h(e) {
                return "number" == typeof e;
            }
            function y(e) {
                return "string" == typeof e;
            }
            function v(e) {
                return void 0 === e;
            }
            function m(e) {
                return b(e) && "[object RegExp]" === S(e);
            }
            function b(e) {
                return "object" === (void 0 === e ? "undefined" : t(e)) && null !== e;
            }
            function w(e) {
                return b(e) && "[object Date]" === S(e);
            }
            function k(e) {
                return b(e) && ("[object Error]" === S(e) || e instanceof Error);
            }
            function E(e) {
                return "function" == typeof e;
            }
            function S(e) {
                return Object.prototype.toString.call(e);
            }
            function O(e) {
                return e < 10 ? "0" + e.toString(10) : e.toString(10);
            }
            function j(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }
            var x = /%[sdj%]/g;
            n.format = function(e) {
                if (!y(e)) {
                    for (var t = [], n = 0; n < arguments.length; n++) t.push(a(arguments[n]));
                    return t.join(" ");
                }
                n = 1;
                for (var r = arguments, o = r.length, i = String(e).replace(x, function(e) {
                    if ("%%" === e) return "%";
                    if (o <= n) return e;
                    switch (e) {
                      case "%s":
                        return String(r[n++]);

                      case "%d":
                        return Number(r[n++]);

                      case "%j":
                        try {
                            return JSON.stringify(r[n++]);
                        } catch (e) {
                            return "[Circular]";
                        }

                      default:
                        return e;
                    }
                }), u = r[n]; n < o; u = r[++n]) d(u) || !b(u) ? i += " " + u : i += " " + a(u);
                return i;
            }, n.deprecate = function(t, r) {
                if (v(e.process)) return function() {
                    return n.deprecate(t, r).apply(this, arguments);
                };
                if (!0 === o.noDeprecation) return t;
                var a = !1;
                return function() {
                    if (!a) {
                        if (o.throwDeprecation) throw new Error(r);
                        o.traceDeprecation ? i.trace(r) : i.error(r), a = !0;
                    }
                    return t.apply(this, arguments);
                };
            };
            var P, _ = {};
            n.debuglog = function(e) {
                if (v(P) && (P = ""), e = e.toUpperCase(), !_[e]) if (new RegExp("\\b" + e + "\\b", "i").test(P)) {
                    var t = o.pid;
                    _[e] = function() {
                        var r = n.format.apply(n, arguments);
                        i.error("%s %d: %s", e, t, r);
                    };
                } else _[e] = function() {};
                return _[e];
            }, (n.inspect = a).colors = {
                bold: [ 1, 22 ],
                italic: [ 3, 23 ],
                underline: [ 4, 24 ],
                inverse: [ 7, 27 ],
                white: [ 37, 39 ],
                grey: [ 90, 39 ],
                black: [ 30, 39 ],
                blue: [ 34, 39 ],
                cyan: [ 36, 39 ],
                green: [ 32, 39 ],
                magenta: [ 35, 39 ],
                red: [ 31, 39 ],
                yellow: [ 33, 39 ]
            }, a.styles = {
                special: "cyan",
                number: "yellow",
                boolean: "yellow",
                undefined: "grey",
                null: "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            }, n.isArray = p, n.isBoolean = g, n.isNull = d, n.isNullOrUndefined = function(e) {
                return null == e;
            }, n.isNumber = h, n.isString = y, n.isSymbol = function(e) {
                return "symbol" === (void 0 === e ? "undefined" : t(e));
            }, n.isUndefined = v, n.isRegExp = m, n.isObject = b, n.isDate = w, n.isError = k, 
            n.isFunction = E, n.isPrimitive = function(e) {
                return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" === (void 0 === e ? "undefined" : t(e)) || void 0 === e;
            }, n.isBuffer = r(12);
            var C = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            n.log = function() {
                var e, t;
                i.log("%s - %s", (e = new Date(), t = [ O(e.getHours()), O(e.getMinutes()), O(e.getSeconds()) ].join(":"), 
                [ e.getDate(), C[e.getMonth()], t ].join(" ")), n.format.apply(n, arguments));
            }, n.inherits = r(13), n._extend = function(e, t) {
                if (!t || !b(t)) return e;
                for (var n = Object.keys(t), r = n.length; r--; ) e[n[r]] = t[n[r]];
                return e;
            };
        }).call(n, r(3), r(11), r(0));
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), o = n(1), i = {
            ERROR: "error"
        }, a = {
            SCRIPT: "jsError",
            AJAX: "ajaxError"
        }, u = [ "project", "pageUrl", "resourceUrl", "category", "sec_category", "level", "timestamp", "content" ], s = [ "rowNum", "colNum" ].concat(u), c = function() {
            function e(t) {
                if (function(t, n) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this), t) {
                    var n = void 0;
                    for (n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
                    this.parse(t);
                }
            }
            return r(e, [ {
                key: "parse",
                value: function() {
                    this.category || (this.category = a.SCRIPT), this.level || (this.level = i.ERROR), 
                    this.timestamp || (this.timestamp = Date.now()), this.sec_category || (this.sec_category = "default");
                }
            }, {
                key: "isEqual",
                value: function(e) {
                    return this.sec_category === e.sec_category && this.resourceUrl === e.resourceUrl && this.content === e.content;
                }
            }, {
                key: "update",
                value: function(e) {
                    for (var t in e) void 0 !== e[t] && -1 !== s.indexOf(t) && (this[t] = e[t]);
                    return this;
                }
            }, {
                key: "updateTags",
                value: function(e) {
                    var t = (0, o.extend)(this.tags || {}, e);
                    return this.tags = t, this;
                }
            }, {
                key: "toJson",
                value: function() {
                    var e = this, t = this.rowNum, n = this.colNum, r = {};
                    return u.map(function(t) {
                        void 0 !== e[t] && (r[t] = e[t]);
                    }), r.category === a.SCRIPT && t && n && (r.dynamicMetric = {
                        rowNum: t,
                        colNum: n
                    }), this.tags && (r.dynamicMetric = (0, o.extend)(r.dynamicMetric || {}, this.tags)), 
                    r;
                }
            } ]), e;
        }();
        c.LEVEL = i, c.CATEGORY = a, t.default = c;
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.STOREKEY = "WXOWLKEY", t.VERSION = "0.0.1", t.LEVEL = {
            ERROR: "error",
            INFO: "info",
            WARN: "warn",
            DEBUG: "debug"
        }, t.CATEGORY = {
            SCRIPT: "jsError",
            AJAX: "ajaxError",
            RESOURCE: "resourceError"
        };
    }, function(e, t, n) {
        (function(t) {
            var r = n(2), o = void 0, i = !1;
            e.exports = {
                queue: [],
                ready: function() {
                    var e = this, n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, a = n.LoganAPI, u = n.project, s = n.loganConfig, c = s.enableShake;
                    i = !0, a ? (o = a, function() {
                        if (c) {
                            var t = s.appSources;
                            o = o.config({
                                enableShake: c,
                                appSource: t
                            });
                        }
                        for (o.log("[新小程序项目]：项目-> " + u + " 对应页面-> " + (0, r.getPageUrl)()); e.queue.length; ) {
                            var n = e.queue.shift();
                            o.log(n);
                        }
                    }()) : t.log("当前暂不支持log");
                },
                log: function(e) {
                    1 < arguments.length && void 0 !== arguments[1] && arguments[1], i && (o ? o.log(e, "owl") : this.queue.push(e));
                }
            };
        }).call(t, n(0));
    }, function(e, t, n) {
        e.exports = n(9);
    }, function(e, t, n) {
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.OWL = t.owl = void 0;
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }();
        t.page = function(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : Page;
            (0, g.default)(m, e, t);
        }, t.app = function(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : App;
            (0, d.default)(m, e, t);
        }, t.request = function(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : m;
            return (0, u.default)(e, t);
        };
        var i = r(n(10)), a = r(n(16)), u = r(n(18)), s = r(n(19)), c = r(n(20)), f = r(n(21)), l = r(n(22)), p = n(2), g = r(n(23)), d = r(n(24)), h = r(n(5)), y = r(n(7)), v = function() {
            function e(t) {
                !function(t, n) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this);
                var n = new l.default(t);
                this.error = new i.default(n), this.resource = new a.default(n, this.error), this.pageSpeed = new s.default(n), 
                this.logManager = new f.default(n), this.cfgManager = n, this.init();
            }
            return o(e, [ {
                key: "init",
                value: function() {
                    var e = this;
                    (0, p.getEnv)().then(function(t) {
                        e.cfgManager.setExtension(t);
                    });
                }
            }, {
                key: "newMetric",
                value: function() {
                    return new c.default(this.cfgManager);
                }
            }, {
                key: "report",
                value: function() {
                    this.error.report(), this.resource.report(), this.pageSpeed.report();
                }
            } ]), e;
        }(), m = new v({});
        m.OWL = v, m.errorModel = h.default, m.start = function(e) {
            if (!this.isStarted && (this.isStarted = !0, e && m.cfgManager.set(e), this.cfgManager.get("logan").enable)) {
                var t = this.cfgManager.get("logan").Logan, n = this.cfgManager.get("logan").config, r = this.cfgManager.get("project");
                y.default.ready({
                    LoganAPI: t,
                    project: r,
                    loganConfig: n
                });
            }
        }, t.owl = m, t.OWL = v;
    }, function(e, n, r) {
        (function(e) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = "function" == typeof Symbol && "symbol" === t(Symbol.iterator) ? function(e) {
                return void 0 === e ? "undefined" : t(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
            }, i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t;
                };
            }(), a = r(2), u = r(1), s = r(5).default, c = [], f = function() {
                function t(e) {
                    !function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                    }(this, t), this.cfgManager = e;
                }
                return i(t, [ {
                    key: "parse",
                    value: function(e) {
                        return e.project || (e.project = this.cfgManager.get("project")), e.pageUrl || (e.pageUrl = this.cfgManager.get("pageUrl") || (0, 
                        a.getPageUrl)()), e;
                    }
                }, {
                    key: "pushError",
                    value: function(e, t) {
                        var n = this, r = this.cfgManager;
                        (0, a.getEnv)().then(function(o) {
                            var i = new s(e);
                            i = i.updateTags({
                                wxLibVersion: o.wxLibVersion,
                                wxVersion: o.wxVersion
                            }), i = (i = n._handleError(i)).toJson(), e = n.parse(i);
                            var a = o.network, u = o.container, f = o.os, l = o.unionId;
                            l = r.config.unionId || l, e = Object.assign({
                                network: a,
                                container: u,
                                os: f,
                                unionId: l
                            }, e), c.push(e), t && n.report();
                        });
                    }
                }, {
                    key: "_handleError",
                    value: function(t) {
                        try {
                            var n = this.cfgManager.get("onErrorPush");
                            if (n instanceof Function && (t = n(t)), t instanceof s || void 0 === t) return t;
                            e.log("onErrorPush方法返回结果有误");
                        } catch (n) {
                            return t;
                        }
                    }
                }, {
                    key: "addError",
                    value: function(t, n, r) {
                        t || (t = "default"), n || (n = "error");
                        try {
                            n instanceof s || (n instanceof Error ? n = n.stack || n.message : "object" === (void 0 === n ? "undefined" : o(n)) && (n = {
                                sec_category: n.name,
                                content: n.msg
                            })), this.pushError({
                                sec_category: t,
                                content: n,
                                category: "jsError",
                                level: "error"
                            }, r);
                        } catch (t) {
                            this.reportSystemError(t), e.log("owl-inside-error", t);
                        }
                    }
                }, {
                    key: "reportSystemError",
                    value: function(t) {
                        var n = this;
                        t && t.stack && (0, a.getEnv)().then(function(e) {
                            c.push(new s({
                                project: "owl",
                                pageUrl: n.cfgManager.config.project + (0, a.getPageUrl)(),
                                sec_category: t.msg || t.name || "parseError",
                                content: JSON.stringify(t.stack)
                            })), n.report();
                        }).catch(function(t) {
                            e.log("owl-error", t);
                        });
                    }
                }, {
                    key: "onError",
                    value: function() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "jsError", n = e.replace("thirdScriptError", "").split(";");
                        n = (n = n.length ? n[0] : "").replace(/\t|\n/g, ""), this.pushError(new s({
                            content: e,
                            category: t,
                            sec_category: n,
                            level: "error"
                        }), !0);
                    }
                }, {
                    key: "report",
                    value: function(e, t) {
                        var n = this.cfgManager;
                        if (c.length) {
                            var r = n.getApiPath("error"), o = (0, u.stringify)(r);
                            o = o + "&" + (0, u.getReportVersions)(n.config), (0, u.requestQueue)({
                                url: o,
                                data: "c=" + encodeURIComponent(JSON.stringify(c)),
                                method: "POST",
                                header: {
                                    "content-type": "application/x-www-form-urlencoded;"
                                },
                                success: function(t) {
                                    c = [], e && e instanceof Function && e(t);
                                },
                                fail: function(e) {
                                    t && t instanceof Function && t(e);
                                }
                            });
                        }
                    }
                } ]), t;
            }();
            n.default = f;
        }).call(n, r(0));
    }, function(e, t) {
        function n() {
            throw new Error("setTimeout has not been defined");
        }
        function r() {
            throw new Error("clearTimeout has not been defined");
        }
        function o(e) {
            if (c === setTimeout) return setTimeout(e, 0);
            if ((c === n || !c) && setTimeout) return c = setTimeout, setTimeout(e, 0);
            try {
                return c(e, 0);
            } catch (t) {
                try {
                    return c.call(null, e, 0);
                } catch (t) {
                    return c.call(this, e, 0);
                }
            }
        }
        function i() {
            d && p && (d = !1, p.length ? g = p.concat(g) : h = -1, g.length && a());
        }
        function a() {
            if (!d) {
                var e = o(i);
                d = !0;
                for (var t = g.length; t; ) {
                    for (p = g, g = []; ++h < t; ) p && p[h].run();
                    h = -1, t = g.length;
                }
                p = null, d = !1, function(e) {
                    if (f === clearTimeout) return clearTimeout(e);
                    if ((f === r || !f) && clearTimeout) return f = clearTimeout, clearTimeout(e);
                    try {
                        f(e);
                    } catch (t) {
                        try {
                            return f.call(null, e);
                        } catch (t) {
                            return f.call(this, e);
                        }
                    }
                }(e);
            }
        }
        function u(e, t) {
            this.fun = e, this.array = t;
        }
        function s() {}
        var c, f, l = e.exports = {};
        !function() {
            try {
                c = "function" == typeof setTimeout ? setTimeout : n;
            } catch (e) {
                c = n;
            }
            try {
                f = "function" == typeof clearTimeout ? clearTimeout : r;
            } catch (e) {
                f = r;
            }
        }();
        var p, g = [], d = !1, h = -1;
        l.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (1 < arguments.length) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            g.push(new u(e, t)), 1 !== g.length || d || o(a);
        }, u.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, l.title = "browser", l.browser = !0, l.env = {}, l.argv = [], l.version = "", 
        l.versions = {}, l.on = s, l.addListener = s, l.once = s, l.off = s, l.removeListener = s, 
        l.removeAllListeners = s, l.emit = s, l.prependListener = s, l.prependOnceListener = s, 
        l.listeners = function(e) {
            return [];
        }, l.binding = function(e) {
            throw new Error("process.binding is not supported");
        }, l.cwd = function() {
            return "/";
        }, l.chdir = function(e) {
            throw new Error("process.chdir is not supported");
        }, l.umask = function() {
            return 0;
        };
    }, function(e, n) {
        e.exports = function(e) {
            return e && "object" === (void 0 === e ? "undefined" : t(e)) && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8;
        };
    }, function(e, t) {
        "function" == typeof Object.create ? e.exports = function(e, t) {
            e.super_ = t, e.prototype = Object.create(t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
        } : e.exports = function(e, t) {
            e.super_ = t;
            var n = function() {};
            n.prototype = t.prototype, e.prototype = new n(), e.prototype.constructor = e;
        };
    }, function(e, n, r) {
        (function(n) {
            function o(e, t) {
                if (e === t) return 0;
                for (var n = e.length, r = t.length, o = 0, i = Math.min(n, r); o < i; ++o) if (e[o] !== t[o]) {
                    n = e[o], r = t[o];
                    break;
                }
                return n < r ? -1 : r < n ? 1 : 0;
            }
            function i(e) {
                return n.Buffer && "function" == typeof n.Buffer.isBuffer ? n.Buffer.isBuffer(e) : !(null == e || !e._isBuffer);
            }
            function a(e) {
                return Object.prototype.toString.call(e);
            }
            function u(e) {
                return !i(e) && "function" == typeof n.ArrayBuffer && ("function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : !!e && (e instanceof DataView || !!(e.buffer && e.buffer instanceof ArrayBuffer)));
            }
            function s(e) {
                if (v.isFunction(e)) {
                    if (w) return e.name;
                    var t = e.toString().match(E);
                    return t && t[1];
                }
            }
            function c(e, t) {
                return "string" == typeof e ? e.length < t ? e : e.slice(0, t) : e;
            }
            function f(e) {
                if (w || !v.isFunction(e)) return v.inspect(e);
                var t = s(e);
                return "[Function" + (t ? ": " + t : "") + "]";
            }
            function l(e, t, n, r, o) {
                throw new k.AssertionError({
                    message: n,
                    actual: e,
                    expected: t,
                    operator: r,
                    stackStartFunction: o
                });
            }
            function p(e, t) {
                e || l(e, !0, t, "==", k.ok);
            }
            function g(e, n, r, s) {
                if (e === n) return !0;
                if (i(e) && i(n)) return 0 === o(e, n);
                if (v.isDate(e) && v.isDate(n)) return e.getTime() === n.getTime();
                if (v.isRegExp(e) && v.isRegExp(n)) return e.source === n.source && e.global === n.global && e.multiline === n.multiline && e.lastIndex === n.lastIndex && e.ignoreCase === n.ignoreCase;
                if (null !== e && "object" === (void 0 === e ? "undefined" : t(e)) || null !== n && "object" === (void 0 === n ? "undefined" : t(n))) {
                    if (u(e) && u(n) && a(e) === a(n) && !(e instanceof Float32Array || e instanceof Float64Array)) return 0 === o(new Uint8Array(e.buffer), new Uint8Array(n.buffer));
                    if (i(e) !== i(n)) return !1;
                    var c = (s = s || {
                        actual: [],
                        expected: []
                    }).actual.indexOf(e);
                    return -1 !== c && c === s.expected.indexOf(n) || (s.actual.push(e), s.expected.push(n), 
                    function(e, t, n, r) {
                        if (null == e || null == t) return !1;
                        if (v.isPrimitive(e) || v.isPrimitive(t)) return e === t;
                        if (n && Object.getPrototypeOf(e) !== Object.getPrototypeOf(t)) return !1;
                        var o = d(e), i = d(t);
                        if (o && !i || !o && i) return !1;
                        if (o) return e = b.call(e), t = b.call(t), g(e, t, n);
                        var a, u, s = S(e), c = S(t);
                        if (s.length !== c.length) return !1;
                        for (s.sort(), c.sort(), u = s.length - 1; 0 <= u; u--) if (s[u] !== c[u]) return !1;
                        for (u = s.length - 1; 0 <= u; u--) if (a = s[u], !g(e[a], t[a], n, r)) return !1;
                        return !0;
                    }(e, n, r, s));
                }
                return r ? e === n : e == n;
            }
            function d(e) {
                return "[object Arguments]" == Object.prototype.toString.call(e);
            }
            function h(e, t) {
                if (!e || !t) return !1;
                if ("[object RegExp]" == Object.prototype.toString.call(t)) return t.test(e);
                try {
                    if (e instanceof t) return !0;
                } catch (e) {}
                return !Error.isPrototypeOf(t) && !0 === t.call({}, e);
            }
            function y(e, t, n, r) {
                var o;
                if ("function" != typeof t) throw new TypeError('"block" argument must be a function');
                "string" == typeof n && (r = n, n = null), o = function(e) {
                    var t;
                    try {
                        e();
                    } catch (e) {
                        t = e;
                    }
                    return t;
                }(t), r = (n && n.name ? " (" + n.name + ")." : ".") + (r ? " " + r : "."), e && !o && l(o, n, "Missing expected exception" + r);
                var i = "string" == typeof r, a = !e && o && !n;
                if ((!e && v.isError(o) && i && h(o, n) || a) && l(o, n, "Got unwanted exception" + r), 
                e && o && n && !h(o, n) || !e && o) throw o;
            }
            var v = r(4), m = Object.prototype.hasOwnProperty, b = Array.prototype.slice, w = "foo" === function() {}.name, k = e.exports = p, E = /\s*function\s+([^\(\s]*)\s*/;
            k.AssertionError = function(e) {
                var t;
                this.name = "AssertionError", this.actual = e.actual, this.expected = e.expected, 
                this.operator = e.operator, e.message ? (this.message = e.message, this.generatedMessage = !1) : (this.message = c(f((t = this).actual), 128) + " " + t.operator + " " + c(f(t.expected), 128), 
                this.generatedMessage = !0);
                var n = e.stackStartFunction || l;
                if (Error.captureStackTrace) Error.captureStackTrace(this, n); else {
                    var r = new Error();
                    if (r.stack) {
                        var o = r.stack, i = s(n), a = o.indexOf("\n" + i);
                        if (0 <= a) {
                            var u = o.indexOf("\n", a + 1);
                            o = o.substring(u + 1);
                        }
                        this.stack = o;
                    }
                }
            }, v.inherits(k.AssertionError, Error), k.fail = l, k.ok = p, k.equal = function(e, t, n) {
                e != t && l(e, t, n, "==", k.equal);
            }, k.notEqual = function(e, t, n) {
                e == t && l(e, t, n, "!=", k.notEqual);
            }, k.deepEqual = function(e, t, n) {
                g(e, t, !1) || l(e, t, n, "deepEqual", k.deepEqual);
            }, k.deepStrictEqual = function(e, t, n) {
                g(e, t, !0) || l(e, t, n, "deepStrictEqual", k.deepStrictEqual);
            }, k.notDeepEqual = function(e, t, n) {
                g(e, t, !1) && l(e, t, n, "notDeepEqual", k.notDeepEqual);
            }, k.notDeepStrictEqual = function e(t, n, r) {
                g(t, n, !0) && l(t, n, r, "notDeepStrictEqual", e);
            }, k.strictEqual = function(e, t, n) {
                e !== t && l(e, t, n, "===", k.strictEqual);
            }, k.notStrictEqual = function(e, t, n) {
                e === t && l(e, t, n, "!==", k.notStrictEqual);
            }, k.throws = function(e, t, n) {
                y(!0, e, t, n);
            }, k.doesNotThrow = function(e, t, n) {
                y(!1, e, t, n);
            }, k.ifError = function(e) {
                if (e) throw e;
            };
            var S = Object.keys || function(e) {
                var t = [];
                for (var n in e) m.call(e, n) && t.push(n);
                return t;
            };
        }).call(n, r(3));
    }, function(e, t) {
        e.exports = function() {
            return new Date().getTime();
        };
    }, function(e, t, n) {
        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r, o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t;
                };
            }(), i = n(2), a = n(1), u = n(6), s = (r = n(17)) && r.__esModule ? r : {
                default: r
            }, c = "resource", f = [], l = function() {
                function t(e, n) {
                    !function(e, n) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                    }(this), this.cfgManager = e, this.errManager = n, this.CACHE_SEND_TRIGGER = 10;
                }
                return o(t, [ {
                    key: "_parse",
                    value: function(e) {
                        return e.pageUrl || (e.pageUrl = this.cfgManager.get("pageUrl") || (0, i.getPageUrl)()), 
                        e.project || (e.project = this.cfgManager.get("project")), e;
                    }
                }, {
                    key: "_stringify",
                    value: function(e) {
                        var t = e ? f.splice(0, this.CACHE_SEND_TRIGGER) : f.splice(0, f.length);
                        if (t && t.length) {
                            var n = [], r = this.cfgManager.getExtension(), o = [], i = {
                                region: 0,
                                operator: 1,
                                network: 2,
                                container: 3,
                                os: 4,
                                unionId: 5
                            };
                            for (var a in r) r.hasOwnProperty(a) && (o[i[a]] = r[a]);
                            r = "S\t" + o.join("\t"), n.push(r);
                            for (var u = 0; u < t.length; u++) {
                                var s = t[u];
                                n.push(s.stringify());
                            }
                            return f = [], n = n.join("\n");
                        }
                    }
                }, {
                    key: "pushApi",
                    value: function(e, t) {
                        var n = this._parse(e), r = new s.default(n);
                        f.push(r), f.length && (f.length >= this.CACHE_SEND_TRIGGER && this.report(!0), 
                        t && this.report());
                    }
                }, {
                    key: "addApi",
                    value: function(t, n) {
                        if (t) if (void 0 === t.networkCode || "number" == typeof t.networkCode) if (void 0 === t.statusCode || "number" == typeof t.statusCode) {
                            var r = {
                                type: "api",
                                resourceUrl: t.name,
                                statusCode: (t.networkCode || "") + "|" + (t.statusCode || ""),
                                responsetime: t.responseTime
                            };
                            t.content && (r.firstCategory = u.CATEGORY.AJAX, r.secondCategory = t.secondCategory || t.name, 
                            r.logContent = t.content), this.pushApi(r, n);
                        } else e.log("业务状态码必须为Number类型", JSON.stringify(t)); else e.log("网络状态码必须为Number类型", JSON.stringify(t));
                    }
                }, {
                    key: "addApiError",
                    value: function(e, t, n) {
                        .2 < Math.random() || this.errManager.pushError({
                            sec_category: e,
                            content: t,
                            category: "ajaxError",
                            level: "warn"
                        }, n);
                    }
                }, {
                    key: "report",
                    value: function() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0], t = this.cfgManager, n = this._stringify(e);
                        if (!(Math.random() > t.get(c).sample) && n) {
                            var r = t.getApiPath(c), o = (0, a.stringify)(r);
                            o = o + "&" + (0, a.getReportVersions)(t.config), (0, a.requestQueue)({
                                url: o,
                                data: "c=" + encodeURIComponent(n),
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                method: "POST",
                                success: function() {}
                            });
                        }
                    }
                } ]), t;
            }();
            t.default = l;
        }).call(t, n(0));
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), o = [ "resourceUrl", "timestamp", "requestbyte", "responsebyte", "responsetime", "project", "pageUrl", "statusCode", "firstCategory", "secondCategory", "logContent" ], i = [ "resourceUrl", "timestamp", "requestbyte", "responsebyte", "responsetime", "project", "pageUrl", "statusCode", "firstCategory", "secondCategory", "logContent" ], a = function() {
            function e(t) {
                var n = this;
                !function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e), o.forEach(function(e) {
                    void 0 !== t[e] ? n[e] = t[e] : n[e] = "";
                }), this.parse();
            }
            return r(e, [ {
                key: "update",
                value: function(e) {
                    for (var t in e) e.hasOwnProperty(t) && -1 !== o.indexOf(t) && (this[t] = e[t]);
                }
            }, {
                key: "parse",
                value: function() {
                    this.timestamp || (this.timestamp = Date.now()), this.requestbyte || (this.requestbyte = 0), 
                    this.responsebyte || (this.responsebyte = 0);
                }
            }, {
                key: "stringify",
                value: function() {
                    var e = this;
                    return i.map(function(t) {
                        return e[t];
                    }).join("\t");
                }
            } ]), e;
        }();
        t.default = a;
    }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = function e(t, n) {
            var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : wx.request, o = t.url, i = t.reportError, a = t.isRequest, u = Date.now(), s = t.complete;
            return t.complete = function(r) {
                try {
                    var a = r.statusCode, c = void 0 === a ? "500|" : a, f = r.errMsg, l = void 0 === f ? "request:ok" : f, p = Date.now() - u, g = {};
                    if (i && "request:fail " !== l) {
                        var d = i(r, e) || {}, h = d.log, y = void 0 === h ? "" : h, v = d.code, m = void 0 === v ? 200 : v, b = d.name, w = void 0 === b ? "" : b, k = "";
                        (y || w) && (k = "ajaxError"), g = {
                            statusCode: c + "|" + m,
                            logContent: y,
                            firstCategory: k,
                            secondCategory: w || t.url
                        };
                    }
                    n.resource.pushApi(Object.assign({
                        timestamp: u,
                        requestbyte: 0,
                        responsebyte: 0,
                        statusCode: c,
                        resourceUrl: o,
                        responsetime: p
                    }, g));
                } finally {
                    s && s.apply(this, arguments);
                }
            }, a && r(t), t;
        };
    }, function(e, t, n) {
        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t;
                };
            }(), o = n(2), i = n(1), a = function() {
                function t(e) {
                    !function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                    }(this, t), this.cfgManager = e, this.speed = {}, this.firstContentfullPaint = {}, 
                    this.moduleFirstRenderTime = {}, this.pageSource = {};
                }
                return r(t, [ {
                    key: "pushSpeed",
                    value: function(e, t, n) {
                        var r = this, i = this.speed;
                        this.pageSource, i[e] || (i[e] = {}, i[e].customspeed = []), (0, o.getEnv)().then(function(o) {
                            var a = o;
                            a.pageurl = e || a.pageUrl, delete a.pageUrl;
                            var u = r.cfgManager.config, s = u.project, c = u.unionId, f = u.wxAppVersion;
                            Object.assign(i[e], a, {
                                project: s,
                                timestamp: Date.now(),
                                unionId: c,
                                speed: "0|0|0",
                                wxAppVersion: f
                            }), i[e].customspeed[t] = n;
                        });
                    }
                }, {
                    key: "start",
                    value: function(e, t) {
                        this["start-" + e + "-" + t] = Date.now();
                    }
                }, {
                    key: "end",
                    value: function(t, n) {
                        var r = this["start-" + t + "-" + n], o = this["start-app-0"];
                        o && (delete this["start-app-0"], this.pushSpeed("app", 0, Date.now() - o)), r ? this.pushSpeed(t, n, Date.now() - r) : e.log("请先埋点 start");
                    }
                }, {
                    key: "addSource",
                    value: function() {
                        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "default";
                        try {
                            if (this._refresh) return;
                            var n = (0, o.getPageUrl)();
                            this.pageSource[n] || (this.pageSource[n] = {}), this.pageSource[n].source = t;
                        } catch (t) {
                            e.log("addSource error", JSON.stringify(t));
                        }
                    }
                }, {
                    key: "addPoint",
                    value: function() {
                        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1];
                        if (!this._refresh) if (n || (n = (0, o.getPageUrl)() || ""), "app" === n) this.pushSpeed("app", t.position, Date.now() - this._appStart); else {
                            var r = this._start || Date.now(), i = void 0;
                            if (void 0 === t.position) return void e.log("请先埋点position");
                            if (void 0 !== t.duration) i = t; else if (void 0 !== r) {
                                var a = t.timeStamp || +Date.now();
                                i = {
                                    position: t.position,
                                    duration: a - r
                                };
                            }
                            i && this.pushSpeed(n, i.position, i.duration);
                        }
                    }
                }, {
                    key: "createFirstContentfulPaint",
                    value: function() {
                        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [ "default" ], n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
                        try {
                            if (this._refresh) return;
                            var r = (0, o.getPageUrl)();
                            this.firstContentfullPaint[r] || (this.firstContentfullPaint[r] = {}), this.firstContentfullPaint[r][n] = t;
                        } catch (t) {
                            e.log("create first error", JSON.stringify(t));
                        }
                    }
                }, {
                    key: "addFirstContentfulPaint",
                    value: function() {
                        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "default", n = arguments[1];
                        if (!this._refresh) {
                            var r = (0, o.getPageUrl)(), i = void 0;
                            try {
                                this.firstContentfullPaint[r] || (this.firstContentfullPaint[r] = {}), i = n || +new Date() - this._start, 
                                this.moduleFirstRenderTime[r] || (this.moduleFirstRenderTime[r] = {}), this.moduleFirstRenderTime[r][t] || (this.moduleFirstRenderTime[r][t] = i);
                            } catch (t) {
                                e.log("add first error", JSON.stringify(t));
                            }
                        }
                    }
                }, {
                    key: "_getPageFirstPaint",
                    value: function(e, t) {
                        var n = this, r = void 0;
                        this.firstContentfullPaint[e] && (r = this.firstContentfullPaint[e][t]);
                        var o = 0;
                        return r.map(function(t) {
                            o = Math.max(n.moduleFirstRenderTime[e][t], o);
                        }), o;
                    }
                }, {
                    key: "appLaunch",
                    value: function(e) {
                        this._appStart = e, this.addPoint({
                            position: 0
                        }, "app");
                    }
                }, {
                    key: "pageLoad",
                    value: function() {
                        this._start = Date.now(), this._refresh = !1;
                    }
                }, {
                    key: "pageReady",
                    value: function() {
                        this.addPoint({
                            position: 0
                        }, (0, o.getPageUrl)());
                    }
                }, {
                    key: "pullRefresh",
                    value: function() {
                        this._refresh = !0;
                    }
                }, {
                    key: "report",
                    value: function() {
                        var e = this, t = this.cfgManager;
                        if (!(Math.random() > t.get("page").sample)) {
                            var n = this.speed, r = this.firstContentfullPaint, o = this.moduleFirstRenderTime, a = t.getApiPath("page");
                            Object.keys(n).map(function(t) {
                                var u = Object.assign({}, n[t]);
                                if (r[t]) {
                                    var s = e.firstContentfullPaint[t];
                                    for (var c in s) u.customspeed[c] = e._getPageFirstPaint(t, c);
                                }
                                u.customspeed = u.customspeed.join("|");
                                var f = (0, i.stringify)(a);
                                f = (0, i.stringify)(f, u), n[t] && delete n[t], o[t] && delete o[t], r[t] && delete r[t], 
                                (0, i.requestQueue)({
                                    url: f,
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded;"
                                    },
                                    method: "GET",
                                    success: function() {}
                                });
                            });
                        }
                    }
                } ]), t;
            }();
            t.default = a;
        }).call(t, n(0));
    }, function(e, t, n) {
        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t;
                };
            }(), o = n(1), i = function() {
                function t(e) {
                    !function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                    }(this, t), this.cfgManager = e, this.tags = {}, this.kvs = {};
                }
                return r(t, [ {
                    key: "setTags",
                    value: function(e) {
                        this.tags = Object.assign(this.tags, e);
                    }
                }, {
                    key: "getTags",
                    value: function(e) {
                        return e ? this.tags[e] : this.tags;
                    }
                }, {
                    key: "setMetric",
                    value: function(t, n) {
                        return "string" != typeof t ? e.log("metric名称必须是string类型") : "number" != typeof n ? e.log("metric值必须是number类型,当前为" + t + "-" + n) : (this.kvs[t] || (this.kvs[t] = []), 
                        void this.kvs[t].push(n));
                    }
                }, {
                    key: "getMetric",
                    value: function(e) {
                        return e ? this.kvs[e] : this.kvs;
                    }
                }, {
                    key: "clearMetric",
                    value: function() {
                        this.kvs = {};
                    }
                }, {
                    key: "clearTags",
                    value: function() {
                        this.tags = {};
                    }
                }, {
                    key: "_rollbackMetric",
                    value: function(e) {
                        for (var t in e) e.hasOwnProperty(t) && (this.kvs[t] = e[t].concat(this.kvs[t] || []));
                    }
                }, {
                    key: "_rollbackTags",
                    value: function(e) {
                        this.tags = e || {};
                    }
                }, {
                    key: "report",
                    value: function() {
                        var e = this, t = this.cfgManager;
                        if (this.kvs && 0 !== Object.keys(this.kvs).length) {
                            var n = {
                                kvs: this.kvs,
                                tags: this.tags,
                                ts: parseInt(+new Date() / 1e3)
                            }, r = this.tags;
                            this.clearTags();
                            var i = t.getApiPath("metric");
                            (0, o.requestQueue)({
                                url: i + "&p=" + t.config.project,
                                method: "POST",
                                header: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                data: "data=" + encodeURIComponent(JSON.stringify(n)),
                                fail: function() {
                                    e._rollbackTags(r);
                                }
                            });
                        }
                    }
                } ]), t;
            }();
            t.default = i;
        }).call(t, n(0));
    }, function(e, t, n) {
        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                        Object.defineProperty(e, r.key, r);
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t;
                };
            }(), o = n(7), i = function() {
                function t(e) {
                    !function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                    }(this, t), this.cfgManager = e;
                }
                return r(t, [ {
                    key: "addLog",
                    value: function(t) {
                        "string" == typeof t ? o.log("[Log]: " + t) : e.log("addLog只接受string类型的日志");
                    }
                } ]), t;
            }();
            t.default = i;
        }).call(t, n(0));
    }, function(e, n, r) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = "function" == typeof Symbol && "symbol" === t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        }, i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        }(), a = r(6), u = r(1), s = "https://catfront.dianping.com", c = [ "region", "operator", "network", "container", "os", "unionId" ], f = function() {
            function e(t) {
                if (function(t, n) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this), this._config = {
                    devMode: !1,
                    project: "",
                    pageUrl: "",
                    resource: {
                        sample: .1
                    },
                    page: {
                        sample: .5
                    },
                    error: {
                        sample: 1
                    },
                    version: {},
                    logan: {
                        enable: !1,
                        config: {
                            enableShake: !1,
                            appSource: "dianping"
                        }
                    }
                }, this.config = {}, this.userConfig = {}, this.url = s, t ? this.set(t) : this.config = this._config, 
                this.baseQuery = {
                    v: 1,
                    sdk: a.VERSION
                }, this.apiPaths = {
                    log: "/api/log",
                    error: "/api/log",
                    page: "/api/speed",
                    resource: "/api/batch",
                    metric: "/api/metric"
                }, this.extensions = {}, !t.unionId) {
                    var n = wx.getStorageSync(a.STOREKEY + "-unionId");
                    n ? this.config.unionId = n : (this.config.unionId = (0, u.MSID)(), this.cacheUnionId(this.config.unionId));
                }
            }
            return i(e, [ {
                key: "_update",
                value: function() {
                    for (var e in this.config = this._config, this.userConfig) {
                        var t = this.userConfig[e];
                        "object" !== (void 0 === t ? "undefined" : o(t)) || t instanceof RegExp || t instanceof Array ? this.config[e] = t : this.config[e] = (0, 
                        u.extend)(this.config[e], this.userConfig[e]);
                    }
                }
            }, {
                key: "update",
                value: function(e, t) {
                    this[e] = t, "unionId" === e && this.cacheUnionId(t);
                }
            }, {
                key: "get",
                value: function(e) {
                    return e ? this.config[e] : this.config;
                }
            }, {
                key: "set",
                value: function(e) {
                    for (var t in e) e.hasOwnProperty(t) && ("devMode" === t && this.setApiDomain(e[t]), 
                    "object" !== o(e[t]) || e[t] instanceof RegExp || e[t] instanceof Array ? this.userConfig[t] = e[t] : this.userConfig[t] = (0, 
                    u.extend)(this.userConfig[t], e[t]));
                    this._update();
                }
            }, {
                key: "getApiPath",
                value: function(e) {
                    var t = this.apiPaths[e];
                    return (0, u.stringify)(this.url + t, this.baseQuery);
                }
            }, {
                key: "setApiDomain",
                value: function(e) {
                    this.url = e ? "https://catfront.51ping.com" : s;
                }
            }, {
                key: "getExtension",
                value: function(e) {
                    return e ? this.extensions[e] : this.extensions;
                }
            }, {
                key: "setExtension",
                value: function(e) {
                    for (var t in e) if (e.hasOwnProperty(t)) {
                        var n = e[t];
                        -1 !== c.indexOf(t) ? this.extensions[t] = "unionId" === t ? this.config.unionId : n : this.config.version[t] = n;
                    }
                }
            }, {
                key: "cacheUnionId",
                value: function(e) {
                    wx.setStorage({
                        key: a.STOREKEY + "-unionId",
                        data: e
                    });
                }
            } ]), e;
        }();
        n.default = f;
    }, function(e, t, n) {
        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = function(t, n) {
                var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : Page, o = n.onLoad, i = n.onReady, a = n.onHide, u = n.onUnload, s = n.onPullDownRefresh, c = t.pageSpeed, f = t.cfgManager, l = t.error;
                n.onLoad = function(t) {
                    try {
                        c.pageLoad(f);
                    } catch (t) {
                        e.log("onLoad error:" + t.stack || t);
                    }
                    o && o.call(this, t);
                }, n.imageError = function(e) {
                    l.pushError({
                        content: e.detail && e.detail.errMsg,
                        category: "jsError",
                        sec_category: "image error",
                        level: "error"
                    });
                }, n.onReady = function(t) {
                    try {
                        c.pageReady();
                    } catch (t) {
                        e.log("onReady error:" + t.stack || t);
                    }
                    i && i.call(this, t);
                }, n.onHide = function(t) {
                    try {
                        c.report();
                    } catch (t) {
                        e.log("page onHide error:" + t.stack || t);
                    }
                    a && a.call(this, t);
                }, n.onUnload = function(t) {
                    try {
                        c.report();
                    } catch (t) {
                        e.log("page onUnload error:" + t.stack || t);
                    }
                    u && u.call(this, t);
                }, n.onPullDownRefresh = function(t) {
                    try {
                        c.pullRefresh();
                    } catch (t) {
                        e.log("page pullRefresh error:" + t.stack || t);
                    }
                    s && s.call(this, t);
                }, r(n);
            };
        }).call(t, n(0));
    }, function(e, t, n) {
        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = function(t, n) {
                var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : App, o = n.onLaunch, i = n.onError, a = n.onHide, u = n.onPageNotFound, s = t.pageSpeed, c = t.error, f = t.resource;
                n.onLaunch = function(t) {
                    try {
                        var n = Date.now();
                        s.appLaunch(n);
                    } catch (t) {
                        e.log("onLaunch error:" + t.stack || t);
                    }
                    o.call(this, t);
                }, n.onError = function(t) {
                    try {
                        c.onError(t);
                    } catch (t) {
                        e.log("onError catch:" + t.stack || t);
                    }
                    i && i.call(this, t);
                }, n.onHide = function() {
                    try {
                        c.report(), f.report();
                    } catch (t) {
                        e.log("onHide catch:" + t.stack || t);
                    }
                    a && a.call(this);
                }, n.onPageNotFound = function(t) {
                    try {
                        t && c.addError("page not found", t.path);
                    } catch (t) {
                        e.log("onPageNotFound catch:" + t.stack || t);
                    }
                    u && u.call(this);
                }, r(n);
            };
        }).call(t, n(0));
    } ]);
});