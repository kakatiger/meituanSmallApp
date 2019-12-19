function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            return function n(a, u) {
                try {
                    var i = t[a](u), c = i.value;
                } catch (a) {
                    return void r(a);
                }
                if (!i.done) return Promise.resolve(c).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(c);
            }("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/babel-runtime/regenerator/index.js")), r = require("../actions/dev.js"), n = require("../actions/user.js"), a = require("../api/wx.js"), u = a.login, i = a.storage, c = i.setItem, s = i.getItem, o = require("../api/index.js").Muuid, d = require("../store.js"), p = require("./random-id.js"), l = require("../pages/loginV2/finger.js"), v = function() {
    var n = e(t.default.mark(function e(n) {
        var a, u, i, o;
        return t.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, s("UUID");

              case 3:
                if (a = e.sent, u = a.data) return d.dispatch((0, r.loadedUUID)({
                    uuid: u
                })), n.setEnv("uuid", u), e.abrupt("return", u);
                e.next = 9;
                break;

              case 9:
                return i = p(), d.dispatch((0, r.loadedUUID)({
                    UUID: i
                })), c("UUID", i), n.setEnv("uuid", i), e.abrupt("return", i);

              case 16:
                e.prev = 16, e.t0 = e.catch(0), console.error(e.t0);

              case 19:
                return o = p(), d.dispatch((0, r.loadedUUID)({
                    UUID: o
                })), c("UUID", o), n.setEnv("uuid", o), e.abrupt("return", o);

              case 24:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 0, 16 ] ]);
    }));
    return function(e) {
        return n.apply(this, arguments);
    };
}(), f = function() {
    var a = e(t.default.mark(function e(a) {
        var u, i, s, p, l, v, f, g, x = a.uuid, U = a.code, h = a.rawData, D = void 0 === h ? "" : h, w = a.signature, I = void 0 === w ? "" : w, b = a.encryptedData, k = void 0 === b ? "" : b, m = a.iv, y = void 0 === m ? "" : m, j = a.res, q = a.lx, _ = a.callback;
        return t.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, o({
                    uuid: x,
                    code: U,
                    rawData: D,
                    signature: I,
                    encryptedData: k,
                    iv: y,
                    wechatFingePrint: j
                });

              case 3:
                if (u = e.sent, i = u.open_id, s = u.user_id, p = u.token, l = u.uuid) return e.next = 11, 
                c("UUID", l);
                e.next = 19;
                break;

              case 11:
                d.dispatch((0, r.loadedUUID)({
                    uuid: l
                })), q.setEnv("uuid", l), v = getApp().store.getState().user, f = Object.assign({}, v, {
                    user_id: s || v.user_id,
                    token: p || v.token,
                    open_id: i || v.open_id
                }), d.dispatch((0, n.store)(f)), (g = getApp()).getOpenIdcallbackBound && (g.getOpenIdcallbackBound(i), 
                g.getOpenIdcallbackBound = null), _ && _(l);

              case 19:
                e.next = 25;
                break;

              case 21:
                e.prev = 21, e.t0 = e.catch(0), console.error(e.t0), _ && _(x);

              case 25:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 0, 21 ] ]);
    }));
    return function(e) {
        return a.apply(this, arguments);
    };
}(), g = function() {
    var n = e(t.default.mark(function e(n, a) {
        var i, c, s, o;
        return t.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, v(n);

              case 2:
                return i = e.sent, c = wx.getStorageSync("ENV"), d.dispatch((0, r.loadedENV)({
                    env: c
                })), e.next = 7, u();

              case 7:
                s = e.sent, o = s.code, wx.getUserInfo({
                    complete: function(e) {
                        var t = e.rawData, r = e.signature, u = e.encryptedData, c = e.iv;
                        l.g(function(e) {
                            f({
                                uuid: i,
                                code: o,
                                rawData: t,
                                signature: r,
                                encryptedData: u,
                                iv: c,
                                res: e,
                                lx: n,
                                callback: a
                            });
                        });
                    }
                });

              case 10:
              case "end":
                return e.stop();
            }
        }, e, void 0);
    }));
    return function(e, t) {
        return n.apply(this, arguments);
    };
}();

module.exports = g;