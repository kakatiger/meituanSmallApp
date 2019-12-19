function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new o(function(e, a) {
            return function i(r, s) {
                try {
                    var n = t[r](s), c = n.value;
                } catch (r) {
                    return void a(r);
                }
                if (!n.done) return o.resolve(c).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(c);
            }("next");
        });
    };
}

var a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), i = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, r = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t;
    };
}(), s = require("../../npm/@dp/owl-wxapp/es6/index.js"), n = require("../../actions/wx.js"), o = require("../../npm/promise-polyfill/promise.js"), c = require("../base.js"), l = require("../../utils/fix-coords.js"), u = require("../../store.js"), d = require("../../utils/wait.js"), h = require("../../utils/promise-try.js"), _ = require("../../utils/mix.js"), p = require("./log.js"), g = require("../../components/open-setting/open-setting.js"), f = require("../../components/midas/midas.outlet.js"), y = require("../../components/filter/filter.js"), v = require("../../api/wx.js").getLocation, m = function(e) {
    return u.dispatch((0, n.set)(e)), e;
}, w = function(e) {
    for (var t = {}, a = e.length - 1; -1 < a; --a) t[e[a]] = 1;
    return Object.keys(t);
}, x = require("../../api/index.js"), S = x.searchHot, k = x.searchSuggestV8, b = x.searchPoi, L = x.searchPoiWithFilter, D = require("../../api/wx.js"), j = D.storage, T = j.setItem, C = j.getItem, P = D.navigateTo, A = {
    poi: 12e3,
    food: 12001,
    search: 12002,
    poiKA: 12003,
    hotword: 12004,
    h5: 12005
}, I = require("../../utils/find-index.js"), q = require("../../constants.js"), R = q.KEY_HISTORY_LABELS, E = q.CODE_GOTO_LOGIN, O = q.CODE_PRELOGIN, F = q.ANTI_SPIDER_FORCE_LOGIN, V = q.ANTI_SPIDER_PRELOGIN, M = q.KEY_UUID, K = {
    labels: [],
    getAsync: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var i, r;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, C(R);

                  case 2:
                    if (i = t.sent, (r = i.data) instanceof Array) return e.labels = r, t.abrupt("return", r);
                    t.next = 7;
                    break;

                  case 7:
                    return t.abrupt("return", e.labels);

                  case 8:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    get: function() {
        return this.labels;
    },
    add: function(e) {
        var t = this.labels, a = I(t, function(t) {
            return t.label_name === e.label_name;
        });
        return 0 === a ? t : (t = -1 === a ? [ e ].concat(t) : [ t[a] ].concat(t.slice(0, a), t.slice(a + 1)), 
        T(R, t), this.labels = t);
    },
    clear: function() {
        var e = this.labels = [];
        return T(R, e), e;
    }
}, H = function(e, t) {
    for (var a = e, i = []; a; ) {
        for (var r = 1 / 0, s = "", n = t.length - 1; -1 < n; --n) {
            var o = t[n], c = a.indexOf(o);
            -1 !== c && c < r && (r = c, s = o);
        }
        if (s) {
            var l = s.length, u = a.slice(0, r), d = a.slice(r, r + l);
            u && i.push({
                name: u,
                highLight: !1
            }), i.push({
                name: d,
                highLight: !0
            }), a = a.slice(r + l);
        } else i.push({
            name: a,
            highLight: !1
        }), a = "";
    }
    return i;
}, N = function() {
    function t() {
        var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, i = a.inputDelay, r = a.onInput, s = a.onSuggest;
        e(this, t), this.state = "init", this.keyword = "", this.to = -1, this.inputDelay = 100, 
        this.onInput = null, this.onSuggest = null, this.onInput = r, this.inputDelay = i, 
        this.onSuggest = s;
    }
    return r(t, [ {
        key: "input",
        value: function() {
            var e = this, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
            if (clearTimeout(this.to), !(t = (t || "").replace(/\s/g, "")) || t !== this.keyword) return this.keyword = t, 
            this.to = setTimeout(function() {
                e.onSuggest();
            }, this.inputDelay), t ? void 0 : t;
        }
    }, {
        key: "search",
        value: function(e) {
            clearTimeout(this.to), this.state = "search", this.keyword = e;
        }
    }, {
        key: "reset",
        value: function() {
            this.state = "init", this.keyword = "";
        }
    }, {
        key: "getKeyword",
        value: function() {
            return this.keyword;
        }
    }, {
        key: "getState",
        value: function() {
            return this.state;
        }
    }, {
        key: "destroy",
        value: function() {
            clearTimeout(this.to);
        }
    } ]), t;
}(), U = function() {
    function t() {
        e(this, t), this.t = 0;
    }
    return r(t, [ {
        key: "get",
        value: function() {
            return this.add();
        }
    }, {
        key: "valid",
        value: function(e) {
            return this.t === e;
        }
    }, {
        key: "add",
        value: function() {
            var e = this.t, t = e + 1;
            return t === e && (t = 0), this.t = t;
        }
    }, {
        key: "cancel",
        value: function() {
            return this.add();
        }
    } ]), t;
}(), B = function() {
    var e = String(Date.now()).substr(4);
    try {
        var t = wx.getStorageSync("UUID");
        return t ? "" + e + t : e;
    } catch (t) {
        return e;
    }
}, G = {
    data: {
        hotLabels: [],
        historyLabels: K.get(),
        inputShowClear: !1,
        keywordValue: "",
        keywordLabel: "",
        pageState: "hot",
        suggest: [],
        terms: [],
        search_poi_list: [],
        recommend_poi_list: [],
        poilistActvsShown: {},
        productShown: {},
        has_next_page: !1,
        inputFocus: !0,
        inputFocused: !1,
        lch: wx.getStorageSync("wx_scene"),
        uuid: "",
        env: "",
        isLoading: !1
    },
    is_scroll_loading: !1,
    search_poi_ajax_param: {
        entrance_id: 0,
        category_type: 0,
        sub_category_type: 0,
        query_type: 0,
        page_index: 0,
        sort_type: 0,
        activity_filter_codes: "",
        slider_select_data: "[]"
    },
    suggest_global_id: B(),
    suggestTicket: null,
    searchTicket: null,
    locationObtain: function() {
        var e = this;
        return t(a.default.mark(function t() {
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, h([ v(), d(1e3) ]);

                  case 2:
                  case "end":
                    return e.stop();
                }
            }, t, e);
        }))();
    },
    updateSearchPoiAjaxParam: function(e) {
        var t = this.search_poi_ajax_param;
        this.search_poi_ajax_param = i({}, t, e);
    },
    onLoad: function(e) {
        var t = this, a = e.entranceId, i = void 0 === a ? 0 : a, r = e.cateType, s = void 0 === r ? 0 : r, n = e.subCateType, o = void 0 === n ? 0 : n, c = e.keyword, u = void 0 === c ? "" : c, d = e.auto_search, h = void 0 !== d && d, _ = e.wxParamData, p = void 0 === _ ? "" : _, g = e.loc_auth, f = void 0 === g ? "1" : g, y = this.store.getState().dev.env;
        if (this.setData({
            env: y
        }), u = decodeURIComponent(u), p) {
            p = decodeURIComponent(p);
            var v = JSON.parse(p);
            if (v.slot_list.forEach(function(e) {
                "name" === e.key && (u = e.value);
            }), h = !0, v.longitude && v.latitude) {
                var w = l(v), x = {
                    latitude: w.latitude,
                    longitude: w.longitude,
                    orig_latitude: v.latitude,
                    orig_longitude: v.longitude
                };
                m(x);
            }
        }
        "1" !== f && wx.getLocation({
            success: function() {
                P({
                    url: "../search/search?keyword=" + u + "&auto_search=true"
                });
            },
            fail: function(e) {
                var a = wx.openSetting;
                e && e.errMsg && -1 !== e.errMsg.toLowerCase().indexOf("auth") && a && t.openSettingShow();
            }
        }), this.updateSearchPoiAjaxParam({
            entrance_id: i,
            category_type: s,
            sub_category_type: o
        }), this.loadHotLabel(), this.loadHistory(), this.loadFilter(), this.setData({
            keywordLabel: u
        }), this.suggestTicket = new U(), this.searchTicket = new U();
        var S = this.searchManager = new N({
            onInput: function() {
                t.setData({
                    inputShowClear: Boolean(S.getKeyword()),
                    pageState: "hot"
                });
            },
            onSuggest: function() {
                t.setData({
                    inputShowClear: Boolean(S.getKeyword())
                }), t.loadSuggest();
            }
        });
        h && this.onClickSearch();
    },
    onUnload: function() {
        this.searchTicket.cancel(), this.suggestTicket.cancel(), this.searchManager.destroy();
    },
    naviatePoi: function(e) {
        P({
            url: "../restaurant/restaurant?poi_id=" + e
        });
    },
    loadSearch: function(e) {
        var r = this;
        return t(a.default.mark(function t() {
            var s, n, o, c, l, u, d, h, _, p, g, y, v, m, x, S, k, D, j, T, P, A, I, q, R, K, N, U, B, G, Y, W, J, z;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (r.loading(!0), r.is_scroll_loading = !0, e && (r.setData({
                        isLoading: !0,
                        search_poi_list: [],
                        recommend_poi_list: []
                    }), f.clearImpression(), f.triggerScroll(), r.updateSearchPoiAjaxParam({
                        page_index: 0
                    })), s = r.data, n = s.keywordLabel, o = s.filter.activeTab, c = s.pageState, l = r.searchManager, 
                    u = r.searchTicket, d = r.suggestTicket, h = u.get(), _ = (r.data.search_poi_list || []).length || 0, 
                    d.cancel(), t.prev = 7, o && r.filterHiddenSelectTab(), "search" !== c && (r.filterAllReset(), 
                    r.search_poi_ajax_param.sort_type = 0, r.search_poi_ajax_param.activity_filter_codes = "", 
                    r.search_poi_ajax_param.slider_select_data = "[]"), p = l.getKeyword() || n, g = r.search_poi_ajax_param, 
                    y = g.sort_type, v = g.activity_filter_codes, m = g.slider_select_data, x = 0 !== (v || "").length, 
                    S = 2 !== m.length, k = i({}, r.search_poi_ajax_param, {
                        activity_filter_codes: x ? v : "",
                        slider_select_data: S ? m : "",
                        keyword: p
                    }), D = 0 !== y || x || S) {
                        t.next = 22;
                        break;
                    }
                    return t.next = 19, b(k);

                  case 19:
                    t.t0 = t.sent, t.next = 25;
                    break;

                  case 22:
                    return t.next = 24, L(k);

                  case 24:
                    t.t0 = t.sent;

                  case 25:
                    if (j = t.t0, P = (T = j || {}).search_poi_list, A = T.terms, I = T.non_delivery_poi_info, 
                    q = T.recommend_poi_list, R = T.has_next_page, K = T.tgt_stids, N = T.search_log_Id, 
                    U = T.template, u.valid(h)) return B = w(A), (P || []).forEach(function(e) {
                        e.name = H(e.name, B), e.product_list.forEach(function(e) {
                            e.product_name = H(e.product_name, B);
                        }), e.recommend_list = (e.recommend_list || []).slice(0, 2), e.primitiveDistance = 0, 
                        e.charge_info = e.charge_info ? "sort=" + (y || 0) + "&filter=" + (v || "") + "&" + e.charge_info : "";
                    }), (q || []).forEach(function(e, t) {
                        e.name = H(e.name, B), e.product_list.forEach(function(e) {
                            e.product_name = H(e.product_name, B);
                        }), e.charge_info = e.charge_info ? "sort=" + (y || 0) + "&filter=" + (v || "") + "&" + e.charge_info : "", 
                        e.primitiveDistance = 0, e.template_type = 1 === U ? 0 : 1, e.is_filter_result = D ? 1 : 0;
                        var a = {
                            index: t,
                            keyword: p,
                            tgt_stids: K,
                            search_log_Id: N
                        };
                        r.lxRecommendShopView(e, a);
                        var s = e.product_list;
                        (void 0 === s ? [] : s).forEach(function(t, s) {
                            r.lxRecommendShopFoodView(t, e, i({}, a, {
                                spu_index: s
                            }));
                        });
                    }), I && I.is_show_nondelivery && (G = I.poi_nondelivery_context, I.poi_nondelivery_context = H(G, B)), 
                    (P || []).forEach(function() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], a = e.search_result_type, s = e.product_list, n = void 0 === s ? [] : s, o = {
                            keyword: p,
                            index: t + _,
                            tgt_stids: K,
                            search_log_Id: N
                        };
                        e.tgt_stids = K, e.search_log_Id = N, e.template_type = 1 === U ? 0 : 1, e.is_filter_result = D ? 1 : 0, 
                        r.isAcurrateShop(a) ? (r.lxAcurrateShopView(e, o), n.forEach(function(t, a) {
                            r.lxAcurrateShopFoodView(t, e, i({}, o, {
                                spu_index: a
                            }));
                        })) : r.isRelativeShop(a) && (r.lxRelativeShopView(e, o), n.forEach(function(t, a) {
                            r.lxRelativeShopFoodView(t, e, i({}, o, {
                                spu_index: a
                            }));
                        }));
                    }), t.next = 35, C(M, "");
                    t.next = 40;
                    break;

                  case 35:
                    Y = t.sent, W = Y.data, r.setData({
                        pageState: "search",
                        has_next_page: R,
                        search_poi_list: r.data.search_poi_list.concat(P),
                        recommend_poi_list: r.data.recommend_poi_list.concat(q),
                        non_delivery_poi_info: I,
                        keywordValue: p,
                        inputShowClear: !0,
                        isShopTemplate: 1 === U,
                        isDishTemplate: 2 === U,
                        uuid: W,
                        isLoading: !1
                    }), r.is_scroll_loading = !1, r.lxSearchResultView({
                        tgt_stids: K,
                        keyword: p,
                        template_type: 1 === U ? 0 : 1
                    });

                  case 40:
                    t.next = 49;
                    break;

                  case 42:
                    t.prev = 42, t.t1 = t.catch(7), J = t.t1.message, z = t.t1.code, console.error(J), 
                    z !== E && z !== O || (r[V] = r[F] = function() {
                        r.loadSearch(e);
                    }), r.setData({
                        isLoading: !1
                    });

                  case 49:
                    r.loading(!1);

                  case 50:
                  case "end":
                    return t.stop();
                }
            }, t, r, [ [ 7, 42 ] ]);
        }))();
    },
    onClickPoilistItem: function(e) {
        var t = e.currentTarget, a = (void 0 === t ? {} : t).dataset, i = void 0 === a ? {} : a, r = i.poi, s = void 0 === r ? {} : r, n = i.index, o = void 0 === n ? 0 : n, c = i.stid, l = void 0 === c ? "" : c, u = i.logid, d = void 0 === u ? "" : u, h = s.search_result_type, _ = this.data.keywordLabel, p = {
            keyword: this.searchManager.getKeyword() || _,
            index: o,
            tgt_stids: l,
            search_log_Id: d
        };
        this.isAcurrateShop(h) ? this.lxAcurrateShopClick(s, p) : this.isRelativeShop(h) ? this.lxRelativeShopClick(s, p) : this.isRecommendShop(h) && this.lxRecommendShopClick(s, p);
    },
    onClickPoiProduct: function(e) {
        var t = e.currentTarget, a = (void 0 === t ? {} : t).dataset, i = void 0 === a ? {} : a, r = i.poi, s = void 0 === r ? {} : r, n = i.index, o = void 0 === n ? 0 : n, c = i.product, l = void 0 === c ? {} : c, u = i.spu_index, d = void 0 === u ? 0 : u, h = s.tgt_stids, _ = void 0 === h ? "" : h, p = s.search_log_Id, g = void 0 === p ? "" : p, f = s.search_result_type, y = void 0 === f ? "" : f, v = this.data.keywordLabel, m = {
            keyword: this.searchManager.getKeyword() || v,
            index: o,
            tgt_stids: _,
            search_log_Id: g,
            spu_index: d
        }, w = l.wm_poi_id, x = l.product_spu_id;
        this.isAcurrateShop(y) ? this.lxAcurrateShopFoodClick(l, s, m) : this.isRelativeShop(y) ? this.lxRelativeShopFoodClick(l, s, m) : this.isRecommendShop(y) && this.lxRecommendShopFoodClick(l, s, m), 
        P({
            url: "../restaurant/restaurant?poi_id=" + w + "&spu_id=" + x
        });
    },
    onClickMoreProduct: function(e) {
        var t = e.currentTarget.dataset.id, a = this.data.productShown;
        a[t] = !a[t], this.setData({
            productShown: a
        }), f.triggerScroll();
    },
    onClickHot: function(e) {
        var t = e.currentTarget.dataset, a = t.item, i = t.history, r = a.label_type, s = a.wm_poi_id, n = a.search_keyword;
        switch (r) {
          case A.poi:
          case A.poiKA:
            this.naviatePoi(s);
            break;

          case A.food:
          case A.hotword:
          case A.search:
          case A.h5:
          default:
            this.setData({
                keywordValue: n,
                inputShowClear: !0
            }), this.searchManager.search(n), this.setLabelType(r), this.updateSearchPoiAjaxParam({
                query_type: i ? 1 : r
            }), this.search();
        }
        var o = this.data.historyLabels, c = K.add(a);
        c !== o && this.setData({
            historyLabels: c
        }), i ? this.lxHisClick(a) : this.lxHotClick(a);
    },
    setLabelType: function(e) {
        this.label_type = e;
    },
    onClickSuggestWord: function(e) {
        var t = e.currentTarget.dataset, a = t.suggest, i = t.index, r = t.item;
        this.setData({
            keywordValue: r,
            inputShowClear: !0
        }), this.searchManager.search(r), this.setLabelType(A.search), this.updateSearchPoiAjaxParam({
            query_type: (a || {}).type || 0
        }), this.search(), this.lxSugClick(a, i);
        var s = this.data.historyLabels, n = K.add({
            label_type: A.search,
            search_keyword: r,
            label_name: r
        });
        n !== s && this.setData({
            historyLabels: n
        });
    },
    onClickSuggestShop: function(e) {
        var t = this, a = e.currentTarget.dataset, i = a.suggest, r = a.index, s = a.item, n = a.id, o = this.data.historyLabels, c = K.add({
            label_type: A.poi,
            search_keyword: s,
            label_name: s,
            wm_poi_id: n
        });
        c !== o && this.setData({
            historyLabels: c
        }), this.lxSugClick(i, r), setTimeout(function() {
            t.naviatePoi(n);
        }, 80);
    },
    loadHotLabel: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var i, r, s, n, o, c;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, t.next = 4, S({
                        entrance_id: 0,
                        category_type: 0,
                        wm_poi_id_list: "[]",
                        page_index: 0,
                        need_region: "[1]"
                    });

                  case 4:
                    i = t.sent, r = i.labels, s = i.labels_tgt_stids, n = i.scene_type, (o = r.filter(function(e) {
                        return e.label_type !== A.h5;
                    })).forEach(e.lxHotView.bind(e, {
                        scene_type: n,
                        labels_tgt_stids: s
                    })), e.setData({
                        hotLabels: o,
                        labels_tgt_stids: s,
                        scene_type: n
                    }), t.next = 17;
                    break;

                  case 13:
                    t.prev = 13, t.t0 = t.catch(0), c = t.t0.message, e.toast({
                        message: c
                    });

                  case 17:
                    e.loading(!1);

                  case 18:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 0, 13 ] ]);
        }))();
    },
    onClickDelete: function() {
        var e = this;
        this.confirm({
            message: "清除历史记录？",
            ok: function() {
                e.setData({
                    historyLabels: K.clear()
                });
            }
        });
    },
    loadHistory: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var i;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, t.next = 3, K.getAsync();

                  case 3:
                    i = t.sent, e.setData({
                        historyLabels: i
                    }), i.forEach(e.lxHisView), t.next = 11;
                    break;

                  case 8:
                    t.prev = 8, t.t0 = t.catch(0), console.error(t.t0);

                  case 11:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 0, 8 ] ]);
        }))();
    },
    onSearchInput: function(e) {
        var t = e.detail.value;
        return t || (this.suggest_global_id = B()), this.searchManager.input(t);
    },
    loadSuggest: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var r, s, n, o, c, l, u, d, h, _, p, g, f, y;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (t.prev = 0, r = e.searchTicket, s = e.suggestTicket, r.cancel(), n = s.get(), 
                    o = e.suggest_global_id, e.searchManager.getKeyword()) {
                        t.next = 8;
                        break;
                    }
                    return e.setData({
                        pageState: "hot",
                        suggest: []
                    }), t.abrupt("return");

                  case 8:
                    return t.next = 10, k({
                        keyword: e.searchManager.getKeyword(),
                        category_type: 0,
                        entrance_id: 0,
                        suggest_global_id: o
                    });

                  case 10:
                    c = t.sent, l = c.terms, u = c.suggest, d = c.tgt_stids, h = c.log_field, e.setData({
                        tgt_stids: d
                    }), s.valid(n) && (_ = w(l), p = (h || {}).suggest_log_id, u && 0 < u.length && e.lxSugResultView({
                        suggest_global_id: o,
                        suggest_log_id: p
                    }, {
                        tgt_stids: d
                    }), 0 < (g = (u && u instanceof Array ? u : []).filter(function(e) {
                        return 2 !== e.type;
                    }).map(function(t, a) {
                        var r = t.type, s = t.content, n = t.poi_addition_info, c = t.query_addition_info, u = n || {}, h = u.wm_poi_id, g = void 0 === h ? "" : h, f = u.status, y = u.status_desc, v = u.shipping_time_info, m = u.label_info, w = u.delivery_type, x = u.distance, S = u.shipping_fee_tip, k = u.min_price_tip, b = v || {}, L = b.in_shipping_time, D = b.reservation_status, j = b.status_content, T = b.desc_content, C = (m && m[0] || {}).content, P = c || {}, A = P.type, I = P.resultNum, q = void 0 === I ? "" : I, R = i({}, t, {
                            suggest_global_id: o,
                            suggest_log_id: p
                        }), E = H(s, _), O = "";
                        if ((C || 1 === w) && (O = "80%"), C || 1 === w || (O = "90%"), C && 1 === w && (O = "66%"), 
                        e.lxSugView(i({}, R, {
                            type: 0 === r ? r : A,
                            wm_poi_id: g
                        }), a, {
                            terms: l,
                            tgt_stids: d
                        }), 0 !== r) return i({}, R, {
                            orign: s,
                            type: A,
                            query: E,
                            result_num: q,
                            wm_poi_query_width_percent_style: q ? "70%" : "90%"
                        });
                        var F = "";
                        return 1 === f && (F = 1 === L ? "deliverying" : 1 === D ? "only" : "booking"), 
                        3 === f && (F = "breaking"), i({}, R, {
                            orign: s,
                            wm_poi_id: g,
                            wm_poi_name: E,
                            wm_poi_discount: C || "",
                            delivery_type: w,
                            wm_poi_business_status: {
                                status: F,
                                min_price_tip: k,
                                shipping_fee_tip: S,
                                distance: x,
                                status_content: j,
                                desc_content: 3 === f ? y : T
                            },
                            wm_poi_name_width_percent_style: O
                        });
                    })).length ? e.setData({
                        pageState: "suggest",
                        suggest: g,
                        terms: l
                    }) : e.setData({
                        pageState: "hot",
                        suggest: []
                    })), t.next = 26;
                    break;

                  case 19:
                    t.prev = 19, t.t0 = t.catch(0), f = t.t0.message, y = t.t0.code, e.setData({
                        pageState: "hot",
                        suggest: []
                    }), y === E && (e[F] = function() {
                        e.loadSuggest();
                    }), console.error(f);

                  case 26:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 0, 19 ] ]);
        }))();
    },
    onClickSearch: function() {
        var e = this.data, t = e.historyLabels, a = e.keywordLabel, i = e.inputShowClear, r = this.searchManager;
        if (i || a) {
            var s = r.getKeyword(), n = s || a, o = K.add({
                label_type: A.search,
                search_keyword: n,
                label_name: n
            }), c = {
                inputFocus: !1
            };
            s && (c.keywordValue = s), o !== t && (c.historyLabels = o), this.setData(c), this.setLabelType(A.search), 
            this.updateSearchPoiAjaxParam({
                query_type: 0
            }), this.search(), this.lxSearchClick(n, s);
        }
    },
    onClickPoilistActvs: function(e) {
        var t = e.currentTarget.dataset.id, a = this.data.poilistActvsShown;
        a[t] = !a[t], this.setData({
            poilistActvsShown: a
        });
    },
    onScrollBottom: function() {
        if (!this.is_scroll_loading && this.data.has_next_page) {
            var e = this.search_poi_ajax_param.page_index + 1;
            this.updateSearchPoiAjaxParam({
                page_index: e
            }), this.loadSearch(!1);
        }
    },
    onDeleteKey: function() {
        this.searchManager.reset(), this.searchTicket.cancel(), this.suggestTicket.cancel(), 
        this.setData({
            pageState: "hot",
            keywordValue: "",
            inputFocus: !0,
            inputShowClear: !1
        });
    },
    search: function() {
        this.loadSearch(!0);
    },
    getReportData: function() {
        var e = this.data.keywordLabel;
        return {
            cid: "c_nfqbfvw",
            val: {
                label_word: e,
                keyword: e
            }
        };
    },
    onShow: function() {
        f.init();
        var e = getApp(), t = e.afterLoginAction;
        t !== F && t !== V || (e.afterLoginAction = "", "function" == typeof this[t] && this[t]()), 
        f.clearImpression(), f.triggerScroll();
    },
    onOpenSettingSucc: function(e) {
        var i = this, r = e.detail.authSetting["scope.userLocation"];
        return t(a.default.mark(function e() {
            return a.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (r) return i.openSettingHide(), e.next = 4, i.locationObtain();
                    e.next = 5;
                    break;

                  case 4:
                    P({
                        url: "../search/search?keyword=" + i.data.keywordLabel + "&auto_search=true"
                    });

                  case 5:
                  case "end":
                    return e.stop();
                }
            }, e, i);
        }))();
    },
    onSearchFocus: function() {
        this.setData({
            inputFocused: !0
        });
    },
    onSearchBlur: function() {
        this.setData({
            inputFocused: !1
        });
    },
    onSearchResultScroll: function() {
        f.triggerScroll();
    },
    reloadPoilist: function() {
        var e = this.search_poi_ajax_param, t = e.sort_type, a = e.activity_filter_codes, i = e.slider_select_data, r = this.getFilterParam(), s = r.sort_type, n = r.activity_filter_codes, o = r.slider_select_data;
        t === s && a === n && i === o || (this.updateSearchPoiAjaxParam({
            sort_type: s,
            activity_filter_codes: n,
            slider_select_data: o
        }), this.loadSearch(!0));
    },
    lxFilterClick: function() {},
    lxFilterFastestSpeedClick: function() {}
};

(0, s.page)(_(G, g, c, y, p));