var t = Object.assign || function(t) {
    for (var r = 1; r < arguments.length; r++) {
        var a = arguments[r];
        for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (t[e] = a[e]);
    }
    return t;
}, r = require("../../utils/format-price.js");

module.exports = function(a) {
    var e = a.poi, o = e.id, i = e.skuMap, n = e.spuMap, s = e.data, u = e.food_spu_tags, c = a.cart[o], f = void 0 === c ? [] : c, l = a.buyTogether[o], d = a.user.user_id, h = (l && l.sponsorUserId) === d, p = 0, v = 0, _ = 0, g = 0, M = 0, m = 0, y = 0, C = 0, b = Object.create(null), x = {}, O = [], j = [], k = 0, T = 0, U = !0;
    if (u && 0 !== u.length && u.forEach(function(t) {
        x[t.tag] = 0;
    }), s && o && 1 === s.poi_info.status) {
        var w = s.poi_info.min_price, A = {}, E = {};
        f && f.forEach(function(a, e) {
            var o = a;
            o.user_info && 2 !== o.user_info.user_status && 0 !== e && (U = !1), 0 === e && h ? o.cart && 0 !== o.cart.length && (T += 1, 
            o.user_info && O.push(o.user_info.avatar)) : o.user_info && 2 === o.user_info.user_status ? (T += 1, 
            O.push(o.user_info.avatar)) : o.user_info && 1 === o.user_info.user_status && (k += 1, 
            O.push(o.user_info.avatar));
            for (var s = 0; o.cart && s < o.cart.length; s++) {
                var u = o.cart[s], c = u.count, f = u.id, l = u.attrs, d = void 0 === l ? [] : l, g = i[f];
                if (g) {
                    var j = g._spu_id, w = g.spec, G = g.price, I = g.origin_price, R = g.box_price, S = g.box_num, q = g.status, B = g.activity_stock, N = g.restrict, P = g.tagBelongTo, z = g.real_stock, D = -1 === B ? 1 / 0 : B;
                    if (void 0 === A[f] && (A[f] = D), void 0 === E[f] && (E[f] = z), 0 === q) {
                        var F = n[j], H = F.name, J = F.activity_type, K = F.activity_tag, L = 0, Q = 0, V = !1, W = c * Math.round(100 * I);
                        if (M += W, 0 === J || 3 === J) L = c * Math.round(100 * G); else if (1 === J || 5 === J) {
                            1 === J ? y += c : 5 === J && (C += c);
                            var X = 0 === N ? 9999 : N, Y = -1 === A[f] ? 9999 : A[f];
                            L = (Q = Math.min(c, X, Y)) * Math.round(100 * G) + (c - Q) * Math.round(100 * I), 
                            V = !V && c === Math.min(N, A[f]) + 1, 0 !== e && -1 !== A[f] && (A[f] -= c);
                        } else if (2 === J) {
                            if (-1 === B) {
                                var Z = Math.floor(c / 2);
                                Q = Z;
                                var $ = Math.floor(G / 2 * 100);
                                L = c * Math.round(100 * G) - Z * $;
                            } else if (-1 !== B) {
                                var tt = Math.min(A[f], Math.floor(c / 2));
                                Q = tt, L = Math.round(100 * G) * c - tt * Math.floor(G / 2 * 100);
                            }
                            0 !== e && -1 !== A[f] && (A[f] -= c);
                        }
                        v += L;
                        var rt = [];
                        w && rt.push(w), 0 < d.length && (rt = rt.concat(d.map(function(t) {
                            return t.value;
                        })));
                        var at = 0 < rt.length ? "+" + rt.join("+") : "";
                        0 !== e && -1 !== E[f] && (E[f] -= c), o.cart[s] = t({}, o.cart[s], {
                            activity_tag: K,
                            activity_type: J,
                            actvCount: Q,
                            price: G,
                            origin_price: I,
                            name: H,
                            cents: L,
                            actvStock: A[f],
                            restRealCount: E[f],
                            restrict: N,
                            needToast: V,
                            attrName: at,
                            priceTotal: r(L)
                        }), _ += c * S * Math.round(100 * R), b[j] = (b[j] || 0) + c, p += c, x[P] += c;
                    }
                }
            }
            0 === e && (m += v + _, o.box_price = r(_));
        }), v += _, M += _, g = Math.max(0, Math.round(100 * w) - M), j = O.slice(-4);
    }
    return {
        cart: f,
        count: p,
        cents: v,
        boxCents: _,
        countMap: b,
        needCents: g,
        alreadySelecCount: x,
        myOwnCartCount: m,
        sharingUserImgUrl: j,
        alreadyCollected: T,
        isCollecting: k,
        isOtherReady: U,
        couponGoodsAddCnt: y,
        newUserGoodsAddCnt: C
    };
};