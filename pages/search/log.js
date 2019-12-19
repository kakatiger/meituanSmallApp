function i(i, e, t) {
    return e in i ? Object.defineProperty(i, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : i[e] = t, i;
}

var e, t, o = require("../../utils/object-assign.js"), d = require("../../utils/ad2json.js"), _ = {
    poi: 12e3,
    food: 12001,
    search: 12002,
    poiKA: 12003,
    hotword: 12004,
    h5: 12005
}, l = (i(e = {}, _.poi, 11e3), i(e, _.food, 11001), i(e, _.search, 11002), e), r = (i(t = {}, _.h5, 1), 
i(t, _.hotword, 2), t), s = {
    hasProdList: function(i) {
        return i && i.length ? 1 : 0;
    },
    isAcurrateShop: function(i) {
        return 0 === i;
    },
    isRelativeShop: function(i) {
        return 1 === i;
    },
    isRecommendShop: function(i) {
        return 2 === i;
    },
    getQwTypeId: function(i) {
        return l[i] || i;
    },
    getWordType: function(i) {
        return r[i] || 3;
    },
    getActId: function(i) {
        return JSON.stringify(i.map(function(i) {
            return i.type || "";
        }));
    },
    lxRecommendShopView: function(i, e) {
        return this.lxAcurrateShopView(i, e, "b_bzIsD");
    },
    lxRecommendShopFoodView: function(i, e, t) {
        return this.lxAcurrateShopFoodView(i, e, t, "b_ZCYtX");
    },
    lxRecommendShopClick: function(i, e) {
        return this.lxAcurrateShopView(i, e, "b_DpKEu", "click");
    },
    lxRecommendShopFoodClick: function(i, e, t) {
        return this.lxAcurrateShopFoodView(i, e, t, "b_HTbEQ", "click");
    },
    lxRelativeShopFoodClick: function(i, e, t) {
        return this.lxAcurrateShopFoodView(i, e, t, "b_W0kxz", "click");
    },
    lxRelativeShopFoodView: function(i, e, t) {
        return this.lxAcurrateShopFoodView(i, e, t, "b_HN5XY");
    },
    lxRelativeShopClick: function(i, e) {
        return this.lxAcurrateShopView(i, e, "b_U41Mv", "click");
    },
    lxRelativeShopView: function(i, e) {
        return this.lxAcurrateShopView(i, e, "b_ddZz3");
    },
    lxAcurrateShopFoodClick: function(i, e, t) {
        return this.lxAcurrateShopFoodView(i, e, t, "b_IDNii", "click");
    },
    lxAcurrateShopFoodView: function(i, e, t) {
        var o = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "b_GTOR0", _ = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : "view", l = i.product_spu_id, r = void 0 === l ? "" : l, s = i.wm_poi_id, n = void 0 === s ? "" : s, p = i.food_recommend_type, c = void 0 === p ? "" : p, a = e.delivery_type, u = void 0 === a ? "" : a, v = e.ad_type, h = void 0 === v ? "" : v, g = e.charge_info, w = void 0 === g ? "" : g, y = e.product_show_type, b = void 0 === y ? "" : y, x = e.template_type, f = e.is_filter_result, k = t.index, m = void 0 === k ? 0 : k, S = t.keyword, V = void 0 === S ? "" : S, A = t.tgt_stids, I = void 0 === A ? "" : A, R = t.search_log_Id, T = void 0 === R ? "" : R, M = t.spu_index, C = void 0 === M ? 0 : M, F = this.label_type, q = void 0 === F ? "" : F;
        this.lxMge[_]({
            val_bid: o,
            label_word: V,
            search_log_id: T,
            poi_index: m,
            index: C,
            keyword: V,
            ship_type: u,
            poi_id: n,
            qw_type_id: this.getQwTypeId(q),
            stid: I,
            spu_id: r,
            template_type: x,
            ad: d(h, w),
            food_recommend_type: c,
            product_show_type: b,
            is_filter_result: f
        });
    },
    lxAcurrateShopClick: function(i, e) {
        return this.lxAcurrateShopView(i, e, "b_KOXis", "click");
    },
    lxAcurrateShopView: function(i, e) {
        var t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "b_IPU0P", o = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "view", _ = i.discounts2, l = void 0 === _ ? [] : _, r = i.delivery_type, s = void 0 === r ? "" : r, n = i.mt_poi_id, p = void 0 === n ? "" : n, c = i.id, a = void 0 === c ? "" : c, u = i.charge_info, v = void 0 === u ? "" : u, h = i.ad_type, g = void 0 === h ? "" : h, w = i.recommend_info, y = i.template_type, b = i.is_filter_result, x = e.index, f = void 0 === x ? 0 : x, k = e.keyword, m = void 0 === k ? "" : k, S = e.tgt_stids, V = void 0 === S ? "" : S, A = e.search_log_Id, I = void 0 === A ? "" : A, R = (w || {}).type, T = this.label_type, M = void 0 === T ? "" : T;
        this.lxMge[o]({
            val_bid: t,
            is_have_sku: this.hasProdList(i.product_list),
            label_word: m,
            index: f,
            search_log_id: I,
            poi_act_id: this.getActId(l),
            keyword: m,
            ship_type: s,
            poi_id: p || a,
            qw_type_id: this.getQwTypeId(M),
            stid: V,
            ad: d(g, v),
            template_type: y,
            poi_recommend_type: R,
            is_filter_result: b
        });
    },
    lxSearchResultView: function(i) {
        var e = i.tgt_stids, t = void 0 === e ? "" : e, o = i.keyword, d = void 0 === o ? "" : o, _ = i.template_type, l = this.category_type, r = this.label_type, s = void 0 === r ? "" : r;
        this.lxMge.view({
            val_bid: "b_oLsKJ",
            qw_type_id: this.getQwTypeId(s),
            stid: t,
            keyword: d,
            label_word: d,
            cat_id: l,
            template_type: _
        });
    },
    lxSugClick: function(i, e) {
        var t = i.type, o = void 0 === t ? "" : t, d = i.wm_poi_id, _ = void 0 === d ? "" : d, l = i.suggest_global_id, r = void 0 === l ? "" : l, s = i.suggest_log_id, n = void 0 === s ? "" : s, p = i.content, c = void 0 === p ? "" : p, a = this.data, u = a.tgt_stids, v = void 0 === u ? "" : u, h = a.terms, g = (void 0 === h ? [] : h)[0] || "";
        this.lxMge.click({
            val_bid: "b_HPP0w",
            stid: v,
            poi_id: _,
            keyword: c,
            qw_type_id: this.getQwTypeId(o),
            suggest_global_id: r,
            suggest_log_id: n,
            word_index: e || 0,
            input_word: g
        });
    },
    lxSugView: function(i, e, t) {
        var o = i.type, d = void 0 === o ? "" : o, _ = i.wm_poi_id, l = void 0 === _ ? "" : _, r = i.suggest_global_id, s = void 0 === r ? "" : r, n = i.suggest_log_id, p = void 0 === n ? "" : n, c = i.content, a = void 0 === c ? "" : c, u = t.tgt_stids, v = void 0 === u ? "" : u, h = t.terms, g = (void 0 === h ? [] : h)[0] || "";
        this.lxMge.view({
            val_bid: "b_4zRnQ",
            stid: v,
            poi_id: l,
            keyword: a,
            qw_type_id: this.getQwTypeId(d),
            suggest_global_id: s,
            suggest_log_id: p,
            word_index: e || 0,
            input_word: g
        });
    },
    lxSugResultView: function(i, e) {
        var t = i.suggest_global_id, o = void 0 === t ? "" : t, d = i.suggest_log_id, _ = void 0 === d ? "" : d, l = e.tgt_stids, r = void 0 === l ? "" : l;
        this.lxMge.view({
            val_bid: "b_vGD4S",
            stid: r,
            suggest_global_id: o,
            suggest_log_id: _
        });
    },
    lxHisClick: function(i) {
        var e = i.label_type, t = void 0 === e ? "" : e, o = i.search_keyword, d = void 0 === o ? "" : o, _ = i.wm_poi_id, l = void 0 === _ ? 0 : _;
        this.lxMge.click({
            val_bid: "b_0ugD5",
            qw_type_id: this.getQwTypeId(t),
            keyword: d,
            poi_id: l
        });
    },
    lxHisView: function(i) {
        var e = i.label_type, t = void 0 === e ? "" : e, o = i.search_keyword, d = void 0 === o ? "" : o, _ = i.wm_poi_id, l = void 0 === _ ? 0 : _;
        this.lxMge.view({
            val_bid: "b_0uLTG",
            qw_type_id: this.getQwTypeId(t),
            keyword: d,
            poi_id: l
        });
    },
    lxHotClick: function(i) {
        var e = this.data, t = e.scene_type, o = void 0 === t ? "" : t, d = e.labels_tgt_stids, _ = void 0 === d ? "" : d, l = i.search_keyword, r = void 0 === l ? "" : l, s = i.wm_poi_id, n = void 0 === s ? 0 : s, p = i.label_type, c = void 0 === p ? "" : p, a = i.label_name, u = void 0 === a ? "" : a;
        this.lxMge.click({
            val_bid: "b_ycerp",
            label_word: u,
            stid: _,
            keyword: r,
            word_type: this.getWordType(c),
            poi_id: n,
            is_travel: o
        });
    },
    lxHotView: function(i, e) {
        var t = i.scene_type, o = void 0 === t ? "" : t, d = i.labels_tgt_stids, _ = void 0 === d ? "" : d, l = e.search_keyword, r = void 0 === l ? "" : l, s = e.wm_poi_id, n = void 0 === s ? 0 : s, p = e.label_type, c = void 0 === p ? "" : p, a = e.label_name, u = void 0 === a ? "" : a;
        this.lxMge.view({
            val_bid: "b_I7Ut5",
            label_word: u,
            stid: _,
            keyword: r,
            word_type: this.getWordType(c),
            poi_id: n,
            is_travel: o
        });
    },
    lxSearchClick: function(i) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "", t = this.data, o = t.keywordLabel, d = t.labels_tgt_stids, r = t.scene_type;
        this.lxMge.click({
            val_bid: "b_G73OZ",
            label_word: o,
            qw_type_id: l[_.search],
            label_type: i ? "-999" : "",
            keyword: e || o,
            default_stid: d || "",
            is_travel: r || ""
        });
    }
};

module.exports = function(i) {
    return o(i, s), i;
};