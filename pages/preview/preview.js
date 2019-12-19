function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new g(function(e, i) {
            return function a(n, r) {
                try {
                    var o = t[n](r), s = o.value;
                } catch (n) {
                    return void i(n);
                }
                if (!o.done) return g.resolve(s).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(s);
            }("next");
        });
    };
}

function t(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

var i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), a = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a]);
    }
    return e;
}, n = function(e, t) {
    if (Array.isArray(e)) return e;
    if (Symbol.iterator in Object(e)) return function(e, t) {
        var i = [], a = !0, n = !1, r = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), 
            !t || i.length !== t); a = !0) ;
        } catch (e) {
            n = !0, r = e;
        } finally {
            try {
                !a && s.return && s.return();
            } finally {
                if (n) throw r;
            }
        }
        return i;
    }(e, t);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, r = require("../../npm/@dp/owl-wxapp/es6/index.js"), o = require("../../actions/addr-edit.js"), s = require("../../actions/purchase.js"), d = require("../../actions/cart.js"), c = require("../../actions/buy-together.js"), u = require("../../constants.js"), p = u.ACTION_CLICK, l = u.P_SUBMIT_ORDER, _ = u.P_ORDERDETAIL, f = u.B_ORDERSTATUS, h = u.B_SUBMIT, g = require("../../npm/promise-polyfill/promise.js"), v = require("../../utils/mtpay.js"), m = v.mtpay, y = v.isMtpay, w = require("../../utils/format-time.js"), k = require("../../utils/split-float.js"), x = require("../../utils/mix.js"), b = require("./picker/arrival-time.js"), S = require("../../components/owl-watcher/owl-watcher.js"), C = require("../../api/index.js"), T = C.orderSubmit, D = C.orderUpdate, I = C.pay, P = C.addrGet, E = C.getUserPoiCoupon, A = C.getValidCoupons, M = C.couponDisableReason, L = C.getCouponsList, O = require("../../api/analytics.js").event, R = require("./log.js"), j = function(e) {
    return e.missingfoods || (e.length ? e : []);
}, U = require("../../api/wx.js"), F = U.navigateTo, q = U.requestPayment, V = require("../base.js"), B = require("../../weapp-redux/index.js").connect, z = require("../../utils/object-assign.js"), K = require("../../utils/image-scale.js"), W = require("../../utils/format-price.js"), H = require("../../utils/fix-price.js"), N = Object.freeze({
    PREVIEW_COMPELETE: 1
}), G = t({}, N.PREVIEW_COMPELETE, !1), Q = function(e) {
    return e.forEach(function(e) {
        var t = e.amount, i = k(t), a = n(i, 2);
        e.amount = a[0], e.tail = a[1];
    }), e;
}, X = {
    pageName: "preview",
    data: {
        mtpayFlag: !1,
        inited: !1,
        index: 0,
        foodlistCopy: [],
        foodToggleWord: "展开更多",
        moreFoodImgClass: "",
        submiting: !1,
        isTipLengthOverTwo: !1,
        scrollTop: 0,
        pay_info: [],
        payType: 2,
        previewErrorMsg: "",
        previewData: {},
        address_info: {},
        formValidState: "",
        addressSelectShow: !1,
        addresses: [],
        tip: "",
        poi_coupon_info: null,
        coupon_info: null,
        poiCouponModalShown: !1,
        poiCouponlist: {},
        couponlist: {},
        couponDisableReasons: {},
        expiredCoupons: null,
        expiredCouponCount: 0,
        diners_option_value: "",
        diners_count: 0,
        dinnerOption: {
            show: !1,
            tableware_advocate_tip: ""
        },
        hasUndoneAddr: !1,
        canNotShippingAddr: !1,
        privacy: {
            support: !1,
            title: "号码保护",
            icon: "",
            openTitle: "对商家、骑手隐藏您的真实手机号，保护您的隐私",
            offTitle: "对商家、骑手隐藏您的真实手机号，保护您的隐私",
            using: 0,
            showIntro: !1
        },
        isIpx: /iPhone X/.test(wx.getSystemInfoSync().model),
        isSupportSelfpick: !1,
        isSelfpick: !1,
        isEditingTel: !1,
        isAgreeSelfpick: !0,
        isInSharing: !1,
        expiredFold: !0,
        togglePoiReason: {}
    },
    business_type: 0,
    agreementUrl: "",
    getSelfpickInfo: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.business_type_list, i = void 0 === t ? [] : t, a = e.address_info, n = a.phone, r = a.address, o = a.distance, s = void 0 === o ? "" : o, d = e.expected_arrival_info, c = d.select_view_time, u = d.unixtime, p = this.checkIfSupportSelfpick(i), l = this.checkBusinessType(i), _ = l.business_type, f = l.isAgreeSelfpick, h = l.agreementUrl;
        return this.business_type = _, this.isAgreeSelfpick = f, this.agreementUrl = h, 
        {
            isSelfpick: 1 === _,
            isSupportSelfpick: p,
            distance: s,
            selfpickShopAddress: r,
            selfpickTel: n,
            isAgreeSelfpick: f,
            selfpickTime: -1 === u ? "未选取" : c
        };
    },
    checkIfSupportSelfpick: function(e) {
        var t = !1;
        return e.forEach(function(e) {
            1 === e.type && (t = !0);
        }), t;
    },
    checkBusinessType: function(e) {
        var t = 0, i = !1, a = "";
        return e.forEach(function(e) {
            1 === e.selected && (t = e.type, i = 1 === e.self_delivery_agree_selected, a = e.self_delivery_agree_url);
        }), {
            business_type: t,
            isAgreeSelfpick: i,
            agreementUrl: a
        };
    },
    getSelfpickArgs: function() {
        return {
            business_type: this.business_type,
            self_delivery_agree_selected: this.isAgreeSelfpick ? 1 : 0
        };
    },
    onClickUserInfoHeader: function(e) {
        if (e.target.dataset.action) {
            var t = void 0;
            switch (e.target.dataset.action) {
              case "deliver":
                t = 0;
                break;

              case "selfpick":
                t = 1;
            }
            this.business_type !== t && (1 === t && this.lxChangeToSelfpickTagClick(), this.setCacheAddressInfo(this.data.previewData, this.business_type), 
            this.refresh({
                business_type: t
            }), this.InitTipMessage());
        }
    },
    InitTipMessage: function() {
        this.setData({
            tip: "",
            isTipLengthOverTwo: !1,
            formValidState: "",
            isEditingTel: !1
        });
    },
    onClickCheckMap: function() {
        var e = this.data.previewData, t = e.address_info, i = t.latitude, a = t.longitude, n = t.address, r = e.poi_name, o = this;
        wx.authorize({
            scope: "scope.userLocation",
            success: function() {
                o.lxSelfpickCheckMapClick(), wx.openLocation({
                    latitude: i / Math.pow(10, 6),
                    longitude: a / Math.pow(10, 6),
                    name: r,
                    address: n
                });
            }
        });
    },
    onSelfpickAgreementChange: function(e) {
        this.isAgreeSelfpick = e.detail.value && 1 === e.detail.value.length;
    },
    onClickSelfpickAgreement: function() {
        var e = this.agreementUrl;
        e && wx.navigateTo({
            url: "../web-view/web-view?type=DIRECT&redirectUrl=" + encodeURIComponent(e)
        });
    },
    onChangeSelfpickTel: function(e) {
        var i = e.detail.value;
        /^1(3|4|5|6|7|8|9)[0-9]{9}$/.test(i) ? this.setData(t({}, "previewData.address_info.phone", i)) : (this.toast({
            message: "请输入正确的手机号"
        }), this.setData({
            isEditingTel: !0
        }));
    },
    cacheAddressInfo: [ null, null ],
    setCacheAddressInfo: function(e, t) {
        var i = e.address_info, a = e.expected_arrival_info.unixtime;
        this.cacheAddressInfo[t] = {
            address_info: i,
            unixtime: a
        };
    },
    getCacheAddressInfo: function(e) {
        return this.cacheAddressInfo[e];
    },
    getSelectedAddr: function() {
        var e = this.data.previewData, t = e.address_type, i = e.address_info;
        return 1 === this.business_type ? i : 1 === t ? i : null;
    },
    addressInclude: !1,
    refreshAddresses: function() {
        var t = this;
        return e(i.default.mark(function e() {
            var a, n, r, o, s, d;
            return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return a = t.data.poi_id, t.addressInclude = !1, e.next = 4, P({
                        type: 2,
                        wm_poi_id: a
                    });

                  case 4:
                    n = e.sent, r = !!n.filter(function(e) {
                        return e.bind_type < 11;
                    }).length, o = !!n.filter(function(e) {
                        return 1 !== e.can_shipping;
                    }).length, t.setData({
                        addresses: n,
                        hasUndoneAddr: r,
                        canNotShippingAddr: o
                    }), s = t.data.previewData.address_info, n.forEach(function(e) {
                        t.data.previewData.address_info && e.id === t.data.previewData.address_info.id && e.can_shipping && (z(s, e), 
                        t.addressInclude = !0);
                    }), d = {}, Object.keys({
                        address_info: s
                    }).forEach(function(e) {
                        d["previewData." + e] = t.addressInclude ? s : {};
                    }), t.setData(d);

                  case 13:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    onTapSwitchPrivacyService: function() {
        var e = this.data.privacy;
        this.lxPrivacySwitchStatusClick(), this.setData({
            privacy: a({}, e, {
                using: 1 === e.using ? 0 : 1
            })
        });
    },
    onTapPrivacyServiceHelp: function() {
        this.setData({
            privacy: a({}, this.data.privacy, {
                showIntro: !0
            })
        });
    },
    onTapClosePrivacyServiceHelp: function() {
        this.setData({
            privacy: a({}, this.data.privacy, {
                showIntro: !1
            })
        });
    },
    onClickSelectAddr: function(t) {
        var a = this;
        return e(i.default.mark(function e() {
            var n, r, o, s, d, c;
            return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return a.lxAddrClick(t), a.loading(!0), e.prev = 2, e.next = 5, a.refreshAddresses();

                  case 5:
                    for (n = a.data, r = n.addresses, o = n.poi_id, s = 0, d = r.length - 1; -1 < d; --d) 1 === r[d].can_shipping && (s += 1);
                    if (0 === s) return e.next = 11, F({
                        url: "../addr-add/addr-add?from=preview&poi_id=" + o
                    });
                    e.next = 13;
                    break;

                  case 11:
                    e.next = 14;
                    break;

                  case 13:
                    a.setData({
                        addressSelectShow: !0
                    });

                  case 14:
                    e.next = 20;
                    break;

                  case 16:
                    e.prev = 16, e.t0 = e.catch(2), c = e.t0.message, a.toast({
                        message: c
                    });

                  case 20:
                    a.loading(!1);

                  case 21:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 2, 16 ] ]);
        }))();
    },
    onClickAddressMask: function() {
        this.setData({
            addressSelectShow: !1,
            addresses: []
        });
    },
    onClickAddress: function(e) {
        for (var t = e.currentTarget.dataset.id, i = this.data.addresses, a = null, n = i.length - 1; -1 < n; --n) {
            var r = i[n];
            if (String(r.id) === String(t)) {
                a = r;
                break;
            }
        }
        a && (this.setRecipient(a), this.setData({
            addressSelectShow: !1,
            addresses: [],
            formValidState: ""
        }), this.refresh({
            selectedAddr: a
        }));
    },
    onClickAddressEdit: function(t) {
        var a = this, n = t.currentTarget.dataset.id;
        return e(i.default.mark(function e() {
            var t, r, o, s, d, c;
            return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    t = a.data, r = t.poi_id, o = t.addresses, s = null, d = o.length - 1;

                  case 3:
                    if (!(-1 < d)) {
                        e.next = 11;
                        break;
                    }
                    if (c = o[d], String(c.id) === String(n)) return s = c, e.abrupt("break", 11);
                    e.next = 8;
                    break;

                  case 8:
                    --d, e.next = 3;
                    break;

                  case 11:
                    if (s) return a.dispatchAddrEdit(s), e.next = 15, F({
                        url: "../addr-add/addr-add?from=preview&action=edit&addr_id=" + n + "&poi_id=" + r
                    });
                    e.next = 15;
                    break;

                  case 15:
                  case "end":
                    return e.stop();
                }
            }, e, a);
        }))();
    },
    orderSubmitArgs: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = this.submitTouchPoint, i = this.data, a = i.coupon_info, n = i.poi_coupon_info, r = i.previewData, o = r.foodlist, s = r.original_price, d = r.ahead_discount_time, c = i.privacy.using, u = (this.data.previewData.expected_arrival_info || {}).unixtime || 0, p = e.selectedAddr, l = void 0 === p ? this.getSelectedAddr() : p, _ = e.expected_arrival_time, f = void 0 === _ ? u : _, h = e.payType, g = void 0 === h ? this.data.payType : h, v = e.coupon_view_id, m = void 0 === v ? a && a.selected_coupon_view_id || "-1" : v, y = e.poicoupon_view_id, w = void 0 === y ? n && n.selected_coupon_view_id || "0" : y, k = e.submit_once_again, x = void 0 === k ? 0 : k, b = e.hash_id, S = void 0 === b ? "" : b, C = e.business_type;
        if (void 0 !== C) {
            var T = this.getCacheAddressInfo(C);
            l = 1 === C ? {} : T.address_info, f = 1 === C ? 0 : T.unixtime;
        }
        var D = this.getSelfpickArgs().self_delivery_agree_selected, I = {
            data: {
                wm_order_pay_type: g,
                expected_arrival_time: f,
                foodlist: (o || []).map(function(e) {
                    var t = e.spu_id, i = e.id, a = e.count, n = e.cart_id, r = e.attrs, o = e.activity_tag;
                    return {
                        spu_id: t,
                        id: i,
                        count: a,
                        cart_id: n,
                        attrs: (r || []).map(function(e) {
                            return e.id;
                        }),
                        activity_tag: o
                    };
                }),
                poicoupon_view_id: w,
                coupon_view_id: m,
                original_price: s,
                ahead_discount_time: d,
                confirm_submit: 0,
                diners_count: this.data.diners_count ? this.data.diners_count : 0,
                submit_once_again: x,
                hash_id: S,
                privacy_selected: c,
                business_type: void 0 !== C ? C : this.business_type,
                self_delivery_agree_selected: D
            },
            wm_order_channel: wx.getStorageSync("wx_cold_boot_scene") || "",
            touchPoint: t
        };
        return l && z(I.data, {
            addr_id: l.id || 0,
            addr_longitude: l.longitude || 0,
            addr_latitude: l.latitude || 0,
            recipient_name: l.name || "",
            recipient_gender: l.gender || "",
            recipient_address: l.address || "",
            recipient_phone: l.phone || "",
            house_number: l.house_number || ""
        }), I;
    },
    stockFromMissingFoods: function(e) {
        for (var t = j(e), i = this.data.previewData.foodlist, a = Object.create(null), n = i.length - 1; -1 < n; --n) {
            var r = i[n], o = r.id, s = r.count;
            a[o] = s;
        }
        return t.map(function(e) {
            var t = e.id, i = e.stock;
            return {
                id: t,
                count: Math.max(0, Math.min(a[t], i))
            };
        });
    },
    dealSubmitError: function(t) {
        var a, n, r = this, o = t.code, s = t.message, d = t.data, c = getApp();
        5 === o ? (this.setToken({
            token: d.order_token
        }), this.alert({
            message: s,
            textOK: "知道了",
            ok: function() {
                wx.navigateBack();
            }
        })) : 8 === o ? this.confirm({
            message: s,
            textOK: "继续添加",
            textCancel: "不用了",
            ok: function() {
                wx.navigateBack();
            }
        }) : 10 === o || 401 === o ? wx.redirectTo({
            url: "../loginV2/login?login_page=3"
        }) : 3 === o ? this.alert({
            message: s,
            textOK: "知道了",
            ok: function() {
                var e = r.data.poi_id, t = r.stockFromMissingFoods(d);
                r.setSKUs({
                    poiID: e,
                    skus: t
                }), c.showCart = !0, wx.navigateBack();
            }
        }) : 17 === o ? this.alert({
            message: s,
            textOK: "知道了",
            ok: function() {
                var e = r.data.poi_id, t = r.stockFromMissingFoods(d);
                r.setSKUs({
                    poiID: e,
                    skus: t
                }), c.showCart = !0, wx.navigateBack();
            }
        }) : 12 === o ? this.confirm({
            message: s,
            textCancel: "重新选择",
            textOK: "继续下单",
            cancel: function() {
                c.showCart = !0, wx.navigateBack();
            },
            ok: (n = e(i.default.mark(function e() {
                return i.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, r.refresh();

                      case 2:
                        return e.next = 4, r.onClickSubmit();

                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e, r);
            })), function() {
                return n.apply(this, arguments);
            })
        }) : 18 === o ? this.confirm({
            message: s,
            textCancel: "重新选择",
            textOK: "继续下单",
            cancel: function() {
                var e = r.data.poi_id, t = r.stockFromMissingFoods(d);
                r.setSKUs({
                    poiID: e,
                    skus: t
                }), c.showCart = !0, wx.navigateBack();
            },
            ok: (a = e(i.default.mark(function e() {
                var t, a;
                return i.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return t = r.data.poi_id, a = r.stockFromMissingFoods(d), r.setSKUs({
                            poiID: t,
                            skus: a
                        }), e.next = 5, r.refresh();

                      case 5:
                        return e.next = 7, r.onClickSubmit();

                      case 7:
                      case "end":
                        return e.stop();
                    }
                }, e, r);
            })), function() {
                return a.apply(this, arguments);
            })
        }) : this.alert({
            message: s,
            ok: function() {
                d && 1 === d.refresh && r.refresh(), r.data.mtpayFlag && (r.clearPindanData(), r.clearMealInfo(), 
                wx.navigateBack());
            }
        });
    },
    submitTouchPoint: "",
    handleSubmitState: function(e) {
        this.setData({
            submiting: e
        });
    },
    startSubmit: function() {
        this.handleSubmitState(!0);
    },
    endSubmit: function() {
        this.handleSubmitState(!1);
    },
    setHashId: function(e) {
        this.hash_id = e;
    },
    clearMealInfo: function() {
        this.clearFood({
            poiID: this.data.poi_id
        }), this.clearHashId();
    },
    clearHashId: function() {
        this.hash_id = void 0;
    },
    refreshPay: function() {
        this.refresh({
            hash_id: this.hash_id,
            submit_once_again: 1
        });
    },
    onClickSubmit: function(t) {
        var n = this;
        return e(i.default.mark(function r() {
            var o, s, d, c, u, g, v, w, k, x, b, S, C, D, P, E, A, M, L, R, j, U, F, V, B;
            return i.default.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    if (n.data.submiting) return r.abrupt("return");
                    r.next = 2;
                    break;

                  case 2:
                    if (n.startSubmit(), n.lxSubmitClick(), O({
                        event_type: "click",
                        val_bid: "b_zXoJH"
                    }), t && (o = t.detail, s = o.x, d = o.y, n.submitTouchPoint = s + "," + d), c = n.getSelfpickArgs(), 
                    u = c.business_type, g = c.self_delivery_agree_selected, 1 !== u || g) {
                        r.next = 10;
                        break;
                    }
                    return n.alert({
                        message: "您没有同意并接受到店自取协议，请先同意后再提交订单",
                        ok: function() {
                            n.endSubmit();
                        }
                    }), r.abrupt("return");

                  case 10:
                    if (v = n.data.previewData.expected_arrival_info.unixtime, w = n.getSelectedAddr()) {
                        r.next = 17;
                        break;
                    }
                    return n.setData({
                        formValidState: "no-address"
                    }), n.lxNoAddrView(), n.endSubmit(), r.abrupt("return");

                  case 17:
                    if (2 === parseInt(n.recommend_type, 10)) return n.confirm({
                        message: "是否确定配送到 " + w.address + " " + w.house_number,
                        textCancel: "取消",
                        textOK: "确定",
                        cancel: function() {
                            n.endSubmit();
                        },
                        ok: function() {
                            var t = e(i.default.mark(function e() {
                                return i.default.wrap(function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                      case 0:
                                        return n.endSubmit(), n.recommend_type = 1, e.next = 4, n.onClickSubmit();

                                      case 4:
                                      case "end":
                                        return e.stop();
                                    }
                                }, e, n);
                            }));
                            return function() {
                                return t.apply(this, arguments);
                            };
                        }()
                    }), r.abrupt("return");
                    r.next = 20;
                    break;

                  case 20:
                    if (-1 === v) return n.setData({
                        formValidState: "no-time"
                    }), n.endSubmit(), r.abrupt("return");
                    r.next = 24;
                    break;

                  case 24:
                    return n.setData({
                        formValidState: ""
                    }), n.loading(!0), k = n.data.poi_id, n.traceTagStart({
                        src_page: l,
                        src_block: h,
                        tgt_page: _,
                        extra: {
                            poi_id: k
                        },
                        action: p
                    }), x = null, r.prev = 29, b = n.orderSubmitArgs(), z(b.data, {
                        check_shipping_area: 1,
                        info: {
                            code: "20000012"
                        }
                    }), b.trace_tag = n.traceTagEnd({
                        tgt_block: f
                    }), S = getApp().store.getState(), C = S.user.open_id, z(b.data, {
                        wx_pay_params: {
                            openid: C,
                            app_id: "wx2c348cf579062e56"
                        }
                    }), n.startLazyLoading(), n.data.isInSharing && (b.data.cart_id = n.shopCartId || ""), 
                    r.next = 39, T(b);

                  case 39:
                    x = r.sent, n.delBuyTogetherInfoWithPoiId(k), r.next = 50;
                    break;

                  case 43:
                    return r.prev = 43, r.t0 = r.catch(29), n.loading(!1), n.dealSubmitError(r.t0), 
                    n.clearLazyLoading(), n.endSubmit(), r.abrupt("return");

                  case 50:
                    if (P = (D = x).wm_order_pay_type, E = D.hash_id, n.setHashId(E), O({
                        nm: "order",
                        event_type: "order",
                        val_bid: "c_bROZP",
                        val_lab: {
                            order_id: E
                        }
                    }), A = n.data.isInSharing ? {
                        shopCartId: n.shopCartId,
                        userId: wx.getStorageSync("user").user_id
                    } : {}, L = void 0 === (M = A.shopCartId) ? "" : M, j = void 0 === (R = A.userId) ? "" : R, 
                    2 === P) return r.prev = 55, U = n.submitTouchPoint, r.next = 59, I({
                        wm_order_id_view: E,
                        touchPoint: U
                    });
                    r.next = 82;
                    break;

                  case 59:
                    if (F = r.sent, n.clearLazyLoading(), n.loading(!1), y(F)) return n.setData({
                        mtpayFlag: !0
                    }, function() {
                        n.endSubmit(), m(a({}, F, {
                            pay_success_url: "/pages/order-info/order-info?view_id=" + E + "&shop_cart_id=" + L + "&sponsor_user_id=" + j + "&wm_poi_id=" + n.data.poi_id + "&share_coupon_pop=true&patch_order_role=0&clearPindanCart=1" || ""
                        }));
                    }), r.abrupt("return");
                    r.next = 65;
                    break;

                  case 65:
                    return r.next = 67, q(F);

                  case 67:
                    n.endSubmit(), n.clearPindanData(), n.clearHashId(), console.log("clear all meal"), 
                    r.next = 82;
                    break;

                  case 73:
                    return r.prev = 73, r.t1 = r.catch(55), V = r.t1.code, B = r.t1.message, n.loading(!1), 
                    n.clearLazyLoading(), n.endSubmit(), V ? n.alert({
                        message: B,
                        ok: function() {
                            this.refreshPay();
                        }
                    }) : "您已取消支付" === B && n.refreshPay(), r.abrupt("return");

                  case 82:
                    n.clearLazyLoading(), wx.redirectTo({
                        url: "../order-info/order-info?view_id=" + E + "&shop_cart_id=" + L + "&wm_poi_id=" + n.data.poi_id + "&sponsor_user_id=" + j + "&share_coupon_pop=true&patch_order_role=0&clearPindanCart=1"
                    });

                  case 84:
                  case "end":
                    return r.stop();
                }
            }, r, n, [ [ 29, 43 ], [ 55, 73 ] ]);
        }))();
    },
    onClickHiddenModal: function() {
        this.setData({
            previewErrorMsg: ""
        });
    },
    onClickPayType: function() {
        var t, a = this, n = this.data.pay_info, r = n.map(function(e) {
            return 1 === e.payment_type ? "货到付款" : "在线支付";
        });
        this.actionSheet({
            itemList: r,
            ok: (t = e(i.default.mark(function e(t) {
                var r, o;
                return i.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return r = n[t].payment_type, a.lxPayTypeClick(1 === r ? 2 : 1), e.prev = 2, e.next = 5, 
                        a.refresh({
                            payType: r
                        });

                      case 5:
                        e.next = 11;
                        break;

                      case 7:
                        e.prev = 7, e.t0 = e.catch(2), o = e.t0.message, a.toast({
                            message: o
                        });

                      case 11:
                      case "end":
                        return e.stop();
                    }
                }, e, a, [ [ 2, 7 ] ]);
            })), function(e) {
                return t.apply(this, arguments);
            })
        });
    },
    setOrderType: function(e) {
        e && this.setPrevSourceUrl(this.data.poi_id, "preview"), this.setData({
            isInSharing: e
        });
    },
    shopCartId: "",
    updatePreviewData: function(t) {
        var n = this, r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 2, o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        return e(i.default.mark(function e() {
            var s, d, c, u, p, l, _, f, h, g, v, m, y, w, k, x, b, S, C, T, D, I, E, A, M, L, O, R, j, U, F, q, V;
            return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (s = n.data, d = s.diners_option_value, c = s.diners_count, u = n.data.hasUndoneAddr || !1, 
                    p = n.data.canNotShippingAddr || !1, l = t.order_template_type, e.prev = 4, _ = function(e) {
                        var t = e.sub_total_price, i = e.original_price, a = e.count, n = e.food_label_url, r = e.spec, o = e.attrs;
                        e._sub_total_price = H(t), e._sub_original_price = W(Math.round(100 * i) * a), e.food_label_url = K(n, 0, 0, "o");
                        var s = [];
                        r && s.push(r), 0 < o.length && (s = s.concat(o.map(function(e) {
                            return e.value;
                        }))), e.attrInfo = 0 < s.length ? "+" + s.join("+") : "";
                    }, f = void 0, 3 === l ? (t.food_group.forEach(function(e) {
                        e.foodlist.forEach(_);
                    }), n.setOrderType(!0), n.shopCartId = t.shop_cart_id, f = t.food_group, o.onload && (h = t.diners_option, 
                    g = t.food_group.length, (v = h[g]) && (d = v.description, c = v.count))) : (t.foodlist.forEach(_), 
                    f = t.foodlist), t.discounts.forEach(function(e) {
                        e.icon_url = K(e.icon_url, 0, 0, "o");
                    }), t._box_total_price = H(t.box_total_price), t._total = H(t.total), t._shipping_fee = H(t.shipping_fee), 
                    t._original_price = H(t.original_price), m = Math.round(100 * t.original_price) - Math.round(100 * t.total), 
                    t._discountCents = W(m), t._discountPrice = W(m), n.loading(!0), e.prev = 17, 2 === t.address_type) return y = n.data.poi_id, 
                    n.startLazyLoading(), e.next = 23, P({
                        type: 2,
                        wm_poi_id: y
                    });
                    e.next = 31;
                    break;

                  case 23:
                    w = e.sent, u = !!w.filter(function(e) {
                        return e.bind_type < 11;
                    }).length, p = !!w.filter(function(e) {
                        return 1 !== e.can_shipping;
                    }).length, n.clearLazyLoading(), 0 === w.filter(function(e) {
                        return 1 === e.can_shipping;
                    }).length && (n.lx_address_type = t.address_type, t.address_type = 0), e.next = 32;
                    break;

                  case 31:
                    n.lx_address_type = t.address_type;

                  case 32:
                    e.next = 37;
                    break;

                  case 34:
                    e.prev = 34, e.t0 = e.catch(17), n.clearLazyLoading();

                  case 37:
                    for (k = t.payment_info.filter(function(e) {
                        var t = e.display_switch, i = e.payment_type;
                        return 1 === t && (1 === i || 2 === i);
                    }), x = [], b = k.length - 1; -1 < b; --b) S = k[b].payment_type, x.push(S);
                    if (C = 2, C = 0 === x.length || -1 !== x.indexOf(2) ? 2 : x[0], T = -1 !== x.indexOf(r) ? r : C, 
                    D = t.privacy_service, E = (I = (void 0 === D ? {} : D) || {}).privacy_title, A = I.show, 
                    M = I.privacy_icon, L = I.privacy_selected, O = I.privacy_open_desc, R = I.privacy_close_desc, 
                    j = n.getSelfpickInfo(t), U = a({
                        diners_option_value: d,
                        diners_count: c,
                        hasUndoneAddr: u,
                        canNotShippingAddr: p,
                        previewData: t,
                        pay_info: k,
                        payType: T,
                        inited: !0,
                        privacy: a({}, n.data.privacy, {
                            title: E,
                            support: A,
                            icon: M,
                            using: L,
                            openTitle: O,
                            offTitle: R
                        })
                    }, j, {
                        foodlistSortByPerson: f
                    }), t.coupon_info_list.forEach(function(e) {
                        var t = e.type;
                        0 === t ? U.coupon_info = e : 1 === t && (U.poi_coupon_info = e);
                    }), t.remind_infos.length) for (F = t.remind_infos.length - 1; -1 < F; --F) 2 === t.remind_infos[F].behavior_type ? (U.tip = t.remind_infos[F].remind_content, 
                    U.isTipLengthOverTwo = n.calcTwoLineTip(U.tip)) : 1 === t.remind_infos[F].behavior_type ? n.alert({
                        message: t.remind_infos[F].remind_content
                    }) : n.toast({
                        message: t.remind_infos[F].remind_content
                    });
                    n.copyFoodList(t.foodlist, 3), n.recommend_type = t.address_info.recommend_type || 1, 
                    n.setData(U, function() {
                        G[N.PREVIEW_COMPELETE] || (n.addSpeedTrackEndTime(N.PREVIEW_COMPELETE), G[N.PREVIEW_COMPELETE] = !0);
                    }), n.lxAllView(U), A && n.lxPrivacySwitchStatusView(U), e.next = 62;
                    break;

                  case 56:
                    e.prev = 56, e.t1 = e.catch(4), q = e.t1.code, V = e.t1.message, 1 === q ? n.toast({
                        message: V
                    }) : n.toast({
                        message: "服务器异常，请稍后"
                    }), n.setData({
                        inited: !0
                    });

                  case 62:
                    n.loading(!1);

                  case 63:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 4, 56 ], [ 17, 34 ] ]);
        }))();
    },
    refresh: function(t) {
        var a = this;
        return e(i.default.mark(function e() {
            var n, r, o, s, d, c;
            return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, a.loading(!0), a.data.addressSelectShow) return e.next = 5, a.refreshAddresses();
                    e.next = 5;
                    break;

                  case 5:
                    return n = a.orderSubmitArgs(t), r = n.data, o = r.wm_order_pay_type, -1 === r.expected_arrival_time && (n.data.expected_arrival_time = 0), 
                    s = getApp().store.getState(), d = s.user.open_id, z(n.data, {
                        wx_pay_params: {
                            openid: d,
                            app_id: "wx2c348cf579062e56"
                        }
                    }), a.data.isInSharing && (n.data.cart_id = a.shopCartId || ""), a.startLazyLoading(), 
                    e.next = 14, D(n);

                  case 14:
                    c = e.sent, a.clearLazyLoading(), a.setToken({
                        token: c.token
                    }), "no-address" === a.data.formValidState && c.address_info.address && a.setData({
                        formValidState: ""
                    }), a.updatePreviewData(c, o), e.next = 27;
                    break;

                  case 21:
                    return e.prev = 21, e.t0 = e.catch(0), a.loading(!1), a.clearLazyLoading(), a.dealSubmitError(e.t0), 
                    e.abrupt("return");

                  case 27:
                    a.loading(!1);

                  case 28:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 0, 21 ] ]);
        }))();
    },
    changePoiCoupon: function() {
        var e = this.data.poiCouponModalShown;
        this.setData({
            poiCouponModalShown: !e
        });
    },
    onClickGrabPoiCoupon: function() {
        var t = this;
        return e(i.default.mark(function e() {
            var a, n, r, o, s;
            return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return t.lxShopCouponClick(), t.loading(!0), e.prev = 2, a = t.getSelectedAddr(), 
                    n = {
                        wm_poi_id: t.data.poi_id,
                        can_use_coupon_price: t.data.previewData.can_use_coupon_price,
                        business_type: t.business_type
                    }, a && z(n, {
                        phone: a.phone || "",
                        number: a.house_number || ""
                    }), e.next = 8, E(n);

                  case 8:
                    r = e.sent, o = {}, r.forEach(function(e) {
                        1 === e.poi_coupon_valid ? o.validPoiCoupon = t.processPoiCoupon(e.poi_coupon_info_list) : 2 === e.poi_coupon_valid ? o.invalidPoiCoupon = t.processPoiCoupon(e.poi_coupon_info_list) : -1 === e.poi_coupon_valid && (o.expiredPoiCoupon = t.processPoiCoupon(e.poi_coupon_info_list, 2));
                    }), o.validPoiCoupon && 0 !== o.validPoiCoupon.length || o.invalidPoiCoupon && 0 !== o.invalidPoiCoupon.length || t.setData({
                        expiredFold: !1
                    }), t.setData({
                        poiCouponlist: o
                    }), t.changePoiCoupon(), e.next = 20;
                    break;

                  case 16:
                    e.prev = 16, e.t0 = e.catch(2), s = e.t0.message, t.toast({
                        message: s
                    });

                  case 20:
                    t.loading(!1);

                  case 21:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 2, 16 ] ]);
        }))();
    },
    onClickExpired: function() {
        this.setData({
            expiredFold: !1
        });
    },
    onClickTogglePoiReason: function(e) {
        var i = e.currentTarget.dataset.togglekey, a = z({}, this.data.togglePoiReason, t({}, i, !this.data.togglePoiReason[i]));
        this.setData({
            togglePoiReason: a
        });
    },
    processPoiCoupon: function(e, t) {
        var i = [];
        return e.forEach(function(e) {
            t ? e.status !== t && (e.deadline = w(e.deadline, "yyyy.MM.dd"), i.push(e)) : (e.deadline = w(e.deadline, "yyyy.MM.dd"), 
            i.push(e));
        }), i;
    },
    calcTwoLineTip: function(e) {
        return Math.ceil(654 / 28) < e.replace(/,\.\/\\!'":/g, "").length;
    },
    onSelectPoiCoupon: function(e) {
        var t = e.currentTarget.dataset.couponid || "-1";
        this.changePoiCoupon(), this.refresh({
            poicoupon_view_id: t
        });
    },
    changeCoupon: function() {
        var e = this.data.couponModalShown;
        this.setData({
            couponModalShown: !e
        });
    },
    loadDisableReason: function(a, n) {
        var r = this;
        return e(i.default.mark(function e() {
            var o, s, d, c, u, p, l, _, f, h;
            return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return o = r.data, s = o.poi_id, d = o.previewData, c = d.can_use_coupon_price, 
                    u = d.total, p = d.original_price, l = d.token, _ = r.getSelectedAddr(), r.loading(!0), 
                    e.prev = 3, e.next = 6, M({
                        wm_poi_id: s,
                        phone: _ && _.phone || "",
                        total: u,
                        original_price: p,
                        can_use_coupon_price: c,
                        order_token: l,
                        coupon_view_id: a
                    });

                  case 6:
                    f = e.sent, r.setData(t({}, "couponDisableReasons[" + n + "]", f)), e.next = 14;
                    break;

                  case 10:
                    e.prev = 10, e.t0 = e.catch(3), h = e.t0.message, r.toast({
                        message: h
                    });

                  case 14:
                    r.loading(!1);

                  case 15:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 3, 10 ] ]);
        }))();
    },
    onClickToggleReason: function(e) {
        var i = e.currentTarget.dataset, a = i.couponid, n = i.key;
        this.data.couponDisableReasons[n] ? this.setData(t({}, "couponDisableReasons[" + n + "]", null)) : this.loadDisableReason(a, n);
    },
    onSelectCoupon: function(e) {
        var t = e.currentTarget.dataset.couponid || "-1";
        this.changeCoupon(), this.refresh({
            coupon_view_id: t
        });
    },
    onClickGrabCoupon: function() {
        var t = this;
        return e(i.default.mark(function e() {
            var a, n, r, o, s, d, c, u, p, l, _, f, h;
            return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return t.lxRedpackClick(), t.loading(!0), e.prev = 2, a = t.data, n = a.poi_id, 
                    r = a.previewData, o = r.can_use_coupon_price, s = r.total, d = r.original_price, 
                    c = r.token, u = t.business_type, p = t.getSelectedAddr(), l = {
                        wm_poi_id: n,
                        phone: p && p.phone || "",
                        total: s,
                        original_price: d,
                        can_use_coupon_price: o,
                        order_token: c,
                        business_type: u
                    }, e.next = 8, A(l);

                  case 8:
                    _ = e.sent, f = {}, _.forEach(function(e) {
                        1 === e.coupon_valid ? f.valid = Q(e.coupon_info_list) : 2 === e.coupon_valid && (f.invalid = Q(e.coupon_info_list));
                    }), t.setData({
                        couponDisableReasons: {},
                        expiredCoupons: null,
                        couponlist: f
                    }), t.changeCoupon(), e.next = 19;
                    break;

                  case 15:
                    e.prev = 15, e.t0 = e.catch(2), h = e.t0.message, t.toast({
                        message: h
                    });

                  case 19:
                    t.loading(!1);

                  case 20:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 2, 15 ] ]);
        }))();
    },
    onClickExpireCoupons: function() {
        var t = this;
        return e(i.default.mark(function e() {
            var a, n, r, o;
            return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return t.loading(!0), e.prev = 1, e.next = 4, L({
                        status: 5,
                        page_index: 0,
                        page_size: 20
                    });

                  case 4:
                    if (a = e.sent, n = a.coupon_list, r = a.coupon_total_num, n) {
                        e.next = 9;
                        break;
                    }
                    throw new Error("啊哦, 出错了, 请重试");

                  case 9:
                    0 < n.length ? t.setData({
                        expiredCoupons: Q(n),
                        expiredCouponCount: r
                    }) : t.toast({
                        message: "您的账号没有无效券~"
                    }), e.next = 16;
                    break;

                  case 12:
                    e.prev = 12, e.t0 = e.catch(1), o = e.t0.message, t.toast({
                        message: o
                    });

                  case 16:
                    t.loading(!1);

                  case 17:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 1, 12 ] ]);
        }))();
    },
    onClickCaution: function() {
        this.lxRemindClick();
        var e = this.data.previewData.remark_field;
        getApp().remark_field = e, wx.navigateTo({
            url: "/pages/preview/caution"
        });
    },
    onClickDinersOption: function() {
        this.setData({
            dinnerOption: {
                show: !0,
                tableware_advocate_tip: this.data.previewData.tableware_advocate_tip,
                diners_option: this.data.previewData.diners_option
            }
        });
    },
    copyFoodList: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1];
        e = 0 < t ? e.slice(0, t) : e, this.setData({
            foodlistCopy: e
        });
    },
    handleScrollTop: function() {
        this.setData({
            scrollTop: 0
        });
    },
    onClickFoodToggle: function() {
        var e = this.data, t = e.previewData.foodlist, i = e.foodlistCopy, a = t.length > i.length;
        a ? this.lxFoodToggleOpenClick() : (this.setData({
            scrollTop: 0
        }), this.lxFoodToggleCloseClick()), this.setData({
            foodToggleWord: a ? "点击收起" : "展示更多",
            moreFoodImgClass: a ? "trans" : ""
        }), this.copyFoodList(t, a ? -1 : 3);
    },
    hideOption: function() {
        this.setData({
            dinnerOption: {
                show: !1,
                tableware_advocate_tip: this.data.previewData.tableware_advocate_tip,
                diners_option: this.data.previewData.diners_option
            }
        });
    },
    changeDinerOption: function(e) {
        var t = e.currentTarget.dataset.item;
        this.lxDinnerClick(t.count), this.setData({
            diners_option_value: t.description,
            diners_count: t.count
        }), this.hideOption();
    },
    clearPindanData: function() {
        var e = this.data.poi_id;
        this.delBuyTogetherInfoWithPoiId(e), this.clearMyCartInSharing({
            poiID: e
        });
    },
    onShowCalled: !1,
    onShow: function() {
        var t = this;
        return e(i.default.mark(function e() {
            var a;
            return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (a = t.data.isInSharing, t.lxPatchOrderRoleView({
                        pindan_role: a ? 1 : 0
                    }), t.onShowCalled) {
                        e.next = 5;
                        break;
                    }
                    return t.onShowCalled = !0, e.abrupt("return");

                  case 5:
                    if (t.data.mtpayFlag) return e.next = 8, t.refreshPay();
                    e.next = 10;
                    break;

                  case 8:
                    e.next = 12;
                    break;

                  case 10:
                    return e.next = 12, t.refresh();

                  case 12:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    onLoad: function(e) {
        var t = e.hash_id;
        this.addSpeedTrackStartTime(N.PREVIEW_COMPELETE), this.hash_id = t;
        var i = getApp(), a = i.previewData;
        i.previewData = null, a ? (1 === a.pre_order && a.expected_arrival_info && (a.expected_arrival_info.unixtime = -1), 
        this.updatePreviewData(a, 2, {
            onload: !0
        })) : this.alert({
            message: "获取数据失败"
        });
    },
    onHide: function() {
        this.rightCornerQuit = !0, this.setPrevSourceUrl(this.data.poi_id, "");
    },
    onUnload: function() {
        !this.rightCornerQuit && this.data.isInSharing && this.setPrevSourceUrl && this.setPrevSourceUrl(this.data.poi_id, "preview");
    },
    getReportData: function() {
        var e = this.data, t = e.poi_id, i = e.isInSharing;
        return {
            cid: "c_ykhs39e",
            val: {
                poi_id: t,
                order_id: this.hash_id,
                custom: {
                    preview_type: i ? 1 : 0
                }
            }
        };
    }
};

(0, r.page)(x(X, b, B(function(e) {
    return {
        poi_id: e.poi.id,
        cautionValue: e.purchase.caution
    };
}, function(e) {
    return {
        setToken: function(t) {
            return e((0, s.setToken)(t));
        },
        dispatchAddrEdit: function(t) {
            return e((0, o.set)(t));
        },
        setRecipient: function(t) {
            return e((0, s.setRecipient)(t));
        },
        setSKUs: function(t) {
            return e((0, d.setSKUs)(t));
        },
        clearFood: function(t) {
            e((0, d.clear)(t));
        },
        delBuyTogetherInfoWithPoiId: function(t) {
            "function" == typeof c.delBuyTogetherInfoWithPoiId && e((0, c.delBuyTogetherInfoWithPoiId)({
                id: t
            }));
        },
        clearMyCartInSharing: function(t) {
            "function" == typeof d.clearMyCartInSharing && e((0, d.clearMyCartInSharing)(t));
        },
        setPrevSourceUrl: function(t, i) {
            void 0 !== c.setPrevSourceUrl && e((0, c.setPrevSourceUrl)({
                id: t,
                prevSourceUrl: i
            }));
        }
    };
}), V, S, R));