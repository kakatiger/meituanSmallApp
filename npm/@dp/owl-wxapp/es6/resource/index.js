function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), r = require("../env.js"), n = require("../util/util.js"), o = require("../constant/index.js"), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./model.js")), a = [], s = function() {
    function s(t, r) {
        e(this, s), this.cfgManager = t, this.errManager = r, this.CACHE_SEND_TRIGGER = 10;
    }
    return t(s, [ {
        key: "_parse",
        value: function(e) {
            return e.pageUrl || (e.pageUrl = this.cfgManager.get("pageUrl") || (0, r.getPageUrl)()), 
            e.project || (e.project = this.cfgManager.get("project")), e;
        }
    }, {
        key: "_stringify",
        value: function(e) {
            var t = e ? a.splice(0, this.CACHE_SEND_TRIGGER) : a.splice(0, a.length);
            if (t && t.length) {
                var r = [], n = this.cfgManager.getExtension(), o = [], i = {
                    region: 0,
                    operator: 1,
                    network: 2,
                    container: 3,
                    os: 4,
                    unionId: 5
                };
                for (var s in n) n.hasOwnProperty(s) && (o[i[s]] = n[s]);
                n = "S\t" + o.join("\t"), r.push(n);
                for (var u = 0; u < t.length; u++) {
                    var c = t[u];
                    r.push(c.stringify());
                }
                return a = [], r = r.join("\n");
            }
        }
    }, {
        key: "pushApi",
        value: function(e, t) {
            var r = this._parse(e), n = new i.default(r);
            a.push(n), a.length && (a.length >= this.CACHE_SEND_TRIGGER && this.report(!0), 
            t && this.report());
        }
    }, {
        key: "addApi",
        value: function(e, t) {
            if (e) if (void 0 === e.networkCode || "number" == typeof e.networkCode) if (void 0 === e.statusCode || "number" == typeof e.statusCode) {
                var r = {
                    type: "api",
                    resourceUrl: e.name,
                    statusCode: (e.networkCode || "") + "|" + (e.statusCode || ""),
                    responsetime: e.responseTime
                };
                e.content && (r.firstCategory = o.CATEGORY.AJAX, r.secondCategory = e.secondCategory || e.name, 
                r.logContent = e.content), this.pushApi(r, t);
            } else console.log("业务状态码必须为Number类型", JSON.stringify(e)); else console.log("网络状态码必须为Number类型", JSON.stringify(e));
        }
    }, {
        key: "addApiError",
        value: function(e, t, r) {
            .2 < Math.random() || this.errManager.pushError({
                sec_category: e,
                content: t,
                category: "ajaxError",
                level: "warn"
            }, r);
        }
    }, {
        key: "report",
        value: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0], t = this.cfgManager, r = this._stringify(e);
            if (!(Math.random() > t.get("resource").sample) && r) {
                var o = t.getApiPath("resource"), i = (0, n.stringify)(o);
                i = i + "&" + (0, n.getReportVersions)(t.config), (0, n.requestQueue)({
                    url: i,
                    data: "c=" + encodeURIComponent(r),
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    success: function() {}
                });
            }
        }
    } ]), s;
}();

exports.default = s;