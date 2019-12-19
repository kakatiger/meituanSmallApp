function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = "function" == typeof Symbol && "symbol" == r(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : r(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : r(e);
}, o = function() {
    function e(e, r) {
        for (var n = 0; n < r.length; n++) {
            var o = r[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(r, n, o) {
        return n && e(r.prototype, n), o && e(r, o), r;
    };
}(), t = require("../env.js"), i = require("../util/util.js"), c = require("./model.js").default, a = [], s = function() {
    function r(n) {
        e(this, r), this.cfgManager = n;
    }
    return o(r, [ {
        key: "parse",
        value: function(e) {
            return e.project || (e.project = this.cfgManager.get("project")), e.pageUrl || (e.pageUrl = this.cfgManager.get("pageUrl") || (0, 
            t.getPageUrl)()), e;
        }
    }, {
        key: "pushError",
        value: function(e, r) {
            var n = this, o = this.cfgManager;
            (0, t.getEnv)().then(function(t) {
                var i = new c(e);
                i = i.updateTags({
                    wxLibVersion: t.wxLibVersion,
                    wxVersion: t.wxVersion
                }), i = (i = n._handleError(i)).toJson(), e = n.parse(i);
                var s = t.network, u = t.container, l = t.os, f = t.unionId;
                f = o.config.unionId || f, e = Object.assign({
                    network: s,
                    container: u,
                    os: l,
                    unionId: f
                }, e), a.push(e), r && n.report();
            });
        }
    }, {
        key: "_handleError",
        value: function(e) {
            try {
                var r = this.cfgManager.get("onErrorPush");
                if (r instanceof Function && (e = r(e)), e instanceof c || void 0 === e) return e;
                console.log("onErrorPush方法返回结果有误");
            } catch (r) {
                return e;
            }
        }
    }, {
        key: "addError",
        value: function(e, r, o) {
            e || (e = "default"), r || (r = "error");
            try {
                r instanceof c || (r instanceof Error ? r = r.stack || r.message : "object" === (void 0 === r ? "undefined" : n(r)) && (r = {
                    sec_category: r.name,
                    content: r.msg
                })), this.pushError({
                    sec_category: e,
                    content: r,
                    category: "jsError",
                    level: "error"
                }, o);
            } catch (e) {
                this.reportSystemError(e), console.log("owl-inside-error", e);
            }
        }
    }, {
        key: "reportSystemError",
        value: function(e) {
            var r = this;
            e && e.stack && (0, t.getEnv)().then(function(n) {
                a.push(new c({
                    project: "owl",
                    pageUrl: r.cfgManager.config.project + (0, t.getPageUrl)(),
                    sec_category: e.msg || e.name || "parseError",
                    content: JSON.stringify(e.stack)
                })), r.report();
            }).catch(function(e) {
                console.log("owl-error", e);
            });
        }
    }, {
        key: "onError",
        value: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "jsError", n = e.replace("thirdScriptError", "").split(";");
            n = (n = n.length ? n[0] : "").replace(/\t|\n/g, ""), this.pushError(new c({
                content: e,
                category: r,
                sec_category: n,
                level: "error"
            }), !0);
        }
    }, {
        key: "report",
        value: function(e, r) {
            var n = this.cfgManager;
            if (a.length) {
                var o = n.getApiPath("error"), t = (0, i.stringify)(o);
                t = t + "&" + (0, i.getReportVersions)(n.config), (0, i.requestQueue)({
                    url: t,
                    data: "c=" + encodeURIComponent(JSON.stringify(a)),
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded;"
                    },
                    success: function(r) {
                        a = [], e && e instanceof Function && e(r);
                    },
                    fail: function(e) {
                        r && r instanceof Function && r(e);
                    }
                });
            }
        }
    } ]), r;
}();

exports.default = s;