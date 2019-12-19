function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new r(function(e, n) {
            return function o(i, a) {
                try {
                    var u = t[i](a), s = u.value;
                } catch (i) {
                    return void n(i);
                }
                if (!u.done) return r.resolve(s).then(function(e) {
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
        var n = [], o = !0, r = !1, i = void 0;
        try {
            for (var a, u = e[Symbol.iterator](); !(o = (a = u.next()).done) && (n.push(a.value), 
            !t || n.length !== t); o = !0) ;
        } catch (e) {
            r = !0, i = e;
        } finally {
            try {
                !o && u.return && u.return();
            } finally {
                if (r) throw i;
            }
        }
        return n;
    }(e, t);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, o = require("../../npm/@dp/owl-wxapp/es6/index.js"), r = require("../../npm/promise-polyfill/promise.js"), i = require("../base.js"), a = require("../../utils/split-float.js"), u = require("../../api/index.js").getPoiCouponsList, s = require("./coupon-status.js").COUPON_STATUS, c = require("../../utils/format-time.js"), l = i({
    data: {
        empty: !1,
        more: !0,
        coupon_total_num: 0,
        coupons: [],
        hideReason: !0
    },
    index: 0,
    getReportData: function() {
        return {
            cid: "c_pyctaqtz"
        };
    },
    lxPoiCouponView: function(e) {
        this.lxMge.view({
            val_bid: "b_efk5v3la",
            poi_id: e
        });
    },
    lxPoiCouponClick: function(e) {
        this.lxMge.click({
            val_bid: "b_zdn9ud2x",
            poi_id: e
        });
    },
    load: function() {
        var o = this;
        return e(t.default.mark(function e() {
            var r, i, l, p, d, f, m, x, _, h, g, v, y, w, b, C, j;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return o.loading(!0), e.prev = 1, r = o.index, i = o.data.coupons, e.next = 5, u({
                        status: s.CAN_USE,
                        page_index: r,
                        page_size: 20
                    });

                  case 5:
                    if (l = e.sent, p = l.has_more, d = l.coupon_total_num, f = l.poi_coupon_info_list) {
                        e.next = 11;
                        break;
                    }
                    throw {
                        code: "error",
                        message: "啊哦, 出错了, 请重试"
                    };

                  case 11:
                    for (m = 1 === p, x = f.length - 1; -1 < x; --x) (_ = f[x]).deadline = c(_.deadline, "yyyy.MM.dd"), 
                    o.lxPoiCouponView(_.poi_id), h = _.amount, g = a(h), v = n(g, 2), _.amount = v[0], 
                    _.tail = v[1];
                    if (0 === (y = i.concat(f)).length) throw {
                        code: "no-coupon",
                        message: "您当前没有商家代金券哦~"
                    };
                    e.next = 16;
                    break;

                  case 16:
                    o.index = r + 1, o.setData({
                        empty: !1,
                        coupon_total_num: d,
                        coupons: y,
                        more: m
                    }), o.error({}), e.next = 26;
                    break;

                  case 21:
                    e.prev = 21, e.t0 = e.catch(1), w = e.t0.code, b = e.t0.message, 0 === o.data.coupons.length ? (C = "no-coupon" !== w ? "重试" : "", 
                    j = "no-coupon" !== w ? "您的手机网络不太顺畅哦" : b, o.error({
                        img: "no-coupon",
                        message: j,
                        textOK: C,
                        ok: function() {
                            o.index = 0, o.load();
                        }
                    }), o.setData({
                        empty: !0
                    })) : o.toast({
                        message: b
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
    onSelectPoiCoupon: function(e) {
        var t = e.currentTarget.dataset.poiid;
        this.lxPoiCouponClick(t), wx.navigateTo({
            url: "/pages/restaurant/restaurant?poi_id=" + t + "&cat_id=0"
        });
    },
    onLoad: function() {
        this.load();
    },
    onScrollBottom: function() {
        this.data.more && this.load();
    }
});

(0, o.page)(l);