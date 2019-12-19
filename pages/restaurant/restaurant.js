function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, o) {
            return function a(n, r) {
                try {
                    var i = e[n](r), s = i.value;
                } catch (n) {
                    return void o(n);
                }
                if (!i.done) return Promise.resolve(s).then(function(t) {
                    a("next", t);
                }, function(t) {
                    a("throw", t);
                });
                t(s);
            }("next");
        });
    };
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = t(require("../../npm/babel-runtime/regenerator/index.js")), n = function(t, e) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return function(t, e) {
        var o = [], a = !0, n = !1, r = void 0;
        try {
            for (var i, s = t[Symbol.iterator](); !(a = (i = s.next()).done) && (o.push(i.value), 
            !e || o.length !== e); a = !0) ;
        } catch (t) {
            n = !0, r = t;
        } finally {
            try {
                !a && s.return && s.return();
            } finally {
                if (n) throw r;
            }
        }
        return o;
    }(t, e);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, r = "function" == typeof Symbol && "symbol" == o(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : o(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : o(t);
}, i = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, s = require("../../npm/@dp/owl-wxapp/es6/index.js"), c = require("../../actions/poi.js"), u = require("../../actions/purchase.js"), p = t(require("../../utils/pollingSocket.js")), d = require("../../actions/cart.js"), l = require("../../actions/buy-together.js"), h = t(require("../loginV2/login-api.js")), f = require("../../components/food-count-unit/food-count-unit-require.js"), g = require("../../components/cart/cart-require.js"), m = require("./log.js"), _ = require("../../utils/image-scale.js"), S = require("../base.js"), y = require("../../utils/mix.js"), v = require("../../utils/random-item.js"), I = require("../../utils/object-assign.js"), T = require("../../components/rohr/rohr.js"), x = require("./modal-food/modal-food.js"), C = require("./spuItem-template/spuShowRange.js"), w = require("./product-info/product-info.js"), k = require("../../components/common-share/share.js"), D = require("../../components/owl-watcher/owl-watcher.js"), b = require("../../activity/poi-scan/poi-scan.js"), L = require("../../constants.js"), A = L.SHARE_MESSAGES_RESTAURANT, P = L.ANTI_SPIDER_FORCE_LOGIN, M = L.CODE_GOTO_LOGIN, U = L.CODE_PRELOGIN, O = L.ANTI_SPIDER_PRELOGIN, B = require("../../constants.js").B_FOOD, E = require("../../api/index.js"), F = E.poiFood, j = E.grabPoiCoupon, N = E.poiInfo, q = E.poiCommentInfo, W = E.getThisCoupon, R = E.poiFoodCollect, V = E.curStatus, H = E.sponsorCancel, G = E.partnerCancel, K = E.allCartInfo, z = require("../../weapp-redux/index.js").connect, X = require("../../reducers/selectors/cart.js"), Y = require("../../utils/format-price.js"), Q = require("../../utils/throttle.js"), J = function(t, e) {
    if (e) for (var o = e.spu_id, a = 0, n = t.length; a < n; a++) for (var r = t[a], i = r.spus, s = r.tag, c = 0, u = i.length; c < u; c++) if ("" + i[c].id === o) return [ a, c, s ];
    return [ -1, -1 ];
}, Z = {
    normal: 1,
    busy: 2,
    closed: 3,
    offline: 4
}, $ = {
    hasAlreadyBeTop: !1,
    hasAlreadyBeBottom: !1,
    currentRightSrollTop: 0,
    isScollFunctionActived: !0,
    isAlreadyBeTopGoTop: "",
    isAlreadyBeTopGoDown: "",
    isStarted: !1,
    touchStartPosition: 0,
    scrollTopRecord: 0
}, tt = !1, et = [ {
    up: "scrollScrollUp",
    down: "scrollScrollDown"
}, {
    up: "scrollScrollUpWithCoupon",
    down: "scrollScrollDownWithCoupon"
} ], ot = {
    normalWithoutCoupon: "164rpx",
    normalWithCoupon: "224rpx",
    shareWithoutCoupon: "184rpx",
    shareWithCoupon: "244rpx"
}, at = {
    up: "",
    down: "",
    scrollTop: ""
}, nt = {
    pageName: "restaurant",
    data: {
        dataIsLoaded: !1,
        isFirstLoadShouldPrevent: !0,
        modalShown: !1,
        scrollToChooseType: "",
        activeTypeIndex: 0,
        activityTag: 0,
        resetScrollTop: 0,
        isHiddenCart: !0,
        activePanel: 0,
        poiInfo: null,
        commentInfo: null,
        discountIndex: 0,
        couponModalShown: !1,
        couponlistBlocking: !1,
        couponlist: null,
        poi_coupon_list: [],
        currentCategorieType: 0,
        poiCommentOffset: 0,
        poiCommentTotal: null,
        label_id: 0,
        loadingLogo: !0,
        menuTabs: [],
        menuData: [],
        qualificationShown: !0,
        onLoadTagIndex: 0,
        onLoadSpuIndex: 0,
        onLoadFocusSpu: "",
        scrollScrollAnimation: "",
        mainScrollTop: "",
        ifCouponModalShouldShow: !1,
        couponAnimation: "",
        cartTipShow: !1,
        cartTip: null,
        addMoreShow: !1,
        addMoreSpuList: null,
        addMoreScrollShow: !1,
        hasEmptySolt: !1,
        emptySoltHeight: 0,
        offlineMessage: "",
        isHiddenGetMore: !0,
        cartTipAnimation: "",
        container_type: "",
        collect_type: 0,
        ableToScroll: !0,
        isIpx: /iPhone X/.test(wx.getSystemInfoSync().model),
        hasUserInfo: !(!wx.canIUse || !wx.canIUse("button.open-type.getUserInfo")),
        throttleDelay: /iPhone/.test(wx.getSystemInfoSync().model) && !/iPhone 5/.test(wx.getSystemInfoSync().model) ? 0 : 300,
        showRange: 1,
        spuTagEachHeight: [],
        tagView: "",
        headerInfoAnimation: "",
        spuScrollHeight: 0,
        spuTagPositionList: [],
        alreadyCollected: 0,
        isCollecting: 0,
        sharingUserImgUrl: [],
        isCreator: !1,
        isInSharing: !1,
        isNewProducts: !1
    },
    pollingSocketInterval: 5e3,
    pingSponsorUserId: "",
    shareTime: "",
    poiID: 0,
    openID: "",
    onLoadFocus: null,
    addMoreSpuHistoryList: [],
    getCurrentUserInfo: function() {
        var t = getApp().store.getState().user, e = {};
        try {
            e = wx.getStorageSync("user");
        } catch (t) {
            console.log(t);
        }
        return {
            user_id: t.user_id || e.user_id,
            open_id: t.open_id || e.open_id,
            token: t.token || e.token
        };
    },
    onClickPanelHeader: function(t) {
        var e = t.currentTarget.dataset.index, o = parseInt(e, 10) || 0;
        this.setData({
            activePanel: o
        }), 1 === o ? this.loadCommentInfo(!0) : 2 === o && this.loadPoiInfo();
    },
    LogWhenChangeTabHeader: function(t) {
        var e = this.poiID, o = this.data.container_type, a = this.data.activeTypeIndex, n = this.store.getState().poi.food_spu_tags;
        void 0 === n[a] && this.lxLogWXAppError("UNDEFINED ", void 0, {
            food_spu_tags: n,
            activeTypeIndex: a,
            source: "LogWhenChangeTabHeader"
        });
        var r = {
            poi_id: e,
            container_type: o,
            targetIndex: t,
            cat_id: n[a].tag
        };
        this.lxClickSwiperTabHeader(r);
    },
    swiperTo: -1,
    onChangeSwiper: function(t) {
        var e = this, o = t.detail.current;
        this.setData({
            activePanel: o
        }), this.LogWhenChangeTabHeader(o), 1 === o ? (this.clearTimeout(this.swiperTo), 
        this.swiperTo = setTimeout(function() {
            e.loadCommentInfo(!0);
        }, 500)) : 2 === o && (this.clearTimeout(this.swiperTo), this.swiperTo = setTimeout(function() {
            e.loadPoiInfo();
        }, 500));
    },
    modalChange: function(t) {
        var e = this;
        if (this.data.modalShown) {
            var o = this;
            this.setData({
                headerInfoAnimation: "openCouponAnimationClass"
            }, function() {
                setTimeout(function() {
                    o.setData({
                        modalShown: !e.data.modalShown
                    });
                }, 200);
            });
        } else {
            var a = this.data.poiData.poi_info, n = this.data.container_type, r = {
                poi_id: a.id,
                container_type: n
            };
            0 < a.discounts2.length && t.currentTarget.dataset.isdiscount && this.lxClickDiscounts(r), 
            this.setData({
                modalShown: !this.data.modalShown,
                headerInfoAnimation: "closeCouponAnimationClass"
            });
        }
    },
    onClickRefreshPage: function() {
        this.reload();
    },
    LogWhenAddFood: function(t) {
        var e = this.data, o = e.poiData.poi_info, a = e.activeTypeIndex, n = this.store.getState().poi.food_spu_tags, r = this.data.container_type, i = void 0, s = !1;
        void 0 === n[a] && this.lxLogWXAppError("UNDEFINED ", void 0, {
            food_spu_tags: n,
            activeTypeIndex: a,
            source: "LogWhenAddFood"
        }), n[a].spus.forEach(function(e, o) {
            e.id === t.id && (i = o, s = !0);
        });
        var c = {
            poi_id: o.id,
            spu_id: t.id,
            category_id: n[a].tag,
            category_index: a,
            category_type: n[a].type,
            container_type: r,
            friend_praise: t.friends_praise_content ? 1 : 0,
            product_index: i
        };
        s && this.lxClickAddFood(c);
    },
    addMoreProcess: function(t) {
        var o = this;
        return e(a.default.mark(function e() {
            var n, r, i, s, c, u, p, d, l, h, f;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (n = o.data, r = n.cartFoodCount, i = n.cartFoodPrice, s = n.addMoreScrollShow, 
                    c = n.isInSharing, u = t.poi_info.min_price, p = t.shopping_cart, d = parseFloat(i), 
                    l = !1, !(10 <= parseFloat(u) && p && d >= p.min_fee_cart_tip && d < u)) {
                        e.next = 12;
                        break;
                    }
                    if (o.setData({
                        cartTipShow: !0,
                        cartTip: [ "还差", Y(100 * (u - d)) + "元", "就能起送" ]
                    }), l = !0, s || c) {
                        e.next = 12;
                        break;
                    }
                    return e.next = 10, o.fetchAddMoreList(u, d);

                  case 10:
                    (h = e.sent) && 0 < h.length && (o.setData({
                        addMoreSpuList: h,
                        addMoreShow: !0,
                        collect_type: 1
                    }), o.lxAddMoreView({
                        container_type: o.data.container_type,
                        poi_id: o.poiID,
                        collect_type: 1
                    }));

                  case 12:
                    l || (f = o, setTimeout(function() {
                        return f.addFullProcess(d, r, p);
                    }, 0));

                  case 13:
                  case "end":
                    return e.stop();
                }
            }, e, o);
        }))();
    },
    addFullProcess: function(t, o, n) {
        var r = this;
        return e(a.default.mark(function e() {
            var i, s, c, u, p, d, l, h, f, g, m, _, S, y, v, I, T, x;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (i = !1, s = r.data, c = s.addMoreScrollShow, u = s.isInSharing, p = s.couponGoodsAddCnt, 
                    d = s.newUserGoodsAddCnt, !p && !d || n.activity_info && n.activity_info.content) {
                        e.next = 6;
                        break;
                    }
                    r.setData({
                        cartTip: null
                    }), e.next = 43;
                    break;

                  case 6:
                    if (!(0 < o && n.activity_info && n.activity_info.policy) || n.activity_info.content) {
                        e.next = 43;
                        break;
                    }
                    if (l = JSON.parse(n.activity_info.policy), !Array.isArray(l)) {
                        e.next = 41;
                        break;
                    }
                    h = l.length, f = 0;

                  case 11:
                    if (!(f < h)) {
                        e.next = 41;
                        break;
                    }
                    if (g = l[f], m = g.priceHigher, _ = g.priceLower, S = g.reduce, !(0 === f && t < _)) {
                        e.next = 25;
                        break;
                    }
                    if (r.setData({
                        cartTipShow: !0,
                        cartTip: [ u ? "再拼" : "再买", Y(100 * (_ - t)) + "元", "可减", S + "元" ]
                    }), c || u) {
                        e.next = 21;
                        break;
                    }
                    return e.next = 18, r.fetchAddMoreList(_, t);

                  case 18:
                    y = e.sent, v = 10 <= _ && t < _ && t >= n.full_minus_grad * _ && !!y && 0 < y.length, 
                    r.setData({
                        addMoreSpuList: y,
                        addMoreShow: v,
                        collect_type: v ? 2 : 0
                    });

                  case 21:
                    return i = !0, e.abrupt("break", 41);

                  case 25:
                    if (!(_ <= t && t < m && f < h - 1)) {
                        e.next = 37;
                        break;
                    }
                    if (r.setData({
                        cartTipShow: !0,
                        cartTip: [ "已减" + S + "元，再" + (u ? "拼" : "买"), Y(100 * (l[f + 1].priceLower - t)) + "元", "可减", l[f + 1].reduce + "元" ],
                        addMoreShow: !1
                    }), c || u) {
                        e.next = 33;
                        break;
                    }
                    return e.next = 30, r.fetchAddMoreList(m, t);

                  case 30:
                    I = e.sent, T = l[f + 1] && 10 <= l[f + 1].priceLower && t < l[f + 1].priceLower && t >= n.full_minus_grad * l[f + 1].priceLower && !!I && 0 < I.length, 
                    r.setData({
                        addMoreSpuList: I,
                        addMoreShow: T,
                        collect_type: T ? 2 : 0
                    });

                  case 33:
                    return i = !0, e.abrupt("break", 41);

                  case 37:
                    f === h - 1 && _ <= t && (r.setData({
                        cartTipShow: !0,
                        cartTip: [ "已满", _ + "元", "可减", S + "元" ],
                        addMoreShow: !1
                    }), i = !0);

                  case 38:
                    f++, e.next = 11;
                    break;

                  case 41:
                    x = r, setTimeout(function() {
                        var t = x.data, e = t.addMoreShow, o = t.collect_type, a = t.container_type;
                        !t.addMoreScrollShow && e && 2 === o && r.lxAddMoreView({
                            container_type: a,
                            poi_id: r.poiID,
                            collect_type: o
                        });
                    }, 0);

                  case 43:
                    n.activity_info && n.activity_info.content ? r.newCustomerProcess(n.activity_info.content) : !i && 0 === p && 0 === d && n && n.prompt_text ? r.setData({
                        cartTipShow: !0,
                        cartTip: [ n.prompt_text ],
                        addMoreShow: !1
                    }) : i || r.setData({
                        cartTip: null,
                        addMoreShow: !1
                    });

                  case 44:
                  case "end":
                    return e.stop();
                }
            }, e, r);
        }))();
    },
    newCustomerProcess: function(t) {
        var e = this.data.alreadySelecCount.act41;
        e && 0 !== e ? this.setData({
            cartTipShow: !1,
            isNewProducts: !0
        }) : this.setData({
            cartTipShow: !0,
            cartTip: [ t ],
            addMoreShow: !1,
            isNewProducts: !1
        });
    },
    mockComponentAPIAdd: function(t) {
        var e = t.currentTarget.dataset;
        this.onClickAddFood({
            detail: e
        });
    },
    mockComponentAPIDel: function(t) {
        var e = t.currentTarget.dataset;
        this.onClickDelFood({
            detail: e
        });
    },
    fetchAddMoreList: function(t, o) {
        var n = this;
        return e(a.default.mark(function e() {
            var r, i, s, c, u, p, d;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (!(0 < n.addMoreSpuHistoryList.length)) {
                        e.next = 9;
                        break;
                    }
                    r = 0;

                  case 2:
                    if (!(r < n.addMoreSpuHistoryList.length)) {
                        e.next = 9;
                        break;
                    }
                    if (i = n.addMoreSpuHistoryList[r], s = i.tp, c = i.op, u = i.spuList, s === t && c === o) return e.abrupt("return", u);
                    e.next = 6;
                    break;

                  case 6:
                    r++, e.next = 2;
                    break;

                  case 9:
                    return e.prev = 9, e.next = 12, R({
                        wm_poi_id: n.poiID,
                        poi_min_price: t,
                        order_price: o
                    });

                  case 12:
                    return p = e.sent, n.data.isSuperMarket && n.productsCollect(p), p = n.generateSpuList(p), 
                    n.addMoreSpuHistoryList = n.addMoreSpuHistoryList.concat({
                        tp: t,
                        op: o,
                        spuList: p
                    }), e.abrupt("return", p);

                  case 19:
                    e.prev = 19, e.t0 = e.catch(9), d = e.t0.message, console.log("请求凑一凑商品列表error：", d);

                  case 23:
                    return n.loading(!1), e.abrupt("return", null);

                  case 25:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 9, 19 ] ]);
        }))();
    },
    generateSpuList: function(t) {
        var e = this, o = this.store.getState().cart, a = [];
        return t.forEach(function(t) {
            var n = o[e.poiID] && 1 < o[e.poiID].length && o[e.poiID][0].cart && o[e.poiID][0].cart.find(function(e) {
                return e.id === t.skus[0].id;
            }), r = n && n.count || 0;
            a.push({
                spuid: t.id,
                skuid: t.skus[0].id,
                name: t.name,
                price: t.min_price,
                minOrderCount: parseInt(t.skus[0].min_order_count, 10),
                count: r,
                totalPrice: Y(r * t.min_price * 100),
                attrs: t.attrs || []
            });
        }), a;
    },
    onClickGetCoupon: function() {
        var t = this;
        return e(a.default.mark(function e() {
            var o, n, r, i, s, c, u, p, d;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (t.loading(!0), (o = t.store.getState()).user.token) {
                        e.next = 5;
                        break;
                    }
                    return t.navigateToLogin("coupon"), e.abrupt("return");

                  case 5:
                    return e.prev = 5, e.next = 8, j({
                        poi_id: t.poiID,
                        load_type: 1
                    });

                  case 8:
                    n = e.sent, r = "去领取", i = 0, n.wmEPoiCouponInfos && n.wmEPoiCouponInfos.forEach(function(t) {
                        i += t.price;
                    }), n.statusText2 = "快去下单吧", s = n.status, 0 === n.status ? (n.statusText = i, s = 1, 
                    r = "已领取") : 1 === n.status ? (n.limitNewCustom ? n.statusText = "不要贪心哦，您已领过券啦" : n.statusText = "您已领过券啦", 
                    r = "已领取") : 2 === n.status ? (n.statusText = "仅限本店新用户专享", n.statusText2 = "看看其他优惠吧") : (n.statusText = "券已抢光啦", 
                    n.statusText2 = "下次早点来哦", r = "已抢光"), c = t.data.poi_coupon_list.map(function(t) {
                        return I({}, t, {
                            status: s,
                            get_button_content: r
                        });
                    }), u = {
                        couponlist: n,
                        poi_coupon_list: c
                    }, t.setData(u), t.changeCoupon(), e.next = 26;
                    break;

                  case 21:
                    e.prev = 21, e.t0 = e.catch(5), p = e.t0.code, d = e.t0.message, 401 === p ? t.alert({
                        message: d,
                        ok: function() {
                            t.navigateToLogin("coupon");
                        }
                    }) : t.alert({
                        message: d
                    });

                  case 26:
                    t.loading(!1);

                  case 27:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 5, 21 ] ]);
        }))();
    },
    scrollProductsTime: 0,
    onScrollToupperProducts: function() {
        this.data.isSuperMarket || ($.hasAlreadyBeTop = !0, $.currentRightSrollTop = 0, 
        $.isAlreadyBeTopGoTop = "");
    },
    LogAllTagSpus: function(t, e, o) {
        e || (e = this.data.container_type), o || (o = this.poiID);
        var a = this;
        setTimeout(function() {
            var n = [];
            t.forEach(function(t, e) {
                t.spus.forEach(function(o) {
                    o.category_index = e, o.category_type = t.type;
                }), n = n.concat(t.spus);
            }), n.forEach(function(t, n) {
                var r = {
                    spu_id: t.id,
                    poi_id: o,
                    container_type: e,
                    friend_praise: t.friends_praise_content ? 1 : 0,
                    category_index: t.category_index,
                    product_index: n,
                    product_tag: t.tag
                };
                a.lxViewSpu(r);
            });
        }, 0);
    },
    LogViewTagSpus: function(t, e, o, a) {
        o || (o = this.data.container_type), a || (a = this.poiID);
        var n = this;
        setTimeout(function() {
            var r = t.type;
            0 !== t.spus.length && t.spus.forEach(function(i, s) {
                var c = {
                    spu_id: i.id,
                    poi_id: a,
                    container_type: o,
                    category_type: r,
                    friend_praise: i.friends_praise_content ? 1 : 0,
                    category_index: e,
                    product_index: s,
                    product_tag: t.tag
                };
                n.lxViewSpu(c);
            });
        }, 0);
    },
    onScrollBottomProducts: function() {
        var t = this;
        return e(a.default.mark(function e() {
            var o, n, r, i, s, c, u, p, d, l, h, f, g;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, t.data.isSuperMarket) {
                        e.next = 6;
                        break;
                    }
                    $.hasAlreadyBeBottom = !1, t.data.isUnderSpuMaxNumber && (o = t.data, n = o.isUnderSpuMaxNumber, 
                    r = o.spuTagShouldShow, n && t.setData({
                        spuTagShouldShow: r.map(function() {
                            return !0;
                        })
                    })), e.next = 21;
                    break;

                  case 6:
                    if (i = t.store.getState(), s = i.poi.food_spu_tags, c = t.data.activeTypeIndex, 
                    !(u = s[c]).has_next_page) {
                        e.next = 21;
                        break;
                    }
                    if (p = Date.now(), Math.abs(p - t.scrollProductsTime) < 500) return e.abrupt("return");
                    e.next = 13;
                    break;

                  case 13:
                    return t.loading(!0), t.scrollProductsTime = p, e.next = 17, t.api.spuTagProducts({
                        wm_poi_id: t.poiID,
                        spu_tag_id: u.tag,
                        tag_type: u.type,
                        page_index: u.current_page + 1
                    });

                  case 17:
                    d = e.sent, t.setProducts(d), l = t.store.getState(), h = l.poi.food_spu_tags, t.setData({
                        menuData: h[c]
                    });

                  case 21:
                    e.next = 29;
                    break;

                  case 23:
                    e.prev = 23, e.t0 = e.catch(0), f = e.t0.message, g = e.t0.code, t.toast({
                        message: f
                    }), g === M && (t[P] = function() {
                        t.onScrollBottomProducts();
                    });

                  case 29:
                    t.loading(!1);

                  case 30:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 0, 23 ] ]);
        }))();
    },
    chooseType: function(t) {
        var o = this, n = t.currentTarget.dataset.index;
        return e(a.default.mark(function t() {
            var e, r, i, s, c, u, p, d, l, h, f, g, m, _, S, y, v, I, T, x, C, w;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (t.prev = 0, e = o.store.getState(), r = e.poi.food_spu_tags, i = r[n], s = o.data.poiData.poi_info, 
                    c = o.data.container_type, u = {
                        poi_id: s.id,
                        container_type: c,
                        category_index: n,
                        category_name: i.name,
                        category_type: i.type,
                        category_id: r[n].tag
                    }, o.lxClickLeftTab(u), o.data.isSuperMarket && 0 === i.spus.length) return o.loading(!0), 
                    t.prev = 9, t.next = 12, o.api.spuTagProducts({
                        wm_poi_id: o.poiID,
                        spu_tag_id: i.tag,
                        tag_type: i.type,
                        page_index: 0
                    });
                    t.next = 30;
                    break;

                  case 12:
                    p = t.sent, o.setProducts(p), d = o.store.getState(), l = d.poi.food_spu_tags, h = "", 
                    (f = l && l[n]) instanceof Object && f.spus[0] instanceof Object && (h = "spu-" + f.tag + "-" + f.spus[0].id), 
                    o.setData({
                        tagView: h,
                        activeTypeIndex: parseInt(n, 10) || 0,
                        menuData: f || {
                            name: (r[n] || {}).name,
                            spus: []
                        },
                        onLoadSpuIndex: -1
                    }), t.next = 25;
                    break;

                  case 21:
                    throw t.prev = 21, t.t0 = t.catch(9), t.t0 && t.t0.code === M && (o[P] = function() {
                        o.chooseType({
                            currentTarget: {
                                dataset: {
                                    index: n
                                }
                            }
                        });
                    }), t.t0;

                  case 25:
                    return t.prev = 25, o.loading(!1), t.finish(25);

                  case 28:
                    t.next = 31;
                    break;

                  case 30:
                    if (o.data.isUnderSpuMaxNumber) if (g = o.data.spuTagShouldShow, m = o.checkCurrentIfNeedToLoadMore(n), 
                    _ = o.data.spuTagPositionList, S = o.data.spuScrollHeight, g && _) {
                        if (y = g.map(function(t, e) {
                            return e <= n + m || t;
                        }), v = !0, I = _[n], (T = _[_.length - 2]) - I && (v = !1), x = n, !v) for (C = _.length - 3; T - _[C] < S && 1 <= C; C--) x = C - 1;
                        o.setData({
                            tagView: "spu-" + i.tag + "-" + i.spus[0].id,
                            tagViewName: v ? i.name : r[x].name,
                            tagViewDes: v ? i.description : r[x].description,
                            activeTypeIndex: n,
                            spuTagShouldShow: y,
                            onLoadSpuIndex: -1
                        });
                    } else o.toast({
                        message: "手速太快了，请稍后再试"
                    }); else o.loadTagFood("CHOOSE_TYPE", n);

                  case 31:
                    t.next = 37;
                    break;

                  case 33:
                    t.prev = 33, t.t1 = t.catch(0), w = t.t1.message, o.toast({
                        message: w
                    });

                  case 37:
                  case "end":
                    return t.stop();
                }
            }, t, o, [ [ 0, 33 ], [ 9, 21, 25, 28 ] ]);
        }))();
    },
    changeCoupon: function() {
        var t = this.data.couponModalShown;
        this.setData({
            couponModalShown: !t
        });
    },
    updateSubmitTouchPoint: function(t) {
        var e = t.detail, o = e.x, a = e.y;
        this.submitTouchPoint = o + "," + a;
    },
    navigateToLogin: function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
        this.initLoginSDK({
            type: 1,
            afterLoginAction: t
        });
    },
    toggleCouponLayer: function() {
        var t = this, e = void 0;
        if ("closeCouponAnimationClass" === this.data.couponAnimation) {
            e = "openCouponAnimationClass";
            var o = this;
            this.setData({
                couponAnimation: e
            }, function() {
                setTimeout(function() {
                    o.setData({
                        ifCouponModalShouldShow: !t.data.ifCouponModalShouldShow
                    });
                }, 200);
            });
        } else e = "closeCouponAnimationClass", this.setData({
            ifCouponModalShouldShow: !this.data.ifCouponModalShouldShow,
            couponAnimation: e
        });
    },
    onClickmyCancel: function() {
        var t, o, n = this, r = this.store.getState(), s = r.poi, c = s.id, u = s.data.shopping_cart_entrance.visible, p = r.user.open_id, d = r.buyTogether[c] || {}, l = d.sponsorUserId, h = d.shopCartId, f = this;
        this.data.isCreator && this.confirm({
            title: "确定取消吗？",
            message: "取消后不会保留此次拼单内容",
            textOK: "取消拼单",
            textCancel: "继续拼单",
            ok: (t = e(a.default.mark(function t() {
                var e, o, r;
                return a.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.prev = 0, t.next = 3, H({
                            multiple_cart_id: h,
                            sponsor_user_id: l
                        });

                      case 3:
                        e = t.sent, console.log("取消pd", e), f.delBuyTogetherInfoWithPoiId(c), f.reload(), 
                        f.lxClickCancel(), t.next = 15;
                        break;

                      case 10:
                        t.prev = 10, t.t0 = t.catch(0), o = t.t0.code, r = t.t0.message, 1 === o && n.alert({
                            message: r
                        });

                      case 15:
                      case "end":
                        return t.stop();
                    }
                }, t, n, [ [ 0, 10 ] ]);
            })), function() {
                return t.apply(this, arguments);
            })
        }), this.data.isCreator || (h && l ? this.confirm({
            message: "是否退出拼单？",
            textOK: "确认",
            ok: (o = e(a.default.mark(function t() {
                var e, o, r;
                return a.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.prev = 0, t.next = 3, G({
                            multiple_cart_id: h,
                            sponsor_user_id: l,
                            partner_open_id: p
                        });

                      case 3:
                        e = t.sent, console.log("res", e), n.removeOtherCarts({
                            poiID: n.poiID
                        }), f.delBuyTogetherInfoWithPoiId(c), f.checkIsInSharing(), f.lxClickCancel(), u && n.setData({
                            buyTogetherShareBtn: i({}, n.data.buyTogetherShareBtn, {
                                show: u
                            })
                        }), t.next = 20;
                        break;

                      case 13:
                        t.prev = 13, t.t0 = t.catch(0), o = t.t0.code, r = t.t0.message, n.alert({
                            message: r
                        }), f.checkIsInSharing(), 2 === o && (n.removeOtherCarts({
                            poiID: n.poiID
                        }), n.pollingSocket && "function" == typeof n.pollingSocket.end && n.pollingSocket.end(), 
                        wx.navigateTo({
                            url: "/pages/order-info/order-info?wm_poi_id=" + n.poiID + "&shop_cart_id=" + h + "&sponsor_user_id=" + l + "&patch_order_role=1"
                        }));

                      case 20:
                      case "end":
                        return t.stop();
                    }
                }, t, n, [ [ 0, 13 ] ]);
            })), function() {
                return o.apply(this, arguments);
            })
        }) : (this.removeOtherCarts({
            poiID: this.poiID
        }), f.delBuyTogetherInfoWithPoiId(c), f.checkIsInSharing()));
    },
    onClickmyInvite: function() {
        this.lxClickInvite();
    },
    checkIsInSharing: function(t) {
        var e = this, o = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], a = {
            isInSharing: !1,
            isCreator: !1
        };
        try {
            this.pollingSocket && "function" == typeof this.pollingSocket.end && this.pollingSocket.end();
            var n = this.store.getState(), s = n.poi, c = s.id, u = s.data, d = n.user, l = d.user_id, h = d.open_id, f = n.buyTogether[c], g = u && u.poi_info && u.poi_info.poi_coupon, m = t || (g ? g.coupon_list : []);
            if (!f) throw m && 0 !== m.length ? this.setData({
                mainScrollTop: ot.normalWithCoupon
            }) : this.setData({
                mainScrollTop: ot.normalWithoutCoupon
            }), this.removeOtherCarts({
                poiID: c
            }), this.addMoreProcess(this.data.poiData), {
                msg: "thisShopBuyTogether为空"
            };
            var _ = f.sponsorUserId, S = f.shopCartId, y = f.clearCart;
            if (S) {
                o || this.lxLogSharingRestaurant(), this.setData({
                    mainScrollTop: ot.shareWithoutCoupon
                });
                var v = {
                    multiple_cart_id: S,
                    sponsor_user_id: _,
                    wm_poi_id: c
                }, I = this;
                a.isInSharing = !0, +l == +_ ? a.isCreator = !0 : (a.isCreator = !1, v.partner_open_id = h), 
                this.pollingSocket = new p.default({
                    api: K,
                    payload: v
                }, function(t) {
                    if (t && t.cart_food && t.cart_food.food_list && t.cart_food.food_list[0] && "object" === r(t.cart_food.food_list[0].user_info) && (I.nickname = t.cart_food.food_list[0].user_info.nickname, 
                    I.avatar = t.cart_food.food_list[0].user_info.avatar), 0 !== t.cart_status) I.pollingSocket && "function" == typeof I.pollingSocket.end && I.pollingSocket.end(); else if (t.update && t.cart_food) {
                        var o = t && t.cart_food && t.cart_food.food_list ? t.cart_food.food_list : [], a = t && t.cart_food && t.cart_food.cur_user_info ? t.cart_food.cur_user_info : {}, n = t && t.cart_food && t.cart_food.cur_food_info ? t.cart_food.cur_food_info : [], i = I.store.getState(), s = i.poi.id, u = 0 === i.buyTogether[s].uTime && y;
                        I.updateUtime(c, t.utime), I.updateCartSkus({
                            myInfo: a,
                            food_list: o,
                            poiID: c,
                            shouldCoverLocalCart: u,
                            newMyCart: n
                        }), e.addMoreProcess(e.data.poiData);
                    }
                }, function(t) {
                    2 === t.code ? (I.pollingSocket && "function" == typeof I.pollingSocket.end && I.pollingSocket.end(), 
                    I.removeOtherCarts({
                        poiID: c
                    }), I.delBuyTogetherInfoWithPoiId(c), I.closeCartIfEmpty(), I.alert({
                        message: t.msg || "拼单状态异常，请重试",
                        ok: function() {
                            I.reload();
                        }
                    })) : 3 === t.code && (I.data.isCreator ? (I.pollingSocket && "function" == typeof I.pollingSocket.end && I.pollingSocket.end(), 
                    I.toast({
                        message: t.msg || "拼单已锁定，请尝试刷新页面",
                        duration: 1e3
                    })) : (I.pollingSocket && "function" == typeof I.pollingSocket.end && I.pollingSocket.end(), 
                    I.removeOtherCarts({
                        poiID: c
                    }), I.delBuyTogetherInfoWithPoiId(c), I.closeCartIfEmpty(), I.alert({
                        message: t.msg || "拼单已锁定，请尝试刷新页面",
                        ok: function() {
                            I.reload();
                        }
                    })));
                }, void 0, this.pollingSocketInterval), this.pollingSocket.start();
            } else this.removeOtherCarts({
                poiID: c
            }), m && 0 !== m.length ? this.setData({
                mainScrollTop: ot.normalWithCoupon
            }) : this.setData({
                mainScrollTop: ot.normalWithoutCoupon
            }), a.isInSharing = !1, a.isCreator = !1;
        } catch (t) {
            console.log(t);
        }
        return this.setData(i({}, a)), a;
    },
    onClickShowCart: function() {
        if (0 === this.data.activePanel) {
            var t = this.data.isCreator ? 1 : 2;
            this.lxClickHeaderImg(t), this.changeCart();
        }
    },
    loadPoiInfo: function() {
        var t = this;
        return e(a.default.mark(function e() {
            var o, n, r, i, s, c;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (t.data.poiInfo) return e.abrupt("return");
                    e.next = 2;
                    break;

                  case 2:
                    return t.loading(!0), e.prev = 3, e.next = 6, N({
                        wmpoiid: t.poiID
                    });

                  case 6:
                    for (o = e.sent, n = o.discounts2, r = n.length - 1; -1 < r; --r) (i = n[r]).icon_url = _(i.icon_url, 0, 0, "o");
                    t.setData({
                        poiInfo: o
                    }), e.next = 17;
                    break;

                  case 12:
                    e.prev = 12, e.t0 = e.catch(3), s = e.t0.message, (c = e.t0.code) === M || c === U ? (t[O] = t[P] = function() {
                        t.confirm({
                            show: !1
                        }), t.loadPoiInfo();
                    }, t.confirm({
                        message: s,
                        textOk: "确定",
                        textCancel: "去点菜",
                        ok: t.loadPoiInfo,
                        cancel: function() {
                            t.setData({
                                activePanel: 0
                            });
                        }
                    })) : t.alert({
                        message: s
                    });

                  case 17:
                    t.loading(!1);

                  case 18:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 3, 12 ] ]);
        }))();
    },
    loadCommentInfo: function(t) {
        var o = this;
        return e(a.default.mark(function e() {
            var n, r, i, s, c, u, p, d, l, h, f, g, m, S, y, v, I;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (t && o.setData({
                        poiCommentOffset: 0
                    }), null !== o.data.poiCommentTotal && o.data.poiCommentOffset === o.data.poiCommentTotal) return e.abrupt("return");
                    e.next = 3;
                    break;

                  case 3:
                    return o.loading(!0), o.setData({
                        loadingLogo: !0
                    }), e.prev = 5, e.next = 8, q({
                        wmpoiid: o.poiID,
                        comment_score_type: o.data.currentCategorieType,
                        label_id: o.data.label_id,
                        page_size: 20,
                        page_offset: o.data.poiCommentOffset
                    });

                  case 8:
                    for (n = e.sent, r = n.comment_categories.length - 1; -1 < r; --r) i = n.comment_categories[r], 
                    n.comment_categories[r] = {
                        type: "",
                        content: ""
                    }, n.comment_categories[r].type = n.comment_score_type_infos[r].comment_score_type, 
                    n.comment_categories[r].content = i.replace(/\d+/g, function(t) {
                        return "(" + t + ")";
                    });
                    for (s = function(t) {
                        var e = t.url;
                        return _(e, 350, 350, 80);
                    }, c = function(t) {
                        var e = t.url;
                        return _(e, 750, 0, 80);
                    }, u = n.comments.length - 1; -1 < u; --u) {
                        if ((p = n.comments[u]).comment_pics_preview = p.comment_pics.map(c), p.comment_pics_thumbnail = p.comment_pics.map(s), 
                        p.comment_pics = null, d = new Date(1e3 * p.comment_time), l = 10 <= d.getMonth() + 1 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1), 
                        h = 10 <= d.getDate() ? d.getDate() : "0" + d.getDate(), p.comment_time = d.getFullYear() + "." + l + "." + h, 
                        p.comment_labels) for (f = 0; f < p.comment_labels.length - 1; f++) f < p.comment_labels.length - 1 && (p.comment_labels[f].content = p.comment_labels[f].content + ",");
                        if (p.praise_food_list) for (g = 0; g < p.praise_food_list.length - 1; g++) g < p.praise_food_list.length - 1 && (p.praise_food_list[g].name = p.praise_food_list[g].name + ",");
                    }
                    o.setData({
                        poiCommentTotal: n.filter_type_num
                    }), (m = o.data.poiCommentOffset + 20) < n.filter_type_num ? o.setData({
                        poiCommentOffset: m
                    }) : o.setData({
                        poiCommentOffset: n.filter_type_num
                    }), t ? o.setData({
                        commentInfo: n
                    }) : (S = o.data.commentInfo, y = S.comments.concat(n.comments), S.comments = y, 
                    o.setData({
                        commentInfo: S
                    })), o.setData({
                        loadingLogo: !1
                    }), e.next = 26;
                    break;

                  case 20:
                    e.prev = 20, e.t0 = e.catch(5), v = e.t0.message, I = e.t0.code, o.setData({
                        loadingLogo: !1
                    }), I === M ? (o[P] = function() {
                        o.confirm({
                            show: !1
                        }), o.loadCommentInfo(t);
                    }, o.confirm({
                        message: v,
                        textOk: "确定",
                        textCancel: "去点菜",
                        ok: o[P],
                        cancel: function() {
                            o.setData({
                                activePanel: 0
                            });
                        }
                    })) : o.alert({
                        message: v
                    });

                  case 26:
                    o.loading(!1);

                  case 27:
                  case "end":
                    return e.stop();
                }
            }, e, o, [ [ 5, 20 ] ]);
        }))();
    },
    onClickCall: function() {
        var t = this.data.poiInfo.phone_list, e = t.map(function(t) {
            return "商家电话：" + t;
        });
        this.showPhoneCall({
            phones: t,
            texts: e
        });
    },
    onScrollBottom: function() {
        this.loadCommentInfo(), console.log("到底部了");
    },
    onClickCommentTag: function(t) {
        var e = t.currentTarget.dataset.index, o = this.data.commentInfo.comment_score_type_infos[e].comment_score_type;
        this.setData({
            currentCategorieType: o,
            label_id: 0
        }), this.loadCommentInfo(!0);
    },
    onClickLabelCommentTag: function(t) {
        var e = t.currentTarget.dataset.labelid;
        this.setData({
            label_id: e,
            currentCategorieType: 0
        }), this.loadCommentInfo(!0);
    },
    onClickPhotos: function(t) {
        var e = t.currentTarget.dataset, o = e.picarry, a = e.picnow;
        wx.previewImage({
            current: o[a],
            urls: o
        });
    },
    goBack: function() {
        var t = !1;
        try {
            var e = getCurrentPages();
            if (1 < e.length) for (var o = e.length - 2; -1 < o; --o) {
                var a = e[e.length - 1];
                if (t = "index" === a.pageName || -1 !== a.__route__.indexOf("pages/index")) break;
            }
        } catch (t) {}
        t ? wx.navigateBack() : wx.switchTab({
            url: "/pages/index/index"
        });
    },
    LogWhenShowDiscounts: function(t, e) {
        var o = {
            poi_id: t,
            container_type: e
        };
        this.lxShowDiscounts(o);
    },
    initPoiIdAndContainerTypeForLx: function(t) {
        var e = void 0;
        return e = t && 1 === t.code ? 1 : 10, this.setData({
            container_type: e
        }), e;
    },
    updateBuyTogetherButtonStatus: function(t, e, o, a) {
        var n = ((t || {}).shopping_cart_entrance || {}).visible, r = "", s = !1;
        s = e ? o ? n : !!a && n : n;
        try {
            var c = this.getCurrentUserInfo();
            c && (r = c.user_id);
        } catch (t) {
            console.log(t);
        }
        s && this.lxViewBuyTogetherShareBtn(), this.setData({
            buyTogetherShareBtn: i({}, this.data.buyTogetherShareBtn, {
                show: s,
                showLoginLayer: !r
            })
        });
    },
    reload: function() {
        var t = this;
        return e(a.default.mark(function e() {
            var o, r, s, c, u, p, d, l, h, f, g, m, S, y, v, I, T, x, C, w, k, D, b, L, A, E, j, N, q, W, R, V, H, G, K, z, X, Y, Q, $, tt, nt, rt, it, st, ct, ut, pt, dt, lt, ht, ft, gt, mt, _t, St, yt, vt, It, Tt, xt, Ct, wt, kt, Dt, bt, Lt, At, Pt, Mt, Ut;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (t.loading(!0), o = t.onLoadFocus || {}, r = o.spu_id, s = void 0 === r ? "" : r, 
                    e.prev = 2, t.addSpeedTrackStartTime(1), c = {}, u = t.store.getState(), p = u.poi.id, 
                    d = u.user, l = d.open_id, h = d.user_id, f = u.buyTogether[p], m = (g = f || {}).sponsorUserId, 
                    S = g.prevSourceUrl, y = g.shopCartId, v = g.quit, I = -1, t.pingSponsorUserId) return T = {
                        sponsor_user_id: t.pingSponsorUserId,
                        wm_poi_id: t.poiID,
                        url_time: t.shareTime,
                        partner_open_id: +t.pingSponsorUserId == +h ? "" : l
                    }, x = null, x = S ? i({}, T, {
                        multiple_cart_id: y,
                        source_url: S
                    }) : T, e.next = 18, t.dispatchRouter(x);
                    e.next = 19;
                    break;

                  case 18:
                    I = e.sent;

                  case 19:
                    return e.next = 21, F({
                        wm_poi_id: t.poiID,
                        product_spu_id: s,
                        trace_tag: t.traceTagEnd({
                            tgt_block: B
                        })
                    });

                  case 21:
                    if (C = e.sent, t.addSpeedTrackEndTime(1), t.addSpeedTrackStartTime(2), w = C.poi_info, 
                    k = w.id, D = w.status, b = w.name, L = w.discounts2, A = w.poi_coupon, E = C.container_operation_source.poi_coupon_list, 
                    j = C.shopping_cart, N = C.container_template, q = C.shopping_cart_entrance, W = (q || {}).shop_cart_id, 
                    R = "", t.poiID = k, t.openID = l, !t.pingSponsorUserId && q && W) return t.setSponsorUserId(t.poiID, h), 
                    e.next = 33, t.dispatchRouter({
                        multiple_cart_id: W,
                        sponsor_user_id: m || h,
                        url_time: t.shareTime,
                        source_url: S
                    });
                    e.next = 34;
                    break;

                  case 33:
                    I = e.sent;

                  case 34:
                    for (V = +h == +t.pingSponsorUserId, G = (H = (-1 === I ? null : I) || {}).cart_status, 
                    K = H.expired, z = v || 20 === G || 30 === G || K, t.updateBuyTogetherButtonStatus(C, !!t.pingSponsorUserId, V, z), 
                    X = !1, -1 !== I ? (I ? (Q = (Y = I || {}).shop_cart_id, $ = Y.user_role, tt = Y.cartinfo_poll_interval, 
                    nt = Y.cart_status, rt = Y.redirect_code, X = 2 === rt || 3 === rt || 4 === rt, 
                    R = Q || "", 20 === nt && (R = ""), t.lxBuyTogetherRole(1 === $ ? 1 : 2), t.pollingSocketInterval = 1e3 * tt || 5e3, 
                    20 === nt && (R = "")) : t.toast({
                        message: "拼单状态查询失败，请返回后重试"
                    }), t.setShopCartId(t.poiID, R), t.setPrevSourceUrl(t.poiID, ""), v && (t.pingSponsorUserId = "", 
                    t.delBuyTogetherInfoWithPoiId(t.poiID))) : t.setShopCartId(t.poiID, ""), it = L.length - 1; -1 < it; --it) (st = L[it]).icon_url = _(st.icon_url, 0, 0, "o");
                    if (t.setNavigationBarTitle({
                        title: b
                    }), ct = [], A && 0 < A.coupon_list.length ? (A.coupon_list.forEach(function(t, e) {
                        if (0 === t.coupon_status) t.feId = e, ct.push(t); else if (1 === t.coupon_status) {
                            for (var o = !1, a = 0, n = 0; n < e; n++) ct[n] && 1 === ct[n].coupon_status && t.coupon_value === ct[n].coupon_value && (o = !0, 
                            a = n);
                            o ? (ct[a].isMutiple = !0, ct[a].mutipleCount += 1) : (t.mutipleCount = 1, t.isMutiple = !1, 
                            ct.push(t));
                        }
                    }), c.poi_coupon_list = E, c.poi_coupon = ct, c.poi_coupon_big = A.coupon_list) : (c.poi_coupon_list = E, 
                    c.poi_coupon = [], c.ifCouponModalShouldShow = !1), t.loadedPoiData(C), ut = A && A.coupon_list ? A.coupon_list : [], 
                    X || t.checkIsInSharing(ut), pt = t.store.getState(), dt = pt.poi, lt = dt.skuMap, 
                    ht = dt.food_spu_tags, ft = pt.cart, t.validateCart(t.poiID, {
                        skuIds: Object.keys(lt).filter(function(t) {
                            return 0 === lt[t].status;
                        })
                    }), gt = t.initPoiIdAndContainerTypeForLx(N), D === Z.normal) {
                        e.next = 67;
                        break;
                    }
                    mt = "门店不可配送，请重试", _t = "知道了", e.t0 = D, e.next = e.t0 === Z.busy ? 56 : e.t0 === Z.closed ? 58 : e.t0 === Z.offline ? 63 : 65;
                    break;

                  case 56:
                    return mt = "门店忙碌中，请一会再来噢", e.abrupt("break", 66);

                  case 58:
                    return mt = "本店打烊了，暂时不接受新订单", _t = "关闭", t.setData({
                        offlineMessage: "本店打烊了"
                    }), t.lxViewShopInRest({
                        poi_id: t.poiID,
                        container_type: gt
                    }), e.abrupt("break", 66);

                  case 63:
                    return mt = "商家已经下线", e.abrupt("break", 66);

                  case 65:
                    return e.abrupt("break", 66);

                  case 66:
                    t.confirm({
                        message: mt,
                        textOK: "逛逛别的",
                        textCancel: _t,
                        ok: function() {
                            t.goBack();
                        }
                    });

                  case 67:
                    t.error(), 0 < L.length && t.LogWhenShowDiscounts(t.poiID, gt), St = t.onLoadFocus, 
                    yt = J(ht, St), vt = n(yt, 3), It = vt[0], Tt = vt[1], xt = vt[2], Ct = -1 !== It && St && St.spu_id ? St.spu_id : "", 
                    at = A && 0 !== A.coupon_list.length ? {
                        up: et[1].up,
                        down: et[1].down,
                        scrollTop: t.data.isInSharing ? ot.shareWithoutCoupon : ot.normalWithCoupon
                    } : {
                        up: et[0].up,
                        down: et[0].down,
                        scrollTop: t.data.isInSharing ? ot.shareWithoutCoupon : ot.normalWithoutCoupon
                    }, -1 !== It && ht[It] && ht[It].spus instanceof Array && ht[It].spus[Tt] instanceof Object && (ht[It].spus[Tt].highlight = !0), 
                    Ct && (c.onLoadTagIndex = It, c.onLoadSpuIndex = Tt, c.onLoadFocusSpu = Ct, c.onLoadFocusTag = xt), 
                    t.ifRenderAllSpus(c), wt = getApp(), kt = wt.restaurantBuyAgain, wt.restaurantBuyAgain = null, 
                    kt && ((Dt = kt.message) && t.alert({
                        message: Dt,
                        textOK: "知道了"
                    }), t.tryShowCart()), ft && ft[t.poiID] && 0 < ft[t.poiID].length && 0 < ft[t.poiID][0].cart.length ? t.addMoreProcess(C) : j && j.activity_info && j.activity_info.content && t.newCustomerProcess(j.activity_info.content), 
                    c.dataIsLoaded = !0, t.loading(!1), bt = t.data.poiData.poi_info.id, (t.scan || "scan" === t.share) && ("from_share_restaurant" === t.from && t.lxClickChat(), 
                    t.scanDialogCheck(bt)), t.setData(i({}, c)), e.next = 97;
                    break;

                  case 88:
                    e.prev = 88, e.t1 = e.catch(2), Lt = e.t1.code, mt = e.t1.message, e.t1.data, t.loading(!1), 
                    t.setData({
                        dataIsLoaded: !0
                    }), 1 === Lt ? (At = 0, t.error({
                        ok: function() {
                            clearInterval(At), wx.switchTab({
                                url: "/pages/index/index"
                            });
                        },
                        textOK: "回到首页",
                        message: "链接已失效"
                    }), Pt = t.data.error, Mt = 3, Pt.textOK = "回到首页" + Mt, t.setData({
                        error: Pt
                    }), Ut = t, At = setInterval(function() {
                        Mt -= 1, Pt.textOK = "回到首页" + Mt, Mt <= 0 && (clearInterval(At), wx.switchTab({
                            url: "/pages/index/index"
                        })), Ut.setData({
                            error: Pt
                        });
                    }, 1e3), t.loading(!1)) : 513001 === Lt ? t.error({
                        message: "商家休息中",
                        textOK: "逛逛别的",
                        ok: function() {
                            t.goBack();
                        }
                    }) : Lt === U ? t.error({
                        message: mt,
                        textOK: "点击重试",
                        ok: function() {
                            t.reload();
                        }
                    }) : (console.error("error message ->", mt), t.error({
                        message: "啊哦，出错了，请重试",
                        textOK: "重新加载",
                        ok: function() {
                            t.reload();
                        }
                    })), Lt !== M && Lt !== U || (t[O] = t[P] = function() {
                        t.reload();
                    });

                  case 97:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 2, 88 ] ]);
        }))();
    },
    ifRenderAllSpus: function(t) {
        var e = this, o = this.store.getState().poi, a = o.food_spu_tags, n = o.data.container_template, r = this.data.activeTypeIndex, i = t.onLoadTagIndex, s = void 0 === i ? 0 : i, c = t.onLoadSpuIndex, u = void 0 === c ? 0 : c, p = "number" == typeof r && !isNaN(r) && 0 <= r && r < a.length, d = 0;
        d = -1 !== s ? s : p ? r : 0;
        var l = 0, h = !1;
        a.forEach(function(t) {
            l += t.spus.length;
        });
        var f = 1 === n.code;
        if (l <= 200 && !f && !this.data.isInSharing && (h = !0), h && !f) {
            this.LogAllTagSpus(a, this.data.container_type, this.poiID);
            var g = a.map(function(t) {
                return {
                    name: t.name,
                    tag: t.tag,
                    icon: t.icon
                };
            });
            wx.getSystemInfo({
                success: function(t) {
                    var e = t.SDKVersion[1], o = t.SDKVersion[3];
                    1 === e && o < 4 && (tt = !0);
                }
            });
            var m = [], _ = Math.max(0, s), S = Math.max(0, u + 1), y = this.checkCurrentIfNeedToLoadMore(_, S);
            tt ? m = a.map(function() {
                return !0;
            }) : (m = a.map(function() {
                return !1;
            })).forEach(function(t, e) {
                e <= y && (m[e] = !0);
            });
            var v = -1 !== s ? s : y, I = -1 !== s ? a[v].name : a[0].name, T = -1 !== s ? a[v].description : a[0].description;
            this.data.throttleDelay, this.setData({
                menuTabs: g,
                isUnderSpuMaxNumber: h,
                activeTypeIndex: d,
                mainScrollTop: "" === this.data.mainScrollTop ? at.scrollTop : this.data.mainScrollTop,
                spuTagShouldShow: this.data.spuTagShouldShow ? this.data.spuTagShouldShow : m,
                tagViewName: this.data.tagViewName ? this.data.tagViewName : I,
                tagViewDes: this.data.tagViewDes ? this.data.tagViewDes : T,
                food_spu_tags: a
            }, function() {
                tt || (e.getSpuTagEachHeight(), e.getSpuScrollHeight(), e.getEmptySoltHeight());
            });
        } else {
            var x = a[d], C = d;
            this.LogViewTagSpus(x, C, this.data.container_type, this.poiID);
            var w = a.map(function(t) {
                return {
                    name: t.name,
                    tag: t.tag,
                    icon: t.icon
                };
            });
            this.setData({
                isUnderSpuMaxNumber: h,
                menuTabs: w,
                menuData: x,
                activeTypeIndex: d,
                mainScrollTop: at.scrollTop
            }), $.hasAlreadyBeTop = !0, $.hasAlreadyBeBottom = !0, $.currentRightSrollTop = 0;
        }
        this.addSpeedTrackEndTime(2);
    },
    tryShowCart: function() {
        var t = this.data.cartFoodCount;
        this.setData({
            isHiddenCart: !t
        });
    },
    onHide: function() {
        try {
            this.pollingSocket && "function" == typeof this.pollingSocket.end && this.pollingSocket.end();
        } catch (t) {
            console.log(t);
        }
    },
    onShow: function() {
        var t = this;
        return e(a.default.mark(function e() {
            var o, n, r, s, c, u, p, d, l;
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (o = getApp(), n = o.yodaVerifyData, r = o.afterLoginAction, o.yodaVerifyData = "", 
                    n && !r && (s = n.status, c = n.requestCode, u = n.responseCode, p = n.code, d = n.msg, 
                    "1" !== s && "0" !== s || t.getLoginStatus({
                        status: s,
                        requestCode: c,
                        responseCode: u,
                        code: p,
                        msg: d
                    })), o.showCart && (o.showCart = !1, t.tryShowCart()), t.data.isSuperMarket || t[P] || t[O]) {
                        e.next = 8;
                        break;
                    }
                    return e.next = 8, t.reload();

                  case 8:
                    (t[P] || t[O]) && (r !== P && r !== O || (o.afterLoginAction = "", "function" == typeof t[r] && (t[r](), 
                    t[O] = "", t[P] = ""))), t.closeCartIfEmpty(), l = o.orderValidated, r && (o.afterLoginAction = "", 
                    "submit" === r ? t.onClickSubmit() : "coupon" === r ? t.onClickGetCoupon() : "showLoginSuccessModal" === r && (t.setData({
                        buyTogetherShareBtn: i({}, t.data.buyTogetherShareBtn, {
                            showLoginLayer: !1
                        })
                    }), t.toast({
                        message: "登录成功，可以邀请好友一起拼单啦!"
                    }))), l && (o.orderValidated = !1, t.onClickSubmit());

                  case 13:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    dispatchRouter: function(t) {
        var o = this;
        return e(a.default.mark(function n() {
            var r, i, s, c, u, p, d, l, h, f, g, m, _, S, y, v, I, T, x, C, w, k, D;
            return a.default.wrap(function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    return r = null, n.prev = 1, i = getApp().store.getState(), s = i.user, c = s.open_id, 
                    u = s.user_id, p = i.poi.id, d = i.buyTogether[p], l = t.sponsor_user_id, h = t.multiple_cart_id, 
                    !d || d.quit || o.data.isCreator || "order-info" !== t.source_url || o.confirm({
                        title: "您已选好商品，是否要进行修改？",
                        message: "修改商品后，需点击【选好了】，将商品同步给好友",
                        textOK: "修改",
                        textCancel: "不改了",
                        cancel: function() {
                            var t = e(a.default.mark(function t() {
                                return a.default.wrap(function(t) {
                                    for (;;) switch (t.prev = t.next) {
                                      case 0:
                                        return t.prev = 0, t.next = 3, o.onClickSyncFood();

                                      case 3:
                                        o.removeOtherCarts({
                                            poiID: o.poiID
                                        }), o.pollingSocket && "function" == typeof o.pollingSocket.end && o.pollingSocket.end(), 
                                        wx.navigateTo({
                                            url: "/pages/order-info/order-info?wm_poi_id=" + o.poiID + "&shop_cart_id=" + h + "&sponsor_user_id=" + l
                                        }), t.next = 12;
                                        break;

                                      case 8:
                                        t.prev = 8, t.t0 = t.catch(0), console.log(t.t0), o.toast({
                                            message: t.t0.msg
                                        });

                                      case 12:
                                      case "end":
                                        return t.stop();
                                    }
                                }, t, o, [ [ 0, 8 ] ]);
                            }));
                            return function() {
                                return t.apply(this, arguments);
                            };
                        }()
                    }), n.next = 7, V(t);

                  case 7:
                    if (r = n.sent, g = (f = r || {}).user_role, m = f.cart_status, _ = f.redirect_code, 
                    S = f.exceed_limit, y = f.expired, v = f.shop_cart_id, o.setShopCartId(o.poiID, v), 
                    I = o.hash_id, T = o.submitTouchPoint, x = (d || {}).shopCartId, C = void 0 === x ? "" : x, 
                    w = function() {
                        wx.navigateTo({
                            url: "../order-info/order-info?wm_poi_id=" + o.poiID + "&shop_cart_id=" + v + "&sponsor_user_id=" + l + "&user_role=" + g
                        }), 20 !== m && 30 !== m || 2 !== g || (o.pingSponsorUserId = "");
                    }, (20 !== m && 10 !== m || 0 !== g) && !S && !y) {
                        n.next = 20;
                        break;
                    }
                    k = "", k = y ? "当前拼单已关闭" : S ? "当前拼单已打人数上限，试试自己去拼一单吧~" : "当前拼单已关闭", o.pingSponsorUserId = "", 
                    o.toast({
                        message: k
                    }), n.next = 41;
                    break;

                  case 20:
                    if (30 !== m) {
                        n.next = 24;
                        break;
                    }
                    +o.pingSponsorUserId != +u && setTimeout(function() {
                        o.alert({
                            message: "好友已取消本次拼单",
                            textOK: "确定"
                        });
                    }, 1500), n.next = 41;
                    break;

                  case 24:
                    n.t0 = _, n.next = 1 === n.t0 ? 27 : 2 === n.t0 ? 28 : 3 === n.t0 ? 38 : 4 === n.t0 ? 38 : 40;
                    break;

                  case 27:
                    return n.abrupt("break", 41);

                  case 28:
                    return n.prev = 28, n.next = 31, o.redirectToPreview(T, C, c, I);

                  case 31:
                    n.next = 37;
                    break;

                  case 33:
                    n.prev = 33, n.t1 = n.catch(28), o.clearLazyLoading(), o.error({
                        message: "啊哦，页面出错了",
                        textOK: "重新加载",
                        ok: function() {
                            o.reload();
                        }
                    });

                  case 37:
                    return n.abrupt("break", 41);

                  case 38:
                    return 20 === m || 10 === m ? (D = 10 === m ? "拼单已锁定，无法修改商品" : "订单已提交，无法修改", o.alert({
                        message: D,
                        ok: function() {
                            w();
                        },
                        textOK: "好的"
                    })) : w(), n.abrupt("break", 41);

                  case 40:
                    return n.abrupt("break", 41);

                  case 41:
                    n.next = 47;
                    break;

                  case 43:
                    n.prev = 43, n.t2 = n.catch(1), r = null, console.log(n.t2);

                  case 47:
                    return n.abrupt("return", r);

                  case 48:
                  case "end":
                    return n.stop();
                }
            }, n, o, [ [ 1, 43 ], [ 28, 33 ] ]);
        }))();
    },
    checkIsUserAuthorized: function() {
        var t = this, e = !0;
        try {
            wx.getSetting({
                success: function(t) {
                    e = !!t.authSetting["scope.userInfo"];
                },
                fail: function() {
                    e = !1;
                },
                complete: function() {
                    t.setData({
                        buyTogetherShareBtn: i({}, t.data.buyTogetherShareBtn, {
                            isUserAuthorized: e
                        })
                    });
                }
            });
        } catch (t) {
            console.log(t);
        }
    },
    onLoad: function(t) {
        var e = t.poi_id, o = t.cat_id, a = void 0 === o ? 0 : o, n = t.hash_id, r = void 0 === n ? "" : n, i = t.spu_id, s = void 0 === i ? "" : i, c = t.tag, u = void 0 === c ? "" : c, p = t.from, d = t.scene, l = t.u_id, h = t.share_time, f = void 0 === h ? "" : h, g = t.share;
        if (d) {
            var m = (d = decodeURIComponent(d)).match(/poi\!\w*/)[0];
            m && m.split("!")[1] && (e = m.split("!")[1], this.poi_id = e, this.scan = !0);
        }
        s && (this.onLoadFocus = {
            spu_id: s,
            tag: u
        }), this.poiID = e, this.cat_id = a, this.hash_id = r, this.pingSponsorUserId = l, 
        this.from = p, this.share = g, this.loadFrom = {
            poi_id: e,
            cat_id: a,
            hash_id: r,
            spu_id: s,
            tag: u,
            from: p,
            scene: d
        }, "orders" === p && this.setRecipient({
            id: 0,
            phone: "",
            name: "",
            address: "",
            house_number: "",
            gender: "",
            latitude: "",
            longitude: ""
        });
        var _ = (getApp().store.getState().buyTogether[this.poiID] || {}).sponsorUserId, S = !1;
        l && (_ && +_ != +l && (S = !0), this.setSponsorUserId(this.poiID, l)), this.shareTime = f, 
        this.loadPoiData(e), this.setPrevSourceUrl(this.poiID, ""), this.setClearCartFlag(this.poiID, S), 
        this.checkIsUserAuthorized();
    },
    onUnload: function() {
        this.unload(), this.pingSponsorUserId = "";
        try {
            this.pollingSocket && "function" == typeof this.pollingSocket.end && this.pollingSocket.end();
        } catch (t) {
            console.log(t);
        }
    },
    onShareAppDesc: function() {
        try {
            var t = this.data.poiData.poi_info.name;
            return v(A).replace(/å/g, t);
        } catch (t) {
            console.error(t);
        }
        return "";
    },
    onClickToAuthroize: function(t) {
        var e = t.detail.userInfo;
        this.setData({
            buyTogetherShareBtn: i({}, this.data.buyTogetherShareBtn, {
                isUserAuthorized: !!e
            })
        });
    },
    onShareAppMessage: function(t) {
        var e = this.pageName || "unknown", o = this.onShareAppDesc(), a = t.target.id, n = this.data.poiData.poi_info.name, r = this, i = 10 < n.length ? n.substr(0, 10) + "..." : n;
        return "menu" === t.from ? {
            title: "美团外卖",
            desc: o,
            path: "/pages/restaurant/restaurant?poi_id=" + this.poiID + "&from=from_share_" + e
        } : "button" === t.from && "buytogether" === a ? this.genShareAppMessage("custom") : {
            title: "【" + i + "】联合美团外卖给你发个大红包",
            desc: "",
            path: "/pages/restaurant/restaurant?poi_id=" + this.poiID + "&from=from_share_" + e + "&share=scan",
            imageUrl: "http://p1.meituan.net/codeman/3cc9af8399d609e44dff2917e88b14e8142480.png",
            success: function() {
                r.lxShareSuccess();
            }
        };
    },
    genShareAppMessage: function() {
        var t, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", o = getApp().store.getState().poi.data, a = o.shopping_cart_entrance, n = o.poi_info.name, r = this.pageName || "unknown", i = this.onShareAppDesc(), s = this.getCurrentUserInfo(), c = "custom" === e ? "u_id" : "from", u = {
            poi_id: this.poiID
        }, p = "美团外卖", d = "", l = "/pages/restaurant/restaurant";
        if ("custom" === e) {
            try {
                d = wx.getStorageSync("userInfo").nickName || "";
            } catch (t) {
                d = "", console.error(t);
            }
            p = d ? "【拼单】" + ((t = d).length <= 6 ? t : t.substring(0, 6) + "...") + "喊你一起点外卖~" : "【拼单】我喊你一起点外卖~";
        }
        u[c] = "custom" === e ? s.user_id : "from_share_" + r, u.share_time = Date.now(), 
        l = l + "?" + Object.keys(u).map(function(t) {
            return t + "=" + u[t];
        }).join("&"), this.shareTime = u.share_time;
        var h = this.imageUrl ? this.imageUrl : a && a.icon_url;
        return this.imageUrl || (this.imageUrl = h), h = h.split(/\|/)[0], n && (p += "【" + n + "】"), 
        console.log("imageUrl1", h), {
            title: p,
            desc: i,
            path: l,
            imageUrl: h
        };
    },
    getReportData: function() {
        return {
            cid: "c_CijEL",
            val: {
                poi_id: this.poiID,
                order_id: this.hash_id,
                cat_id: this.cat_id
            }
        };
    },
    touchEnd: function(t) {
        var e = this.data.activeTypeIndex, o = t.changedTouches[0].clientY, a = o - $.touchStartPosition, n = 0 < o - $.touchStartPosition, r = n ? a : -a;
        if ((this.data.isUnderSpuMaxNumber || this.data.isSuperMarket) && this.data.isUnderSpuMaxNumber && this.data.throttleDelay && !tt) {
            var i = this;
            setTimeout(function() {
                i.findCurrentPosition($.scrollTopRecord);
            }, this.data.throttleDelay);
        }
        var s = this.data, c = s.cartTip, u = s.poiData.shopping_cart, p = s.couponGoodsAddCnt, d = s.newUserGoodsAddCnt;
        !n && null === c && u && u.prompt_text && 5 < r && 0 === p && 0 === d ? this.setData({
            cartTipShow: !0,
            cartTip: [ u.prompt_text ]
        }) : ($.hasAlreadyBeTop || !$.isScollFunctionActived) && n && c && c[0] === u.prompt_text && 0 === e && this.setData({
            cartTipShow: !1,
            cartTip: null
        });
    },
    loadTagFood: function(t, e) {
        var o = this.data.activeTypeIndex, a = this.store.getState().poi.food_spu_tags, n = -1;
        switch (t) {
          case "PREVIOUS":
            n = o - 1;
            break;

          case "NEXT":
            n = o + 1;
            break;

          default:
            n = e;
        }
        n < 0 || n >= a.length || (this.LogViewTagSpus(a[n], n), "PREVIOUS" !== t && this.setData({
            menuData: {
                name: a[n].name,
                spus: []
            }
        }), this.setData({
            menuData: a[n],
            activeTypeIndex: n
        }), $.hasAlreadyBeTop = !0, $.hasAlreadyBeBottom = !0, $.isScollFunctionActived = !0, 
        $.isStarted = !1, $.currentRightSrollTop = 0, $.isAlreadyBeTopGoTop = "", $.isAlreadyBeTopGoDown = "");
    },
    touchStart: function(t) {
        this.setData({
            isScollFunctionActived: !1
        }), $.touchStartPosition = t.changedTouches[0].clientY;
    },
    LogWhenLeftTabScroll: function() {
        var t = this.data, e = t.poiData.poi_info, o = t.activeTypeIndex, a = this.store.getState().poi.food_spu_tags, n = this.data.container_type;
        null === a[o] && this.lxLogWXAppError("NULL", void 0, {
            food_spu_tags: a,
            activeTypeIndex: o,
            source: "LogWhenLeftTabScroll"
        });
        var r = {
            poi_id: e.id,
            category_id: a[o].tag,
            category_index: o,
            category_name: a[o].name,
            category_type: a[o].type,
            container_type: n
        };
        this.lxScrollLeftTab(r);
    },
    scrollLeft: Q(function() {
        this.LogWhenLeftTabScroll();
    }, 100),
    scroll: function(t) {
        var e = t.detail.scrollTop;
        this.data.isUnderSpuMaxNumber && 0 < e && (this.data.throttleDelay ? $.scrollTopRecord = e : tt || this.findCurrentPosition(e));
        var o = this.data, a = o.cartTip, n = o.poiData.shopping_cart;
        0 === o.activeTypeIndex && e < 5 && a && a[0] === n.prompt_text && this.setData({
            cartTipShow: !1,
            cartTip: null
        });
    },
    onClickPoiService: function(t) {
        2 === t.target.dataset.type && this.alert({
            title: "极速退款规则说明",
            messagelist: [ "1. 极速退款是商家为用户提供的退款权益，用户可在骑手服务/商家配送前使用该权益", "2. 选择极速退款后无需商家同意即可直接退款至您的支付账户", "3. 用户每周享有2次极速退款权益。如有刷单、恶意退款等行为将取消极速退款权益", "4. 仅全单退款且金额少于200元的在线支付订单可使用极速退款权益", "5. 如有其它问题，请咨询客服，美团外卖保留法律允许范围内的活动解释权" ],
            textOK: "知道了"
        });
    },
    getCoupon: function(t) {
        var o = this, n = t.currentTarget.dataset, r = n.item, i = n.index;
        return e(a.default.mark(function t() {
            var e, n, s, c, u, p, d, l;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (t.prev = 0, (e = o.store.getState()).user.token) {
                        t.next = 5;
                        break;
                    }
                    return o.navigateToLogin(), t.abrupt("return");

                  case 5:
                    if (r.coupon_status) {
                        t.next = 16;
                        break;
                    }
                    return n = {
                        wm_poi_id: o.poiID,
                        coupon_pool_id: r.coupon_pool_id,
                        activity_id: r.activity_id,
                        coupon_id: r.coupon_id
                    }, t.next = 9, W(n);

                  case 9:
                    s = t.sent, c = {
                        coupon_status: s.coupon_status,
                        index: i
                    }, o.updateThisCoupon(c), u = o.store.getState(), p = u.poi.data.poi_info.poi_coupon, 
                    d = [], p.coupon_list.forEach(function(t, e) {
                        if (0 === t.coupon_status) t.feId = e, d.push(t); else if (1 === t.coupon_status) {
                            for (var o = !1, a = 0, n = 0; n < e; n++) d[n] && 1 === d[n].coupon_status && t.coupon_value === d[n].coupon_value && (o = !0, 
                            a = n);
                            o ? (d[a].isMutiple = !0, d[a].mutipleCount += 1) : (t.mutipleCount = 1, t.isMutiple = !1, 
                            d.push(t));
                        }
                    }), o.setData({
                        poi_coupon: d,
                        poi_coupon_big: p.coupon_list
                    });

                  case 16:
                    t.next = 22;
                    break;

                  case 18:
                    t.prev = 18, t.t0 = t.catch(0), l = t.t0.message, o.toast({
                        message: l || "领取失败，请稍后再试"
                    });

                  case 22:
                  case "end":
                    return t.stop();
                }
            }, t, o, [ [ 0, 18 ] ]);
        }))();
    }
}, rt = nt.onUnload, it = nt.onHide;

