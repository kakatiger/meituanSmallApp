function r(r) {
    return function() {
        var e = r.apply(this, arguments);
        return new t(function(r, n) {
            return function a(u, i) {
                try {
                    var o = e[u](i), s = o.value;
                } catch (u) {
                    return void n(u);
                }
                if (!o.done) return t.resolve(s).then(function(r) {
                    a("next", r);
                }, function(r) {
                    a("throw", r);
                });
                r(s);
            }("next");
        });
    };
}

var e = function(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), t = require("../../npm/promise-polyfill/promise.js"), n = require("../../utils/object-assign.js"), a = require("../../api/index.js").rcmdboard, u = require("../../api/wx.js").storage.getItem, i = require("../../constants.js").KEY_UUID, o = {
    loadRcmdboard: function() {
        var t = this;
        return r(e.default.mark(function r() {
            var n, o, s, d, c, p, _, l, m, f;
            return e.default.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    return n = t.store.getState(), o = n.user.user_id, r.next = 3, u(i, "");

                  case 3:
                    return s = r.sent, d = s.data, t.setData({
                        uuid: d
                    }), r.prev = 6, r.next = 9, a();

                  case 9:
                    c = r.sent, p = c.rcmd_board_v9.mid_ad_banner, _ = p.platinum_banner, l = _.wm_poi_id, 
                    m = _.products, p.platinum_banner.banner_click_url = "/pages/restaurant/restaurant?poi_id=" + l, 
                    p.products = m.map(function(r) {
                        var e = r.spu_id;
                        return r.click_url = "/pages/restaurant/restaurant?poi_id=" + l + "&spu_id=" + e, 
                        r;
                    }), t.rcmdboardSetData({
                        mid_ad_banner: p,
                        userId: o
                    }), r.next = 22;
                    break;

                  case 17:
                    r.prev = 17, r.t0 = r.catch(6), (f = getApp()).owl.error.pushError({
                        content: r.t0,
                        category: "jsError",
                        sec_category: "rcmdboard接口请求报错"
                    }, !0), t.rcmdboardSetData({
                        mid_ad_banner: null,
                        userId: o
                    });

                  case 22:
                  case "end":
                    return r.stop();
                }
            }, r, t, [ [ 6, 17 ] ]);
        }))();
    },
    rcmdboardSetData: function(r) {
        var e = this;
        return new t(function(t) {
            var n = {};
            Object.keys(r).forEach(function(e) {
                n["rcmdboard." + e] = r[e];
            }), e.setData(n, t);
        });
    }
};

module.exports = function(r) {
    return r.data.rcmdboard = {
        mid_ad_banner: null,
        userId: ""
    }, n(r, o);
};