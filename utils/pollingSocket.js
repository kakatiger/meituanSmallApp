function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, i) {
            return function r(n, a) {
                try {
                    var s = e[n](a), c = s.value;
                } catch (n) {
                    return void i(n);
                }
                if (!s.done) return Promise.resolve(c).then(function(t) {
                    r("next", t);
                }, function(t) {
                    r("throw", t);
                });
                t(c);
            }("next");
        });
    };
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../npm/babel-runtime/regenerator/index.js")), r = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var r = e[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, i, r) {
        return i && t(e.prototype, i), r && t(e, r), e;
    };
}(), n = function() {
    function n(t, i, r, a, s) {
        e(this, n), this.dataApi = t, this.preApi = a, this.timeGap = s || 5e3, this.callback = i, 
        this.failCB = r, this.isPoll = !0;
    }
    var a, s;
    return r(n, [ {
        key: "start",
        value: function() {
            this.timer && clearTimeout(this.timer), this.initTimer = setTimeout(this.processApi.bind(this), 100);
        }
    }, {
        key: "end",
        value: function() {
            clearTimeout(this.initTimer), clearTimeout(this.timer), this.isPoll = !1;
        }
    }, {
        key: "fetchData",
        value: (s = t(i.default.mark(function t() {
            var e, r, n, a;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e = this.dataApi, r = e.api, n = e.payload, t.prev = 1, t.next = 4, r(n);

                  case 4:
                    a = t.sent, this.callback(a), t.next = 12;
                    break;

                  case 8:
                    t.prev = 8, t.t0 = t.catch(1), console.log("请求真实数据失败"), this.failCB && this.failCB(t.t0);

                  case 12:
                    this.timer && clearTimeout(this.timer), this.isPoll && (this.timer = setTimeout(this.fetchData.bind(this), this.timeGap));

                  case 14:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 1, 8 ] ]);
        })), function() {
            return s.apply(this, arguments);
        })
    }, {
        key: "processApi",
        value: (a = t(i.default.mark(function t() {
            var e, r, n;
            return i.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (this.preApi && this.preApi.api) return e = this.preApi, r = e.api, n = e.payload, 
                    t.prev = 2, t.next = 5, r(n);
                    t.next = 14;
                    break;

                  case 5:
                    t.sent && this.fetchData(), t.next = 12;
                    break;

                  case 9:
                    t.prev = 9, t.t0 = t.catch(2), console.log("获取预请求失败");

                  case 12:
                    t.next = 15;
                    break;

                  case 14:
                    this.fetchData();

                  case 15:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 2, 9 ] ]);
        })), function() {
            return a.apply(this, arguments);
        })
    } ]), n;
}();

exports.default = n;