function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            return function n(o, a) {
                try {
                    var i = t[o](a), s = i.value;
                } catch (o) {
                    return void r(o);
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

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), r = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
}, n = require("../../api/index.js").shareCart;

module.exports = function(o) {
    return r({}, o, {
        data: r({}, o.data, {
            buyTogetherShareBtn: {
                show: !1,
                showLoginLayer: !1,
                isUserAuthorized: !0
            }
        }),
        toLogin: function() {
            this.navigateToLogin("showLoginSuccessModal");
        },
        onClickBuyTogetherShare: function() {
            var o = this;
            return e(t.default.mark(function e() {
                var a, i, s, u, c, h, d, p, g, f, l;
                return t.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (o.lxClickBuyTogetherShareBtn(), a = o.data.buyTogetherShareBtn.showLoginLayer, 
                        i = o.getCurrentUserInfo(), s = i.user_id, a) return e.abrupt("return");
                        e.next = 5;
                        break;

                      case 5:
                        return o.pingSponsorUserId && (o.pingSponsorUserId = "", o.shareTime = ""), u = o.data.cart, 
                        h = [], 0 < (c = void 0 === u ? [] : u).length && ((d = c[0] || {}).cart || []).forEach(function(e) {
                            var t = e.id, r = e.count, n = e.attrs, o = e.activity_tag, a = n.map(function(e) {
                                return e.id;
                            });
                            h.push({
                                id: t,
                                count: r,
                                cart_id: 0,
                                attrs: a,
                                activity_tag: o
                            });
                        }), e.prev = 9, o.setPrevSourceUrl(o.poiID, ""), e.next = 13, n({
                            wm_poi_id: o.poiID,
                            product_list: h
                        });

                      case 13:
                        p = e.sent, o.setData({
                            addMoreShow: !1,
                            buyTogetherShareBtn: r({}, o.data.buyTogetherShareBtn, {
                                show: !1
                            })
                        }), f = (g = (p || {}).sponsor_user_id) || s, o.setSponsorUserId(o.poiID, f), o.setClearCartFlag(o.poiID, !1), 
                        o.setShopCartId(o.poiID, p.shop_cart_id), o.checkIsInSharing(void 0, !0), o.ifRenderAllSpus({}), 
                        e.next = 29;
                        break;

                      case 24:
                        e.prev = 24, e.t0 = e.catch(9), l = e.t0.code, e.t0.message, 401 === l ? o.navigateToLogin("showLoginSuccessModal") : o.toast({
                            message: "发起拼单失败，请重试~"
                        });

                      case 29:
                      case "end":
                        return e.stop();
                    }
                }, e, o, [ [ 9, 24 ] ]);
            }))();
        }
    });
};