(0, s.page)(y(nt, z(function(t) {
    var e = t.poi.data, o = X(t), a = o.sharingUserImgUrl, n = o.count, r = o.countMap, i = o.cents, s = o.boxCents, c = o.needCents, u = o.cart, p = o.alreadySelecCount, d = o.myOwnCartCount, l = o.isOtherReady, h = o.alreadyCollected, f = o.isCollecting, g = o.couponGoodsAddCnt, m = o.newUserGoodsAddCnt, _ = Y(i), S = c ? Y(c) : "", y = Y(s), v = Y(d);
    return {
        poiData: e,
        isSuperMarket: 1 === (e && e.container_template && e.container_template.code),
        cart: u,
        cartBoxPrice: y,
        cartCountMap: r,
        cartFoodCount: n,
        cartFoodPrice: _,
        priceToGo: S,
        alreadySelecCount: p,
        myOwnCartCount: v,
        isOtherReady: l,
        sharingUserImgUrl: a,
        alreadyCollected: h,
        isCollecting: f,
        couponGoodsAddCnt: g,
        newUserGoodsAddCnt: m
    };
}, function(t) {
    return {
        loadPoiData: function(e) {
            t((0, c.request)({
                id: e
            }));
        },
        loadedPoiData: function(e) {
            t((0, c.loaded)({
                data: e
            }));
        },
        addFood: function(e) {
            t((0, d.add)(e));
        },
        delFood: function(e) {
            t((0, d.del)(e));
        },
        clearFood: function(e) {
            t((0, d.clear)(e));
        },
        unload: function() {
            t((0, c.exit)());
        },
        clearMyCartInSharing: function(e) {
            t((0, d.clearMyCartInSharing)(e));
        },
        setToken: function(e) {
            t((0, u.setToken)(e));
        },
        setRecipient: function(e) {
            t((0, u.setRecipient)(e));
        },
        setSKUs: function(e) {
            t((0, d.setSKUs)(e));
        },
        removeOtherCarts: function(e) {
            t((0, d.removeOtherCarts)(e));
        },
        updateCartSkus: function(e) {
            t((0, d.updateCartSkus)(e));
        },
        setProducts: function(e) {
            t((0, c.products)({
                data: e
            }));
        },
        productsCollect: function(e) {
            t((0, c.productsCollect)({
                data: e
            }));
        },
        updateThisCoupon: function(e) {
            t((0, c.getCoupon)({
                data: e
            }));
        },
        validateCart: function(e, o) {
            t((0, d.validate)({
                poiID: e,
                data: o
            }));
        },
        setSponsorUserId: function(e, o) {
            t((0, l.setSponsorUserId)({
                id: e,
                sponsorUserId: o
            }));
        },
        setPrevSourceUrl: function(e, o) {
            t((0, l.setPrevSourceUrl)({
                id: e,
                prevSourceUrl: o
            }));
        },
        setShopCartId: function(e, o) {
            t((0, l.setShopCartId)({
                id: e,
                shopCartId: o
            }));
        },
        setQuitStatus: function(e, o) {
            t((0, l.setQuitStatus)({
                id: e,
                quit: o
            }));
        },
        setClearCartFlag: function(e, o) {
            t((0, l.setClearCartFlag)({
                id: e,
                clearCart: o
            }));
        },
        delBuyTogetherInfoWithPoiId: function(e) {
            t((0, l.delBuyTogetherInfoWithPoiId)({
                id: e
            }));
        },
        updateUtime: function(e, o) {
            t((0, l.updateUtime)({
                id: e,
                uTime: o
            }));
        }
    };
}), x, C, w, b, S, T, function(t) {
    return Object.assign(t, {
        onUnload: rt
    });
}, function(t) {
    return Object.assign(t, {
        onHide: it
    });
}, h.default, m, k, f, g, D));