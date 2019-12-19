var i = require("./image-scale.js"), e = function(e, _) {
    return function(t) {
        var p = t.id, o = t.pic_url, r = t.name, n = t.distance, a = t.month_sales_tip, c = t.min_price_tip, s = t.delivery_type, d = t.shipping_fee_tip, m = t.wm_poi_score, u = t.delivery_time_tip, l = t.status, f = t.status_desc, y = t.shipping_time_info, v = t.poi_type_icon, g = t.poi_promotion_pic, h = t.discounts2, b = void 0 === h ? [] : h, k = t.average_price_tip, w = t.mt_poi_id, j = t.recommend_info, q = t.label_info, x = t.ad_type, E = t.ad_attr, z = t.ad_mark, A = t.charge_info;
        return b.forEach(function(e) {
            e.icon_url = i(e.icon_url, 0, 0, "o");
        }), q && (q = 0 < (q = q.filter(function(i) {
            return 3 === i.type && (1 === i.poi_service_type || 2 === i.poi_service_type);
        })).length ? q : void 0), {
            id: p,
            mt_poi_id: w,
            pic_url: i(o, 168),
            name: r,
            distance: n,
            month_sales_tip: a,
            min_price_tip: c,
            delivery_type: s,
            shipping_fee_tip: d,
            wm_poi_score: m,
            delivery_time_tip: u,
            status: l,
            status_desc: f,
            shipping_time_info: y,
            poi_type_icon: i(v, 60),
            poi_promotion_pic: i(g, 86),
            discounts2: b,
            average_price_tip: k,
            recommend_info: j,
            label_info: q,
            ad_type: x,
            charge_info: A ? "sort=" + (e || 0) + "&filter=" + (_ || "") + "&" + A : "",
            ad_attr: E,
            ad_mark: z
        };
    };
};

module.exports = function(i, _, t) {
    return i.map(e(_, t));
};