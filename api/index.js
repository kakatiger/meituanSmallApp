function e(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new f(function(e, t) {
            return function n(a, i) {
                try {
                    var u = r[a](i), o = u.value;
                } catch (a) {
                    return void t(a);
                }
                if (!u.done) return f.resolve(o).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(o);
            }("next");
        });
    };
}

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/babel-runtime/regenerator/index.js")), t = function(e, r) {
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
}, n = require("../actions/user.js"), a = require("../constants.js"), i = a.KEY_USER_INFO, u = a.CODE_GOTO_LOGIN, o = a.CODE_PRELOGIN, s = a.ANTI_SPIDER_FORCE_LOGIN, c = a.ANTI_SPIDER_PRELOGIN, d = require("../store.js"), l = {
    "main-domain": "wx.waimai.meituan.com",
    "market-domain": "marketing.waimai.meituan.com"
}, f = require("../npm/promise-polyfill/promise.js"), m = require("./urls.js")(l), p = require("./wx.js"), g = require("../utils/promise-try.js"), v = p.requestJSON, h = p.getNetworkType, j = p.getSystemInfo, y = p.getLocation, q = p.reLaunch, _ = require("../utils/object-assign.js"), x = require("./uuid-inject.js"), w = require("./pay-inject.js"), b = require("./user-storage.js"), I = require("./env.js"), O = require("../reducers/selectors/common-param.js"), S = require("./rohr.js"), k = "", P = require("../utils/wx.js").storage.getItem, U = require("../utils/param.js"), C = require("../utils/deal-region-set.js").setUrl, E = {
    poiFilter: 1,
    poiFood: 1,
    poiInfo: 1,
    channelPage: 1,
    poiQualification: 1
}, N = Object.keys(m).reduce(function(n, a) {
    var l, g = m[a], h = (l = e(r.default.mark(function e(n) {
        var l, m, h, j, y, x, w, b, I, N, T, L, D, G, A, R, F, M, J, K, Q, V, Y;
        return r.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return l = d.getState(), (m = O(l)).utm_source = k, h = {}, y = {}, x = j = "", 
                e.prev = 7, e.next = 10, f.all([ P(i, {}), P("UUID", ""), P("user", {}), P("wx_set_info", "") ]);

              case 10:
                w = e.sent, b = t(w, 4), h = b[0].data, j = b[1].data, y = b[2].data, x = b[3].data, 
                e.next = 22;
                break;

              case 18:
                e.prev = 18, e.t0 = e.catch(7), I = e.t0.message, console.error("request getItem:", I);

              case 22:
                return N = {
                    open_id: y.open_id || "",
                    uuid: j,
                    platform: 13,
                    partner: 4,
                    riskLevel: 1
                }, T = _(m, h, N, n), L = l.dev.env, 1 === E[a] && (T._token = S.reload(T)), D = L ? {
                    "x-env": L
                } : {}, G = j ? {
                    uuid: j
                } : {}, e.prev = 28, e.next = 31, C(g, x, y);

              case 31:
                g = e.sent, e.next = 37;
                break;

              case 34:
                e.prev = 34, e.t1 = e.catch(28), console.log(e.t1);

              case 37:
                return e.next = 39, v({
                    url: g,
                    data: T,
                    header: Object.assign({}, D, G),
                    method: "POST"
                });

              case 39:
                if ("string" == typeof (A = e.sent) && (A = JSON.parse(A)), 406 === A.code) throw R = getCurrentPages(), 
                F = R.length - 1, R[F].verify({
                    imageUrl: A.customData.imageUrl,
                    verifyUrl: A.customData.verifyUrl
                }), {
                    message: "出错啦"
                };
                e.next = 46;
                break;

              case 46:
                if (J = (M = A).code, K = M.data, Q = M.msg, 200100 === J) throw getCurrentPages()[0].spiderError({
                    message: "暂时无法访问，切换地址后仍然无法使用可联系客服10109777解决",
                    textOK: "重新加载",
                    ok: function() {
                        var e = "/" + getCurrentPages()[0].route + "?" + U(getCurrentPages()[0].options);
                        console.log(e), q({
                            url: e
                        });
                    },
                    customer_ip: K.customer_ip
                }), {
                    message: "暂时无法访问，切换地址后仍然无法使用可联系客服10109777解决"
                };
                e.next = 50;
                break;

              case 50:
                if (J !== u && J !== o || (V = "", J === u ? V = s : J === o && (V = c), "login" !== (Y = getCurrentPages())[Y.length - 1].pageName && p.navigateTo({
                    url: "/pages/loginV2/login?afterLoginAction=" + V
                })), 0 !== J) throw {
                    code: J,
                    data: K,
                    msg: Q,
                    message: Q
                };
                e.next = 53;
                break;

              case 53:
                return e.abrupt("return", K);

              case 54:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 7, 18 ], [ 28, 34 ] ]);
    })), function(e) {
        return l.apply(this, arguments);
    });
    return n[a] = h, n;
}, {}), T = N.orderPreview, L = N.orderSubmit, D = N.orderUpdate, G = N.addrGet, A = N.uuid, R = N.pay, F = N.allCartInfo, M = require("./order-submit-param.js"), J = require("./pollSocket-param.js");

N.allCartInfo = function(e) {
    var r = J(e);
    return F(r);
}, N.addrGet = function(e) {
    return G(e).then(function(e) {
        return d.dispatch((0, n.setAddresses)({
            addresses: e
        })), e;
    });
}, N.orderPreview = function(e) {
    return M(e).then(function(e) {
        return T(e);
    });
}, N.orderSubmit = function(e) {
    return M(e).then(function(e) {
        return L(e);
    });
}, N.orderUpdate = function(e) {
    return M(e).then(function(e) {
        return D(e);
    });
}, N.getCaptchaUrl = function() {
    var e = d.getState().dev.uuid;
    return "https://" + l["main-domain"] + "/getcaptcha?uuid=" + e + "&_=" + Math.random();
}, N.uuid = x(A), N.pay = w(R);

var K = !1, Q = !1, V = [], Y = !0;

N.ready = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : function() {}, r = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
    if (!1 === Y && !0 === r && (K = !1, V = []), Y = r, K) e(); else if (V.push(e), 
    !Q) {
        Q = !0;
        var t = [];
        t = r ? [ j(), h(), y(), b(), I() ] : [ j(), h(), b(), I() ], g(t).then(function() {
            return N.uuid();
        }).then(function() {
            var e = V, r = e.length;
            Q = !(K = !(V = null));
            for (var t = 0; t < r; ++t) (0, e[t])();
        });
    }
}, N.setUTMSource = function(e) {
    k = e;
}, N.getUTMSource = function() {
    return k;
}, N.domain = l, module.exports = N;