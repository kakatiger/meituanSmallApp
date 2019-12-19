function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new n(function(e, a) {
            return function r(i, o) {
                try {
                    var s = t[i](o), c = s.value;
                } catch (i) {
                    return void a(i);
                }
                if (!s.done) return n.resolve(c).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(c);
            }("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), a = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
    return e;
}, r = require("../../npm/@dp/owl-wxapp/es6/index.js"), i = require("../../actions/cart.js"), o = require("../../actions/buy-together.js"), n = require("../../npm/promise-polyfill/promise.js"), s = require("../../utils/promise-try.js"), c = require("../../api/analytics.js").event, d = require("../../activity/share-coupon/index.js"), u = require("../../api/index.js"), l = u.pay, p = u.curStatus, _ = u.orderDetail, h = u.orderPindanDetail, f = u.orderStatus, w = u.orderPindanStatus, v = u.orderCancel, m = u.orderConfirmReceive, g = u.orderHistoryStatus, x = u.cancelRefundComplaints, b = u.getMyAccount, k = u.partnerCancel, y = require("../../utils/mtpay.js"), S = y.mtpay, C = y.isMtpay, D = require("../../utils/wx.js").storage.getItem, P = require("../../api/wx.js").getUserInfo, M = require("../../api/activity-api.js").request, I = require("../../components/privacy_protection/privacy_protection.js"), T = require("../../components/buy-again/buy-again.js"), O = require("../../constants.js").CONTACT_PHONE, R = require("../../utils/format-price.js"), U = require("../../utils/fix-price.js"), q = require("../../utils/mix.js"), F = require("./log.js"), j = require("../../weapp-redux/index.js").connect, B = require("../../api/wx.js"), H = B.makePhoneCall, N = B.navigateTo, V = B.requestPayment, A = require("../../utils/wait.js"), E = require("../../utils/format-time.js"), L = require("../../utils/order-status-bottom.js"), W = require("../../utils/image-scale.js"), G = require("../base.js"), Q = {
    pageName: "order-info",
    data: {
        currentPanel: "status",
        statusData: {},
        statusStreamDetail: {},
        detailOrderInfo: {},
        foodListCopy: [],
        foodToggleWord: "展开更多",
        moreFoodImgClass: "",
        reminderToastHidden: !0,
        activeIcon: "",
        activeIndex: 0,
        modalHidden: !0,
        showMoreButton: !1,
        btns: [],
        orderHistoryStatus: [],
        status_bottom_text: "",
        status_bottom_text_strong: "",
        showMap: 0,
        mapdata: {},
        status_operate_area: null,
        rider_operate_area: null,
        refund_area: null,
        poi_coupon: {},
        resultModalShown: !1,
        historyShow: !1,
        canUseClipbord: !!wx.setClipboardData,
        expected_arrival_time: "",
        disableReload: !1,
        operator_countdown_time: "",
        countDownTimer: null,
        activitySwitch: !1,
        ifFirstGiftEntry: !0,
        share_coupon_pop: !1,
        share_switch: !1,
        share_tip: {},
        self_delivery_area: null,
        formatted_delivery_time: "",
        view_id: "",
        pindanTemplateType: !1,
        isInSharing: !1,
        isPindanParticipant: !1,
        isNormOrder: !0
    },
    isNormOrder: !0,
    phone_list: [],
    id: "",
    mapSwtich: 0,
    swiperTo: -1,
    pageScrollY: 0,
    mapHeight: -1,
    isHide: !1,
    getMapHeight: function() {
        var e = this;
        wx.canIUse && wx.canIUse("createSelectorQuery") && wx.createSelectorQuery().select("#map").fields({
            size: !0
        }, function(t) {
            e.mapHeight = t.height;
        }).exec();
    },
    onClick_pay: function(r) {
        var i = this, o = r.detail, n = o.x, s = o.y;
        return e(t.default.mark(function e() {
            var r, o, c, d;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return i.loading(!0), e.prev = 1, e.next = 4, l({
                        wm_order_id_view: i.view_id,
                        touchPoint: n + "," + s
                    });

                  case 4:
                    if (r = e.sent, i.loading(!1), C(r)) return e.next = 9, S(a({}, r, {
                        pay_success_url: "/pages/order-info/order-info?view_id=" + i.view_id + "&share_coupon_pop=" + (i.data.share_coupon_pop || !1) + "&clearPindanCart=1" || ""
                    }));
                    e.next = 10;
                    break;

                  case 9:
                    return e.abrupt("return");

                  case 10:
                    return e.next = 12, V(r);

                  case 12:
                    o = getApp().store.getState(), c = o.poi.id, i.clearMyCartInSharing({
                        poiID: c
                    }), i.clearFood({
                        poiID: c
                    }), i.reload(), i.alert({
                        message: "支付成功"
                    }), e.next = 25;
                    break;

                  case 19:
                    e.prev = 19, e.t0 = e.catch(1), e.t0.code, d = e.t0.message, i.loading(!1), i.alert({
                        message: d
                    });

                  case 25:
                  case "end":
                    return e.stop();
                }
            }, e, i, [ [ 1, 19 ] ]);
        }))();
    },
    onClick_cancelrefund: function() {
        var a = this;
        return e(t.default.mark(function r() {
            return t.default.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    a.confirm({
                        message: "取消退款后，当前退款流程将结束，确定取消退款吗？",
                        ok: function() {
                            var r = e(t.default.mark(function e() {
                                var r;
                                return t.default.wrap(function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                      case 0:
                                        return a.loading(!0), e.prev = 1, e.next = 4, x({
                                            hash_id: a.view_id
                                        });

                                      case 4:
                                        return a.loading(!1), e.next = 7, a.reload();

                                      case 7:
                                        1 === a.data.showMap && a.setData({
                                            showMap: 0,
                                            disableReload: !0
                                        }), a.alert({
                                            message: "取消退款成功",
                                            ok: function() {
                                                a.setData({
                                                    showMap: a.mapSwtich,
                                                    disableReload: !1
                                                }), a.lxMapView(a.mapSwtich);
                                            }
                                        }), e.next = 16;
                                        break;

                                      case 11:
                                        e.prev = 11, e.t0 = e.catch(1), r = e.t0.message, a.loading(!1), a.alert({
                                            message: r
                                        });

                                      case 16:
                                      case "end":
                                        return e.stop();
                                    }
                                }, e, a, [ [ 1, 11 ] ]);
                            }));
                            return function() {
                                return r.apply(this, arguments);
                            };
                        }()
                    });

                  case 1:
                  case "end":
                    return r.stop();
                }
            }, r, a);
        }))();
    },
    onClick_comment: function() {
        wx.navigateTo({
            url: "../poi-comment/poi-comment?poi_id=" + this.data.detailOrderInfo.wm_poi_id + "&hash_id=" + this.view_id + "&from=order-info"
        });
    },
    onClick_confirm: function() {
        var a, r = this;
        1 === this.data.showMap && this.setData({
            showMap: 0,
            disableReload: !0
        }), this.confirm({
            message: "确认商品已送达？",
            ok: (a = e(t.default.mark(function e() {
                var a, i, o, n;
                return t.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return r.setData({
                            showMap: r.mapSwtich,
                            disableReload: !1
                        }), r.lxMapView(r.mapSwtich), r.loading(!0), e.prev = 3, e.next = 6, m({
                            hash_id: r.view_id
                        });

                      case 6:
                        a = e.sent, i = a.lottery_tip, o = a.poi_coupon, r.loading(!1), r.reload(), i ? r.alert({
                            message: i
                        }) : o ? r.showModal({
                            poi_coupon: o
                        }) : r.toast({
                            message: "订单已完成，快去评价吧"
                        }), e.next = 18;
                        break;

                      case 13:
                        e.prev = 13, e.t0 = e.catch(3), n = e.t0.message, r.loading(!1), r.alert({
                            message: n
                        });

                      case 18:
                      case "end":
                        return e.stop();
                    }
                }, e, r, [ [ 3, 13 ] ]);
            })), function() {
                return a.apply(this, arguments);
            }),
            cancel: function() {
                r.setData({
                    showMap: r.mapSwtich,
                    disableReload: !1
                }), r.lxMapView(r.mapSwtich);
            }
        });
    },
    showModal: function(e) {
        var t = e.poi_coupon;
        this.setData({
            poi_coupon: t,
            resultModalShown: !0
        });
    },
    confirmReultModal: function() {
        this.setData({
            poi_coupon: {},
            resultModalShown: !1
        });
    },
    cancelOrder: function() {
        var a = this;
        return e(t.default.mark(function r() {
            var i, o, n, s;
            return t.default.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    return a.loading(!0), r.prev = 1, r.next = 4, v({
                        hash_id: a.view_id
                    });

                  case 4:
                    a.loading(!1), a.reload(), 1 === a.data.showMap && a.setData({
                        showMap: 0,
                        disableReload: !0
                    }), a.alert({
                        message: "取消成功",
                        ok: function() {
                            a.setData({
                                showMap: a.mapSwtich,
                                disableReload: !1
                            }), a.lxMapView(a.mapSwtich);
                        }
                    }), r.next = 18;
                    break;

                  case 10:
                    r.prev = 10, r.t0 = r.catch(1), i = r.t0.message, o = r.t0.msg, n = r.t0.data, a.loading(!1), 
                    (s = n && n.poi_phone || "") ? (1 === a.data.showMap && a.setData({
                        showMap: 0,
                        disableReload: !0
                    }), a.confirm({
                        message: n.failure_descriptiom,
                        ok: function() {
                            var r = e(t.default.mark(function e() {
                                return t.default.wrap(function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                      case 0:
                                        if (e.prev = 0, a.lxMapView(a.mapSwtich), !a.data.privacy.usingPrivacy) {
                                            e.next = 7;
                                            break;
                                        }
                                        a.fetchPrivacy("SHOPPER"), e.next = 10;
                                        break;

                                      case 7:
                                        return a.setData({
                                            showMap: a.mapSwtich,
                                            disableReload: !1
                                        }), e.next = 10, H({
                                            phoneNumber: s
                                        });

                                      case 10:
                                        e.next = 16;
                                        break;

                                      case 12:
                                        e.prev = 12, e.t0 = e.catch(0), a.setData({
                                            showMap: 0
                                        }), a.alert({
                                            message: "请拨打商家电话：" + s,
                                            ok: function() {
                                                a.setData({
                                                    showMap: a.mapSwtich,
                                                    disableReload: !1
                                                }), a.lxMapView(a.mapSwtich);
                                            }
                                        });

                                      case 16:
                                      case "end":
                                        return e.stop();
                                    }
                                }, e, a, [ [ 0, 12 ] ]);
                            }));
                            return function() {
                                return r.apply(this, arguments);
                            };
                        }(),
                        cancel: function() {
                            a.setData({
                                showMap: a.mapSwtich,
                                disableReload: !1
                            }), a.lxMapView(a.mapSwtich);
                        },
                        textOK: "联系商家",
                        textCancel: "再等等"
                    })) : a.alert({
                        message: i || o
                    });

                  case 18:
                  case "end":
                    return r.stop();
                }
            }, r, a, [ [ 1, 10 ] ]);
        }))();
    },
    onClick_cancel: function() {
        var e = this, t = this.data.statusData.pay_status, a = 0 === t ? "确定取消订单" : "取消订单后，款项将原路退回到您的支付账户;详情请查看退款进度", r = 0 === t ? "" : "取消订单并退款";
        1 === this.data.showMap && this.setData({
            showMap: 0,
            disableReload: !0
        }), this.confirm({
            title: r,
            message: a,
            textOK: "取消订单",
            textCancel: "先等等",
            ok: function() {
                e.setData({
                    showMap: e.mapSwtich,
                    disableReload: !1
                }), e.lxMapView(e.mapSwtich), e.cancelOrder();
            },
            cancel: function() {
                e.setData({
                    showMap: e.mapSwtich,
                    disableReload: !1
                }), e.lxMapView(e.mapSwtich);
            }
        });
    },
    onClick_appeal: function() {
        var e = this;
        1 === this.data.showMap && this.setData({
            showMap: 0,
            disableReload: !0
        }), this.confirm({
            title: "建议联系商家",
            message: "提前联系商家可以提高退款效率哦",
            textOK: "联系商家",
            textCancel: "申请退款",
            showCloseButton: !0,
            ok: function() {
                e.lxMapView(e.mapSwtich), e.data.privacy.usingPrivacy ? e.fetchPrivacy("SHOPPER") : (e.setData({
                    showMap: e.mapSwtich,
                    disableReload: !1
                }), e.onClickContactPoi());
            },
            cancel: function() {
                e.setData({
                    showMap: e.mapSwtich,
                    disableReload: !1
                }), e.lxMapView(e.mapSwtich), wx.navigateTo({
                    url: "../refund-apply/refund-apply?view_id=" + e.view_id
                });
            }
        });
    },
    onClick_refund_process: function() {
        wx.navigateTo({
            url: "../refund-progress/refund-progress?view_id=" + this.view_id + "&from=order-info"
        });
    },
    onClickPhoneCall: function() {
        for (var e = this.phone_list, t = e.length, a = [], r = [], i = 0; i < t; ++i) {
            var o = e[i], n = o.phone, s = o.title;
            a.push(n), r.push(s + "：" + n);
        }
        a.push(O), r.push("客服电话：" + O), this.showPhoneCall({
            phones: a,
            texts: r
        });
    },
    onClickContact: function(e) {
        var t = e.currentTarget.dataset.phone;
        this.data.privacy.usingPrivacy ? this.fetchPrivacy("RUNNER") : this.showPhoneCall({
            phones: [ t ],
            texts: [ "骑手电话：" + t ]
        });
    },
    onClickContactPoi: function() {
        var e = this.data.privacy.usingPrivacy, t = [];
        for (var a in this.data.detailOrderInfo.phone_list) t.push(this.data.detailOrderInfo.phone_list[a].phone);
        var r = t.map(function(e) {
            return "商家电话：" + e;
        });
        e ? this.fetchPrivacy("SHOPPER") : this.showPhoneCall({
            phones: t,
            texts: r
        });
    },
    onClickStatusText: function(e) {
        var t = e.currentTarget.dataset, a = t.action, r = t.val;
        if ("refund-detail" === a) {
            var i = this.view_id;
            N({
                url: "../refund-detail/refund-detail?hash_id=" + i + "&refund_no=" + r
            });
        } else "call" === a && this.showPhoneCall({
            phones: [ r ],
            texts: [ "拨打电话：" + r ]
        });
    },
    copyFoodList: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1];
        return e = 0 < t ? e.slice(0, t) : e;
    },
    onClickFoodToggle: function() {
        var e = this.data, t = e.detailOrderInfo.foodlist, a = e.foodListCopy, r = t.length > a.length;
        r || wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        }), this.setData({
            foodToggleWord: r ? "点击收起" : "展示更多",
            moreFoodImgClass: r ? "trans" : ""
        });
        var i = this.copyFoodList(t, r ? -1 : 3);
        this.setData({
            foodListCopy: i
        });
    },
    onClickShop: function() {
        this.lxOrderShopClick(), this.view_id && (this.checkIfNeedClearPindanCart(!0), wx.navigateTo({
            url: "/pages/restaurant/restaurant?poi_id=" + this.data.detailOrderInfo.wm_poi_id + "&from=order_info"
        }));
    },
    onClickFoodToShop: function(e) {
        var t = e.detail.spuid;
        this.lxOrderFoodListClick(), wx.navigateTo({
            url: "/pages/restaurant/restaurant?poi_id=" + this.data.detailOrderInfo.wm_poi_id + "&spu_id=" + t + "&from=order_info"
        });
    },
    resolveDetailFoodlist: function(e) {
        for (var t = e.length - 1; -1 < t; --t) {
            var a = e[t], r = a.original_price, i = a.count, o = a.icon_url, n = a.spec, s = a.attrs, c = a.picture;
            a.icon_url = W(o, 32), a.picture = W(c), a._sub_original_price = R(Math.round(100 * r) * i);
            var d = [];
            n && d.push(n), 0 < s.length && (d = d.concat(s.map(function(e) {
                return e.value;
            }))), a.attrInfo = d;
        }
    },
    loadOrderDetail: function() {
        var r = this, i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        return e(t.default.mark(function e() {
            var o, n, s, c, d, u, l, p, f, w, v, m, g, x, b, k, y, S, C, D, P, M, I, T, O, q, F;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (r.data.detailOrderInfo.id) return e.abrupt("return");
                    e.next = 3;
                    break;

                  case 3:
                    if (r.loading(!0), o = r.view_id, n = r.shop_cart_id, s = r.sponsor_user_id, c = r.current_open_id, 
                    d = r.patch_order_role, u = r.wm_poi_id, l = r.isNormOrder, p = i.order_pay_status, 
                    f = void 0 === p ? "" : p, w = i.shop_cart_status, v = void 0 === w ? "" : w, e.prev = 6, 
                    l) return e.next = 10, _({
                        id: o
                    });
                    e.next = 13;
                    break;

                  case 10:
                    e.t0 = e.sent, e.next = 16;
                    break;

                  case 13:
                    return e.next = 15, h({
                        order_view_id: o,
                        patch_order_role: d || 0,
                        order_pay_status: f,
                        shop_cart_status: v,
                        wm_poi_id: u,
                        shop_cart_id: n,
                        sponsor_user_id: s,
                        current_open_id: c
                    });

                  case 15:
                    e.t0 = e.sent;

                  case 16:
                    for ((m = e.t0).poi_icon = W(m.poi_icon, 36), g = m.discounts, x = m.foodlist, b = void 0 === x ? [] : x, 
                    k = m.order_type_template, y = m.food_group, S = g.length - 1; -1 < S; --S) (C = g[S]).icon_url = W(C.icon_url, 0, 0, "o");
                    r.isPindanType(k) ? y.forEach(function(e) {
                        r.resolveDetailFoodlist(e.foodlist || []);
                    }) : r.resolveDetailFoodlist(b), m._order_time = E(m.order_time), r.setData({
                        phone_list: m.phone_list
                    }), r.phone_list = m.phone_list, r.wm_poi_id = m.wm_poi_id, r.lxOrderShopView(), 
                    D = m.original_price, P = m.total, M = m.box_total_price, I = m.shipping_fee, T = Math.round(100 * D) - Math.round(100 * P), 
                    m._discountPrice = 0 < T ? R(T) : "", m.id = o, m._box_total_price = U(M || 0), 
                    m._shipping_fee = U(I || 0), m._total = U(P || 0), O = r.copyFoodList(b, 3), r.setData({
                        detailOrderInfo: a({}, m, {
                            idTrim: (String(m.id) || "").replace(/\s/g, "").replace(/(.{4})/g, "$1 ")
                        }),
                        foodListCopy: O
                    }), e.next = 42;
                    break;

                  case 37:
                    e.prev = 37, e.t1 = e.catch(6), q = e.t1.code, F = e.t1.message, q && 0 !== q ? r.alert({
                        message: F
                    }) : r.alert({
                        message: "网络服务异常，请稍后再试~"
                    });

                  case 42:
                    r.loading(!1);

                  case 43:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 6, 37 ] ]);
        }))();
    },
    statusBottomTo: 0,
    renderStatusBottom: function(a) {
        var r = this;
        return e(t.default.mark(function e() {
            var i, o, n, s, c, d, u, l, p, _, h, f, w;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    i = r.statusBottomTo + 1, r.statusBottomTo = i, o = Date.now();

                  case 3:
                    if (i !== r.statusBottomTo || r.pageUnloaded) return e.abrupt("return");
                    e.next = 6;
                    break;

                  case 6:
                    if (n = {
                        status_bottom_text: "",
                        status_bottom_text_strong: ""
                    }, "status" !== r.data.currentPanel) return r.setData(n), e.abrupt("return");
                    e.next = 11;
                    break;

                  case 11:
                    if (s = Date.now(), c = L(a, {
                        start: o,
                        now: s
                    })) {
                        e.next = 16;
                        break;
                    }
                    return r.setData(n), e.abrupt("return");

                  case 16:
                    if (d = c.text, u = void 0 === d ? "" : d, l = c.strong, p = void 0 === l ? "" : l, 
                    _ = c.shouldCallLater, h = void 0 !== _ && _, f = c.shouldReload, w = void 0 !== f && f, 
                    n.status_bottom_text = u, n.status_bottom_text_strong = p, r.setData(n), w) return r.reload(), 
                    e.abrupt("return");
                    e.next = 23;
                    break;

                  case 23:
                    if (h) {
                        e.next = 25;
                        break;
                    }
                    return e.abrupt("return");

                  case 25:
                    return e.next = 27, A(1e3);

                  case 27:
                    e.next = 3;
                    break;

                  case 29:
                  case "end":
                    return e.stop();
                }
            }, e, r);
        }))();
    },
    loadHistoryStatus: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var r, i;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (a.data.isPindanParticipant) return e.abrupt("return");
                    e.next = 2;
                    break;

                  case 2:
                    return a.loading(!0), e.prev = 3, 1 === a.data.showMap && a.setData({
                        showMap: 0,
                        disableReload: !0
                    }), e.next = 7, g({
                        order_view_id: a.view_id
                    });

                  case 7:
                    r = e.sent, a.setData({
                        orderHistoryStatus: r.status_list,
                        historyShow: !0
                    }), e.next = 15;
                    break;

                  case 11:
                    e.prev = 11, e.t0 = e.catch(3), i = e.t0.message, a.alert({
                        message: i,
                        ok: function() {
                            a.setData({
                                showMap: a.mapSwtich,
                                disableReload: !1
                            });
                        }
                    });

                  case 15:
                    a.loading(!1);

                  case 16:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 3, 11 ] ]);
        }))();
    },
    loadOrderStatus: function(r) {
        var i = this, o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        return e(t.default.mark(function e() {
            var n, s, c, d, u, l, p, _, h, v, m, g, x, b, k, y, S, C, D, P, M;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (o.showLoading && i.loading(!0), e.prev = 1, n = i.view_id, s = i.shop_cart_id, 
                    c = i.sponsor_user_id, d = i.current_open_id, u = i.patch_order_role, l = i.isNormOrder, 
                    p = i.is_share_bill_url, l) return e.next = 6, f({
                        order_view_id: n
                    });
                    e.next = 9;
                    break;

                  case 6:
                    e.t0 = e.sent, e.next = 12;
                    break;

                  case 9:
                    return e.next = 11, w({
                        is_share_bill_url: p || 0,
                        order_view_id: n,
                        patch_order_role: u,
                        shop_cart_id: s,
                        sponsor_user_id: c,
                        current_open_id: d
                    });

                  case 11:
                    e.t0 = e.sent;

                  case 12:
                    return _ = e.t0, h = _.service_page_url, v = void 0 === h ? "" : h, i.checkPindanRole && i.checkPindanRole(_.patch_order_role, o), 
                    m = _.use_privacy, g = (g = new Date(1e3 * _.delivery_time).getMinutes()) < 10 ? "0" + g : g, 
                    x = new Date(1e3 * _.delivery_time).getHours() + ":" + g, _.status_operate_area.delivery_time = x, 
                    3 === _.status_operate_area.operator_time_type ? (b = _.status_operate_area.operator_time / 60, 
                    k = "", 60 < b ? (k += Math.floor(b / 60) + "小时", k += b % 60 == 0 ? "" : parseInt(b % 60, 10) + "分钟") : k = parseInt(_.status_operate_area.operator_time / 60, 10) + "分钟", 
                    _.status_operate_area.snd_desc = _.status_operate_area.snd_desc.replace(/\{\}/g, "" + k)) : (i.setData({
                        operator_countdown_time: i.countDownTime(_.status_operate_area.operator_time)
                    }), y = function e(t) {
                        i.data.status_operate_area.operator_time <= 0 ? t && i.reload() : (i.data.status_operate_area.operator_time = i.data.status_operate_area.operator_time - 1, 
                        i.setData({
                            operator_countdown_time: i.countDownTime(i.data.status_operate_area.operator_time)
                        }), i.countDownTimer = setTimeout(function() {
                            e(!0);
                        }, 1e3));
                    }, i.countDownTimer = setTimeout(function() {
                        y();
                    }, 1e3)), 3 < (S = _.status_operate_area.button_list).length && (_.status_operate_area.show_button_list = S.slice(0, 2), 
                    _.status_operate_area.more_button_list = S.slice(2, S.length)), S.forEach(function(e) {
                        2015 === e.code && i.lxShareBillView();
                    }), C = r ? i.data.showMap : _.emotion_area.show_map_flag, i.setData({
                        self_delivery_area: 0 != !!_.self_delivery_area && _.self_delivery_area,
                        formatted_delivery_time: _.formatted_delivery_time,
                        order_type_template: !!_.order_type_template,
                        share_bill_info: _.share_bill_info || {},
                        status_operate_area: _.status_operate_area,
                        patch_order_stream: (_.status_operate_area || {}).patch_order_stream || [],
                        rider_operate_area: _.rider_operate_area ? _.rider_operate_area : null,
                        refund_area: _.refund_area ? _.refund_area : null,
                        showMap: C,
                        expected_arrival_time: _.expected_arrival_time,
                        statusData: {
                            order_status: _.order_status,
                            pay_status: _.pay_status
                        },
                        privacy: a({}, i.data.privacy, {
                            usingPrivacy: m
                        }),
                        service_page_url: v
                    }), i.mapSwtich = _.emotion_area.show_map_flag, i.setMapData(_.emotion_area, _.status_operate_area), 
                    i.mapSwtich && setTimeout(function() {
                        i.getMapHeight();
                    }, 0), e.abrupt("return", _);

                  case 32:
                    if (e.prev = 32, e.t1 = e.catch(1), D = e.t1.code, P = e.t1.message, i.loading(!1), 
                    !D || 0 === D) {
                        e.next = 53;
                        break;
                    }
                    if (M = 40, 30 === D) return i.toast({
                        message: P
                    }), setTimeout(function() {
                        return wx.navigateBack({
                            delta: 1
                        });
                    }, 3e3), e.abrupt("return", !1);
                    e.next = 46;
                    break;

                  case 46:
                    if (D === M) return i.toast({
                        message: P
                    }), setTimeout(function() {
                        wx.switchTab({
                            url: "/pages/index/index"
                        });
                    }, 3e3), e.abrupt("return", !1);
                    e.next = 50;
                    break;

                  case 50:
                    i.alert({
                        message: P
                    }), e.next = 54;
                    break;

                  case 53:
                    i.alert({
                        message: "网络服务异常，请稍后再试~"
                    });

                  case 54:
                    return e.abrupt("return", {});

                  case 55:
                  case "end":
                    return e.stop();
                }
            }, e, i, [ [ 1, 32 ] ]);
        }))();
    },
    isPindanType: function(e) {
        var t = 3 === e;
        return this.setData({
            pindanTemplateType: t
        }), t;
    },
    countDownTime: function(e) {
        var t = "";
        t += Math.floor(e / 60) + ":";
        var a = e % 60;
        return a < 10 && (a = "0" + a), t += a;
    },
    click_operate_area_button: function(e) {
        var t = e.currentTarget.dataset.code;
        if (1001 === t && this.data.detailOrderInfo) this.lxOneMoreAgainClick(), this.onClickBuyAgain({
            currentTarget: {
                dataset: {
                    id: this.view_id,
                    poi: this.data.detailOrderInfo.wm_poi_id
                }
            }
        }); else if (2001 === t) {
            var a = getApp().store.getState().poi.id;
            this.clearFood({
                poiID: a
            }), this.onClick_pay(e);
        } else 2002 === t ? this.onClick_cancel() : 2003 === t ? this.onClick_appeal() : 2005 === t ? this.onClick_confirm() : 2007 === t ? this.onClick_cancelrefund() : 2009 === t ? this.onClick_appeal() : 2010 === t ? this.onClick_comment() : 2012 === t ? wx.switchTab({
            url: "/pages/index/index"
        }) : 2019 === t ? wx.navigateTo({
            url: "/pages/refund-apply/refund-apply?view_id=" + this.view_id
        }) : 2015 === t && this.lxShareBillClick();
    },
    onClickSearchMap: function() {
        if (this.lxSelfpickSearchMapClick(), this.data.self_delivery_area) {
            var e = this.data.self_delivery_area, t = e.poi_latitude, a = e.poi_longitude, r = e.poi_name, i = e.poi_address;
            wx.openLocation({
                latitude: t / Math.pow(10, 6),
                longitude: a / Math.pow(10, 6),
                name: r,
                address: i
            });
        }
    },
    onClickHistory: function() {
        this.setData({
            historyShow: !1
        }), this.setData({
            showMap: this.mapSwtich,
            disableReload: !1
        }), this.lxMapView(this.mapSwtich);
    },
    clickMoreButton: function() {
        this.setData({
            showMoreButton: !this.data.showMoreButton
        });
    },
    onClickCopyViewID: function(e) {
        var t = this, a = e.currentTarget.dataset.id, r = !0;
        wx.getSystemInfo({
            success: function(e) {
                var i = e.SDKVersion.split(".");
                i[0] && "1" === i[0] && (r = !1), wx.setClipboardData({
                    data: a,
                    success: function() {
                        r || t.toast({
                            message: "订单号码已复制"
                        });
                    },
                    fail: function() {
                        r || t.toast({
                            message: "订单号码复制失败"
                        });
                    }
                });
            }
        });
    },
    setMapData: function(e, t) {
        var a = [];
        if (0 !== e.poi_latitude && ("" !== t.operator_tip ? a.push({
            iconPath: "../../img/icons/default_shop.png",
            width: 40,
            height: 53,
            longitude: e.poi_longitude / 1e6,
            latitude: e.poi_latitude / 1e6,
            callout: {
                content: t.operator_tip,
                fontSize: 12,
                bgColor: "#FFFFFF",
                color: "#333333",
                display: "ALWAYS",
                padding: 15,
                borderRadius: 53
            }
        }) : a.push({
            iconPath: "../../img/icons/default_shop.png",
            width: 40,
            height: 53,
            longitude: e.poi_longitude / 1e6,
            latitude: e.poi_latitude / 1e6
        })), 0 !== e.rider_latitude) {
            var r = e.rider_msg;
            "" !== e.rider_arrive_time && (r += " | " + e.rider_arrive_time), a.push({
                iconPath: "../../img/icons/meituan_rider.png",
                width: 60,
                height: 75,
                longitude: e.rider_longitude / 1e6,
                latitude: e.rider_latitude / 1e6,
                callout: {
                    content: r,
                    fontSize: 12,
                    bgColor: "#FFFFFF",
                    color: "#333333",
                    display: "ALWAYS",
                    padding: 15,
                    borderRadius: 75
                }
            });
        }
        0 !== e.user_latitude && a.push({
            iconPath: "../../img/icons/map-user.png",
            width: 50,
            height: 60,
            longitude: e.user_longitude / 1e6,
            latitude: e.user_latitude / 1e6
        });
        var i = {};
        1 === a.length ? i = {
            longitude: a[0].longitude,
            latitude: a[0].latitude,
            scale: 15,
            markers: a
        } : 2 <= a.length && (i = {
            longitude: (a[0].longitude + a[1].longitude) / 2,
            latitude: (a[0].latitude + a[1].latitude) / 2,
            scale: 12,
            markers: a
        }), this.setData({
            mapdata: i
        });
    },
    loadActivitySwitch: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var r, i, o, n, s, d, u, l, p, _, h, f;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, 3 !== a.data.statusData.pay_status) return e.abrupt("return");
                    e.next = 4;
                    break;

                  case 4:
                    return r = getApp().store.getState(), i = r.user, o = i.user_id, n = i.open_id, 
                    a.user_id = o, a.open_id = n, e.next = 9, M({
                        url: "activity/gold/switch",
                        method: "GET",
                        data: {
                            userId: a.user_id,
                            orderId: a.view_id,
                            entrance: a.data.share_coupon_pop ? 0 : 1
                        }
                    });

                  case 9:
                    s = e.sent, d = s.activitySwitch, u = s.windowStatus, l = s.buttonContext, p = s.descContext, 
                    _ = s.popupIconUrl, h = s.tipIconUrl, f = s.nextUrl, a._activitySwitch = d, a._windowStatus = u, 
                    a._buttonContext = l, a._descContext = p, a._popupIconUrl = _, a._tipIconUrl = h, 
                    a._nextUrl = f, d && c({
                        event_type: "view",
                        val_bid: "b_4e6fo7lx",
                        val_lab: {
                            custom: {
                                order_id: a.view_id
                            }
                        }
                    }), e.next = 30;
                    break;

                  case 27:
                    e.prev = 27, e.t0 = e.catch(0), e.t0.message;

                  case 30:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 0, 27 ] ]);
        }))();
    },
    onClickGiftEntrance: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var r, i, o, n, s, d, u, l;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return c(a.data.windowStatus ? {
                        event_type: "click",
                        val_bid: "b_5ykk8c95",
                        val_lab: {}
                    } : {
                        event_type: "click",
                        val_bid: "b_q2uqika6",
                        val_lab: {}
                    }), e.next = 3, P();

                  case 3:
                    return r = e.sent, i = r.userInfo, o = getApp().store.getState(), n = o.user.token, 
                    e.next = 8, b({
                        userToken: n
                    });

                  case 8:
                    return s = e.sent, d = s.mobile, u = a, l = void 0, e.prev = 12, e.next = 15, D("UUID");

                  case 15:
                    l = e.sent, e.next = 21;
                    break;

                  case 18:
                    e.prev = 18, e.t0 = e.catch(12), e.t0.message;

                  case 21:
                    wx.navigateTo({
                        url: "/sub_pages/wx-gift-new/wx-gift?orderId=" + u.view_id + "&userId=" + u.user_id + "&nextUrl=" + u._nextUrl + "&username=" + i.nickName + "&avatar=" + i.avatarUrl + "&uuid=" + l + "&openid=" + u.open_id + "&phone=" + d + "&type=0"
                    });

                  case 22:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 12, 18 ] ]);
        }))();
    },
    onClickGiftClose: function() {
        this.setData({
            activitySwitch: !0,
            windowStatus: !1
        });
    },
    onClickMap: function() {
        this.lxMapClick(), getApp().mapdata = this.data.mapdata, wx.navigateTo({
            url: "../order-info/order-info-map"
        });
    },
    isPindanFinished: function(e) {
        return !!e.order_view_id;
    },
    reloadWithOpenid: function() {
        var e = this, t = this.isHide, a = this.current_open_id, r = this.reload, i = this.afterGetOpenIdAction, o = wx.getStorageSync("user").open_id, n = {
            pv: !0
        };
        a || o ? (a || (this.current_open_id = o), r(t, n)) : i ? i(function(a) {
            e.current_open_id = a, r(t, n);
        }) : r(t, n);
    },
    reload: function() {
        var a = this, r = 0 < arguments.length && void 0 !== arguments[0] && arguments[0], i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        return e(t.default.mark(function e() {
            var o;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return a.countDownTimer && clearTimeout(a.countDownTimer), e.next = 3, a.loadOrderStatus(r, i);

                  case 3:
                    if (o = e.sent, !a.checkUserRole || !o.patch_order_role) {
                        e.next = 7;
                        break;
                    }
                    if (a.checkUserRole(o.patch_order_role)) {
                        e.next = 7;
                        break;
                    }
                    return e.abrupt("return");

                  case 7:
                    if (a.view_id || a.isPindanFinished(o) && (a.setViewId(o.order_view_id), a.setData({
                        isInSharing: !1
                    })), !1 === o) return e.abrupt("return");
                    e.next = 10;
                    break;

                  case 10:
                    return e.next = 12, a.loadOrderDetail(o);

                  case 12:
                    if (a.data.isPindanParticipant) {
                        e.next = 17;
                        break;
                    }
                    return e.next = 15, s([ a.loadShareCouponSwitch(), a.loadActivitySwitch() ]);

                  case 15:
                    e.next = 18;
                    break;

                  case 17:
                    wx.hideShareMenu();

                  case 18:
                    a.setData({
                        activitySwitch: a._activitySwitch,
                        windowStatus: a._windowStatus,
                        buttonContext: a._buttonContext || "点击领取",
                        descContext: a._descContext || "赠您一笔奖励金",
                        popupIconUrl: a._popupIconUrl || "http://p0.meituan.net/codeman/2dcc5aa831bb186dd922b434467d31fc60871.png",
                        tipIconUrl: a._tipIconUrl || "http://p1.meituan.net/codeman/3e93fff53f5b86d6d72225c471e72d9018713.png"
                    }), a.setData({
                        share_tip: a._share_tip || "",
                        share_switch: a._share_switch || !1
                    }), a.data.share_coupon_pop && a.data.share_switch && !a.data.activitySwitch ? a.setData({
                        showMap: 0,
                        disableReload: !0
                    }) : a.data.activitySwitch && a.data.windowStatus && a.data.share_coupon_pop && a.setData({
                        showMap: 0,
                        disableReload: !0
                    }), c(a.data.windowStatus ? {
                        event_type: "view",
                        val_bid: "b_rfcf6fbn",
                        val_lab: {}
                    } : {
                        event_type: "view",
                        val_bid: "b_o2t8dykl",
                        val_lab: {}
                    });

                  case 22:
                  case "end":
                    return e.stop();
                }
            }, e, a);
        }))();
    },
    onUnload: function() {
        this.countDownTimer && clearTimeout(this.countDownTimer);
    },
    onPullDownRefresh: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var r;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (a.loading(!0), e.prev = 1, a.data.disableReload) {
                        e.next = 5;
                        break;
                    }
                    return e.next = 5, a.reload();

                  case 5:
                    e.next = 11;
                    break;

                  case 7:
                    e.prev = 7, e.t0 = e.catch(1), r = e.t0.message, a.toast({
                        message: r
                    });

                  case 11:
                    a.loading(!1), wx.stopPullDownRefresh();

                  case 13:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 1, 7 ] ]);
        }))();
    },
    onShow: function() {
        this.reloadWithOpenid(), this.wm_poi_id && (this.lxOrderShopView(), this.updatePrevSourceUrl());
    },
    onHide: function() {
        this.isHide = !0;
    },
    onLoad: function(e) {
        var t = e.view_id, a = void 0 === t ? "" : t, r = e.wm_poi_id, i = void 0 === r ? "" : r, o = e.order_type, n = void 0 === o ? "" : o, s = e.shop_cart_id, c = void 0 === s ? "" : s, d = e.sponsor_user_id, u = void 0 === d ? "" : d, l = e.current_open_id, p = void 0 === l ? "" : l, _ = e.clearPindanCart, h = void 0 === _ ? "" : _, f = e.is_share_bill_url, w = void 0 === f ? 0 : f, v = e.user_role, m = void 0 === v ? "" : v, g = e.patch_order_role, x = void 0 === g ? 0 : g, b = e.share_coupon_pop, k = void 0 !== b && b;
        this.checkPindan(c, a, n), this.setViewId(a), this.is_share_bill_url = w, this.wm_poi_id = i, 
        this.setPatchOrderRole(this.getPatchRole(m, x)), this.order_type = n, this.shop_cart_id = c || "", 
        this.sponsor_user_id = u, this.current_open_id = p, this.updatePrevSourceUrl(), 
        this.checkIfNeedClearPindanCart(h), this.setData({
            share_coupon_pop: k
        });
    },
    afterGetOpenIdAction: function(e) {
        var t = this, a = this;
        getApp().getOpenIdcallbackBound = function(r) {
            r ? e.call(a, r) : t.toast({
                message: "抱歉，您未参与当前拼单，无法查看订单详情",
                showBackdrop: !0,
                backdropClassName: "toast-white-background",
                callback: function() {
                    wx.switchTab({
                        url: "/pages/index/index"
                    });
                }
            });
        };
    },
    checkUserRole: function(e) {
        return 3 === e && this.toast({
            message: "抱歉，您未参与当前拼单，无法查看订单详情",
            showBackdrop: !0,
            backdropClassName: "toast-white-background",
            callback: function() {
                wx.switchTab({
                    url: "/pages/index/index"
                });
            }
        }), 3 !== e;
    },
    onPageScroll: function(e) {
        var t = e.scrollTop;
        this.pageScrollY = t;
    },
    getReportData: function() {
        return {
            cid: "c_hgowsqb",
            val: {
                detail_type: this.isNormOrder ? 0 : 1,
                pindan_role: ""
            }
        };
    },
    checkIfNeedClearPindanCart: function(e) {
        e && (this.delBuyTogetherInfoWithPoiId(this.wm_poi_id), this.clearMyCartInSharing({
            poiID: this.wm_poi_id
        }));
    },
    closeGiftEntrance: function() {
        this.setData({
            ifFirstGiftEntry: !1,
            showMap: this.mapSwtich
        });
    },
    setPatchOrderRole: function(e) {
        this.patch_order_role = e, this.setData({
            isPindanParticipant: 1 === e
        });
    },
    setViewId: function(e, t) {
        t = t || function(e) {
            return e;
        }, this.view_id = e, this.setData({
            view_id: e
        }, t);
    },
    getPatchRole: function(e, t) {
        return e ? [ 0, 0, 1 ][e] : t;
    },
    genPrivacyReqParam: function(e) {
        var t = this.data, a = t.detailOrderInfo, r = t.rider_operate_area, i = a.id, o = a.phone_list, n = a.recipient_phone, s = (r || {}).resources, c = (o || []).map(function(e) {
            return e.phone;
        }), d = [ ((s || [])[0] || {}).target ], u = "SHOPPER" === e ? c : d;
        return {
            order_view_id: i,
            third_party_phone: JSON.stringify(u),
            user_phone: n
        };
    },
    checkPindan: function(e, t, a) {
        var r = "0" !== a && "1" !== a && e && !t, i = "0" === a || t && !e && "1" !== a;
        this.isNormOrder = i, this.setData({
            isInSharing: r,
            isNormOrder: i
        }), i || wx.setNavigationBarTitle({
            title: "好友拼单"
        });
    },
    checkPindanRole: function(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        this.setPatchOrderRole(e), t.pv && this.lxPindanPvView([ 1, 2, 0, 0 ][e] || 0);
    },
    updatePrevSourceUrl: function() {
        this.setPrevSourceUrl("order-info", this.wm_poi_id);
    },
    isSubmitted: function() {
        var e = this.data.statusData;
        return 4 === e.order_status || 6 === e.order_status;
    },
    onClickQuitPindan: function() {
        var a, r = this, i = this.shop_cart_id, o = this.sponsor_user_id, n = this.current_open_id, s = this.wm_poi_id;
        this.confirm({
            message: "是否退出拼单？",
            ok: (a = e(t.default.mark(function e() {
                var a, c;
                return t.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (e.prev = 0, "function" == typeof k) return e.next = 4, k({
                            multiple_cart_id: i,
                            sponsor_user_id: o,
                            partner_open_id: n
                        });
                        e.next = 4;
                        break;

                      case 4:
                        r.lxQuitPindanClick(), r.clearMyCartInSharing({
                            poiID: s
                        }), r.setQuitStatus(s, !0), wx.navigateBack({
                            delta: 1
                        }), e.next = 15;
                        break;

                      case 10:
                        e.prev = 10, e.t0 = e.catch(0), a = e.t0.code, c = e.t0.message, a && r.toast({
                            message: c,
                            callback: function() {
                                1 === a && r.reload();
                            }
                        }), console.log(e.t0);

                      case 15:
                      case "end":
                        return e.stop();
                    }
                }, e, r, [ [ 0, 10 ] ]);
            })), function() {
                return a.apply(this, arguments);
            }),
            cancel: function() {},
            textOK: "确认",
            textCancel: "取消"
        });
    },
    onClickModifyPindan: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var r, i, o, n, s, c, d, u, l, _;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return r = a.sponsor_user_id, i = a.shop_cart_id, o = a.wm_poi_id, a.lxModifyPindanClick(), 
                    e.prev = 2, n = {
                        sponsor_user_id: r,
                        multiple_cart_id: i,
                        wm_poi_id: o
                    }, e.next = 6, p(n);

                  case 6:
                    s = e.sent, d = (c = s || {}).cart_status, u = c.expired, l = {
                        10: "拼单已锁定，无法修改商品",
                        20: "订单已提交，无法修改",
                        30: "好友已取消本次拼单"
                    }, 0 < d || u ? u ? a.toast({
                        message: "当前拼单已关闭"
                    }) : (_ = l[d]) ? a.alert({
                        message: _,
                        textOK: "确定",
                        ok: function() {
                            a.reload();
                        }
                    }) : a.reload() : 1 === getCurrentPages().length ? wx.navigateTo({
                        url: "/pages/restaurant/restaurant?poi_id=" + a.data.detailOrderInfo.wm_poi_id + "&from=order_info"
                    }) : wx.navigateBack({
                        delta: 1
                    }), e.next = 16;
                    break;

                  case 13:
                    e.prev = 13, e.t0 = e.catch(2), console.log(e.t0);

                  case 16:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 2, 13 ] ]);
        }))();
    },
    onClickCustomerService: function() {
        var e = this.data.service_page_url;
        wx.navigateTo({
            url: "../web-view/web-view?type=DIRECT&redirectUrl=" + encodeURIComponent(e)
        });
    }
};

(0, r.page)(q(Q, d, T, j(function(e) {
    return {
        poi_id: e.poi.id
    };
}, function(e) {
    return {
        clearFood: function(t) {
            e((0, i.clear)(t));
        },
        clearMyCartInSharing: function(t) {
            i.clearMyCartInSharing && e((0, i.clearMyCartInSharing)(t));
        },
        setPrevSourceUrl: function(t, a) {
            "function" == typeof o.setPrevSourceUrl && e((0, o.setPrevSourceUrl)({
                prevSourceUrl: t,
                id: a
            }));
        },
        setQuitStatus: function(t, a) {
            "function" == typeof o.setQuitStatus && e((0, o.setQuitStatus)({
                id: t,
                quit: a
            }));
        },
        delBuyTogetherInfoWithPoiId: function(t) {
            "function" == typeof o.delBuyTogetherInfoWithPoiId && e((0, o.delBuyTogetherInfoWithPoiId)({
                id: t
            }));
        }
    };
}), G, F, I));