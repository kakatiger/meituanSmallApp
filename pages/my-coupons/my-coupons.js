function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new r(function(e, n) {
            return function o(a, u) {
                try {
                    var i = t[a](u), s = i.value;
                } catch (a) {
                    return void n(a);
                }
                if (!i.done) return r.resolve(s).then(function(e) {
                    o("next", e);
                }, function(e) {
                    o("throw", e);
                });
                e(s);
            }("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), n = function(e, t) {
    if (Array.isArray(e)) return e;
    if (Symbol.iterator in Object(e)) return function(e, t) {
        var n = [], o = !0, r = !1, a = void 0;
        try {
            for (var u, i = e[Symbol.iterator](); !(o = (u = i.next()).done) && (n.push(u.value), 
            !t || n.length !== t); o = !0) ;
        } catch (e) {
            r = !0, a = e;
        } finally {
            try {
                !o && i.return && i.return();
            } finally {
                if (r) throw a;
            }
        }
        return n;
    }(e, t);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, o = require("../../npm/@dp/owl-wxapp/es6/index.js"), r = require("../../npm/promise-polyfill/promise.js"), a = require("../base.js"), u = require("../../utils/split-float.js"), i = require("../../api/index.js").getCouponsList, s = a({
    data: {
        empty: !1,
        more: !0,
        coupon_total_num: 0,
        coupons: []
    },
    index: 0,
    load: function() {
        var o = this;
        return e(t.default.mark(function e() {
            var r, a, s, c, l, p, d, f, m, h, x, g, v, y, _, w, b;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return o.loading(!0), e.prev = 1, r = o.index, a = o.data.coupons, e.next = 5, i({
                        status: 1,
                        page_index: r,
                        page_size: 20
                    });

                  case 5:
                    if (s = e.sent, c = s.has_more, l = s.coupon_total_num, p = s.coupon_list) {
                        e.next = 11;
                        break;
                    }
                    throw {
                        code: "error",
                        message: "啊哦, 出错了, 请重试"
                    };

                  case 11:
                    for (d = 1 === c, f = p.length - 1; -1 < f; --f) m = p[f], h = m.amount, x = u(h), 
                    g = n(x, 2), m.amount = g[0], m.tail = g[1];
                    if (0 === (v = a.concat(p)).length) throw {
                        code: "no-coupon",
                        message: "您当前没有红包哦~"
                    };
                    e.next = 16;
                    break;

                  case 16:
                    o.index = r + 1, o.setData({
                        empty: !1,
                        coupon_total_num: l,
                        coupons: v,
                        more: d
                    }), o.error({}), e.next = 26;
                    break;

                  case 21:
                    e.prev = 21, e.t0 = e.catch(1), y = e.t0.code, _ = e.t0.message, 0 === o.data.coupons.length ? (w = "no-coupon" !== y ? "重试" : "", 
                    b = "no-coupon" !== y ? "您的手机网络不太顺畅哦" : _, o.error({
                        img: "no-coupon",
                        message: b,
                        textOK: w,
                        ok: function() {
                            o.index = 0, o.load();
                        }
                    }), o.setData({
                        empty: !0
                    })) : o.toast({
                        message: _
                    });

                  case 26:
                    o.loading(!1);

                  case 27:
                  case "end":
                    return e.stop();
                }
            }, e, o, [ [ 1, 21 ] ]);
        }))();
    },
    onSelectCoupon: function() {},
    onLoad: function() {
        this.load();
    },
    onScrollBottom: function() {
        this.data.more && this.load();
    }
});

(0, o.page)(s);