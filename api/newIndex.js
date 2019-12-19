function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new g(function(e, t) {
            return function n(a, i) {
                try {
                    var u = r[a](i), o = u.value;
                } catch (a) {
                    return void t(a);
                }
                if (!u.done) return g.resolve(o).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(o);
            }("next");
        });
    };
}

var t = e(require("../npm/babel-runtime/regenerator/index.js")), n = function(e, r) {
    if (Array.isArray(e)) return e;
    if (Symbol.iterator in Object(e)) return function(e, r) {
        var t = [], n = !0, a = !1, i = void 0;
        try {
            for (var u, o = e[Symbol.iterator](); !(n = (u = o.next()).done) && (t.push(u.value), 
            !r || t.length !== r); n = !0) ;
        } catch (e) {
            a = !0, i = e;
        } finally {
            try {
                !n && o.return && o.return();
            } finally {
                if (a) throw i;
            }
        }
        return t;
    }(e, r);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, a = require("../actions/user.js"), i = e(require("./wmRequest.js")), u = require("../utils/deal-region-set.js").responseHeaderSet, o = require("../constants.js"), s = o.KEY_USER_INFO, c = o.CODE_GOTO_LOGIN, d = o.CODE_PRELOGIN, l = o.ANTI_SPIDER_FORCE_LOGIN, f = o.ANTI_SPIDER_PRELOGIN, p = require("../store.js"), m = {
    "main-domain": "wx.waimai.meituan.com",
    "market-domain": "marketing.waimai.meituan.com"
}, g = require("../npm/promise-polyfill/promise.js"), v = require("./urls.js")(m), h = require("./wx.js"), j = require("../utils/promise-try.js"), q = h.getNetworkType, y = h.getSystemInfo, _ = h.getLocation, x = h.reLaunch, w = require("../utils/object-assign.js"), b = require("./uuid-inject.js"), I = require("./pay-inject.js"), O = require("./user-storage.js"), S = require("./env.js"), k = require("../reducers/selectors/common-param.js"), P = require("./rohr.js"), U = "", C = require("../utils/wx.js").storage.getItem, E = require("../utils/param.js"), N = require("../utils/deal-region-set.js").setUrl, R = {
    poiFilter: 1,
    poiFood: 1,
    poiInfo: 1,
    channelPage: 1,
    poiQualification: 1
}, T = Object.keys(v).reduce(function(e, a) {
    var o, m = v[a], j = (o = r(t.default.mark(function e(r) {
        var o, v, j, q, y, _, b, I, O, S, T, L, D, G, A, F, M, K, X, H, J, Q, V, Y;
        return t.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return o = p.getState(), (v = k(o)).utm_source = U, j = {}, y = {}, _ = q = "", 
                e.prev = 7, e.next = 10, g.all([ C(s, {}), C("UUID", ""), C("user", {}), C("wx_set_info", "") ]);

              case 10:
                b = e.sent, I = n(b, 4), j = I[0].data, q = I[1].data, y = I[2].data, _ = I[3].data, 
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(7), O = e.t0.message, console.error("request getItem:", O);

              case 22:
                return S = {
                    open_id: y.open_id || "",
                    uuid: q,
                    platform: 13,
                    partner: 4,
                    riskLevel: 1
                }, T = w(v, j, S, r), L = o.dev.env, D = 0, 1 === R[a] && (D = 1, T._token = P.reload(T)), 
                G = L ? {
                    "x-env": L
                } : {}, A = q ? {
                    uuid: q
                } : {}, e.prev = 29, e.next = 32, N(m, _, y);

              case 32:
                m = e.sent, e.next = 38;
                break;

              case 35:
                e.prev = 35, e.t1 = e.catch(29), console.log(e.t1);

              case 38:
                return F = void 0, e.prev = 39, e.next = 42, i.default.req({
                    url: m,
                    data: T,
                    options: {
                        isNeedRohr: D,
                        header: Object.assign({}, G, A),
                        method: "POST"
                    }
                });

              case 42:
                "string" == typeof (F = e.sent) && (F = JSON.parse(F)), (M = F.header).X_RegionInfo && u(M), 
                e.next = 53;
                break;

              case 48:
                e.prev = 48, e.t2 = e.catch(39), (K = e.t2.header).X_RegionInfo && u(K), F = e.t2;

              case 53:
                if (406 === F.code) throw getCurrentPages()[0].verify({
                    imageUrl: F.customData.imageUrl,
                    verifyUrl: F.customData.verifyUrl
                }), {
                    message: "出错啦"
                };
                e.next = 56;
                break;

              case 56:
                if (H = (X = F).code, J = X.data, Q = X.msg, 200100 === H) throw getCurrentPages()[0].spiderError({
                    message: "暂时无法访问，切换地址后仍然无法使用可联系客服10109777解决",
                    textOK: "重新加载",
                    ok: function() {
                        var e = "/" + getCurrentPages()[0].route + "?" + E(getCurrentPages()[0].options);
                        console.log(e), x({
                            url: e
                        });
                    },
                    customer_ip: J.customer_ip
                }), {
                    message: "暂时无法访问，切换地址后仍然无法使用可联系客服10109777解决"
                };
                e.next = 60;
                break;

              case 60:
                if (H !== c && H !== d || (V = "", H === c ? V = l : H === d && (V = f), "login" !== (Y = getCurrentPages())[Y.length - 1].pageName && h.navigateTo({
                    url: "/pages/loginV2/login?afterLoginAction=" + V
                })), 0 !== H) throw {
                    code: H,
                    data: J,
                    msg: Q,
                    message: Q
                };
                e.next = 63;
                break;

              case 63:
                return e.abrupt("return", J);

              case 64:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 7, 18 ], [ 29, 35 ], [ 39, 48 ] ]);
    })), function(e) {
        return o.apply(this, arguments);
    });
    return e[a] = j, e;
}, {}), L = T.orderPreview, D = T.orderSubmit, G = T.orderUpdate, A = T.addrGet, F = T.uuid, M = T.pay, K = T.allCartInfo, X = require("./order-submit-param.js"), H = require("./pollSocket-param.js");

T.allCartInfo = function(e) {
    var r = H(e);
    return K(r);
}, T.addrGet = function(e) {
    return A(e).then(function(e) {
        return p.dispatch((0, a.setAddresses)({
            addresses: e
        })), e;
    });
}, T.orderPreview = function(e) {
    return X(e).then(function(e) {
        return L(e);
    });
}, T.orderSubmit = function(e) {
    return X(e).then(function(e) {
        return D(e);
    });
}, T.orderUpdate = function(e) {
    return X(e).then(function(e) {
        return G(e);
    });
}, T.getCaptchaUrl = function() {
    var e = p.getState().dev.uuid;
    return "https://" + m["main-domain"] + "/getcaptcha?uuid=" + e + "&_=" + Math.random();
}, T.uuid = b(F), T.pay = I(M);

var J = !1, Q = !1, V = [], Y = !0;

T.ready = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : function() {}, r = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
    if (!1 === Y && !0 === r && (J = !1, V = []), Y = r, J) e(); else if (V.push(e), 
    !Q) {
        Q = !0;
        var t = [];
        t = r ? [ y(), q(), _(), O(), S() ] : [ y(), q(), O(), S() ], j(t).then(function() {
            return T.uuid();
        }).then(function() {
            var e = V, r = e.length;
            Q = !(J = !(V = null));
            for (var t = 0; t < r; ++t) (0, e[t])();
        });
    }
}, T.setUTMSource = function(e) {
    U = e;
}, T.getUTMSource = function() {
    return U;
}, T.domain = m, module.exports = T;