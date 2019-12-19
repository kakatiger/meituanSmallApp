var t = require("../actions/cart.js"), e = require("../utils/find-index.js"), r = require("../utils/assign-new-cart.js"), a = require("../utils/object-assign.js"), s = require("../utils/attrs-equal.js"), u = require("../utils/cart-cache.js");

module.exports = function() {
    var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : Object.create(null), i = arguments[1], c = i.poiID, o = i.skuID, f = i.attrs, _ = i.real_stock, l = void 0 === _ ? -1 : _, d = i.min;
    ("number" != typeof d || d <= 0) && (d = 1);
    var v = -1 === l ? 1 / 0 : l, p = n[c] || [], m = p[0] && !1 !== p[0].isMySelf ? p[0] : {}, h = m && m.cart && 0 !== m.cart.length ? m.cart : [];
    switch (i.type) {
      case t.UPDATE_CART_SKUS:
        var k = i && i.myInfo ? i.myInfo : {}, g = i.shouldCoverLocalCart, A = i.newMyCart || [], T = g ? A : h;
        2 === k.user_status && 0 === h.length || (m.user_info.user_status = k.user_status), 
        k.nickName && (m.user_info.nickName = k.nickName), k.avatar && (m.user_info.avatar = k.avatar);
        var C = [];
        return C.push({
            cart: []
        }), i.food_list.forEach(function(t) {
            C.push({
                isMySelf: !1,
                user_info: t.user_info,
                box_price: t.box_price,
                total_price: t.total_price,
                cart: t.food_info
            });
        }), r(T, m, C, n, c);

      case t.REMOVE_OTHER_CART:
        return r(h, m, [ m ], n, c);

      case t.CART_CLEAR_MINE:
        return r([], m, p, n, c);

      case t.CART_ADD:
        var E = e(h, function(t) {
            var e = t.id, r = t.attrs;
            return e === o && s(f, r);
        }), I = getApp().store.getState().poi, R = I.skuMap[o], S = I.spuMap[R._spu_id];
        u.sku.setItem(c, R), u.spu.setItem(c, S);
        var y = S.id;
        if (-1 === E) h.push({
            id: o,
            count: Math.min(d, v),
            attrs: f,
            foodid: y
        }), m.nickname && m.avatar || wx.getStorage({
            key: "userInfo",
            success: function(t) {
                m.user_info.nickname = t.data.nickName, m.user_info.avatar = t.data.avatarUrl;
            }
        }); else {
            var M = h[E].count;
            h[E].count = Math.min(Math.max(d, M + 1), v);
        }
        return r(h, m, p, n, c);

      case t.CART_DEL:
        var j = e(h, function(t) {
            var e = t.id, r = t.attrs;
            return e === o && s(f, r);
        });
        if (-1 === j) return n;
        var b = h[j].count - 1;
        return b < d ? h.splice(j, 1) : h[j].count = b, r(h, m, p, n, c);

      case t.CART_SET_SKUS:
        for (var x = i.skus, q = Object.create(null), D = x.length - 1; -1 < D; --D) {
            var N = x[D], O = N.id, w = N.count;
            q[O] = w;
        }
        for (var L = [], U = h.length, K = 0; K < U; ++K) {
            var V = h[K], B = q[V.id];
            "number" == typeof B ? 0 < B && L.push(a({}, V, {
                count: B
            })) : L.push(V);
        }
        return r(h, m, p, n, c);

      case t.CART_SET:
        var H = i.foodlist, P = i.cart;
        return H.forEach(function(t) {
            t.skus.forEach(function(e) {
                e._spu_id = t.id, e.tagBelongTo = t.tag, u.sku.setItem(c, e);
            }), u.spu.setItem(c, t);
        }), r(P, m, p, n, c);

      case t.CART_CLEAR:
        return n[c] ? Object.keys(n).reduce(function(t, e) {
            return e !== "" + c && (t[e] = n[e]), t;
        }, {}) : n;

      case t.CART_VALIDATE:
        var z = i.data.skuIds;
        return 0 !== h.length ? (h.filter(function(t) {
            return -1 !== z.indexOf(String(t.id));
        }), r(h, m, p, n, c)) : (m.user_info = {}, wx.getStorage({
            key: "userInfo",
            success: function(t) {
                m.user_info.nickname = t.data.nickName, m.user_info.avatar = t.data.avatarUrl;
            }
        }), m.user_info.user_status = 0, m.isMySelf = !0, r([], m, p, n, c));

      default:
        return n;
    }
};