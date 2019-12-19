function e(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new n(function(e, t) {
            return function u(a, i) {
                try {
                    var s = r[a](i), o = s.value;
                } catch (a) {
                    return void t(a);
                }
                if (!s.done) return n.resolve(o).then(function(e) {
                    u("next", e);
                }, function(e) {
                    u("throw", e);
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
}(require("../../npm/babel-runtime/regenerator/index.js")), t = require("../../npm/@dp/owl-wxapp/es6/index.js"), n = require("../../npm/promise-polyfill/promise.js"), u = require("../../utils/format-time.js"), a = require("../../api/index.js").refundDetail, i = require("../../weapp-redux/index.js").connect, s = require("../../utils/mix.js"), o = require("../base.js"), d = {
    REFUND_ACCEPTED: "退款已受理",
    REFUND_PROCESSING: "处理中",
    REFUND_SUCCESS: "退款成功",
    REFUND_FAILED: "退款失败"
}, f = {
    pageName: "refund-detail",
    data: {
        refundDetail: null,
        refundStatus: ""
    },
    onLoad: function(t) {
        var n = this, i = t.hash_id, s = t.refund_no;
        return e(r.default.mark(function e() {
            var t, o, f, c, l, p, m, _, E;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n.loading(!0), e.prev = 1, t = n.store.getState(), o = t.user.token, e.next = 5, 
                    a({
                        wm_order_view_id: i,
                        login_token: o,
                        refund_no: s
                    });

                  case 5:
                    f = e.sent, c = f.refund_status, l = f.estimated_time, p = d[c], m = "", l && (_ = u(l), 
                    m = "REFUND_ACCEPTED" === c || "REFUND_PROCESSING" === c ? "预计 " + _ + " 到账" : _), 
                    n.setData({
                        refundDetail: f,
                        refundStatus: p,
                        refundTime: m
                    }), e.next = 17;
                    break;

                  case 13:
                    e.prev = 13, e.t0 = e.catch(1), E = e.t0.message, n.error({
                        message: E
                    });

                  case 17:
                    n.loading(!1);

                  case 18:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 1, 13 ] ]);
        }))();
    }
};

(0, t.page)(s(f, o, i()));