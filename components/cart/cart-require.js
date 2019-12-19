function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, a) {
            return function r(n, i) {
                try {
                    var o = e[n](i), s = o.value;
                } catch (n) {
                    return void a(n);
                }
                if (!o.done) return Promise.resolve(s).then(function(t) {
                    r("next", t);
                }, function(t) {
                    r("throw", t);
                });
                t(s);
            }("next");
        });
    };
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), a = require("../../utils/object-assign.js"), r = require("../../api/analytics.js").event, n = require("../../constants.js"), i = n.ACTION_CLICK, o = n.P_POI, s = n.P_SUBMIT_ORDER, c = n.B_PREORDER, d = n.B_PREVIEW, p = require("../../api/index.js"), u = p.orderPreview, l = p.syncFood, h = function(t) {
    return t.missingfoods || (t.length ? t : []);
};

module.exports = function(n) {
    a(n, {
        closeCartIfEmpty: function() {
            var t = this.data, e = t.isHiddenCart, a = t.cartFoodCount;
            e || 0 !== a || this.setData({
                isHiddenCart: !0
            });
        },
        onAddMoreClick: function() {
            this.setData({
                addMoreScrollShow: !0,
                isHiddenGetMore: !1,
                cartTipAnimation: "openCartTipAnimationClass",
                isHiddenCart: !0
            });
            var t = this.data, e = t.collect_type, a = t.container_type;
            this.lxAddMoreClick({
                collect_type: e,
                container_type: a,
                poi_id: this.poiID
            });
        },
        closeAddMore: function() {
            this.setData({
                isHiddenGetMore: !0,
                cartTipAnimation: "closeCartTipAnimationClass",
                addMoreScrollShow: !1
            }), this.addMoreProcess(this.data.poiData);
        },
        onClickClearMyCart: function() {
            this.clearMyCartInSharing({
                poiID: this.poiID
            }), this.closeCartIfEmpty();
        },
        onClickClearCart: function() {
            this.clearFood({
                poiID: this.poiID
            }), this.closeCartIfEmpty();
            var t = this.data.poiData.shopping_cart;
            t && t.activity_info && t.activity_info.content ? this.newCustomerProcess(t.activity_info.content) : this.setData({
                cartTipShow: !1,
                cartTip: null,
                addMoreShow: !1
            });
        },
        onClickCartFooter: function(a) {
            var r = this, n = a.detail, i = n.x, o = n.y, s = n.action;
            return t(e.default.mark(function a() {
                var n, c, d, p, u, l, h, g, f;
                return e.default.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        if (n = r.data.isHiddenCart, c = 0, r.data.isInSharing && r.data.isCreator ? c = 1 : r.data.isInSharing && !r.data.isCreator && (c = 2), 
                        "submit" !== s) {
                            a.next = 39;
                            break;
                        }
                        if (r.submitTouchPoint = i + "," + o, r.lxSubmitCart({
                            pindan_role: c,
                            poi_id: r.poiID,
                            container_type: r.data.container_type,
                            shop_cart_id: ""
                        }), d = [], r.data.cart[0].cart && (d = r.data.cart[0].cart), p = d.length, r.addSpeedTrackStartTime(8), 
                        r.data.isInSharing) {
                            a.next = 15;
                            break;
                        }
                        return a.next = 13, r.onClickSubmit();

                      case 13:
                        a.next = 36;
                        break;

                      case 15:
                        if (!r.data.isInSharing || !r.data.isCreator) {
                            a.next = 19;
                            break;
                        }
                        r.data.isInSharing && r.data.isOtherReady ? r.confirm({
                            title: "确定去结算吗？",
                            message: "去结算后，其他人将不可加入或修改商品",
                            textOK: "确认",
                            textCancel: "取消",
                            ok: function() {
                                var a = t(e.default.mark(function t() {
                                    var a, n, i, o;
                                    return e.default.wrap(function(t) {
                                        for (;;) switch (t.prev = t.next) {
                                          case 0:
                                            return t.prev = 0, a = getApp().store.getState(), n = a.poi.id, i = a.buyTogether[n], 
                                            o = i && i.shopCartId ? i.shopCartId : "", t.next = 5, r.onClickSyncFood();

                                          case 5:
                                            return r.pollingSocket && "function" == typeof r.pollingSocket.end && r.pollingSocket.end(), 
                                            t.next = 8, r.onClickSubmit(o);

                                          case 8:
                                            t.next = 14;
                                            break;

                                          case 10:
                                            t.prev = 10, t.t0 = t.catch(0), console.log(t.t0), r.toast({
                                                message: t.t0.msg
                                            });

                                          case 14:
                                          case "end":
                                            return t.stop();
                                        }
                                    }, t, r, [ [ 0, 10 ] ]);
                                }));
                                return function() {
                                    return a.apply(this, arguments);
                                };
                            }()
                        }) : r.data.isInSharing && !r.data.isOtherReady ? r.alert({
                            message: "无法结算，好友正在修改商品，可在购物车确认还在修改商品的好友",
                            textOK: "知道了"
                        }) : r.toast({
                            message: "拼单异常，返回正常点菜页"
                        }), a.next = 36;
                        break;

                      case 19:
                        if (!r.data.isInSharing || r.data.isCreator || 0 === p) {
                            a.next = 36;
                            break;
                        }
                        if (u = getApp().store.getState(), l = u.poi.id, h = u.buyTogether[l], g = h.sponsorUserId, 
                        f = h.shopCartId, u.user.open_id) {
                            a.next = 24;
                            break;
                        }
                        return r.toast({
                            message: "请去【我的】页面登陆，然后重新进入"
                        }), a.abrupt("return");

                      case 24:
                        return a.prev = 24, a.next = 27, r.onClickSyncFood();

                      case 27:
                        r.removeOtherCarts({
                            poiID: l
                        }), r.pollingSocket && "function" == typeof r.pollingSocket.end && r.pollingSocket.end(), 
                        wx.navigateTo({
                            url: "/pages/order-info/order-info?wm_poi_id=" + l + "&shop_cart_id=" + f + "&sponsor_user_id=" + g
                        }), a.next = 36;
                        break;

                      case 32:
                        a.prev = 32, a.t0 = a.catch(24), console.log(a.t0), r.toast({
                            message: a.t0.msg
                        });

                      case 36:
                        r.addSpeedTrackEndTime(8), a.next = 40;
                        break;

                      case 39:
                        "notsubmit" !== s && (r.lxToggleCart({
                            pindan_role: c,
                            poi_id: r.poiID,
                            container_type: r.data.container_type,
                            shopcart_status: n ? 1 : 0
                        }), r.changeCart());

                      case 40:
                      case "end":
                        return a.stop();
                    }
                }, a, r, [ [ 24, 32 ] ]);
            }))();
        },
        onClickAsyncFood: function() {
            var a = this;
            return t(e.default.mark(function t() {
                var r, n, i, o, s, c, d, p, u, h;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return r = a.data.cart, n = a.store.getState(), i = n.user.open_id, o = n.poi.id, 
                        s = n.buyTogether[o], c = s.sponsorUserId, d = s.shopCartId, p = r[0].cart, u = wx.getStorageSync("userInfo"), 
                        h = {
                            wm_poi_id: o,
                            multiple_cart_id: d,
                            select_product_list: p,
                            sponsor_user_id: c,
                            nickname: u.nickname,
                            avatar: u.avatarUrl
                        }, a.data.isCreator ? h.sponsor_open_id = i : h.partner_openid = i, t.next = 8, 
                        l(h);

                      case 8:
                      case "end":
                        return t.stop();
                    }
                }, t, a);
            }))();
        },
        onClickSyncFood: function() {
            var a = this;
            return t(e.default.mark(function t() {
                var r, n, i, o, s, c, d, p, u, h;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return r = a.data.cart, n = a.store.getState(), i = n.user.open_id, o = n.poi.id, 
                        s = n.buyTogether[o], c = s.sponsorUserId, d = s.shopCartId, t.prev = 2, p = r[0].cart, 
                        u = wx.getStorageSync("userInfo"), h = {
                            wm_poi_id: o,
                            multiple_cart_id: d,
                            select_product_list: p,
                            sponsor_user_id: c,
                            nickname: u.nickname,
                            avatar: u.avatarUrl
                        }, a.data.isCreator ? h.sponsor_open_id = i : h.partner_openid = i, t.next = 9, 
                        l(h);

                      case 9:
                        t.next = 15;
                        break;

                      case 11:
                        throw t.prev = 11, t.t0 = t.catch(2), 2 === t.t0.code ? a.alert({
                            message: t.t0.msg,
                            ok: function() {
                                a.delBuyTogetherInfoWithPoiId(o), a.checkIsInSharing(), a.ifRenderAllSpus({});
                            }
                        }) : (console.log(t.t0), a.toast({
                            message: t.t0.msg
                        })), t.t0;

                      case 15:
                      case "end":
                        return t.stop();
                    }
                }, t, a, [ [ 2, 11 ] ]);
            }))();
        },
        changeCart: function() {
            var t = this.data, e = t.isHiddenCart, a = t.cartFoodCount;
            if (!e || 0 !== a) {
                var r = {};
                if (this.data.isIpx && !this.data.isInSharing ? (r.open = "openCartAnimationClassOnIphoneX", 
                r.close = "closeCartAnimationClassOnIphoneX") : this.data.isIpx && this.data.isInSharing ? (r.open = "openCartAnimationClassOnIphoneXinSharing", 
                r.close = "closeCartAnimationClassOnIphoneXinSharing") : this.data.isIpx || this.data.isInSharing ? !this.data.isIpx && this.data.isInSharing && (r.open = "openCartAnimationClassInSharing", 
                r.close = "closeCartAnimationClassInSharing") : (r.open = "openCartAnimationClass", 
                r.close = "closeCartAnimationClass"), e) this.setData({
                    isHiddenCart: !e,
                    cartAnimation: e ? r.open : r.close,
                    isHiddenGetMore: !0,
                    addMoreScrollShow: !1
                }); else {
                    this.setData({
                        cartAnimation: e ? r.open : r.close,
                        addMoreScrollShow: !1,
                        isHiddenGetMore: !0
                    });
                    var n = this;
                    setTimeout(function() {
                        n.setData({
                            isHiddenCart: !e
                        });
                    }, 250);
                }
                this.addMoreProcess(this.data.poiData);
            }
        },
        redirectToPreview: function(a, r, n, i) {
            var o = this;
            return t(e.default.mark(function t() {
                var s;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return o.startLazyLoading(), t.next = 3, u({
                            trace_tag: o.traceTagEnd({
                                tgt_block: d
                            }),
                            touchPoint: a,
                            data: {
                                cart_id: r,
                                poicoupon_view_id: 0,
                                wx_pay_params: {
                                    openid: n,
                                    app_id: "wx2c348cf579062e56"
                                }
                            }
                        });

                      case 3:
                        s = t.sent, o.clearLazyLoading(), o.setToken({
                            token: s.token
                        }), getApp().previewData = s, wx.navigateTo({
                            url: "../preview/preview?hash_id=" + i
                        });

                      case 9:
                      case "end":
                        return t.stop();
                    }
                }, t, o);
            }))();
        },
        onClickSubmit: function(n) {
            var p = this;
            return t(e.default.mark(function t() {
                var l, g, f, _, m, C, v, k, x, S;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (r({
                            event_type: "click",
                            val_bid: "b_oZO0D"
                        }), p.addSpeedTrackStartTime(7), l = p.store, g = p.submitTouchPoint, (f = l.getState()).user.token) {
                            t.next = 7;
                            break;
                        }
                        return p.navigateToLogin("submit"), t.abrupt("return");

                      case 7:
                        return p.loading(!0), t.prev = 8, _ = p.poiID, m = p.hash_id, p.traceTagStart({
                            src_page: o,
                            src_page_object_id: _,
                            src_block: c,
                            tgt_page: s,
                            extra: {
                                poi_id: _
                            },
                            action: i
                        }), C = getApp().store.getState(), v = C.user.open_id, p.startLazyLoading(), t.next = 15, 
                        u({
                            trace_tag: p.traceTagEnd({
                                tgt_block: d
                            }),
                            touchPoint: g,
                            data: {
                                cart_id: n,
                                poicoupon_view_id: 0,
                                wx_pay_params: {
                                    openid: v,
                                    app_id: "wx2c348cf579062e56"
                                }
                            }
                        });

                      case 15:
                        k = t.sent, p.addSpeedTrackEndTime(7), p.clearLazyLoading(), p.setToken({
                            token: k.token
                        }), getApp().previewData = k, wx.navigateTo({
                            url: "../preview/preview?hash_id=" + m
                        }), p.loading(!1), t.next = 54;
                        break;

                      case 25:
                        if (t.prev = 25, t.t0 = t.catch(8), x = t.t0.code, S = t.t0.message, k = t.t0.data, 
                        p.loading(!1), p.clearLazyLoading(), 3 === x) return p.alert({
                            message: S,
                            textOK: "知道了",
                            ok: function() {
                                for (var t = p.poiID, e = p.data.cart, r = Object.create(null), n = e.length - 1; -1 < n; --n) {
                                    var i = e[n];
                                    r[i.id] = i;
                                }
                                var o = h(k).map(function(t) {
                                    var e = t.id, n = t.stock;
                                    return a({}, r[e], {
                                        count: Math.max(0, Math.min(r[e].count, n))
                                    });
                                });
                                p.setSKUs({
                                    poiID: t,
                                    skus: o
                                });
                                var s = p.data, c = s.cartFoodCount;
                                s.isHiddenCart || p.setData({
                                    isHiddenCart: !c
                                }), p.reload();
                            }
                        }), t.abrupt("return");
                        t.next = 37;
                        break;

                      case 37:
                        if (5 === x) return p.setToken({
                            token: k.order_token
                        }), getApp().verifyPhoneData = k, wx.navigateTo({
                            url: "../verify-phone/verify-phone"
                        }), t.abrupt("return");
                        t.next = 45;
                        break;

                      case 45:
                        if (10 === x || 401 === x) return p.navigateToLogin("submit"), t.abrupt("return");
                        t.next = 50;
                        break;

                      case 50:
                        if (4 === x) return p.alert({
                            message: S,
                            ok: function() {
                                p.reload();
                            }
                        }), t.abrupt("return");
                        t.next = 53;
                        break;

                      case 53:
                        p.toast({
                            message: S || "未知错误 " + x
                        });

                      case 54:
                      case "end":
                        return t.stop();
                    }
                }, t, p, [ [ 8, 25 ] ]);
            }))();
        }
    });
};