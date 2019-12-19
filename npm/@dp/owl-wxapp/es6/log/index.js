function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var r = n[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, t, r) {
        return t && e(n.prototype, t), r && e(n, r), n;
    };
}(), t = require("../util/logan.js"), r = function() {
    function r(n) {
        e(this, r), this.cfgManager = n;
    }
    return n(r, [ {
        key: "addLog",
        value: function(e) {
            "string" == typeof e ? t.log("[Log]: " + e) : console.log("addLog只接受string类型的日志");
        }
    } ]), r;
}();

exports.default = r;