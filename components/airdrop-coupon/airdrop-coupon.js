var t = require("../../api/analytics.js").event;

Component({
    properties: {
        airdropCouponData: Object
    },
    data: {
        hasCoupon: !1,
        showAirDropLayer: !1
    },
    ready: function() {
        try {
            t({
                event_type: "view",
                val_bid: "b_752hxzjb"
            }), this.setData({
                hasCoupon: !(null == this.data.airdropCouponData.coupons || 0 === Object.keys(this.data.airdropCouponData.coupons).length),
                tianJiangUi: this.data.airdropCouponData.tianJiangUi,
                coupons: this.data.airdropCouponData.coupons
            }), this.setData({
                showAirDropLayer: this.data.hasCoupon
            }), this.moneyShow();
            var a = this.data.airdropCouponData.tianJiangUi;
            a && a.tjButtonTextColor && a.tjButtonDirectLink && a.tjButtonColor && a.tjButtonText && t({
                event_type: "view",
                val_bid: "b_tfzq2821"
            });
        } catch (a) {
            console.log(a);
        }
    },
    methods: {
        moneyShow: function() {
            var t = this;
            this.data.coupons.forEach(function(a, o) {
                var i = ("" + a.couponAmountOrDiscount).split("."), n = i[0], e = 0;
                1 < i.length && n <= 100 && (e = "." + i[1]), a.intMoney = n, a.pointMoney = e, 
                t.data.coupons[o] = a, t.setData({
                    coupons: t.data.coupons.slice()
                });
            });
        },
        goToUse: function() {
            t({
                event_type: "click",
                val_bid: "b_6vrhwg5y"
            }), this.jumpUrl(this.data.airdropCouponData.tianJiangUi.tjButtonDirectLink);
        },
        onClickUseCoupon: function(a) {
            var o = a.currentTarget.dataset.url;
            o ? (this.jumpUrl(o), t({
                event_type: "click",
                val_bid: "b_hxich1se"
            })) : this.setData({
                showAirDropLayer: !1
            });
        },
        jumpUrl: function(t) {
            this.setData({
                showAirDropLayer: !1
            }), t.match("index") || t.match("order") || t.match("mine") ? wx.switchTab({
                url: t
            }) : wx.navigateTo({
                url: t
            });
        },
        closeLayer: function() {
            var a = this;
            this.setData({
                showHideAnimate: !0
            }), setTimeout(function() {
                a.setData({
                    showAirDropLayer: !1
                });
            }, 300), t({
                event_type: "click",
                val_bid: "b_0o5mwhu9"
            });
        }
    }
});