function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var s = 0; s < e.length; s++) {
            var n = e[s];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, s, n) {
        return s && t(e.prototype, s), n && t(e, n), e;
    };
}(), s = require("../util/util.js"), n = function() {
    function n(e) {
        t(this, n), this.cfgManager = e, this.tags = {}, this.kvs = {};
    }
    return e(n, [ {
        key: "setTags",
        value: function(t) {
            this.tags = Object.assign(this.tags, t);
        }
    }, {
        key: "getTags",
        value: function(t) {
            return t ? this.tags[t] : this.tags;
        }
    }, {
        key: "setMetric",
        value: function(t, e) {
            return "string" != typeof t ? console.log("metric名称必须是string类型") : "number" != typeof e ? console.log("metric值必须是number类型,当前为" + t + "-" + e) : (this.kvs[t] || (this.kvs[t] = []), 
            void this.kvs[t].push(e));
        }
    }, {
        key: "getMetric",
        value: function(t) {
            return t ? this.kvs[t] : this.kvs;
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
        value: function(t) {
            for (var e in t) t.hasOwnProperty(e) && (this.kvs[e] = t[e].concat(this.kvs[e] || []));
        }
    }, {
        key: "_rollbackTags",
        value: function(t) {
            this.tags = t || {};
        }
    }, {
        key: "report",
        value: function() {
            var t = this, e = this.cfgManager;
            if (this.kvs && 0 !== Object.keys(this.kvs).length) {
                var n = {
                    kvs: this.kvs,
                    tags: this.tags,
                    ts: parseInt(+new Date() / 1e3)
                }, i = this.tags;
                this.clearTags();
                var a = e.getApiPath("metric");
                (0, s.requestQueue)({
                    url: a + "&p=" + e.config.project,
                    method: "POST",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: "data=" + encodeURIComponent(JSON.stringify(n)),
                    fail: function() {
                        t._rollbackTags(i);
                    }
                });
            }
        }
    } ]), n;
}();

exports.default = n;