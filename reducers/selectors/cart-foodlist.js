module.exports = function(t) {
    var r = t.poi, i = r.id, u = r.skuMap, a = t.cart[i], s = [];
    if ((t.buyTogether[i] || {}).shopCartId) return s;
    if (0 !== a.length) for (var n = a[0].cart || [], o = n.length - 1; -1 < o; --o) {
        var c = n[o], d = c.count, e = c.id, p = c.attrs, f = u[e];
        if (f) {
            var h = f._spu_id;
            0 === f.status && s.push({
                spu_id: h,
                id: e,
                count: d,
                attrs: (p || []).map(function(t) {
                    return t.id;
                }),
                cart_id: 0,
                activity_tag: "discount"
            });
        }
    }
    return s;
};