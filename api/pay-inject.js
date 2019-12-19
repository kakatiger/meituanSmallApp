function e(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new t(function(e, n) {
            return function a(i, s) {
                try {
                    var o = r[i](s), u = o.value;
                } catch (i) {
                    return void n(i);
                }
                if (!o.done) return t.resolve(u).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(u);
            }("next");
        });
    };
}

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/babel-runtime/regenerator/index.js")), t = require("../npm/promise-polyfill/promise.js"), n = require("../store.js"), a = require("../utils/object-assign.js"), i = require("../constants.js").VERSION, s = require("./risk-param.js"), o = require("../utils/mtpay.js").isMtpay, u = {
    3: "订单不存在，请稍后再试",
    5: "这个订单已经支付过了，请稍后再试",
    6: "订单已取消，请稍后再试",
    9: "抱歉，您本次购买不符合活动规则，详见活动说明(930013)",
    ORDER_NOT_EXIST: "订单不存在，请稍后再试",
    ORDER_HAS_PAYED: "这个订单已经支付过了，请稍后再试",
    ORDER_HAS_CANCELLED: "订单已取消，请稍后再试",
    ORDER_RISK_ERROR: "抱歉，您本次购买不符合活动规则，详见活动说明(930013)"
};

module.exports = function(t) {
    return d = e(r.default.mark(function e(d) {
        var p, c, l, _, m, f, v, w, x, h, R, A, y, E, P, k, S, g, O, b;
        return r.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, s(d);

              case 2:
                return p = e.sent, d.touchPoint = null, c = n.getState(), l = c.user, _ = l.open_id, 
                m = l.user_id, f = l.token, v = c.wx, w = v.longitude, x = v.latitude, E = y = A = R = h = void 0, 
                e.prev = 10, e.next = 13, t(a({
                    user_id: m,
                    user_token: f,
                    "wxAppAdditionalParams.openid": _,
                    "wxAppAdditionalParams.longitude": w,
                    "wxAppAdditionalParams.latitude": x,
                    "wxAppAdditionalParams.wechatRiskParams": p,
                    version: i
                }, d));

              case 13:
                P = e.sent, h = P.resCode, k = P.wxPayParams, R = void 0 === k ? "{}" : k, S = P.pay_token, 
                A = void 0 === S ? "" : S, g = P.tradeno, y = void 0 === g ? "" : g, O = P.wm_order_pay_channel, 
                E = void 0 === O ? 2 : O, e.next = 29;
                break;

              case 25:
                throw e.prev = 25, e.t0 = e.catch(10), e.t0.msg = e.t0.message = "支付异常，请稍后再试", e.t0;

              case 29:
                if (0 !== h && "PAY_SUCCESS" !== h) throw b = u.hasOwnProperty(h) ? u[h] : "支付异常，请稍后再试", 
                {
                    code: h,
                    message: b,
                    msg: b
                };
                e.next = 32;
                break;

              case 32:
                if (o(E)) return e.abrupt("return", {
                    wm_order_pay_channel: E,
                    pay_token: A,
                    tradeno: y
                });
                e.next = 34;
                break;

              case 34:
                return e.abrupt("return", JSON.parse(R));

              case 35:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 10, 25 ] ]);
    })), function(e) {
        return d.apply(this, arguments);
    };
    var d;
};