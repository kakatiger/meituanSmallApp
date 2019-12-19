function e(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new a(function(e, t) {
            return function n(o, i) {
                try {
                    var s = r[o](i), u = s.value;
                } catch (o) {
                    return void t(o);
                }
                if (!s.done) return a.resolve(u).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(u);
            }("next");
        });
    };
}

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), t = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
}, n = require("../../npm/@dp/owl-wxapp/es6/index.js"), a = require("../../npm/promise-polyfill/promise.js"), o = require("../../components/rohr/rohr.js"), i = require("../../components/buy-again/buy-again.js"), s = require("../../utils/mix.js"), u = require("../../api/index.js"), c = u.orderConfirmReceive, l = u.pay, d = require("../../api/newIndex.js").orders, g = require("../../api/wx.js").requestPayment, p = require("../../utils/mtpay.js"), h = p.mtpay, f = p.isMtpay, v = require("../../weapp-redux/index.js").connect, x = require("../../constants.js"), w = x.ACTION_CLICK, _ = x.P_ORDER, m = x.P_POI, k = x.B_POI, b = x.PAOTUI_CODE, y = x.PAOTUI_APPID, L = require("../../utils/format-time.js"), D = require("../../utils/fix-price.js"), T = require("../../utils/image-scale.js"), P = require("../base.js"), q = require("./log.js"), j = require("../../utils/version-compare.js"), C = function(e, r) {
    if (!e || !r) return !0;
    for (var t = [ "pay_status", "logistics_status", "status", "hash_id", "comment_status" ], n = t.length - 1; -1 < n; --n) {
        var a = t[n];
        if (e[a] !== r[a]) return !0;
    }
    return !1;
}, O = function(e) {
    for (var r = e.length - 1; -1 < r; --r) {
        var t = e[r];
        t._order_time = L(t.order_time), t.poi_pic = T(t.poi_pic, 168), t._total = D(t.total);
    }
    return e;
}, B = "", M = {
    pageName: "orders",
    data: {
        ordersList: [],
        hasMore: !0,
        hasLogin: !0,
        hasNet: !0,
        poi_coupon: {},
        resultModalShown: !1,
        paoTui: {
            showEntrance: !1,
            path: "",
            version: "release",
            appId: y
        }
    },
    cursor: "",
    loadingDebounce: 0,
    loadingBlocking: !1,
    cancelLoading: function() {
        this.loadingBlocking = !1, this.loadingDebounce += 1;
    },
    onClickRefreshPage: function() {
        this.load(!0);
    },
    onClickPay: function(n) {
        var a = this, o = n.currentTarget.dataset.id, i = n.detail, s = i.x, u = i.y;
        return e(r.default.mark(function e() {
            var n, i;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return a.loading(!0), e.prev = 1, e.next = 4, l({
                        wm_order_id_view: o,
                        touchPoint: s + "," + u
                    });

                  case 4:
                    if (n = e.sent, a.loading(!1), f(n)) return e.next = 9, h(t({}, n, {
                        pay_success_url: "/pages/order-info/order-info?view_id=" + o + "&share_coupon_pop=true&activity_way=true&clearPindanCart=1" || ""
                    }));
                    e.next = 10;
                    break;

                  case 9:
                    return e.abrupt("return");

                  case 10:
                    return e.next = 12, g(n);

                  case 12:
                    a.alert({
                        message: "支付成功",
                        ok: function() {
                            wx.navigateTo({
                                url: "../order-info/order-info?view_id=" + o + "&share_coupon_pop=true&activity_way=true&clearPindanCart=1"
                            });
                        }
                    }), e.next = 21;
                    break;

                  case 15:
                    e.prev = 15, e.t0 = e.catch(1), e.t0.code, i = e.t0.message, a.loading(!1), a.alert({
                        message: i
                    });

                  case 21:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 1, 15 ] ]);
        }))();
    },
    onClickOrderHeader: function(e) {
        var r = e.currentTarget.dataset, t = r.poi, n = r.order, a = r.index;
        this.lxToRestaurantClick(t), this.traceTagStart({
            src_page: _,
            src_block: k,
            src_item_index: a,
            src_item_id: n,
            tgt_page: m,
            extra: {
                poi_id: t,
                order_id: n
            },
            action: w
        }), this.onClickNavigator(e);
    },
    onClickConfirmTake: function(t) {
        var n, a = this, o = t.currentTarget.dataset.id;
        this.confirm({
            message: "确认商品已送达？",
            ok: (n = e(r.default.mark(function e() {
                var t, n, i, s, u;
                return r.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return a.loading(!0), e.prev = 1, e.next = 4, c({
                            hash_id: o
                        });

                      case 4:
                        t = e.sent, n = t.lottery_tip, i = t.poi_coupon, a.loading(!1), n ? a.alert({
                            message: n
                        }) : (i ? (i.view_id = o, a.showModal({
                            poi_coupon: i
                        })) : a.toast({
                            message: "订单已完成，快去评价吧"
                        }), a.refresh()), e.next = 16;
                        break;

                      case 10:
                        e.prev = 10, e.t0 = e.catch(1), s = e.t0.message, u = e.t0.msg, a.loading(!1), a.alert({
                            message: s || u || "未知异常"
                        });

                      case 16:
                      case "end":
                        return e.stop();
                    }
                }, e, a, [ [ 1, 10 ] ]);
            })), function() {
                return n.apply(this, arguments);
            })
        });
    },
    showModal: function(e) {
        var r = e.poi_coupon;
        this.setData({
            poi_coupon: r,
            resultModalShown: !0
        });
    },
    confirmReultModal: function(e) {
        var r = e.currentTarget.dataset.viewid;
        this.setData({
            poi_coupon: {},
            resultModalShown: !1
        }), wx.navigateTo({
            url: "../order-info/order-info?view_id=" + r
        });
    },
    onReachBottom: function() {
        this.load();
    },
    onPullDownRefresh: function() {
        var t = this;
        return e(r.default.mark(function e() {
            var n, a;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if ((n = t.store.getState()).user.token) {
                        e.next = 4;
                        break;
                    }
                    return wx.stopPullDownRefresh(), e.abrupt("return");

                  case 4:
                    return t.cancelLoading(), t.loading(!0), e.prev = 6, e.next = 9, t.load(!0);

                  case 9:
                    e.next = 15;
                    break;

                  case 11:
                    e.prev = 11, e.t0 = e.catch(6), a = e.t0.message, t.toast({
                        message: a
                    });

                  case 15:
                    t.loading(!1), wx.stopPullDownRefresh();

                  case 17:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 6, 11 ] ]);
        }))();
    },
    onClickAvatar: function() {
        this.lxOrdersLoginClick(), wx.navigateTo({
            url: "../loginV2/login?login_page=1"
        });
    },
    showLogin: function() {
        this.data.hasLogin && this.setData({
            hasLogin: !1
        });
    },
    hideLogin: function() {
        this.data.hasLogin || this.setData({
            hasLogin: !0
        });
    },
    refresh: function() {
        var t = this;
        return e(r.default.mark(function e() {
            var n, a, o, i, s, u, c, l, g, p, h, f, v, x, w, _, m, k;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, n = t.store.getState(), a = n.user.token, o = n.wx.SDKVersion, i = n.dev.env, 
                    a) {
                        e.next = 6;
                        break;
                    }
                    return t.setData({
                        ordersList: []
                    }), t.showLogin(), e.abrupt("return");

                  case 6:
                    if (t.hideLogin(), s = t.loadingDebounce, t.loadingBlocking) return e.abrupt("return");
                    e.next = 10;
                    break;

                  case 10:
                    return t.loadingBlocking = !0, t.loading(!0), e.next = 14, d({
                        type: 0,
                        category: 0,
                        cursor: ""
                    });

                  case 14:
                    if (u = e.sent, c = u.digestlist, l = u.cursor, g = u.hasmore, p = u.list_types, 
                    s !== t.loadingDebounce) {
                        e.next = 39;
                        break;
                    }
                    if (h = t.data.ordersList, f = !1, !(c.length > h.length)) {
                        e.next = 26;
                        break;
                    }
                    f = !0, e.next = 36;
                    break;

                  case 26:
                    v = c.length - 1;

                  case 27:
                    if (!(-1 < v)) {
                        e.next = 36;
                        break;
                    }
                    if (x = c[v], w = h[v], f = C(x, w)) return e.abrupt("break", 36);
                    e.next = 33;
                    break;

                  case 33:
                    --v, e.next = 27;
                    break;

                  case 36:
                    _ = !1, j(o, "1.9.0") && (_ = 0 < p.filter(function(e) {
                        return e.code === b;
                    }).length, m = t.data.paoTui.showEntrance, _ !== m && (f = !0)), f && (t.cursor = l, 
                    k = O(c), t.setData({
                        ordersList: k,
                        hasMore: Boolean(1 === g && l),
                        "paoTui.show": _,
                        "paoTui.path": _ ? t.getPaoTuiPath() : "",
                        "paoTui.version": "qa" === i ? "trial" : "release"
                    }), t.lxOrderMV(k));

                  case 39:
                    e.next = 44;
                    break;

                  case 41:
                    e.prev = 41, e.t0 = e.catch(0), console.error(e.t0);

                  case 44:
                    t.loading(!1), t.loadingBlocking = !1;

                  case 46:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 0, 41 ] ]);
        }))();
    },
    load: function() {
        var t = this, n = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
        return e(r.default.mark(function e() {
            var a, o, i, s, u, c, l, g, p, h, f, v, x, w;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, t.setData({
                        error: {
                            show: !1,
                            type: "error"
                        }
                    }), a = t.store.getState(), o = a.user.token, i = a.wx.SDKVersion, s = a.dev.env, 
                    o) {
                        e.next = 7;
                        break;
                    }
                    return t.loading(!1), t.showLogin(), e.abrupt("return");

                  case 7:
                    if (t.hideLogin(), u = t.data.hasMore, c = t.loadingDebounce, l = t.loadingBlocking, 
                    n || u) {
                        e.next = 11;
                        break;
                    }
                    return e.abrupt("return");

                  case 11:
                    if (l) return e.abrupt("return");
                    e.next = 13;
                    break;

                  case 13:
                    return t.loadingBlocking = !0, t.loading(!0), g = n ? "" : t.cursor, e.next = 18, 
                    d({
                        type: 0,
                        category: 0,
                        cursor: g
                    });

                  case 18:
                    p = e.sent, c === t.loadingDebounce && (t.cursor = p.cursor, h = O(p.digestlist), 
                    f = p.list_types, v = j(i, "1.9.0") && 0 < f.filter(function(e) {
                        return e.code === b;
                    }).length, t.setData({
                        ordersList: n ? h : t.data.ordersList.concat(h),
                        hasMore: Boolean(1 === p.hasmore && p.cursor),
                        hasNet: !0,
                        "paoTui.show": v,
                        "paoTui.path": v ? t.getPaoTuiPath() : "",
                        "paoTui.version": "qa" === s ? "trial" : "release"
                    }), t.lxOrderMV(h), t.loading(!1), t.loadingBlocking = !1), e.next = 33;
                    break;

                  case 22:
                    if (e.prev = 22, e.t0 = e.catch(0), x = e.t0.code, w = e.t0.message, t.loading(!1), 
                    t.loadingBlocking = !1, 10 === x || 401 === x) return t.showLogin(), e.abrupt("return");
                    e.next = 31;
                    break;

                  case 31:
                    t.hideLogin(), t.error({
                        message: w
                    });

                  case 33:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 0, 22 ] ]);
        }))();
    },
    lxOrderMV: function() {
        var e = this, r = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [];
        Array.isArray(r) && 0 < r.length && r.forEach(function(r) {
            var t = r.button_list, n = r.product_list, a = r.wm_poi_id;
            t && Array.isArray(t) && 0 < t.length && t.forEach(function(r) {
                return 1001 === r.code && e.lxBuyAgainView(a);
            }), n && Array.isArray(n) && 0 < n.length && e.lxOrderItemView(a);
        });
    },
    onClickOrderDetail: function(e) {
        var r = e.currentTarget.dataset.poi;
        this.lxOrderItemClick(r);
    },
    onShow: function() {
        0 < this.data.ordersList.length && this.refresh();
    },
    onClickOrderConfirm: function() {
        this.confirm({
            message: "确认商品已送达？",
            ok: function() {}
        });
    },
    onLoad: function() {
        var e = this;
        this.load(!0);
        var r = getApp().eventBus;
        r.on("user:login", function() {
            e.load(!0);
        }), r.on("user:logout", function() {
            e.showLogin(), e.setData({
                "paoTui.show": !1
            });
        }), r.on("city:changed", function(e) {
            B = e;
        });
        var t = this.store.getState().wx.SDKVersion;
        j(t, "2.0.7") && this.setData({
            "paoTui.useNavigator": !0
        });
    },
    getReportData: function() {
        return {
            cid: "c_48pltlz"
        };
    },
    getPaoTuiPath: function() {
        var e = this.store.getState(), r = e.recipient, t = r.longitude, n = r.latitude, a = e.wx, o = a.longitude, i = a.latitude, s = e.user, u = s.token, c = s.user_id;
        return "/pages/orderList/orderList?channel=wx_wmorderlist_miniPrograms&lng=" + (t || o) + "&lat=" + (n || i) + "&cityname=" + B + "&mtuserid=" + c + "&token=" + u;
    }
};

(0, n.page)(s(M, v(), i, P, o, q));