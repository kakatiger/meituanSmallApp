function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new K(function(e, a) {
            return function n(i, r) {
                try {
                    var o = t[i](r), s = o.value;
                } catch (i) {
                    return void a(i);
                }
                if (!o.done) return K.resolve(s).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(s);
            }("next");
        });
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var a, n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), i = require("../../npm/@dp/owl-wxapp/es6/index.js"), r = require("../../actions/recipient.js"), o = require("../../actions/web-view.js"), s = require("../../components/midas/midas.outlet.js"), c = require("../../api/activity-api.js").request, l = require("../../api/analytics.js").event, u = require("../../api/mta.js"), d = require("../../components/rohr/rohr.js"), p = require("../../components/filter/filter.js"), g = require("../../components/header-index/header-index.js"), h = require("../../components/open-setting/open-setting.js"), f = require("../../components/rcmd-board/index.js"), _ = require("../../utils/object-assign.js"), m = require("../../constants.js"), v = m.P_POI, w = m.P_HOMEPAGE, x = m.P_OUTER, T = m.P_CATEGORY, b = m.B_OUTER, E = m.B_CATEGORY, P = m.B_POILIST, S = m.B_VIEW_MORE, k = m.B_PULL_DOWN, O = m.ACTION_PULL_DOWN, L = m.ACTION_CLICK, I = m.PAOTUI_KINGKONG_CODE, y = m.PAOTUI_APPID, C = m.CODE_GOTO_LOGIN, D = m.CODE_PRELOGIN, R = m.ANTI_SPIDER_FORCE_LOGIN, j = m.ANTI_SPIDER_PRELOGIN, N = m.KEY_UUID, K = require("../../npm/promise-polyfill/promise.js"), q = require("../../utils/wait.js"), M = require("../../utils/promise-try.js"), V = require("../../utils/version-compare.js"), G = require("../../utils/mix.js"), F = require("../../api/wx.js").storage.getItem, A = require("./log.js"), U = require("../../utils/get-nearest-address.js"), B = require("./primary-filter/primary-filter.js"), H = require("./newuser-redpack-entry/newuser-redpack-entry.js"), z = require("../../api/index.js"), W = z.poiFilter, J = z.posname, Y = z.homeHead, $ = z.bannerInfo, Q = z.addrGet, X = require("../../api/wx.js"), Z = X.getLocation, ee = X.navigateTo, te = require("../base.js"), ae = require("../../components/poi-list/poi-list.js"), ne = require("../../weapp-redux/index.js").connect, ie = require("../../components/owl-watcher/owl-watcher.js"), re = "", oe = "", se = ne(function(e) {
    var t = e.cart, a = e.recipient.address, n = e.user.token, i = {};
    return Object.keys(t).forEach(function(e) {
        if (t[e] && t[e][0] && t[e][0].cart && t[e][0].cart.length) {
            for (var a = t[e][0].cart, n = 0, r = 0, o = a.length; r < o; r++) n += a[r].count;
            i[e] = n;
        }
    }), {
        cartKeys: i,
        locName: a,
        hasLogin: Boolean(n)
    };
}, function(e) {
    return {
        setRecipient: function(t) {
            return e((0, r.set)(t));
        },
        partialRecipient: function(t) {
            return e((0, r.partial)(t));
        },
        updateWebview: function(t) {
            return e((0, o.updateWebview)(t));
        }
    };
}), ce = Object.freeze({
    SHOPLIST_COMPELETE: 1,
    REVERSE_GEO: 2,
    KINGKONG_COMPELETE: 3,
    FILTER_COMPLETE: 4,
    SHOPLIST_RENDER: 5
}), le = (t(a = {}, ce.SHOPLIST_COMPELETE, !1), t(a, ce.KINGKONG_COMPELETE, !1), 
t(a, ce.FILTER_COMPLETE, !1), a), ue = {
    pageName: "index",
    data: {
        hasMore: !1,
        locState: "loading",
        locationEnabled: !0,
        locationRetrying: !1,
        filterPages: null,
        filterPagesCurrent: 0,
        recommended_search_keyword: {},
        loadingLogo: !1,
        empty: !1,
        mtTopShow: !1,
        showFilterPages: !0,
        bnrImgs: [],
        SDKVersion: 0,
        showResetFilter: !1,
        paoTui: {
            paoTuiKingkongCode: I,
            paoTuiAppId: y,
            paoTuiVersion: "release",
            paoTuiPath: ""
        },
        lch: wx.getStorageSync("wx_scene"),
        uuid: "",
        env: "",
        canIUseJump2MP: wx.canIUse("navigateToMiniProgram"),
        canIUseNavigator: !1,
        mtTabsExtraData: {
            from: "waimai"
        },
        showTianjiangCoupon: !1,
        showTianjiangLayer: !1
    },
    entree_from: null,
    page_index: 0,
    pageVisiable: !0,
    onLocTap: function() {},
    onReachBottom: function() {
        this.data.hasMore && this.load();
    },
    onPageScroll: function(e) {
        var t = e.scrollTop;
        this.headerIndexOnScroll(t), this.filterOnPageScroll(t);
    },
    preventD: function() {},
    onClickPoilistItem: function(e) {
        var t = e.currentTarget.dataset, a = t.id, n = t.index, i = t.poi;
        this.traceTagStart({
            src_page: w,
            src_block: P,
            src_item_index: n,
            src_item_id: a,
            src_item_type: "poi",
            tgt_page: v,
            extra: {
                poi_id: a
            },
            action: L
        }), i.index = n, this.lxPoilistClick(i);
    },
    onClickTypeIcon: function(e) {
        var t = e.currentTarget.dataset, a = t.code, n = t.index, i = t.name;
        a !== I && wx.navigateTo({
            url: "/pages/channel-page/channel-page?typeCode=" + a + "&typeName=" + i
        }), this.traceTagStart({
            src_page: w,
            src_block: E,
            src_item_index: n,
            src_item_id: a,
            tgt_page: T,
            action: L
        }), this.lxKingkongClick({
            cat_id: a,
            index: n
        });
    },
    getPaoTuiPath: function() {
        var e = this.store.getState(), t = e.recipient, a = t.longitude, n = t.latitude, i = e.wx, r = i.longitude, o = i.latitude, s = e.user, c = s.token, l = s.user_id;
        return "/pages/index/index?channel=wx_wmjg_miniPrograms&lng=" + (a || r) + "&lat=" + (n || o) + "&cityname=" + re + "&mtuserid=" + l + "&token=" + c;
    },
    onClickJumpMore: function() {
        this.traceTagStart({
            src_page: w,
            src_block: S,
            tgt_page: T,
            action: L
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        return e(n.default.mark(function e() {
            var a;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if ("fail" === t.data.locState) return wx.stopPullDownRefresh(), e.abrupt("return");
                    e.next = 4;
                    break;

                  case 4:
                    return t.poilistCancelLoading(), t.loading(!0), t.traceTagStart({
                        action: O,
                        src_page: w,
                        src_block: k,
                        tgt_page: w
                    }), t.setData({
                        ifOnPullDownRefresh: !0
                    }), e.prev = 8, e.next = 11, t.load(!0, !0);

                  case 11:
                    e.next = 17;
                    break;

                  case 13:
                    e.prev = 13, e.t0 = e.catch(8), a = e.t0.message, t.toast({
                        message: a
                    });

                  case 17:
                    t.loading(!1), wx.stopPullDownRefresh();

                  case 19:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 8, 13 ] ]);
        }))();
    },
    _poilistLoad: function(t) {
        var a = this;
        return e(n.default.mark(function e() {
            var i, r, o, s, c, l, u;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return i = a.page_index, r = _({
                        page_index: t ? 0 : i,
                        page_size: 20,
                        load_type: 1,
                        trace_tag: a.traceTagEnd({
                            tgt_block: P
                        })
                    }, a.filterParam = a.getFilterParam()), e.next = 4, W(r);

                  case 4:
                    return o = e.sent, s = o.poi_has_next_page, c = o.poilist, l = o.judas_field, r.sort_type ? a.judasParams = {
                        rank_trace_id: ""
                    } : r.page_index || (a.judasParams = l), u = t ? 0 : (a.data.poilist || []).length || 0, 
                    (c || []).forEach(function(e, t) {
                        e.index = u + t, a.lxPoilistView(e);
                    }), e.abrupt("return", {
                        poi_has_next_page: s,
                        page_index: t ? 1 : i + 1,
                        poilist: c
                    });

                  case 12:
                  case "end":
                    return e.stop();
                }
            }, e, a);
        }))();
    },
    reloadPoilist: function() {
        return this.poilistCancelLoading(), this.loadPoilist(!0);
    },
    loadPoilist: function(t) {
        var a = this, i = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
        return e(n.default.mark(function e() {
            var r, o, c, l, u, d, p, g, h;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, a.setData({
                        loadingLogo: !t
                    }), t && a.loading(!0, !0), e.next = 5, a.poilistLoad(t);

                  case 5:
                    if (r = e.sent, o = r.poi_has_next_page, c = r.page_index, l = r.valid, u = r.poilist, 
                    l) {
                        e.next = 12;
                        break;
                    }
                    return e.abrupt("return");

                  case 12:
                    return a.page_index = c, d = 0 === u.length && (0 < a.filterParam.activity_filter_codes.length || 0 < a.data.filter.selectedPriceRange.length), 
                    e.next = 16, F(N, "");

                  case 16:
                    p = e.sent, g = p.data, a.addSpeedTrackStartTime(ce.SHOPLIST_RENDER), a.setData({
                        loadingLogo: !1,
                        hasMore: o,
                        empty: 0 === u.length,
                        showResetFilter: d,
                        poilist: u,
                        uuid: g
                    }, function() {
                        a.addSpeedTrackEndTime(ce.SHOPLIST_RENDER), le[ce.SHOPLIST_COMPELETE] || (a.addSpeedTrackEndTime(ce.SHOPLIST_COMPELETE), 
                        le[ce.SHOPLIST_COMPELETE] = !0), t && (s.clearImpression(), s.triggerScroll());
                    }), a.error(), d && a.lxResetFilterView(), e.next = 30;
                    break;

                  case 24:
                    e.prev = 24, e.t0 = e.catch(0), h = e.t0.code, e.t0.message, 2 === h ? (a.error({
                        message: "附近暂无商家, 请确认您的地址~",
                        img: "no-poi",
                        textOK: "设置地址",
                        ok: function() {
                            ee({
                                url: "../loc-select/loc-select"
                            });
                        }
                    }), a.setData({
                        poilist: []
                    })) : t && !i ? (a.error({
                        message: "您的手机网络好像不太流畅哦~",
                        img: "no-net",
                        textOK: "重新加载",
                        ok: function() {
                            a.loadPoilist(!0);
                        }
                    }), a.setData({
                        poilist: []
                    })) : h === D || a.toast({
                        message: "网络异常, 请重试"
                    }), h === C ? a[R] = function() {
                        a.loadPoilist(t, i);
                    } : h === D && (a[j] = function() {
                        a.loadPoilist(t, i);
                    });

                  case 30:
                    t && a.loading(!1);

                  case 31:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 0, 24 ] ]);
        }))();
    },
    loadHead: function(t) {
        var a = this;
        return e(n.default.mark(function e() {
            var i, r, o, s, c, l, u, d;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, i = a.data.filterPages, t || !i) return e.next = 5, Y({
                        trace_tag: a.traceTagGet({
                            tgt_block: E
                        }),
                        need_regions: "2,7"
                    });
                    e.next = 12;
                    break;

                  case 5:
                    r = e.sent, o = r.primary_filter, s = r.recommended_search_keyword, c = a.store.getState(), 
                    l = c.wx.SDKVersion, u = c.dev.env, 0 < (d = B(o, l)).length && a.lxKingkongView(d[0], 0), 
                    a.setData({
                        showFilterPages: 0 < d.length,
                        filterPages: d,
                        filterPagesCurrent: 0,
                        recommended_search_keyword: s,
                        "paoTui.paoTuiPath": a.getPaoTuiPath(),
                        "paoTui.paoTuiVersion": "qa" === u ? "trial" : "release"
                    }, function() {
                        le[ce.KINGKONG_COMPELETE] || (a.addSpeedTrackEndTime(ce.KINGKONG_COMPELETE), le[ce.KINGKONG_COMPELETE] = !0);
                    });

                  case 12:
                    e.next = 18;
                    break;

                  case 14:
                    e.prev = 14, e.t0 = e.catch(0), a.setData({
                        showFilterPages: !1
                    }), console.error(e.t0);

                  case 18:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 0, 14 ] ]);
        }))();
    },
    loadAirDropConpon: function() {
        var t = this;
        return e(n.default.mark(function e() {
            var a, i, r, o;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, t.data.ifOnPullDownRefresh) {
                        e.next = 9;
                        break;
                    }
                    return e.next = 4, c({
                        domain: "https://marketing.waimai.meituan.com/",
                        url: "o/wxapp/resource/position/tianJiang",
                        method: "POST",
                        successCode: 0,
                        data: {
                            openId: getApp().store.getState().user.open_id
                        }
                    });

                  case 4:
                    a = e.sent, i = a.resourceType, r = a.couponInfo, o = a.luckySkyInfo, i ? 1 === Number(i) ? t.setData({
                        airdropCouponData: r,
                        showTianjiangCoupon: !0,
                        showTianjiangLayer: !1
                    }) : 2 === Number(i) && t.setData({
                        airdropLayerData: o,
                        showTianjiangLayer: !0,
                        showTianjiangCoupon: !1
                    }) : t.setData({
                        showTianjiangCoupon: !1,
                        showTianjiangLayer: !1
                    });

                  case 9:
                    e.next = 14;
                    break;

                  case 11:
                    e.prev = 11, e.t0 = e.catch(0), console.log(e.t0);

                  case 14:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 0, 11 ] ]);
        }))();
    },
    load: function(t) {
        var a = this, i = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
        return e(n.default.mark(function e() {
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    a.loadRcmdboard(), a.loadHead(t), a.loadQuickFilter();
                    try {
                        a.loadFilter(t), le[ce.FILTER_COMPLETE] || (a.addSpeedTrackEndTime(ce.FILTER_COMPLETE), 
                        le[ce.FILTER_COMPLETE] = !0);
                    } catch (e) {
                        console.error(e);
                    }
                    return e.next = 6, a.loadPoilist(t, i);

                  case 6:
                    t && a.filterGetClientRect();

                  case 7:
                  case "end":
                    return e.stop();
                }
            }, e, a);
        }))();
    },
    _onLoad: function() {
        var t = this;
        return e(n.default.mark(function a() {
            var i, r, o, s, c, u, d, p, g, h, f, _, m, v, T, E;
            return n.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if (i = getApp(), r = i.eventBus, o = function() {
                        var a = e(n.default.mark(function e() {
                            return n.default.wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                  case 0:
                                    return t.loading(!0), e.next = 3, t.load(!0);

                                  case 3:
                                    t.loading(!1);

                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                            }, e, t);
                        }));
                        return function() {
                            return a.apply(this, arguments);
                        };
                    }(), console.log("reload", o), r.on("user:logout", o), r.on("user:login", function() {
                        getApp().afterLoginAction || o();
                    }), r.on("location:changed", e(n.default.mark(function e() {
                        return n.default.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                return t.setData({
                                    locState: "done"
                                }), e.next = 3, t.filterClear();

                              case 3:
                                o();

                              case 4:
                              case "end":
                                return e.stop();
                            }
                        }, e, t);
                    }))), r.on("city:changed", function(e) {
                        re = e;
                    }), t.traceTagStart({
                        src_page: x,
                        src_block: b,
                        tgt_page: w,
                        action: L
                    }), s = t.store.getState(), c = s.wx, u = c.latitude, d = c.longitude, t.loading(!0), 
                    t.load(!0), p = t.data, g = p.hasLogin, h = p.locName, f = Boolean(h), _ = g ? 1 : 0, 
                    !f && g) return m = null, a.prev = 16, a.next = 19, Q({
                        type: 1
                    });
                    a.next = 27;
                    break;

                  case 19:
                    v = a.sent, m = U(u, d, v), a.next = 26;
                    break;

                  case 23:
                    a.prev = 23, a.t0 = a.catch(16), console.error(a.t0);

                  case 26:
                    m && (t.setRecipient(m), f = !0);

                  case 27:
                    if (l({
                        event_type: "view",
                        val_bid: "b_z2ze2",
                        val_lab: {
                            custom: {
                                login: _,
                                set: f ? 1 : 0
                            }
                        }
                    }), f) {
                        a.next = 42;
                        break;
                    }
                    return T = "", a.prev = 30, a.next = 33, J();

                  case 33:
                    E = a.sent, T = E.result, a.next = 40;
                    break;

                  case 37:
                    a.prev = 37, a.t1 = a.catch(30), console.error(a.t1);

                  case 40:
                    T && (t.partialRecipient({
                        address: T,
                        latitude: u,
                        longitude: d
                    }), f = !0), l({
                        event_type: "view",
                        val_bid: "b_hFcrr",
                        val_lab: {
                            custom: {
                                login: _,
                                set: T ? 1 : 0
                            }
                        }
                    });

                  case 42:
                    f ? (t.setData({
                        locState: "done"
                    }, function() {
                        t.addSpeedTrackEndTime(ce.REVERSE_GEO);
                    }), t.initFilter()) : (t.setData({
                        locState: "fail"
                    }), t.error({
                        message: "无法获取地址，请手动定位",
                        textOK: "设置地址",
                        ok: function() {
                            l({
                                event_type: "click",
                                val_bid: "b_nyW8A"
                            }), ee({
                                url: "../loc-select/loc-select"
                            });
                        }
                    })), getApp().store.getState().user.open_id ? t.loadAirDropConpon() : r.on("user:uuid", function() {
                        t.loadAirDropConpon();
                    }), t.loading(!1);

                  case 45:
                  case "end":
                    return a.stop();
                }
            }, a, t, [ [ 16, 23 ], [ 30, 37 ] ]);
        }))();
    },
    locationRetrying: !1,
    locationError: function() {
        var t = this, a = this.locationRetrying, i = this.data.locationEnabled, r = this.store.getState().wx, o = r.latitude, s = r.longitude;
        if (i && 0 !== o && 0 !== s) this.error(); else {
            var c, u = this.onClickTryLocaton;
            u || (this.onClickTryLocaton = (c = e(n.default.mark(function e() {
                return n.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return l({
                            event_type: "click",
                            val_bid: "b_Rww4V"
                        }), e.next = 3, t.locationObtain();

                      case 3:
                        t.onShow();

                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e, t);
            })), u = function() {
                return c.apply(this, arguments);
            })), this.error({
                message: a ? "正在尝试获取地址..." : "无法获取地理位置，请选择收货地址",
                textOK: a ? "正在获取地址" : "搜索地址",
                ok: function() {
                    wx.navigateTo({
                        url: "../loc-select/loc-select"
                    });
                }
            });
        }
    },
    locationPrompting: !1,
    getLocationTimeOut: function() {
        var t, a = this;
        this.locationPrompting && (this.locationPrompting = !1, u("send", "wx_app_get_location_fail", {
            duration: 5e3
        }), this.confirm({
            message: "定位失败，请检查一下网络环境",
            textOK: "重新定位",
            textCancel: "搜索地址",
            ok: (t = e(n.default.mark(function e() {
                return n.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, a.locationObtain();

                      case 2:
                        a.onShow();

                      case 3:
                      case "end":
                        return e.stop();
                    }
                }, e, a);
            })), function() {
                return t.apply(this, arguments);
            }),
            cancel: function() {
                wx.navigateTo({
                    url: "../loc-select/loc-select"
                });
            }
        }));
    },
    locationPrompt: function(e) {
        var t = this;
        if (!this.locationPrompting) {
            this.locationPrompting = !0;
            var a = +new Date(), n = this, i = setTimeout(function() {
                n.getLocationTimeOut();
            }, 5e3);
            wx.getLocation({
                success: function() {
                    clearTimeout(i), t.locationPrompting = !1;
                    var n = +new Date();
                    u("send", "wx_app_get_location_success", {
                        duration: n - a
                    }), e && "function" == typeof e && e();
                },
                fail: function(e) {
                    if (!0 === t.locationPrompting) {
                        clearTimeout(i);
                        var n = wx.openSetting, r = e && e.errMsg && -1 !== e.errMsg.toLowerCase().indexOf("auth");
                        l({
                            event_type: "view",
                            val_lab: {
                                custom: {
                                    reason: oe = r ? "deny" : "fail",
                                    openSetting: n ? 1 : 0
                                }
                            },
                            val_bid: "b_zTKH5"
                        });
                        var o = +new Date();
                        u("send", "wx_app_get_location_fail", {
                            duration: o - a
                        }), r ? (t.setData({
                            locState: t.data.locationEnabled ? "done" : "fail"
                        }), n ? t.openSettingShow() : t.alert({
                            message: "检测到您没打开美团外卖的定位权限，请到设置启用：点击右上角按钮，进入小程序介绍页，再次点击右上角按钮，进入设置页面，打开定位权限",
                            ok: function() {
                                l({
                                    event_type: "click",
                                    val_lab: {
                                        custom: {
                                            reason: oe,
                                            type: -1
                                        }
                                    },
                                    val_bid: "b_b4ztz"
                                }), t.locationPrompting = !1;
                            }
                        })) : (t.locationPrompting = !1, t.setData({
                            locState: "fail"
                        }));
                    }
                }
            });
        }
    },
    locationTest: function() {
        var e = this.store.getState(), t = e.wx, a = t.latitude, n = t.longitude, i = e.recipient, r = i.longitude, o = i.latitude, s = 0 !== a && 0 !== n || "" !== r && "" !== o;
        s || (this.hasGuideLocation = !0, this.locationPrompt()), this.setData({
            locationEnabled: s
        });
    },
    locationObtain: function() {
        var t = this;
        return e(n.default.mark(function e() {
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return t.locationRetrying = !0, t.locationError(), e.next = 4, M([ Z(), q(1e3) ]);

                  case 4:
                    t.locationRetrying = !1, t.locationTest(), t.locationError();

                  case 7:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    setMtTop: function() {
        this.setNavigationBarTitle({
            title: "美团生活"
        }), this.setData({
            mtTopShow: !0
        });
    },
    hasCallOnLoad: !1,
    hasGuideLocation: !1,
    _getBanner: function() {
        var t = this;
        return e(n.default.mark(function e() {
            var a, i, r, o, s, c, l, u, d, p, g, h, f;
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, $({
                        need_regions: 1
                    });

                  case 2:
                    a = e.sent, i = a.top_banner_list, r = t.store.getState(), o = r.wx, s = o.latitude, 
                    c = o.longitude, l = r.user, u = l.open_id, d = l.user_id, p = l.token, f = h = g = "", 
                    i.length !== t.data.bnrImgs.length && t.setData({
                        bnrImgs: []
                    }), i = i.map(function(e) {
                        return /https:\/\/wxapp_outter/.test(decodeURIComponent(e.h5_url)) && (e.targetIsMP = !0, 
                        g = e.h5_url.match(/(^|\?|&)appId=([^&]*)(&|$)/), h = e.h5_url.match(/(^|\?|&)extraData=([^&]*)(&|$)/), 
                        f = e.h5_url.match(/(^|\?|&)path=([^&]*)(&|$)/), g && (e.appId = g[2]), h && (e.extraData = h[2]), 
                        f && (e.path = f[2], /\?/.test(e.path) ? e.path = e.path + "&latitude=" + s + "&longitude=" + c : e.path = e.path + "?latitude=" + s + "&longitude=" + c, 
                        e.path = e.path + "&open_id=" + u + "&user_id=" + d + "&token=" + p)), e;
                    }), t.setData({
                        bnrImgs: i
                    }), i[0] && t.reportBannerView(i[0]);

                  case 12:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    bannerChange: function(e) {
        if (this.pageVisiable) {
            var t = e.detail.current;
            this.reportBannerView(this.data.bnrImgs[t]);
        }
    },
    reportBannerView: function(e) {
        var t = void 0;
        try {
            t = e.h5_url.match(/activity_id=[^&]*/)[0].split("=")[1];
        } catch (e) {
            t = "";
        }
        l({
            event_type: "view",
            val_bid: "b_qE09x",
            val_lab: {
                activity_id: t,
                ad: "",
                banner_id: e.banner_act_id
            }
        });
    },
    onShow: function() {
        this.pageVisiable = !0, wx.setNavigationBarTitle({
            title: "美团外卖"
        }), s.init();
        var e = getApp(), t = e.store.getState().extradata.from;
        if (t && "dianping-wxapp" !== t && this.setMtTop(), this.entree_from = t, this.locationTest(), 
        !this.data.locationEnabled) return this.loading(!1), void this.locationError();
        this.hasCallOnLoad ? this._onShow && this._onShow() : (l({
            event_type: "view",
            val_bid: "b_2E9x4",
            val_lab: {
                custom: {
                    recover: this.hasGuideLocation ? 1 : 0
                }
            }
        }), this._onLoad()), this.hasCallOnLoad = !0, this.lxFilterView();
        var a = e.afterLoginAction;
        "navToRedpackPage" === a ? (this.navToRedpackPage(), e.afterLoginAction = "") : a === R || a === j ? (e.afterLoginAction = "", 
        "function" == typeof this[a] && (this[a](), this[a] = "")) : this._getUserRedpackInfo(), 
        this.antiSpiderReset(), this.lxFilterFastestSpeedView(), V(this.SDKVersion, "1.7.1") && this._getBanner(), 
        this.lxSearchView({
            spread: this.data.filter.activeTab || this.data.headerIndex.hideLoc ? "1" : "0"
        }), this.lxQuickFilterView(), s.clearImpression(), s.triggerScroll();
    },
    antiSpiderReset: function() {
        this[j] && this.toast({
            message: "发现异常，请登录后再试"
        }), this[j] = this[R] = "";
    },
    onHide: function() {
        this.pageVisiable = !1;
    },
    onLoad: function() {
        var e = this, t = this.store.getState(), a = t.dev.env, n = t.wx.SDKVersion;
        a && this.toast({
            message: "当前环境" + a
        }), this.locationTest(), setTimeout(function() {
            u("send", "rootpage");
        }, 2e3), wx.getSystemInfo({
            success: function(t) {
                e.SDKVersion = t.SDKVersion, e.setData({
                    SDKVersion: t.SDKVersion,
                    canIUseNavigator: V(t.SDKVersion, "2.0.7")
                });
            }
        }), V(n, "2.0.7") && this.setData({
            "paoTui.useNavigator": !0
        }), this.setData({
            env: a
        }), this.addSpeedTrackStartTime(ce.SHOPLIST_COMPELETE), this.addSpeedTrackStartTime(ce.REVERSE_GEO), 
        this.addSpeedTrackStartTime(ce.KINGKONG_COMPELETE), this.addSpeedTrackStartTime(ce.FILTER_COMPLETE);
    },
    getReportData: function() {
        return {
            cid: "c_m84bv26"
        };
    },
    onKingkongPageChange: function(e) {
        var t = e.detail.current, a = this.data.filterPages;
        this.lxKingkongView(a[t], t);
    },
    openWebview: function(e) {
        var t = e.currentTarget.dataset, a = t.viewurl, n = t.index;
        this.reportBannerClick(this.data.bnrImgs[n]);
        var i = this.store, r = i.getState(), o = r.wx, s = o.longitude, c = o.latitude, l = r.recipient, u = l.longitude, d = l.latitude, p = r.dev.env, g = i.getState().user, h = g.open_id, f = g.user_id, _ = g.token;
        if (a = /\?/.test(a) ? a + "&latitude=" + (d || s) + "&longitude=" + (u || c) + "&entry_index=" + n : a + "?latitude=" + (d || s) + "&longitude=" + (u || c) + "&entry_index=" + n, 
        /https:\/\/wxapp_outter/.test(a = a + "&open_id=" + h + "&user_id=" + f + "&token=" + _ + "&entree_from=banner")) {
            var m = this.data.bnrImgs;
            wx.canIUse && wx.canIUse("navigateToMiniProgram") && m[n].targetIsMP && wx.navigateToMiniProgram({
                appId: m[n].appId,
                path: m[n].path,
                extraData: JSON.parse(m[n].extraData || "{}"),
                envVersion: "qa" === p ? "trial" : "release"
            });
        } else /https:\/\/wxapp/.test(a) ? (a = a.split("https://wxapp")[1], ee({
            url: a
        })) : ee(/https:\/\/market.waimai.meituan.com\/gd\/wm/.test(a) ? {
            url: "/pages/web-view/web-view?type=REDIRECT&redirectUrl=" + encodeURIComponent(a)
        } : {
            url: "/pages/web-view/web-view?redirectUrl=" + encodeURIComponent(a)
        });
    },
    reportBannerClick: function(e) {
        var t = void 0;
        try {
            t = e.h5_url.match(/activity_id=[^&]*/)[0].split("=")[1];
        } catch (e) {
            t = "";
        }
        l({
            event_type: "click",
            val_bid: "b_Fjxks",
            val_lab: {
                activity_id: t,
                ad: "",
                banner_id: e.banner_act_id
            }
        });
    },
    onClickResetFilter: function() {
        this.filterClear(), this.reloadPoilist(), this.lxResetFilterClick();
    },
    onOpenSettingCancel: function() {
        l({
            event_type: "click",
            val_lab: {
                custom: {
                    reason: oe,
                    type: 0
                }
            },
            val_bid: "b_b4ztz"
        }), this.locationPrompting = !1, this.openSettingHide();
    },
    onOpenSettingOk: function() {
        l({
            event_type: "click",
            val_lab: {
                custom: {
                    reason: oe,
                    type: 1
                }
            },
            val_bid: "b_b4ztz"
        }), this.locationPrompting = !1;
    },
    onOpenSettingSucc: function(t) {
        var a = this, i = t.detail.authSetting["scope.userLocation"];
        return e(n.default.mark(function e() {
            return n.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (l({
                        event_type: "view",
                        val_lab: {
                            custom: {
                                auth: i ? 1 : 0
                            }
                        },
                        val_bid: "b_Ed4Im"
                    }), a.setData({
                        locState: "loading"
                    }), i) return a.openSettingHide(), e.next = 6, a.locationObtain();
                    e.next = 7;
                    break;

                  case 6:
                    a.onShow();

                  case 7:
                  case "end":
                    return e.stop();
                }
            }, e, a);
        }))();
    }
};

(0, i.page)(G(ue, H, se, ae, p, g, h, f, te, A, d, ie));