function r(r, e, t) {
    return e in r ? Object.defineProperty(r, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : r[e] = t, r;
}

var e = Object.assign || function(r) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (r[a] = t[a]);
    }
    return r;
}, t = require("../actions/buy-together.js"), a = {};

module.exports = function() {
    var s = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : a, n = arguments[1];
    switch (n.type) {
      case t.SET_SPONSOR_USER_ID:
        var i = n.id, c = n.sponsorUserId;
        return Object.assign({}, e({}, s, r({}, i, e({}, s[i], {
            sponsorUserId: c
        }))));

      case t.SET_PREV_SOURCE_URL:
        var u = n.id, o = n.prevSourceUrl;
        return Object.assign({}, e({}, s, r({}, u, e({}, s[u], {
            prevSourceUrl: o
        }))));

      case t.UPDATE_UTIME:
        var _ = n.id, T = n.uTime;
        return Object.assign({}, e({}, s, r({}, _, e({}, s[_], {
            uTime: T
        }))));

      case t.SET_SHOP_CART_ID:
        var l = n.id, O = n.shopCartId;
        return Object.assign({}, e({}, s, r({}, l, e({}, s[l], {
            shopCartId: O,
            uTime: 0
        }))));

      case t.SET_QUIT_STATUS:
        var d = n.id, v = n.quit;
        return Object.assign({}, e({}, s, r({}, d, e({}, s[d], {
            quit: v
        }))));

      case t.SET_CLEAR_CART_FLAG:
        var E = n.id, S = n.clearCart;
        return Object.assign({}, e({}, s, r({}, E, e({}, s[E], {
            clearCart: S
        }))));

      case t.DEL_BUY_TOGETHER_INFO_WITH_POIID:
        var b = n.id;
        try {
            delete s[b];
        } catch (s) {
            console.log(s);
        }
        return s;

      default:
        return s;
    }
};