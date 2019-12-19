function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function n(e) {
    return function() {
        var n = e.apply(this, arguments);
        return new Promise(function(e, t) {
            return function r(i, u) {
                try {
                    var o = n[i](u), a = o.value;
                } catch (i) {
                    return void t(i);
                }
                if (!o.done) return Promise.resolve(a).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(a);
            }("next");
        });
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../../babel-runtime/regenerator/index.js")), r = e(require("../../../../../@analytics/wechat-sdk/lib/index.js")), i = e(require("../utils/random-id.js")), u = require("../utils/wx.js"), o = e(require("../utils/finger.js")), a = require("./api.js"), d = function() {
    var e = n(t.default.mark(function e(n, r, i) {
        var a, d, s = n.ctype, c = void 0 === s ? "wxapp" : s, f = n.appversion, v = void 0 === f ? "0.0.1" : f, l = n.isNeedOpenId, x = void 0 === l ? 1 : l, g = n.isNeedUnionId, w = void 0 === g ? 0 : g, h = n.isNeedLogin, _ = void 0 === h ? 0 : h, m = n.complate, k = void 0 === m ? function() {} : m;
        return t.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, (0, u.login)();

              case 3:
                a = e.sent, d = a.code, 1 === _ ? o.default.g(function(e) {
                    p(c, {
                        uuid: r,
                        code: d,
                        unified: i,
                        wechatFingerPrint: e,
                        isNeedOpenid: x,
                        isNeeUnionid: w,
                        isNeedLogin: _,
                        wm_ctype: c,
                        wm_appversion: v
                    }, k);
                }) : p(c, {
                    uuid: r,
                    code: d,
                    unified: i,
                    isNeedOpenid: x,
                    isNeeUnionid: w,
                    isNeedLogin: _,
                    wm_ctype: c,
                    wm_appversion: v
                }, k), e.next = 12;
                break;

              case 8:
                e.prev = 8, e.t0 = e.catch(0), console.log(e.t0), p(c, {
                    uuid: r,
                    unified: i,
                    wm_ctype: c,
                    wm_appversion: v
                }, k);

              case 12:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 0, 8 ] ]);
    }));
    return function(n, t, r) {
        return e.apply(this, arguments);
    };
}(), s = function() {
    var e = (0, i.default)();
    return r.default.set("uuid", e), (0, u.setStorage)("UUID", e), (0, u.setStorage)("UNIFIED", 0), 
    {
        uuid: e,
        unified: 0
    };
}, c = function() {
    var e = n(t.default.mark(function e() {
        var n, i, o, a, d, c, p;
        return t.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return i = n = void 0, e.prev = 1, e.next = 4, (0, u.getStorage)("UUID");

              case 4:
                if (o = e.sent, a = o.data, !(n = a)) {
                    e.next = 11;
                    break;
                }
                r.default.set("uuid", n), e.next = 12;
                break;

              case 11:
                return e.abrupt("return", s());

              case 12:
                e.next = 18;
                break;

              case 14:
                return e.prev = 14, e.t0 = e.catch(1), console.log(e.t0), e.abrupt("return", s());

              case 18:
                return e.prev = 18, e.next = 21, (0, u.getStorage)("UNIFIED");

              case 21:
                return d = e.sent, c = d.data, i = c || 0, e.abrupt("return", {
                    uuid: n,
                    unified: i
                });

              case 27:
                return e.prev = 27, e.t1 = e.catch(18), console.log(e.t1), p = s(), e.abrupt("return", {
                    uuid: n || p.uuid,
                    unified: 0
                });

              case 32:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 1, 14 ], [ 18, 27 ] ]);
    }));
    return function() {
        return e.apply(this, arguments);
    };
}(), p = function() {
    var e = n(t.default.mark(function e(n, i, o) {
        var d, s, c, p, f, v, l;
        return t.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, (0, a.getUuidApi)(n, i);

              case 3:
                if (d = e.sent, s = d.uuid, c = d.unified, p = d.open_id, f = d.unionid, v = d.user_id, 
                l = d.token, s) return r.default.set("uuid", s), e.next = 14, (0, u.setStorage)("UUID", s);
                e.next = 17;
                break;

              case 14:
                return e.next = 16, (0, u.setStorage)("UNIFIED", c);

              case 16:
                o && "function" == typeof o && o({
                    uuid: s,
                    open_id: p,
                    unionid: f,
                    user_id: v,
                    token: l
                });

              case 17:
                e.next = 23;
                break;

              case 19:
                e.prev = 19, e.t0 = e.catch(0), console.log(e.t0), o && "function" == typeof o && o({
                    uuid: i.uuid,
                    open_id: "",
                    unionid: "",
                    user_id: "",
                    token: ""
                });

              case 23:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 0, 19 ] ]);
    }));
    return function(n, t, r) {
        return e.apply(this, arguments);
    };
}();

exports.default = function() {
    var e = n(t.default.mark(function e() {
        var n, r, i, u, o, a, s, p, f, v, l, x, g = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        return t.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return n = g.isNeedOpenId, r = void 0 === n ? 1 : n, i = g.isNeedUnionId, u = void 0 === i ? 0 : i, 
                o = g.isNeedLogin, a = void 0 === o ? 0 : o, s = g.complate, p = void 0 === s ? function() {} : s, 
                e.next = 3, c();

              case 3:
                f = e.sent, v = f.uuid, l = f.unified, x = void 0 === l ? 0 : l, 1 === r || 1 === u ? d(g, v, x) : a ? d(g, v, x) : x ? p && "function" == typeof p && p({
                    uuid: v,
                    open_id: "",
                    unionid: "",
                    user_id: "",
                    token: ""
                }) : d(g, v, x);

              case 8:
              case "end":
                return e.stop();
            }
        }, e, void 0);
    }));
    return function() {
        return e.apply(this, arguments);
    };
}();