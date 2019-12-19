function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new i.default(function(e, r) {
            return function o(a, n) {
                try {
                    var s = t[a](n), m = s.value;
                } catch (a) {
                    return void r(a);
                }
                if (!s.done) return i.default.resolve(m).then(function(e) {
                    o("next", e);
                }, function(e) {
                    o("throw", e);
                });
                e(m);
            }("next");
        });
    };
}

function r(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = e(require("../../../../babel-runtime/regenerator/index.js")), n = "function" == typeof Symbol && "symbol" == o(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : o(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : o(e);
}, s = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
    };
}(), i = e(require("../../npm/promise-polyfill/lib/index.js")), m = e(require("./utils/object-assign.js")), u = require("./api/index.js"), d = function(e, t, r, o) {
    (0, u.requestApi)(e, t).then(function(e) {
        var o = e.statusCode, a = e.errMsg, n = e.data, s = e.header, i = t.successCode || 0;
        if ("200" !== String(o)) {
            var m = "Status code not 200[" + o + "]: " + a;
            throw {
                code: o,
                data: n.data,
                header: s,
                msg: m,
                message: m
            };
        }
        var u = n.code, d = n.data, c = n.msg;
        if (u !== i) throw {
            code: u,
            data: d,
            header: s,
            msg: c,
            message: c
        };
        s && (n.header = s), r(n);
    }).catch(function(e) {
        var t = e.msg || e.message || "网络异常，请重试";
        o({
            code: e.code || (0 === e.code ? 0 : -1),
            data: e.data || null,
            header: e.header || null,
            msg: t,
            message: t
        });
    });
}, c = function() {
    function e() {
        r(this, e), this.requestInitData = {}, this.updateWmCommonParams = {}, this.updateRohrParams = {};
    }
    var o;
    return s(e, [ {
        key: "init",
        value: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.wmCommonParams, r = void 0 === t ? {} : t, o = e.isNeedWmParams, a = void 0 === o ? 1 : o, n = e.rohrParams, s = void 0 === n ? {} : n, i = e.catRequest, m = void 0 === i ? wx.request : i, d = r.wm_ctype, c = r.wm_uuid, f = r.wm_appversion;
            a && (d || console.error("wmCommonParams对象必须设置wm_ctype"), c || console.error("wmCommonParams对象必须设置wm_uuid"), 
            f || console.error("wmCommonParams对象必须设置wm_appversion")), (0, u.storeData)(this, {
                wmCommonParams: r,
                isNeedWmParams: a,
                rohrParams: s,
                catRequest: m
            });
        }
    }, {
        key: "update",
        value: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.wmCommonParams, r = void 0 === t ? {} : t, o = e.rohrParams, a = void 0 === o ? {} : o;
            this.updateWmCommonParams = r, this.updateRohrParams = a;
            var s = this.requestInitData;
            "object" === (void 0 === s ? "undefined" : n(s)) ? ("object" === n(s.wmCommonParams) && (s.wmCommonParams = (0, 
            m.default)({}, s.wmCommonParams, r)), "object" === n(s.rohrParams) && (s.rohrParams = (0, 
            m.default)({}, s.rohrParams, a)), this.requestInitData = s) : console.error("内存无配置数据,无法更新,请确保已经init配置数据");
        }
    }, {
        key: "req",
        value: (o = t(a.default.mark(function e(t) {
            var r, o, s, c;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, (0, u.getData)(this);

                  case 2:
                    return r = e.sent, o = r.wmCommonParams, s = r.rohrParams, c = r.request, e.abrupt("return", new i.default(function(e, r) {
                        var a = {};
                        if (t && "object" === (void 0 === t ? "undefined" : n(t))) {
                            var i = t.options;
                            delete (a = (0, m.default)({}, t, i)).options, a.isNeedRohr = 1 === a.isNeedRohr ? 1 : 0, 
                            a.isNeedCommonParams = 0 === a.isNeedCommonParams ? 0 : 1, a.method = a.method || "POST", 
                            a.header = (0, m.default)({}, {
                                "content-type": "application/x-www-form-urlencoded"
                            }, a.header || {}), a.isNeedCommonParams && "number" == typeof a.isNeedCommonParams && (a.data = (0, 
                            m.default)({}, o, a.data || {})), a.isNeedRohr && "number" == typeof a.isNeedRohr && (a.data = (0, 
                            m.default)({}, s, a.data || {}), (0, u.setRohr)(a.data));
                        } else {
                            var f = "参数不存在，或者不是一个对象";
                            r({
                                code: -1,
                                data: null,
                                header: null,
                                msg: f,
                                message: f
                            });
                        }
                        d(c, a, e, r);
                    }));

                  case 7:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        })), function(e) {
            return o.apply(this, arguments);
        })
    } ]), e;
}();

exports.default = c;