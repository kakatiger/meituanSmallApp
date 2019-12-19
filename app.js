function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new Promise(function(e, t) {
            return function n(u, a) {
                try {
                    var i = r[u](a), s = i.value;
                } catch (u) {
                    return void t(u);
                }
                if (!i.done) return Promise.resolve(s).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(s);
            }("next");
        });
    };
}

var t = e(require("./npm/babel-runtime/regenerator/index.js")), n = e(require("./npm/@analytics/wechat-sdk/lib/index.js")), u = e(require("./npm/@wmfe/wxapp-component-uuid/src/components/lib/index.js")), a = e(require("./api/wmRequest.js")), i = require("./actions/extradata.js"), s = require("./actions/wx.js"), o = require("./actions/buy-together.js"), c = require("./actions/dev.js"), d = require("./actions/user.js"), p = require("./api/index.js"), l = require("./utils/random-id.js"), f = require("./api/wx.js"), x = f.login, v = f.storage, w = v.getItem, g = v.setItem, h = require("./weapp-redux/index.js").Provider, q = require("./store.js"), I = require("./utils/event-bus.js"), j = require("./utils/filter-conditions-manager.js").clear, U = require("./utils/quick-filter-manager.js").clear, m = require("./api/analytics.js"), y = require("./utils/unify-uuid.js"), _ = require("./constants.js"), b = _.NAME, S = _.VERSION, D = require("./npm/@dp/owl-wxapp/es6/index.js"), k = D.owl, E = D.app, N = require("./utils/lx.js"), M = function() {
    var e = r(t.default.mark(function e() {
        var r, n, u, a;
        return t.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, w("UUID");

              case 3:
                if (r = e.sent, n = r.data) return q.dispatch((0, c.loadedUUID)({
                    uuid: n
                })), m.setEnv("uuid", n), e.abrupt("return", n);
                e.next = 9;
                break;

              case 9:
                return u = l(), q.dispatch((0, c.loadedUUID)({
                    UUID: u
                })), e.next = 13, g("UUID", u);

              case 13:
                return m.setEnv("uuid", u), e.abrupt("return", u);

              case 17:
                e.prev = 17, e.t0 = e.catch(0), console.error(e.t0);

              case 20:
                return a = l(), q.dispatch((0, c.loadedUUID)({
                    UUID: a
                })), e.next = 24, g("UUID", a);

              case 24:
                return m.setEnv("uuid", a), e.abrupt("return", a);

              case 26:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 0, 17 ] ]);
    }));
    return function() {
        return e.apply(this, arguments);
    };
}(), O = function() {
    var e = r(t.default.mark(function e() {
        var r, n, u, a, i;
        return t.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, e.next = 3, M();

              case 3:
                return r = wx.getStorageSync("ENV"), q.dispatch((0, c.loadedENV)({
                    env: r
                })), e.next = 7, x();

              case 7:
                return n = e.sent, u = n.code, e.next = 11, (0, p.uuidGray)({
                    code: u
                });

              case 11:
                return a = e.sent, i = a.useV2, e.abrupt("return", i);

              case 16:
                return e.prev = 16, e.t0 = e.catch(0), console.log(e.t0), e.abrupt("return", 0);

              case 20:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 0, 16 ] ]);
    }));
    return function() {
        return e.apply(this, arguments);
    };
}(), V = function() {
    k.start({
        project: "takeaway-waimai-wxapp",
        devMode: !1,
        wxAppVersion: S
    });
}, B = function(e) {
    k.cfgManager.update("unionId", e), a.default.forceUpdate({
        wm_uuid: e
    }, {
        uuid: e
    });
};

E(h(q)({
    onLaunch: function(e) {
        var r = this;
        (0, p.ready)(), a.default.init(this), e = e || {}, m.setEnv("lch", e.scene || "wx"), 
        wx.setStorageSync("wx_cold_boot_scene", e.scene || ""), n.default.setUTM(e);
        var t = new I();
        (this.eventBus = t).on("user:logout", j), t.on("user:login", j), t.on("location:changed", function() {
            j(), U();
        }), m.init(), V(), O().then(function(e) {
            e ? (0, u.default)({
                ctype: b,
                appversion: S,
                isNeedOpenId: 1,
                isNeedUnionId: 1,
                isNeedLogin: 1,
                complate: function(e) {
                    var n = e.uuid, u = e.open_id, a = e.user_id, i = e.token;
                    n && (q.dispatch((0, c.loadedUUID)({
                        uuid: n
                    })), m.setEnv("uuid", n), B(n));
                    var s = r.store.getState().user, o = Object.assign({}, s, {
                        user_id: a || s.user_id,
                        token: i || s.token,
                        open_id: u || s.open_id
                    });
                    q.dispatch((0, d.store)(o)), r.getOpenIdcallbackBound && u && (r.getOpenIdcallbackBound(u), 
                    r.getOpenIdcallbackBound = null), t.fire("user:uuid");
                }
            }) : y(m, function(e) {
                k.cfgManager.update("unionId", e), t.fire("user:uuid");
            });
        }).catch(function(e) {
            console.log(e), y(m, B);
        });
        try {
            var i = e.scene;
            wx.setStorageSync("wx_scene", i), q.dispatch((0, s.set)({
                wx_scene: i
            }));
        } catch (e) {
            console.log(e);
        }
        wx.getStorage({
            key: "user",
            success: function() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                if (e) {
                    var r = e.data, t = void 0 === r ? {} : r;
                    m.setEnv("uid", t && t.user_id ? t.user_id : 0), m.setEnv("wxid", t && t.open_id ? t.open_id : "");
                }
            }
        });
    },
    onError: function(e) {
        console.error("App.onError: " + e);
    },
    onHide: function() {
        n.default.quit();
        var e = this.store.getState().poi.id;
        q.dispatch((0, o.setPrevSourceUrl)(e, ""));
    },
    onShow: function(e) {
        n.default.start({}), n.default.setUTM(e), e && e.referrerInfo && e.referrerInfo.extraData && ("string" == typeof e.referrerInfo.extraData && (e.referrerInfo.extraData = JSON.parse(e.referrerInfo.extraData)), 
        q.dispatch((0, i.set)({
            extra: e.referrerInfo.extraData
        })));
        try {
            wx.setStorageSync("wx_scene", e.scene);
        } catch (e) {
            console.log(e);
        }
    },
    owl: k,
    lx: N
}));