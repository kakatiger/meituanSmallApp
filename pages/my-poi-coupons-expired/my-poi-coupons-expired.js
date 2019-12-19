function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new o(function(e, n) {
            return function r(a, i) {
                try {
                    var u = t[a](i), s = u.value;
                } catch (a) {
                    return void n(a);
                }
                if (!u.done) return o.resolve(s).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
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
        var n = [], r = !0, o = !1, a = void 0;
        try {
            for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            o = !0, a = e;
        } finally {
            try {
                !r && u.return && u.return();
            } finally {
                if (o) throw a;
            }
        }
        return n;
    }(e, t);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, r = require("../../npm/@dp/owl-wxapp/es6/index.js"), o = require("../../npm/promise-polyfill/promise.js"), a = require("../base.js"), i = require("../../utils/split-float.js"), u = require("../../utils/format-time.js"), s = require("../../api/index.js").getPoiCouponsList, c = require("../my-poi-coupons/coupon-status.js").COUPON_STATUS, p = a({
    data: {
        empty: !1,
        more: !0,
        coupon_total_num: 0,
        coupons: []
    },
    index: 0,
    load: function() {
        var r = this;
        return e(t.default.mark(function e() {
            var o, a, p, l, d, f, m, h, y, x, g, v, w, _, b, j, q;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return r.loading(!0), e.prev = 1, o = r.index, a = r.data.coupons, e.next = 5, s({
                        status: c.UNAVAILABLE,
                        page_index: o,
                        page_size: 20
                    });

                  case 5:
                    if (p = e.sent, l = p.has_more, d = p.poi_coupon_info_list) {
                        e.next = 10;
                        break;
                    }
                    throw {
                        code: "error",
                        message: "啊哦, 出错了, 请重试"
                    };

                  case 10:
                    for (f = 1 === l, m = [], h = d.length - 1; -1 < h; --h) (y = d[h]).status !== c.EXPIRED && y.status !== c.FREEZE || (y.deadline = u(y.deadline, "yyyy.MM.dd"), 
                    x = y.amount, g = i(x), v = n(g, 2), y.amount = v[0], y.tail = v[1], m.push(y));
                    if (0 === (w = a.concat(m)).length) throw {
                        code: "no-coupon",
                        message: "您当前没有过期商家代金券哦~"
                    };
                    e.next = 16;
                    break;

                  case 16:
                    r.index = o + 1, r.setData({
                        empty: !1,
                        coupons: w,
                        more: f
                    }), r.error({}), e.next = 26;
                    break;

                  case 21:
                    e.prev = 21, e.t0 = e.catch(1), _ = e.t0.code, b = e.t0.message, 0 === r.data.coupons.length ? (j = "no-coupon" !== _ ? "重试" : "", 
                    q = "no-coupon" !== _ ? "您的手机网络不太顺畅哦" : b, r.error({
                        img: "no-coupon",
                        message: q,
                        textOK: j,
                        ok: function() {
                            r.index = 0, r.load();
                        }
                    }), r.setData({
                        empty: !0
                    })) : r.toast({
                        message: b
                    });

                  case 26:
                    r.loading(!1);

                  case 27:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 1, 21 ] ]);
        }))();
    },
    onLoad: function() {
        this.load();
    },
    onScrollBottom: function() {
        var e = this;
        this.data.more && setTimeout(function() {
            e.load();
        }, 2e3);
    }
});

(0, r.page)(p);