function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            return function a(n, i) {
                try {
                    var u = t[n](i), o = u.value;
                } catch (n) {
                    return void r(n);
                }
                if (!u.done) return Promise.resolve(o).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(o);
            }("next");
        });
    };
}

var r = e(require("../../../../babel-runtime/regenerator/index.js")), a = e(require("../../../../@dp/weixin-midas-simple/component/midas-simple/outlet.js")), n = e(require("../../../../@dp/weixin-midas-waimai/component/midas/midas.outlet.js")), i = e(require("../../../../qs/lib/index.js"));

Component({
    externalClasses: [ "viewstyle", "navigatorstyle" ],
    properties: {
        uuid: {
            type: String,
            value: ""
        },
        env: {
            type: String,
            value: "product"
        },
        adData: {
            type: Object,
            value: null
        },
        lch: {
            type: String,
            value: "wx"
        },
        userid: {
            type: String,
            value: ""
        }
    },
    data: {
        productClicked: !1
    },
    attached: function() {
        var e, i, u, o = this, l = getCurrentPages().slice(-1)[0], s = l.onShow, d = l.onPullDownRefresh, c = l.onPageScroll;
        l.onShow = (e = t(r.default.mark(function e() {
            var t = arguments;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, s.apply(void 0, t);

                  case 2:
                    a.default.clearImpression("platinum"), a.default.triggerScroll(), n.default.clearImpression(), 
                    n.default.triggerScroll();

                  case 6:
                  case "end":
                    return e.stop();
                }
            }, e, o);
        })), function() {
            return e.apply(this, arguments);
        }), l.onPageScroll = (i = t(r.default.mark(function e() {
            var t = arguments;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, c.apply(void 0, t);

                  case 2:
                    a.default.triggerScroll(), n.default.triggerScroll();

                  case 4:
                  case "end":
                    return e.stop();
                }
            }, e, o);
        })), function() {
            return i.apply(this, arguments);
        }), l.onPullDownRefresh = (u = t(r.default.mark(function e() {
            var t = arguments;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, d.apply(void 0, t);

                  case 2:
                    a.default.clearImpression("platinum"), a.default.triggerScroll(), n.default.clearImpression(), 
                    n.default.triggerScroll();

                  case 6:
                  case "end":
                    return e.stop();
                }
            }, e, o);
        })), function() {
            return u.apply(this, arguments);
        });
    },
    methods: {
        getReportData: function(e) {
            var t = this.data.adData, r = {
                adType: t.ad_type,
                adChargeInfo: i.default.parse(t.platinum_banner.charge_info)
            };
            return void 0 !== e && (r.extra = e, r.extra.userId = this.data.userid || 0), {
                ad_id: t.platinum_banner.ad_id,
                poi_id: t.platinum_banner.wm_poi_id,
                ad: JSON.stringify(r)
            };
        },
        getLx: function() {
            return getApp().lx.lxMge;
        },
        reportClick: function(e) {
            this.getLx().click("b_MdbaO", this.getReportData(e));
        },
        reportAdHolderMV: function() {
            this.getLx().view("b_3lrl7mj9", {});
        },
        reportAdMV: function() {
            this.getLx().view("b_dmQmy", this.getReportData());
        },
        gotoShop: function(e) {
            if (this.data.productClicked) return this.data.productClicked = !1;
            this.reportClick();
            var t = e.detail;
            wx.navigateTo({
                url: t
            });
        },
        gotoProAnchor: function(e) {
            this.data.productClicked = !0;
            var t = e.currentTarget.dataset, r = t.spuid, a = t.url;
            this.reportClick({
                spuId: r
            }), wx.navigateTo({
                url: a
            });
        }
    }
});