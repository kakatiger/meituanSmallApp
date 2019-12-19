function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            return function r(o, i) {
                try {
                    var n = t[o](i), s = n.value;
                } catch (o) {
                    return void a(o);
                }
                if (!n.done) return Promise.resolve(s).then(function(e) {
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
}(require("../../npm/babel-runtime/regenerator/index.js")), a = require("../../utils/object-assign.js"), r = require("../../api/activity-api.js").request, o = require("../../api/analytics.js"), i = o.event, n = o.manual_pv, s = {
    onCouponPopCancle: function(e) {
        if ("cancle" === e.target.dataset.type) {
            if (this.setData({
                share_coupon_pop: !1
            }), this.mapSwtich) try {
                var t = wx.getSystemInfoSync();
                /iPhone/.test(t.model) ? wx.pageScrollTo({
                    scrollTop: 660 * t.windowWidth / 750,
                    duration: 0
                }) : wx.pageScrollTo({
                    scrollTop: 20,
                    duration: 0
                });
            } catch (e) {
                wx.pageScrollTo({
                    scrollTop: 20,
                    duration: 0
                });
            }
            this.setData({
                showMap: this.mapSwtich,
                disableReload: !1
            }), console.log("cancle");
        }
    },
    onClickCouponEntrance: function() {
        1 === this.data.showMap && this.setData({
            showMap: 0,
            disableReload: !0
        }), i({
            event_type: "click",
            val_bid: "b_KH3VP",
            val_lab: {
                custom: {
                    order_id: this.view_id,
                    source_id: 3
                }
            }
        }), this.setData({
            share_coupon_pop: !0
        }), n({
            val_lab: {
                custom: {
                    order_id: this.view_id,
                    source_id: 3
                }
            },
            c_id: "b_x82rg"
        });
    },
    loadShareCouponSwitch: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var o, i, n, s, c, p, d, u, l;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, o = getApp().store.getState(), i = o.wx, n = i.networkType, s = i.system, 
                    c = /iOS/.test(s) ? "iOS" : "Android", e.next = 5, r({
                        domain: "https://marketing.waimai.meituan.com/",
                        url: "o/wxapp/coupon/checkShare",
                        method: "POST",
                        successCode: 0,
                        data: {
                            orderId: a.view_id,
                            "couponShareUserInfo.clientType": c,
                            "couponShareUserInfo.device.deviceType": "phone",
                            "couponShareUserInfo.device.osType": c,
                            "couponShareUserInfo.device.osVersion": s,
                            "couponShareUserInfo.device.appName": "MT_WAIMAI_WEIXIN",
                            "couponShareUserInfo.device.netType": n
                        }
                    });

                  case 5:
                    p = e.sent, d = p.canShare, u = p.shareTipVo, a._share_tip = u, a._share_switch = d, 
                    e.next = 16;
                    break;

                  case 12:
                    e.prev = 12, e.t0 = e.catch(0), l = e.t0.message, console.log(l);

                  case 16:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 0, 12 ] ]);
        }))();
    },
    onShareAppMessage: function(e) {
        var t = e.target.dataset.code;
        if (-1 < [ 2015, "2015" ].indexOf(t)) {
            var a = this.data.share_bill_info, r = a.sponsor_user_id, o = a.shop_cart_id, n = a.title, s = a.pic_url, c = this.data.detailOrderInfo.poi_icon;
            return s = (c = c.replace(/\/\d*.0.80/, "").replace(/.webp/, "")) + "@420w_336h_1e_1c", 
            this.data.detailOrderInfo.poi_name && (n += "【" + this.data.detailOrderInfo.poi_name + "】"), 
            console.log("imageUrl2", s), {
                title: n,
                path: "/pages/order-info/order-info?view_id=" + this.view_id + "&sponsor_user_id=" + r + "&shop_cart_id=" + (o || "") + "&is_share_bill_url=1&order_type=1",
                imageUrl: s
            };
        }
        if ("button" === e.from) {
            var p = this;
            i({
                event_type: "click",
                val_bid: "b_4hn5A",
                val_lab: {
                    custom: {
                        order_id: this.view_id,
                        source_id: 3
                    }
                }
            });
            var d = this.data.share_tip.share_info.url.match(/\w*\?urlKey=\w*/)[0], u = d.split("?urlKey=")[0], l = d.split("?urlKey=")[1];
            return {
                title: this.data.share_tip.share_info.title,
                imageUrl: this.data.share_tip.share_info.icon || "http://p0.meituan.net/codeman/a1e66280f23ab6aaefe29d86bfbc6601116200.png",
                path: "/sub_pages/sharecoupon/shareInit?channelUrlKey=" + u + "&urlKey=" + l,
                complete: function() {
                    p.setData({
                        share_coupon_pop: !1
                    });
                }
            };
        }
        var h = this.pageName || "unknown";
        return {
            title: "美团外卖",
            desc: this.onShareAppDesc(),
            path: "/pages/index/index?from=from_share_" + h
        };
    }
};

module.exports = function(e) {
    return e = a(e, s);
};