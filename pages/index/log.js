function i(i) {
    if (Array.isArray(i)) {
        for (var e = 0, t = Array(i.length); e < i.length; e++) t[e] = i[e];
        return t;
    }
    return Array.from(i);
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(i) {
    return typeof i;
} : function(i) {
    return i && "function" == typeof Symbol && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
}, t = function(i, e) {
    if (Array.isArray(i)) return i;
    if (Symbol.iterator in Object(i)) return function(i, e) {
        var t = [], o = !0, n = !1, r = void 0;
        try {
            for (var a, l = i[Symbol.iterator](); !(o = (a = l.next()).done) && (t.push(a.value), 
            !e || t.length !== e); o = !0) ;
        } catch (i) {
            n = !0, r = i;
        } finally {
            try {
                !o && l.return && l.return();
            } finally {
                if (n) throw r;
            }
        }
        return t;
    }(i, e);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(i) {
    return void 0 === i ? "undefined" : e(i);
} : function(i) {
    return i && "function" == typeof Symbol && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : void 0 === i ? "undefined" : e(i);
}, n = require("../../utils/ad2json.js"), r = require("../../utils/object-assign.js"), a = {
    ACCPET_RESERVATION: 0,
    RESERVATION_ONLY: 1
}, l = {
    AVAILABLE: 1,
    REST: 3
};

Object.entries || (Object.entries = function(i) {
    for (var e = Object.keys(i), t = e.length, o = new Array(t); t--; ) o[t] = [ e[t], i[e[t]] ];
    return o;
});

var s = {
    getStatus: function(i, e) {
        var t = e.reservation_status, o = e.in_shipping_time;
        return 1 === o ? i === l.REST ? 0 : i : 0 === o ? t === a.ACCPET_RESERVATION ? 2 : 3 : i;
    },
    setCategoryCode: function() {
        var i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
        this.category_code || (this.category_code = i);
    },
    getChannelParam: function() {
        var i = this.category_code, e = void 0 === i ? 0 : i;
        return {
            category_code: e,
            fst_cate_id: this.fstCateId || e,
            sec_cate_id: this.secCateId
        };
    },
    lxChannelPoilistClick: function(i) {
        return this.lxPoilistView(i, "b_ZesFe", "click", this.getChannelParam());
    },
    lxChannelPoilistView: function(i) {
        return this.lxPoilistView(i, "b_GcYmX", "view", this.getChannelParam());
    },
    lxPoilistClick: function(i) {
        return this.lxPoilistView(i, "b_habt1", "click");
    },
    lxPoilistView: function(i) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "b_6I0WA", t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "view", r = arguments[3], a = i.index, l = void 0 === a ? 0 : a, s = i.id, d = void 0 === s ? "" : s, c = i.status, _ = void 0 === c ? "" : c, v = i.shipping_time_info, h = void 0 === v ? {} : v, u = i.distance, f = void 0 === u ? "" : u, y = i.min_price_tip, b = void 0 === y ? "" : y, p = i.delivery_time_tip, g = void 0 === p ? "" : p, x = i.shipping_fee_tip, m = void 0 === x ? "" : x, w = i.origin_shipping_fee_tip, C = void 0 === w ? "" : w, k = i.ad_type, S = void 0 === k ? "" : k, M = i.charge_info, P = void 0 === M ? "" : M, V = this.judasParams, A = this.filterParam.activity_filter_codes, E = this.data, N = E.cartKeys, T = E.filter.sortTypeCode, j = V.rank_trace_id, F = {
            val_bid: e,
            index: l,
            poi_id: d,
            rank_trace_id: void 0 === j ? "" : j,
            sort: T,
            filter: A,
            poi_status: this.getStatus(_, h),
            has_ordered_food: 0 < N[d] ? 1 : 0,
            delivery_time: g,
            distance: f,
            min_total: b,
            delivery_fee: m,
            original_delivery_fee: C,
            ad: n(S, P)
        };
        "object" === (void 0 === r ? "undefined" : o(r)) && Object.assign(F, r), this.lxMge[t](F);
    },
    lxSearchClick: function(i) {
        var e = i.currentTarget.dataset.recommend;
        if ("index" === this.pageName) {
            var t = e.scene_type, o = void 0 === t ? "" : t, n = e.search_keyword, r = void 0 === n ? "" : n, a = e.view_keyword, l = void 0 === a ? "" : a, s = e.type, d = void 0 === s ? "" : s, c = e.tgt_stids, _ = void 0 === c ? "" : c;
            this.lxMge.click({
                val_bid: "b_UDdde",
                label_word: l,
                keyword: r,
                default_stid: _,
                word_type: d,
                is_travel: o,
                has_word: l ? "1" : "0"
            });
        } else "channel-page" === this.pageName && this.lxMge.click({
            val_bid: "b_aZbuD",
            cat_id: this.options.typeCode || ""
        });
    },
    lxSearchView: function() {
        var i = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).spread, e = void 0 === i ? "1" : i;
        if ("index" === this.pageName) {
            var t = this.data.recommended_search_keyword, o = t.scene_type, n = void 0 === o ? "" : o, r = t.type, a = void 0 === r ? "" : r, l = t.view_keyword, s = void 0 === l ? "" : l, d = t.search_keyword, c = void 0 === d ? "" : d, _ = t.tgt_stids, v = void 0 === _ ? "" : _;
            this.lxMge.view({
                val_bid: "b_dmKcT",
                label_word: s,
                keyword: c,
                default_stid: v,
                word_type: a,
                is_travel: n,
                spread: e,
                has_word: s ? "1" : "0"
            });
        } else this.pageName;
    },
    lxFilterView: function() {
        "index" === this.pageName ? this.lxMge.view({
            val_bid: "b_QEGEq"
        }) : "channel-page" === this.pageName && this.lxMge.view({
            val_bid: "b_ge94y",
            cat_id: this.options.typeCode || ""
        });
    },
    lxKingkongView: function(i, e) {
        var t = this, o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 10;
        i && i.forEach(function(i, n) {
            t.lxMge.view({
                val_bid: "b_fwSD2",
                cat_id: i.code,
                index: e * o + n
            });
        });
    },
    lxKingkongClick: function(i) {
        var e = i.cat_id, t = i.index;
        this.lxMge.click({
            val_bid: "b_DbEN0",
            cat_id: e,
            index: t
        });
    },
    lxFilterClick: function(e) {
        var o = this.data.filter.selectedCodes, n = "";
        if (e) {
            var r = Object.entries(o);
            0 < r.length && (n = r.reduce(function(e, o) {
                var n = t(o, 2), r = n[0];
                return n[1] ? [].concat(i(e), [ r ]) : e;
            }, []).join(","));
        }
        "index" === this.pageName ? this.lxMge.click({
            val_bid: "b_21NTG",
            codes: n,
            type: e ? "2" : "1"
        }) : "channel-page" === this.pageName && this.lxMge.click({
            val_bid: "b_U7ZI3",
            cat_id: this.options.typeCode || "",
            codes: n,
            type: e ? "2" : "1"
        });
    },
    lxChannelTypeHorizonView: function() {
        this.lxMge.view({
            val_bid: "b_5efpo8qz",
            cat_id: this.options.typeCode || ""
        });
    },
    lxChannelTypeHorizonClick: function() {
        this.lxMge.click({
            val_bid: "b_532wtq51",
            cat_id: this.options.typeCode || ""
        });
    },
    lxChannelCategoryView: function() {
        this.lxMge.view({
            val_bid: "b_7bm17vo8",
            cat_id: this.options.typeCode || ""
        });
    },
    lxChannelCategoryClick: function() {
        this.lxMge.click({
            val_bid: "b_b7a4oneb",
            cat_id: this.options.typeCode || ""
        });
    },
    lxQuickFilterView: function() {
        this.lxMge.view({
            val_bid: "b_ybw8lavi",
            status: 0,
            codes: this.filterParam ? this.filterParam.activity_filter_codes : ""
        });
    },
    lxQuickFilterClick: function(i) {
        var e = this.filterParam ? this.filterParam.activity_filter_codes.split(",") : "";
        this.lxMge.click({
            val_bid: "b_50970nu2",
            status: 0,
            click_status: -1 !== e.indexOf(i) ? 1 : 0,
            codes: this.filterParam ? this.filterParam.activity_filter_codes : ""
        });
    },
    lxResetFilterView: function() {
        this.lxMge.view({
            val_bid: "b_ggc9n7wh"
        });
    },
    lxResetFilterClick: function() {
        this.lxMge.click({
            val_bid: "b_e4z3iz3u"
        });
    },
    lxFilterFastestSpeedView: function() {
        this.lxMge.view({
            val_bid: "b_48ckidwc"
        });
    },
    lxFilterFastestSpeedClick: function() {
        this.lxMge.view({
            val_bid: "b_hl4vm9uw"
        });
    }
};

module.exports = function(i) {
    return r(i, s), i;
};