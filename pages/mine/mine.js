function e(e) {
    return function() {
        var n = e.apply(this, arguments);
        return new a(function(e, r) {
            return function i(o, t) {
                try {
                    var s = n[o](t), u = s.value;
                } catch (o) {
                    return void r(o);
                }
                if (!s.done) return a.resolve(u).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(u);
            }("next");
        });
    };
}

var n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), r = Object.assign || function(e) {
    for (var n = 1; n < arguments.length; n++) {
        var r = arguments[n];
        for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (e[i] = r[i]);
    }
    return e;
}, i = require("../../npm/@dp/owl-wxapp/es6/index.js"), o = require("../../actions/user.js"), a = require("../../npm/promise-polyfill/promise.js"), t = require("../../utils/mix.js"), s = require("../../constants.js").CONTACT_PHONE, u = require("./log.js"), l = (s.match(/\d{1,3}/g) || []).join("-"), c = require("../../api/index.js"), _ = c.logout, p = c.getPoiCouponsNum, d = require("../../api/newIndex.js").getMyAccount, v = require("../base.js"), w = require("../../weapp-redux/index.js").connect, g = require("../../api/index.js").getCouponsList, h = v({
    data: {
        hasLogin: !1,
        avatarurl: "",
        username: "",
        mobile: "",
        contactPhone: l,
        online_service_is_show: !0,
        online_service_url: "",
        invite_reward_is_show: !0,
        invite_reward_url: "",
        couponNum: 0,
        poiCouponNum: 0
    },
    onClickAvatar: function() {
        this.data.hasLogin || (this.lxLoginClick(), wx.navigateTo({
            url: "../loginV2/login?login_page=2"
        }));
    },
    onClickLogout: function() {
        var e = this;
        wx.showModal({
            title: "确定退出？",
            content: "退出登录后将无法查看订单，重新登录即可查看",
            cancelColor: "#333333",
            confirmText: "确定",
            confirmColor: "#ffb000",
            success: function(n) {
                if (n.confirm) try {
                    wx.removeStorageSync("wx_set_info"), e.lxLoginOutClick(), e.logout();
                } catch (n) {
                    console.log(n);
                }
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    onClickContact: function() {
        this.showPhoneCall({
            phones: [ s ],
            texts: [ "客服电话：" + l ]
        });
    },
    onlineServiceUrl: "",
    onClickNav: function(e) {
        var n = e.currentTarget.dataset.type, r = this.data, i = r.hasLogin, o = r.help_feedback_url, a = r.agree_explain_url, t = r.online_service_url;
        if (this.onlineServiceUrl = t, !i && -1 < [ "coupons", "poiCoupons", "address", "invite", "online-service" ].indexOf(n)) wx.navigateTo({
            url: "../loginV2/login?afterLoginAction=" + n + "&login_page=3"
        }); else switch (n) {
          case "coupons":
            wx.navigateTo({
                url: "../my-coupons/my-coupons"
            });
            break;

          case "poiCoupons":
            wx.navigateTo({
                url: "../my-poi-coupons/my-poi-coupons"
            }), this.lxPoiCouponClick();
            break;

          case "address":
            wx.navigateTo({
                url: "../my-address/my-address"
            });
            break;

          case "invite":
            wx.navigateTo({
                url: this.data.invite_reward_url
            });
            break;

          case "online-service":
            wx.navigateTo({
                url: "/pages/web-view/web-view?type=DIRECT&redirectUrl=" + encodeURIComponent(this.onlineServiceUrl)
            });
            break;

          case "help":
            wx.navigateTo({
                url: "../web-view/web-view?type=DIRECT&redirectUrl=" + encodeURIComponent(o)
            });
            break;

          case "agreement":
            wx.navigateTo({
                url: "../web-view/web-view?type=DIRECT&redirectUrl=" + encodeURIComponent(a)
            });
        }
    },
    logout: function() {
        var r = this;
        return e(n.default.mark(function e() {
            var i, o;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, e.next = 3, _({
                        token: r.data.token
                    });

                  case 3:
                    r.exitUser(), r.reload(), (i = getApp()).eventBus.fire("user:logout"), e.next = 13;
                    break;

                  case 9:
                    e.prev = 9, e.t0 = e.catch(0), o = e.t0.message, r.alert({
                        message: o
                    });

                  case 13:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 0, 9 ] ]);
        }))();
    },
    reload: function() {
        var i = this;
        return e(n.default.mark(function e() {
            var o, a, t, s, u, l, c, _, v, w, h, f, x, m, b, k, C, y, T, j, L, U, D, q, N, A, I, R;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return i.loading(!0), o = {
                        hasLogin: !1,
                        avatarurl: "",
                        username: "",
                        mobile: ""
                    }, e.prev = 2, e.next = 5, d({
                        userToken: i.data.token
                    });

                  case 5:
                    a = e.sent, t = a.code, s = a.avatarurl, u = a.username, l = a.mobile, c = a.online_service_is_show, 
                    _ = a.online_service_url, v = a.invite_reward_is_show, w = a.invite_reward_url, 
                    h = a.help_feedback_is_show, f = a.help_feedback_url, x = a.agree_explain_is_show, 
                    m = a.agree_explain_url, b = {
                        online_service_is_show: c,
                        online_service_url: _,
                        invite_reward_is_show: v,
                        invite_reward_url: w,
                        help_feedback_is_show: h,
                        help_feedback_url: f,
                        agree_explain_is_show: x,
                        agree_explain_url: m
                    }, 0 === t ? "" === s || null === s ? i.setData(r({
                        hasLogin: !0,
                        avatarurl: "/img/icons/my-image-default.png",
                        username: u,
                        mobile: l
                    }, b)) : i.setData(r({
                        hasLogin: !0,
                        avatarurl: s,
                        username: u,
                        mobile: l
                    }, b)) : i.setData(r({}, o, b)), e.next = 30;
                    break;

                  case 22:
                    e.prev = 22, e.t0 = e.catch(2), t = e.t0.code, k = e.t0.message, C = e.t0.data, 
                    y = C.online_service_is_show, T = C.online_service_url, j = C.invite_reward_is_show, 
                    L = C.invite_reward_url, U = C.help_feedback_is_show, D = C.help_feedback_url, q = C.agree_explain_is_show, 
                    N = C.agree_explain_url, t && 401 === t ? i.setData({
                        online_service_is_show: y,
                        online_service_url: T,
                        invite_reward_is_show: j,
                        invite_reward_url: L,
                        help_feedback_is_show: U,
                        help_feedback_url: D,
                        agree_explain_is_show: q,
                        agree_explain_url: N
                    }) : t && 0 !== t && 401 !== t ? wx.showToast({
                        title: k,
                        icon: "none",
                        duration: 2e3
                    }) : wx.showToast({
                        title: "网络服务异常，请稍后再试~",
                        icon: "none",
                        duration: 2e3
                    }), i.setData(r({}, o, {
                        online_service_is_show: y,
                        online_service_url: T,
                        invite_reward_is_show: j,
                        invite_reward_url: L,
                        help_feedback_is_show: U,
                        help_feedback_url: D,
                        agree_explain_is_show: q,
                        agree_explain_url: N
                    }));

                  case 30:
                    if (i.data.hasLogin) return e.prev = 32, e.next = 35, g({
                        status: 1,
                        page_index: 0,
                        page_size: 20
                    });
                    e.next = 48;
                    break;

                  case 35:
                    return A = e.sent, I = A.coupon_total_num, i.setData({
                        couponNum: I
                    }), e.next = 40, p();

                  case 40:
                    R = e.sent, i.setData({
                        couponNum: I,
                        poiCouponNum: R
                    }), e.next = 48;
                    break;

                  case 44:
                    e.prev = 44, e.t1 = e.catch(32), k = e.t1.message, console.log(k);

                  case 48:
                    i.loading(!1);

                  case 49:
                  case "end":
                    return e.stop();
                }
            }, e, i, [ [ 2, 22 ], [ 32, 44 ] ]);
        }))();
    },
    onLoad: function() {
        var e = this;
        this.reload(), getApp().eventBus.on("user:login", function() {
            e.reload();
        });
    },
    getReportData: function() {
        return {
            cid: "c_ul2elkn"
        };
    },
    onShow: function() {
        var r = this;
        return e(n.default.mark(function e() {
            var i, o, a;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (wx.setNavigationBarTitle({
                        title: "我的"
                    }), i = getApp(), !(o = i.afterLoginAction)) {
                        e.next = 8;
                        break;
                    }
                    i.afterLoginAction = "", "invite" === o && r.data.invite_reward_url ? wx.navigateTo({
                        url: r.data.invite_reward_url
                    }) : "coupons" === o ? wx.navigateTo({
                        url: "../my-coupons/my-coupons"
                    }) : "poiCoupons" === o ? wx.navigateTo({
                        url: "../my-coupons/my-poi-coupons"
                    }) : "address" === o ? wx.navigateTo({
                        url: "../my-address/my-address"
                    }) : "online-service" === o && r.onlineServiceUrl && wx.navigateTo({
                        url: "/pages/web-view/web-view?type=DIRECT&redirectUrl=" + encodeURIComponent(r.onlineServiceUrl)
                    }), e.next = 12;
                    break;

                  case 8:
                    return e.next = 10, p();

                  case 10:
                    a = e.sent, r.setData({
                        poiCouponNum: a
                    });

                  case 12:
                  case "end":
                    return e.stop();
                }
            }, e, r);
        }))();
    }
});

(0, i.page)(t(h, w(function(e) {
    return {
        open_id: e.user.open_id,
        token: e.user.token
    };
}, function(e) {
    return {
        exitUser: function(n) {
            e((0, o.exit)(n));
        }
    };
}), u));