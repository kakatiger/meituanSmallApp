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
}(), r = [ "resourceUrl", "timestamp", "requestbyte", "responsebyte", "responsetime", "project", "pageUrl", "statusCode", "firstCategory", "secondCategory", "logContent" ], n = [ "resourceUrl", "timestamp", "requestbyte", "responsebyte", "responsetime", "project", "pageUrl", "statusCode", "firstCategory", "secondCategory", "logContent" ], s = function() {
    function s(t) {
        var n = this;
        e(this, s), r.forEach(function(e) {
            void 0 !== t[e] ? n[e] = t[e] : n[e] = "";
        }), this.parse();
    }
    return t(s, [ {
        key: "update",
        value: function(e) {
            for (var t in e) e.hasOwnProperty(t) && -1 !== r.indexOf(t) && (this[t] = e[t]);
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
            return n.map(function(t) {
                return e[t];
            }).join("\t");
        }
    } ]), s;
}();

exports.default = s;