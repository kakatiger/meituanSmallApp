function n(n, e) {
    if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(n) {
    return void 0 === n ? "undefined" : e(n);
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : void 0 === n ? "undefined" : e(n);
}, i = function() {
    function n(n, e) {
        for (var t = 0; t < e.length; t++) {
            var i = e[t];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(n, i.key, i);
        }
    }
    return function(e, t, i) {
        return t && n(e.prototype, t), i && n(e, i), e;
    };
}(), o = require("./constant/index.js"), r = require("./util/util.js"), s = "https://catfront.dianping.com", u = [ "region", "operator", "network", "container", "os", "unionId" ], a = function() {
    function e(t) {
        if (n(this, e), this._config = {
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
            sdk: o.VERSION
        }, this.apiPaths = {
            log: "/api/log",
            error: "/api/log",
            page: "/api/speed",
            resource: "/api/batch",
            metric: "/api/metric"
        }, this.extensions = {}, !t.unionId) {
            var i = wx.getStorageSync(o.STOREKEY + "-unionId");
            i ? this.config.unionId = i : (this.config.unionId = (0, r.MSID)(), this.cacheUnionId(this.config.unionId));
        }
    }
    return i(e, [ {
        key: "_update",
        value: function() {
            for (var n in this.config = this._config, this.userConfig) {
                var e = this.userConfig[n];
                "object" !== (void 0 === e ? "undefined" : t(e)) || e instanceof RegExp || e instanceof Array ? this.config[n] = e : this.config[n] = (0, 
                r.extend)(this.config[n], this.userConfig[n]);
            }
        }
    }, {
        key: "update",
        value: function(n, e) {
            this[n] = e, "unionId" === n && this.cacheUnionId(e);
        }
    }, {
        key: "get",
        value: function(n) {
            return n ? this.config[n] : this.config;
        }
    }, {
        key: "set",
        value: function(n) {
            for (var e in n) n.hasOwnProperty(e) && ("devMode" === e && this.setApiDomain(n[e]), 
            "object" !== t(n[e]) || n[e] instanceof RegExp || n[e] instanceof Array ? this.userConfig[e] = n[e] : this.userConfig[e] = (0, 
            r.extend)(this.userConfig[e], n[e]));
            this._update();
        }
    }, {
        key: "getApiPath",
        value: function(n) {
            var e = this.apiPaths[n];
            return (0, r.stringify)(this.url + e, this.baseQuery);
        }
    }, {
        key: "setApiDomain",
        value: function(n) {
            this.url = n ? "https://catfront.51ping.com" : s;
        }
    }, {
        key: "getExtension",
        value: function(n) {
            return n ? this.extensions[n] : this.extensions;
        }
    }, {
        key: "setExtension",
        value: function(n) {
            for (var e in n) if (n.hasOwnProperty(e)) {
                var t = n[e];
                -1 !== u.indexOf(e) ? this.extensions[e] = "unionId" === e ? this.config.unionId : t : this.config.version[e] = t;
            }
        }
    }, {
        key: "cacheUnionId",
        value: function(n) {
            wx.setStorage({
                key: o.STOREKEY + "-unionId",
                data: n
            });
        }
    } ]), e;
}();

exports.default = a;