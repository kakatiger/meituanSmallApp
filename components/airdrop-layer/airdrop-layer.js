var e = require("../../api/analytics.js").event;

Component({
    properties: {
        airdropLayerData: {
            type: Object,
            value: {}
        }
    },
    data: {
        showAirdropLayer: !1
    },
    ready: function() {
        try {
            this.data.airdropLayerData.picUrl && this.data.airdropLayerData.linkUrl && this.setData({
                showAirdropLayer: !0
            }), e({
                event_type: "view",
                cid: "c_m84bv26",
                val_bid: "b_cu0sd0rv"
            });
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        closeLayer: function() {
            e({
                event_type: "click",
                cid: "c_m84bv26",
                val_bid: "b_7fdm4iva"
            }), this.setData({
                showAirdropLayer: !1
            });
        },
        onClickLayer: function() {
            e({
                event_type: "click",
                cid: "c_m84bv26",
                val_bid: "b_yfkez3ee"
            });
            var a = this.data.airdropLayerData.linkUrl;
            /https:\/\/wxapp/.test(a) ? (a = a.split("https://wxapp")[1], wx.navigateTo({
                url: a,
                fail: function() {
                    console.log("跳转失败");
                }
            })) : /https:\/\/market.waimai.meituan.com\/gd\/wm/.test(a) ? wx.navigateTo({
                url: "/pages/web-view/web-view?type=REDIRECT&redirectUrl=" + encodeURIComponent(a),
                fail: function() {
                    console.log("跳转失败");
                }
            }) : wx.navigateTo({
                url: "/pages/web-view/web-view?redirectUrl=" + encodeURIComponent(a),
                fail: function() {
                    console.log("跳转失败");
                }
            }), this.setData({
                showAirdropLayer: !1
            });
        }
    }
});