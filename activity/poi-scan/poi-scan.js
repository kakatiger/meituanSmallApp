function a(a) {
    return function() {
        var t = a.apply(this, arguments);
        return new Promise(function(a, o) {
            return function e(i, s) {
                try {
                    var n = t[i](s), c = n.value;
                } catch (i) {
                    return void o(i);
                }
                if (!n.done) return Promise.resolve(c).then(function(a) {
                    e("next", a);
                }, function(a) {
                    e("throw", a);
                });
                a(c);
            }("next");
        });
    };
}

var t = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), o = require("../../utils/object-assign.js"), e = require("../../reducers/selectors/common-param.js"), i = require("../login.js"), s = require("../../api/activity-api.js").request, n = require("../../api/analytics.js").event, c = i({
    reloadFlag: !0,
    scanDialogCheck: function(o) {
        var e = this;
        return a(t.default.mark(function a() {
            var i;
            return t.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.prev = 0, a.next = 3, s({
                        url: "poiqrcode/coupon/checkShow",
                        method: "POST",
                        successCode: 0,
                        data: {
                            poiViewId: o
                        }
                    });

                  case 3:
                    a.next = 11;
                    break;

                  case 5:
                    a.prev = 5, a.t0 = a.catch(0), a.t0.message, 1 === (i = a.t0.data).code && e.loginAuth(o), 
                    n({
                        event_type: "view",
                        val_lab: {
                            poi_id: o,
                            activity_status: i.code
                        },
                        val_bid: "b_tkkhzf4i"
                    });

                  case 11:
                  case "end":
                    return a.stop();
                }
            }, a, e, [ [ 0, 5 ] ]);
        }))();
    },
    loginAuth: function(a) {
        var t = getApp().eventBus, o = this.data.poiData.poi_info.pic_url;
        this.setData({
            poiID: a,
            poiDataNew: Object.assign({}, this.data.poiDataNew, {
                poiPic: o || "../../img/icons/no-shopImg.png"
            })
        }), t.on("user:login", this.reloadSeed), this.auth();
    },
    reloadSeed: function() {
        this.reloadFlag && this.reloadPoi();
    },
    reFresh: function() {
        n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_epqx99fu"
        }), this.reloadPoi();
    },
    toMe: function() {
        wx.switchTab({
            url: "../../pages/mine/mine"
        }), this.data.poiDataNew.isFail && n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_a7artdnm"
        }), this.data.poiDataNew.isShowCoupon && !this.data.poiDataNew.showIcon && n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_xwdkow1k"
        }), this.data.poiDataNew.isShowCoupon && this.data.poiDataNew.showIcon && n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_9x1dlx9v"
        });
    },
    useCoupon: function() {
        this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                showCouponDialog: !1
            })
        }), this.data.poiDataNew.isShowCoupon && !this.data.poiDataNew.showIcon && n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_24l4dij3"
        }), this.data.poiDataNew.isShowCoupon && this.data.poiDataNew.showIcon && n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_7b0qc8aa"
        });
    },
    intoPoi: function() {
        this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                showCouponDialog: !1
            })
        }), n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_skl4psk0"
        });
    },
    closeCoupon: function() {
        var a = this;
        this.setData({
            poiDataNew: Object.assign(a.data.poiDataNew, {
                showCouponDialog: !1
            })
        }), a.data.poiDataNew.isShowFail && n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_4jx1cbnm"
        }), a.data.poiDataNew.isFail && n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_i5dpiyge"
        }), a.data.poiDataNew.isShowCoupon && a.data.poiDataNew.showIcon && n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_jl4954s7"
        }), a.data.poiDataNew.isShowCoupon && !a.data.poiDataNew.showIcon && n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_crr2l9qe"
        }), a.data.poiDataNew.isshowGetCapture && n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_59j6xvwf"
        }), a.data.poiDataNew.isshowLogin && n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_j36fs86e"
        }), a.data.poiDataNew.isshowAuth && n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_cyjgavuf"
        });
    },
    shareToFriend: function() {
        n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_ivqt81py"
        }), this.data.poiDataNew.isShowCoupon && !this.data.poiDataNew.showIcon && n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_aolewtrz"
        }), this.data.poiDataNew.isShowCoupon && this.data.poiDataNew.showIcon && n({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_h7dmjpfh"
        });
    },
    reloadPoi: function() {
        var o = this;
        return a(t.default.mark(function a() {
            var i, c, l, p, u, d, w, r;
            return t.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return o.reloadFlag = !1, i = getApp().store.getState(), c = i.user.token, l = e(getApp().store.getState()), 
                    o.setData({
                        wm_logintoken: c || l.wm_logintoken,
                        wm_latitude: l.wm_actual_latitude,
                        wm_longitude: l.wm_actual_longitude
                    }), u = {
                        poiViewId: (p = o).data.poiID,
                        wm_logintoken: p.data.wm_logintoken,
                        wm_latitude: p.data.wm_latitude,
                        wm_longitude: p.data.wm_longitude
                    }, p.setData({
                        poiDataNew: {
                            loginPopup: !0,
                            isshowLoading: !0,
                            isshowAuth: !1,
                            isshowLogin: !1,
                            isshowGetCapture: !1,
                            isShowCoupon: !1,
                            isShowFail: !1,
                            isFail: !1,
                            disableCapture: !1,
                            successTip: "",
                            commonCoupon: [],
                            poiCoupon: [],
                            showCouponDialog: !1
                        }
                    }), a.prev = 7, a.next = 10, s({
                        url: "poiqrcode/coupon/grabCoupon",
                        method: "POST",
                        successCode: 0,
                        data: u
                    });

                  case 10:
                    a.next = 19;
                    break;

                  case 12:
                    a.prev = 12, a.t0 = a.catch(7), a.t0.message, d = a.t0.data, w = getApp(), r = w.eventBus, 
                    console.log(d.data), 1 === d.code ? (n({
                        event_type: "view",
                        val_lab: {
                            custom: {}
                        },
                        val_bid: "b_6jw46riu"
                    }), p.setData({
                        poiDataNew: Object.assign(p.data.poiDataNew, {
                            isshowLoading: !1,
                            isShowCoupon: !0,
                            successTip: "恭喜您，领取成功！",
                            showIcon: !0,
                            commonCoupon: d.data,
                            poiCoupon: d.data,
                            showCouponDialog: !0
                        })
                    })) : 10008 === d.code ? (n({
                        event_type: "view",
                        val_lab: {
                            custom: {}
                        },
                        val_bid: "b_68niqbyb"
                    }), p.setData({
                        poiDataNew: Object.assign(p.data.poiDataNew, {
                            isshowLoading: !1,
                            isShowCoupon: !0,
                            successTip: "您已领过，券使用后可再次领取",
                            commonCoupon: d.data,
                            showCouponDialog: !0
                        })
                    })) : 10002 === d.code ? (n({
                        event_type: "view",
                        val_lab: {
                            custom: {}
                        },
                        val_bid: "b_69nwx1ip"
                    }), p.setData({
                        poiDataNew: Object.assign(p.data.poiDataNew, {
                            isshowLoading: !1,
                            isShowCoupon: !1,
                            isFail: !1,
                            isShowFail: !0,
                            commonCoupon: [],
                            showCouponDialog: !0
                        })
                    })) : 10004 === d.code ? (o.reloadFlag = !0, o.alert({
                        message: "身份信息已过期，请重新登录",
                        textOK: "知道了",
                        ok: function() {
                            o.auth(), r.on("user:login", o.reloadSeed);
                        }
                    })) : 10005 === d.code || 10006 === d.code || 10007 === d.code || 10003 === d.code || 10009 === d.code || 10010 === d.code ? (n({
                        event_type: "view",
                        val_lab: {
                            custom: {}
                        },
                        val_bid: "b_69nwx1ip"
                    }), p.setData({
                        poiDataNew: Object.assign(p.data.poiDataNew, {
                            isshowLoading: !1,
                            isShowCoupon: !1,
                            isFail: !1,
                            isShowFail: !0,
                            commonCoupon: [],
                            showCouponDialog: !0
                        })
                    })) : 10001 !== d.code && 10011 !== d.code && 10012 !== d.code || (n({
                        event_type: "view",
                        val_lab: {
                            custom: {}
                        },
                        val_bid: "b_cgfry40n"
                    }), p.setData({
                        poiDataNew: Object.assign(p.data.poiDataNew, {
                            isshowLoading: !1,
                            isShowCoupon: !1,
                            isFail: !0,
                            isShowFail: !1,
                            commonCoupon: [],
                            showCouponDialog: !0
                        })
                    }));

                  case 19:
                  case "end":
                    return a.stop();
                }
            }, a, o, [ [ 7, 12 ] ]);
        }))();
    }
});

module.exports = function(a) {
    return a = o(a, c);
};