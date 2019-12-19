function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new i(function(e, r) {
            return function a(n, l) {
                try {
                    var c = t[n](l), o = c.value;
                } catch (n) {
                    return void r(n);
                }
                if (!c.done) return i.resolve(o).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(o);
            }("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), r = function(e, t) {
    if (Array.isArray(e)) return e;
    if (Symbol.iterator in Object(e)) return function(e, t) {
        var r = [], i = !0, a = !1, n = void 0;
        try {
            for (var l, c = e[Symbol.iterator](); !(i = (l = c.next()).done) && (r.push(l.value), 
            !t || r.length !== t); i = !0) ;
        } catch (e) {
            a = !0, n = e;
        } finally {
            try {
                !i && c.return && c.return();
            } finally {
                if (a) throw n;
            }
        }
        return r;
    }(e, t);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, i = require("../../npm/promise-polyfill/promise.js"), a = require("../../utils/object-assign.js"), n = require("../../utils/wait.js"), l = require("../../utils/filter-conditions-manager.js").get, c = require("../../utils/image-scale.js"), o = require("../../utils/quick-filter-manager.js"), s = o.get, d = o.clear, u = {
    filterScrollTo: function(e) {
        wx.canIUse && wx.canIUse("pageScrollTo") && wx.pageScrollTo({
            scrollTop: e,
            duration: 0
        });
    },
    onFilterTypeDropClick: function() {
        var e = this.data.filter, t = e.filterTypeShow, r = e.firstTypeIndex;
        this.setDataFilter({
            filterTypeShow: !t,
            activeTab: "",
            firstTypeShowIndex: r
        }), t || this.lxChannelCategoryView();
    },
    onFilterHorizonClick: function(r) {
        var i = this, a = r.currentTarget.dataset, n = a.index, l = a.code;
        return e(t.default.mark(function e() {
            var r, a;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (r = i.data.filter.typeCode, l !== r) return i.secCateId = l, a = 0 !== parseInt(n, 10) ? n : null, 
                    i.setDataFilter({
                        secondTypeIndex: a,
                        typeCode: l,
                        activeTab: "",
                        sub_category_type: l
                    }), e.prev = 5, d(i.pageName), e.next = 9, i.reloadPoilist();
                    e.next = 16;
                    break;

                  case 9:
                    i.filterScrollTo(0), e.next = 15;
                    break;

                  case 12:
                    e.prev = 12, e.t0 = e.catch(5), console.log(e.t0);

                  case 15:
                    i.lxChannelTypeHorizonClick();

                  case 16:
                  case "end":
                    return e.stop();
                }
            }, e, i, [ [ 5, 12 ] ]);
        }))();
    },
    filterOnClickSelectSort: function() {
        var r = this;
        return e(t.default.mark(function e() {
            var i, a, l;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (i = r.data.filter, a = i.activeTab, l = i.top, !a) {
                        e.next = 5;
                        break;
                    }
                    r.filterHiddenSelectTab(), e.next = 9;
                    break;

                  case 5:
                    return r.data.filter.isIndex && r.filterScrollTo(Math.max(l - 40, r.__scrollTop || 0)), 
                    e.next = 8, n(400);

                  case 8:
                    r.setDataFilter({
                        activeTab: "sort"
                    });

                  case 9:
                    r.lxFilterClick(!1);

                  case 10:
                  case "end":
                    return e.stop();
                }
            }, e, r);
        }))();
    },
    filterOnClickSelectFilter: function() {
        var r = this;
        return e(t.default.mark(function e() {
            var i, a, l, c, o, s, d;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (i = r.data.filter, a = i.selectedCodes, l = i.selectCount, c = i.selectedPriceRange, 
                    o = i.activeTab, s = i.top, d = i.isIndex, !o) {
                        e.next = 5;
                        break;
                    }
                    r.filterHiddenSelectTab(), e.next = 9;
                    break;

                  case 5:
                    return d && r.filterScrollTo(Math.max(s - 40, r.__scrollTop || 0)), e.next = 8, 
                    n(400);

                  case 8:
                    r.setDataFilter({
                        selectedShowCode: Object.assign({}, a),
                        selectShowCount: l,
                        selectedShowPriceRange: c,
                        activeTab: "filter"
                    });

                  case 9:
                    r.lxFilterClick(!0);

                  case 10:
                  case "end":
                    return e.stop();
                }
            }, e, r);
        }))();
    },
    filterHiddenSelectTab: function() {
        this.setDataFilter({
            activeTab: "",
            filterTypeShow: !1
        });
    },
    filterOnClickClearSelect: function() {
        this.setDataFilter({
            selectedShowCode: {},
            selectedShowPriceRange: [],
            selectShowCount: 0
        });
    },
    filterClear: function() {
        return this.setDataFilter({
            selectedShowCode: {},
            selectedShowPriceRange: [],
            selectShowCount: 0,
            selectedCodes: {},
            selectedPriceRange: [],
            selectCount: 0
        });
    },
    filterAllReset: function() {
        return this.setDataFilter({
            selectedShowCode: {},
            selectedShowPriceRange: [],
            selectShowCount: 0,
            sortTypeCode: 0,
            sortName: "综合排序",
            selectedCodes: {},
            selectedPriceRange: [],
            selectCount: 0
        });
    },
    filterClickSubmitSelectItem: function() {
        var r = this;
        return e(t.default.mark(function e() {
            var i, a, n, l, c;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return i = r.data.filter, a = i.selectShowCount, n = i.selectedShowCode, l = i.selectedShowPriceRange, 
                    c = i.top, r.setDataFilter({
                        selectCount: a,
                        selectedCodes: n,
                        selectedPriceRange: l
                    }), r.filterHiddenSelectTab(), e.prev = 3, e.next = 6, r.reloadPoilist();

                  case 6:
                    "index" === r.pageName ? r.filterScrollTo(c - 40) : "channel-page" === r.pageName && r.filterScrollTo(0), 
                    e.next = 12;
                    break;

                  case 9:
                    e.prev = 9, e.t0 = e.catch(3), console.error(e.t0);

                  case 12:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 3, 9 ] ]);
        }))();
    },
    filterOnClickQuickFilterItem: function(r) {
        var i = this, a = r.currentTarget.dataset, n = a.index, l = a.code;
        return e(t.default.mark(function e() {
            var r, a, c, o, s, d, u, f, p, h, y, v, g, x;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (r = i.data.filter, a = r.quickFilterActivityFilterList, c = r.selectedCodes, 
                    o = r.selectedShowPriceRange, s = r.isIndex, d = r.top, s && i.filterScrollTo(Math.max(d - 40, i.__scrollTop || 0)), 
                    u = a[n], f = u.support_multi_choice, p = u.items, h = c[l], 1 === f) c[l] = !h; else for (y = p.length - 1; -1 < y; --y) v = p[y], 
                    g = v.code, h ? c[g] = !1 : String(l) === String(g) ? c[g] = !0 : c[g] = !1;
                    return x = i._filterCalcSelectShowCount(c, o), i.setDataFilter({
                        selectedCodes: c,
                        selectedShowCode: c,
                        selectCount: x,
                        selectShowCount: x
                    }), e.prev = 8, e.next = 11, i.reloadPoilist();

                  case 11:
                    e.next = 16;
                    break;

                  case 13:
                    e.prev = 13, e.t0 = e.catch(8), console.log(e.t0);

                  case 16:
                    i.lxQuickFilterClick(l);

                  case 17:
                  case "end":
                    return e.stop();
                }
            }, e, i, [ [ 8, 13 ] ]);
        }))();
    },
    filterOnClickSelectItem: function(e) {
        var t = e.currentTarget.dataset, r = t.index, i = t.code, a = this.data.filter, n = a.activityFilterList, l = a.selectedShowCode, c = a.selectedShowPriceRange, o = n[r], s = o.support_multi_choice, d = o.items, u = l[i];
        if (1 === s) l[i] = !u; else for (var f = d.length - 1; -1 < f; --f) {
            var p = d[f].code;
            u ? l[p] = !1 : String(i) === String(p) ? l[p] = !0 : l[p] = !1;
        }
        this.setDataFilter({
            selectedShowCode: l,
            selectShowCount: this._filterCalcSelectShowCount(l, c)
        });
    },
    _filterCalcSelectShowCount: function(e, t) {
        for (var r = 0, i = Object.keys(e), a = i.length - 1; -1 < a; --a) e[i[a]] && (r += 1);
        return 0 < t.length && (r += 1), r;
    },
    filterOnClickPriceRange: function(e) {
        var t = e.currentTarget.dataset, r = t.min, i = t.max, a = this.data.filter.selectedShowCode, n = this.data.filter.selectedShowPriceRange;
        n = 0 < n.length && r === n[0] && i === n[1] ? [] : [ r, i ], this.setDataFilter({
            selectedShowPriceRange: n,
            selectShowCount: this._filterCalcSelectShowCount(a, n)
        });
    },
    filterOnClickSortType: function(r) {
        var i = this, a = r.currentTarget.dataset, n = a.id, l = a.name;
        return e(t.default.mark(function e() {
            var r, a, c, o, s;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return r = i.data.filter, a = r.activeTab, c = r.top, (o = r.isIndex) && i.filterScrollTo(Math.max(c - 40, i.__scrollTop || 0)), 
                    s = parseInt(n, 10) || 0, i.setDataFilter({
                        sortTypeCode: s,
                        sortName: l
                    }), a && i.filterHiddenSelectTab(), e.prev = 5, e.next = 8, i.reloadPoilist();

                  case 8:
                    o ? i.filterScrollTo(c - 40) : "channel-page" === i.pageName && i.filterScrollTo(0), 
                    e.next = 14;
                    break;

                  case 11:
                    e.prev = 11, e.t0 = e.catch(5), console.error(e.t0);

                  case 14:
                    2 === Number(n) && i.lxFilterFastestSpeedClick();

                  case 16:
                  case "end":
                    return e.stop();
                }
            }, e, i, [ [ 5, 11 ] ]);
        }))();
    },
    filterOnClickFirstType: function(r) {
        var i = this, a = r.currentTarget.dataset, n = a.index, l = a.name;
        return e(t.default.mark(function e() {
            var r, a, c;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (i.lxChannelCategoryClick(), r = parseInt(n, 10) || 0, a = i.data.filter.categoryFilterList[r], 
                    c = a.code, 0 === a.sub_category_list.length) return i.filterSetNavigationBarTitle({
                        title: 0 === c ? "全部商家" : l
                    }), i.setDataFilter({
                        firstTypeIndex: r,
                        secondTypeIndex: null,
                        typeCode: c
                    }), i.fstCateId = c, i.filterHiddenSelectTab(), e.prev = 8, d(i.pageName), e.next = 12, 
                    i.reloadPoilist();
                    e.next = 20;
                    break;

                  case 12:
                    i.filterScrollTo(0), e.next = 18;
                    break;

                  case 15:
                    e.prev = 15, e.t0 = e.catch(8), console.log(e.t0);

                  case 18:
                    e.next = 21;
                    break;

                  case 20:
                    i.setDataFilter({
                        firstTypeShowIndex: r,
                        secondTypeIndex: null
                    });

                  case 21:
                  case "end":
                    return e.stop();
                }
            }, e, i, [ [ 8, 15 ] ]);
        }))();
    },
    filterOnClickSecondType: function(r) {
        var i = this, a = r.currentTarget.dataset, n = a.code, l = a.index;
        return e(t.default.mark(function e() {
            var r, a, c, o, s, u;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return i.lxChannelCategoryClick(), r = parseInt(n, 10) || 0, a = i.data.filter, 
                    c = a.firstTypeShowIndex, o = a.categoryFilterList[c], s = o.code, u = o.name, 0 === r && (r = s), 
                    i.filterSetNavigationBarTitle({
                        title: u
                    }), i.setDataFilter({
                        firstTypeIndex: c,
                        secondTypeIndex: parseInt(l, 10) || null,
                        typeCode: r,
                        filterTypeShow: !1,
                        activeTab: !1,
                        category_type: s,
                        sub_category_type: r === s ? 0 : r
                    }), i.secCateId = r, i.fstCateId = s, i.filterHiddenSelectTab(), e.prev = 9, d(i.pageName), 
                    e.next = 13, i.reloadPoilist();

                  case 13:
                    i.filterScrollTo(0), e.next = 19;
                    break;

                  case 16:
                    e.prev = 16, e.t0 = e.catch(9), console.log(e.t0);

                  case 19:
                  case "end":
                    return e.stop();
                }
            }, e, i, [ [ 9, 16 ] ]);
        }))();
    },
    filterSetNavigationBarTitle: function(e) {
        "index" !== this.pageName && this.setNavigationBarTitle(e);
    },
    setDataFilter: function(e) {
        var t = this;
        return new i(function(r) {
            var i = {};
            Object.keys(e).forEach(function(t) {
                i["filter." + t] = e[t];
            }), t.setData(i, r);
        });
    },
    loadQuickFilter: function() {
        var r = this;
        return e(t.default.mark(function e() {
            var i, a, n, l;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.prev = 0, i = r.fstCateId, a = r.secCateId, e.next = 4, s(r.pageName, {
                        first_category_type: i,
                        second_category_type: a
                    });

                  case 4:
                    n = e.sent, l = n.activity_filter_list, r.setDataFilter({
                        quickFilterActivityFilterList: l
                    }), e.next = 12;
                    break;

                  case 9:
                    e.prev = 9, e.t0 = e.catch(0), console.error("loadQuickFilter failed", e.t0);

                  case 12:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 0, 9 ] ]);
        }))();
    },
    loadFilter: function(r) {
        var i = this;
        return e(t.default.mark(function e() {
            var a, n, o, s, d, u, f, p, h, y, v;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (r || !i.data.filter.categoryFilterList.length) return e.next = 3, l();
                    e.next = 29;
                    break;

                  case 3:
                    a = e.sent, n = a.category_filter_list, o = a.sort_type_list, s = a.activity_filter_list, 
                    d = a.filter_prices, o.forEach(function(e) {
                        e.icon_url = c(e.icon_url, 0, 0, "o"), e.icon_url_click = c(e.icon_url_click, 0, 0, "o");
                    }), s.forEach(function(e) {
                        for (var t = e.items, r = t.length - 1; -1 < r; --r) {
                            var i = t[r];
                            i.icon = c(i.icon, 0, 0, "o"), "美团专送" !== i.name || i.icon || (i._filterMeituan = !0);
                        }
                    }), u = i.data.filter.firstTypeIndex, f = i.data.filter.typeCode, p = parseInt(f, 10) || 0, 
                    h = !1, y = 0;

                  case 15:
                    if (!(y < n.length)) {
                        e.next = 24;
                        break;
                    }
                    if (n[y].code === p) return h = !0, u = y, e.abrupt("break", 24);
                    e.next = 21;
                    break;

                  case 21:
                    ++y, e.next = 15;
                    break;

                  case 24:
                    return v = i.data.filter.isIndex, h && !v && i.lxChannelTypeHorizonView(), e.next = 28, 
                    i.setDataFilter({
                        categoryFilterList: n,
                        sortTypeList: o,
                        activityFilterList: s,
                        firstTypeIndex: u,
                        firstTypeShowIndex: u,
                        horizonTypeShow: h,
                        priceRangeFilterList: d
                    });

                  case 28:
                    r && i.filterGetClientRect();

                  case 29:
                  case "end":
                    return e.stop();
                }
            }, e, i);
        }))();
    },
    filterGetClientRect: function() {
        var e = this;
        if (wx.canIUse && wx.canIUse("createSelectorQuery")) {
            var t = wx.createSelectorQuery();
            t.select(".filter-holder").boundingClientRect(), t.selectViewport().scrollOffset(), 
            t.exec(function(t) {
                if (t && t[0] && t[1]) {
                    var r = t[0].top, i = t[1].scrollTop;
                    e.setDataFilter({
                        top: Math.ceil(r + i + 2)
                    });
                }
            });
        }
    },
    initFilter: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.typeCode, r = void 0 === t ? 0 : t, i = e.typeName, a = void 0 === i ? "全部商家" : i, n = parseInt(r, 10) || 0;
        this.filterSetNavigationBarTitle({
            title: a
        }), this.setDataFilter({
            typeCode: n,
            category_type: n,
            sub_category_type: 0
        }), this.fstCateId = n;
    },
    getFilterParam: function() {
        for (var e = this.data.filter, t = e.typeCode, i = e.selectedCodes, a = e.selectedPriceRange, n = e.sortTypeCode, l = [], c = Object.keys(i), o = c.length - 1; -1 < o; --o) {
            var s = c[o];
            i[s] && l.push(s);
        }
        var d = l.join(","), u = "";
        if (0 < a.length) {
            var f = r(a, 2);
            u = [ {
                code: "-100",
                slider_select_min: f[0],
                slider_select_max: f[1]
            } ];
        }
        return {
            navigate_type: t,
            category_type: t,
            sort_type: n,
            activity_filter_codes: d,
            slider_select_data: JSON.stringify(u)
        };
    },
    filterOnPageScroll: function(e) {
        this.__scrollTop = e;
    },
    setFilterBodyTop: function(e) {
        this.setDataFilter({
            scrollTop: e
        });
    },
    onTouchMove: function() {}
};

module.exports = function(e) {
    return e.data.filter = {
        isIndex: "index" === e.pageName,
        top: -1,
        sortName: "综合排序",
        categoryFilterList: [],
        sortTypeList: [],
        activityFilterList: [],
        quickFilterActivityFilterList: [],
        priceRangeFilterList: [],
        activeTab: "",
        sortTypeCode: 0,
        typeCode: 0,
        firstTypeShowIndex: 0,
        firstTypeIndex: 0,
        secondTypeIndex: null,
        selectedCodes: {},
        selectedPriceRange: [],
        selectCount: 0,
        selectedShowCode: {},
        selectedShowPriceRange: [],
        selectShowCount: 0,
        horizonTypeShow: !0,
        filterTypeShow: !1,
        category_type: 0,
        sub_category_type: 0
    }, e.fstCateId = void 0, e.secCateId = 0, a(e, u), e;
};