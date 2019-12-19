function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new r(function(e, i) {
            return function a(n, o) {
                try {
                    var s = t[n](o), c = s.value;
                } catch (n) {
                    return void i(n);
                }
                if (!s.done) return r.resolve(c).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
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
}(require("../../npm/babel-runtime/regenerator/index.js")), i = require("../../npm/@dp/owl-wxapp/es6/index.js"), r = require("../../npm/promise-polyfill/promise.js"), a = require("../../api/index.js").channelPage, n = require("../../weapp-redux/index.js").connect, o = require("../base.js"), s = require("../../components/poi-list/poi-list.js"), c = require("../../components/filter/filter.js"), l = require("../../utils/mix.js"), d = require("../../components/rohr/rohr.js"), u = require("../../utils/object-assign.js"), p = require("../index/log.js"), _ = require("../../utils/quick-filter-manager.js").clear, h = require("../../api/wx.js").storage.getItem, g = require("../../constants.js"), f = g.ACTION_CLICK, E = g.P_POI, m = g.P_CATEGORY, x = g.B_POILIST, T = g.CODE_GOTO_LOGIN, P = g.CODE_PRELOGIN, N = g.ANTI_SPIDER_FORCE_LOGIN, R = g.ANTI_SPIDER_PRELOGIN, I = g.KEY_UUID, S = require("../../components/midas/midas.outlet.js"), w = require("../../components/owl-watcher/owl-watcher.js"), C = {
    CHANNEL_PAGE_INTERFACE_TIME: 1,
    CHANNEL_PAGE_RENDER_TIME: 2,
    CHANNEL_PAGE_FIRST_SREEN_COMPLETE_TIME: 3
}, v = n(function(e) {
    var t = e.cart, i = {};
    return Object.keys(t).forEach(function(e) {
        if (t[e] && t[e][0] && t[e][0].cart && t[e][0].cart.length) {
            for (var r = t[e][0].cart, a = 0, n = 0, o = r.length; n < o; n++) a += r[n].count;
            i[e] = a;
        }
    }), {
        cartKeys: i
    };
}), L = {
    pageName: "channel-page",
    data: {
        hasMore: !1,
        scrollTop: 0,
        backTopShow: !1,
        isLoading: !0,
        searchHeight: 60,
        showResetFilter: !1,
        lch: wx.getStorageSync("wx_scene"),
        uuid: "",
        env: "",
        entranceId: 0
    },
    page_index: 0,
    onScrollBottom: function() {
        this.data.hasMore && this.load(!1);
    },
    onClickPoilistItem: function(e) {
        var t = e.currentTarget.dataset, i = t.id, r = t.index, a = t.poi;
        this.traceTagStart({
            src_page: m,
            src_block: x,
            src_item_index: r,
            src_item_id: i,
            src_item_type: "poi",
            tgt_page: E,
            extra: {
                poi_id: i
            },
            action: f
        }), a.index = r, this.lxChannelPoilistClick(a);
    },
    _poilistLoad: function(i) {
        var r = this;
        return e(t.default.mark(function e() {
            var n, o, s, c, l, d, p;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n = r.page_index, o = u({
                        page_index: i ? 0 : r.page_index,
                        page_size: 20,
                        load_type: 1,
                        trace_tag: r.traceTagEnd({
                            tgt_block: x
                        })
                    }, r.filterParam = r.getFilterParam()), r.addSpeedTrackStartTime(C.CHANNEL_PAGE_INTERFACE_TIME), 
                    e.next = 5, a(o);

                  case 5:
                    return s = e.sent, c = s.poi_has_next_page, l = s.poilist, d = s.judas_field, r.addSpeedTrackEndTime(C.CHANNEL_PAGE_INTERFACE_TIME), 
                    o.sort_type ? r.judasParams = {
                        rank_trace_id: ""
                    } : o.page_index || (r.judasParams = d), p = i ? 0 : (r.data.poilist || []).length || 0, 
                    (l || []).forEach(function(e, t) {
                        e.index = p + t, r.lxChannelPoilistView(e);
                    }), e.abrupt("return", {
                        poi_has_next_page: c,
                        page_index: i ? 1 : n + 1,
                        poilist: l
                    });

                  case 14:
                  case "end":
                    return e.stop();
                }
            }, e, r);
        }))();
    },
    _trackPoiListRenderStartTime: function() {
        this.addSpeedTrackStartTime(C.CHANNEL_PAGE_RENDER_TIME);
    },
    _trackPoiListRenderEndTime: function() {
        this.addSpeedTrackEndTime(C.CHANNEL_PAGE_RENDER_TIME), this.addSpeedTrackEndTime(C.CHANNEL_PAGE_FIRST_SREEN_COMPLETE_TIME);
    },
    reloadPoilist: function() {
        return this.load(!0);
    },
    loadPoilist: function(i) {
        var r = this;
        return e(t.default.mark(function e() {
            var a, n, o, s, c, l, d, u, p, _;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return r.data.hasMore || r.loading(!0), r.setData({
                        loadingLogo: !i
                    }), a = 0 !== r.data.poilist.length, c = s = o = n = void 0, e.prev = 7, e.next = 10, 
                    r.poilistLoad(i);

                  case 10:
                    l = e.sent, n = l.poi_has_next_page, o = l.page_index, s = l.valid, c = l.poilist, 
                    e.next = 21;
                    break;

                  case 17:
                    throw e.prev = 17, e.t0 = e.catch(7), e.t0 && (e.t0.code === T ? r[N] = function() {
                        r.load(i);
                    } : e.t0.code === P && (r[R] = function() {
                        r.load(i);
                    })), e.t0;

                  case 21:
                    if (s) {
                        e.next = 23;
                        break;
                    }
                    return e.abrupt("return");

                  case 23:
                    return r.page_index = o, d = 0 === c.length && (0 < r.filterParam.activity_filter_codes.length || 0 < r.data.filter.selectedPriceRange.length), 
                    e.next = 27, h(I, "");

                  case 27:
                    u = e.sent, p = u.data, _ = {
                        loadingLogo: !1,
                        hasMore: n,
                        isLoading: !1,
                        showResetFilter: d,
                        poilist: c,
                        uuid: p
                    }, d && r.lxResetFilterView(), i && a && (0 === r.data.scrollTop && r.setData({
                        scrollTop: 1
                    }), _.scrollTop = 0), r._trackPoiListRenderStartTime(), r.setData(_, function() {
                        r._trackPoiListRenderEndTime(), i && (S.clearImpression(), S.triggerScroll());
                    }), i && r.loading(!1);

                  case 35:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 7, 17 ] ]);
        }))();
    },
    load: function(i) {
        var r = this;
        return e(t.default.mark(function e() {
            var a;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return i && r.loading(!0), r.loadQuickFilter(), e.prev = 2, e.next = 5, r.loadFilter();

                  case 5:
                    return e.next = 7, r.loadPoilist(i);

                  case 7:
                    r.error(), e.next = 15;
                    break;

                  case 10:
                    e.prev = 10, e.t0 = e.catch(2), a = e.t0.code, e.t0.message, i ? r.error({
                        message: "您的手机网络好像不太流畅哦~",
                        img: "no-net",
                        textOK: "重新加载",
                        ok: function() {
                            r.load(!0);
                        }
                    }) : a === P || r.toast({
                        message: "网络异常, 请重试"
                    });

                  case 15:
                    i && r.loading(!1);

                  case 16:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 2, 10 ] ]);
        }))();
    },
    onLoad: function(e) {
        var t = e.typeCode, i = e.typeName;
        i = decodeURIComponent(i), this.addSpeedTrackStartTime(C.CHANNEL_PAGE_FIRST_SREEN_COMPLETE_TIME), 
        this.initFilter({
            typeCode: t,
            typeName: i
        }), _(this.pageName), this.load(!0), this.setCategoryCode(t), this.lxSearchView(), 
        this.lxFilterView();
        var r = this.store.getState().dev.env;
        this.setData({
            env: r,
            entranceId: t
        });
    },
    onShow: function() {
        this.lxQuickFilterView(), S.init(), S.clearImpression(), S.triggerScroll();
        var e = getApp(), t = e.afterLoginAction;
        t !== N && t !== R || (e.afterLoginAction = "", "function" == typeof this[t] && (this[t](), 
        this[t] = "")), this.antiSpiderReset();
    },
    antiSpiderReset: function() {
        this[R] && this.toast({
            message: "发现异常，请登录后再试"
        }), this[R] = this[N] = "";
    },
    getReportData: function() {
        return {
            cid: "c_i5kxn8l"
        };
    },
    onPullDownRefresh: function() {
        this.load(!0).then(function() {
            wx.stopPullDownRefresh();
        });
    },
    onReachBottom: function() {
        this.onScrollBottom();
    },
    onPageScroll: function(e) {
        var t = e.scrollTop, i = this.store.getState().wx.windowWidth, r = this.data.searchHeight * (i / 750), a = this.data.filter.scrollTop || 0;
        t <= i / 750 * 400 && a <= r && this.setFilterBodyTop(t < r ? t : r);
    },
    onClickResetFilter: function() {
        this.filterClear(), this.reloadPoilist(), this.lxResetFilterClick();
    }
};

(0, i.page)(l(L, v, s, c, o, p, d, w));