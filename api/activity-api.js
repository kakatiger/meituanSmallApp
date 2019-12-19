function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, r) {
            return function n(o, u) {
                try {
                    var a = e[o](u), i = a.value;
                } catch (o) {
                    return void r(o);
                }
                if (!a.done) return Promise.resolve(i).then(function(t) {
                    n("next", t);
                }, function(t) {
                    n("throw", t);
                });
                t(i);
            }("next");
        });
    };
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, r = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../npm/babel-runtime/regenerator/index.js")), n = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : e(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
}, o = require("../npm/@dp/owl-wxapp/build/owl-wxapp.js"), u = require("../utils/promisify.js").obj, a = require("../utils/param.js"), i = require("../utils/object-assign.js"), s = u(o.request), c = require("../store.js"), l = require("../utils/deal-region-set.js").setUrl, m = {
    online: "https://activity.waimai.meituan.com/",
    st: "https://activity.waimai.meituan.com/",
    release: "https://activity.waimai.meituan.com/",
    qa: "https://activity.web.c.waimai.test.sankuai.com/",
    beta: "https://activity.waimai.meituan.com/",
    dev: "https://activity.waimai.meituan.com/"
}, d = require("../reducers/selectors/common-param.js"), p = function() {
    var e = t(r.default.mark(function t(e) {
        var o, u, p, f, y;
        return r.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                if (o = e.data, u = c.getState(), p = (p = u.dev.env) || "online", !o || "object" !== (void 0 === o ? "undefined" : n(o))) {
                    t.next = 21;
                    break;
                }
                (f = d(u)).wm_appversion = "6.4.0", y = i(f, o);
                try {
                    wx.getStorageSync("latitude") && wx.getStorageSync("longitude") && (y.wm_actual_latitude = Number(wx.getStorageSync("latitude")), 
                    y.wm_actual_longitude = Number(wx.getStorageSync("longitude")));
                } catch (t) {
                    console.log(t);
                }
                return e.method = e.method ? e.method : "POST", "GET" === e.method ? e.url = e.url + "?" + a(y) : e.data = a(y), 
                t.prev = 11, t.next = 14, l(e.url);

              case 14:
                e.url = t.sent, t.next = 20;
                break;

              case 17:
                t.prev = 17, t.t0 = t.catch(11), e.url = e.url + "?" + a(y);

              case 20:
                e.header = {
                    "content-type": "application/x-www-form-urlencoded",
                    "X-Requested-With": "XMLHttpRequest",
                    "x-env": p
                };

              case 21:
                return e.domain ? e.url = e.domain + e.url : e.url = m[p] + e.url, e.isRequest = !0, 
                t.abrupt("return", s(e));

              case 24:
              case "end":
                return t.stop();
            }
        }, t, void 0, [ [ 11, 17 ] ]);
    }));
    return function(t) {
        return e.apply(this, arguments);
    };
}(), f = function(t) {
    return p(t).then(function(e) {
        var r = e.statusCode, n = e.errMsg, o = e.data, u = void 0 === t.successCode ? 1 : t.successCode;
        if ("200" !== String(r)) {
            var a = "Status code not 200[" + r + "]: " + n;
            throw {
                code: -r,
                data: o,
                msg: a,
                message: a
            };
        }
        if (o.code !== u) throw {
            code: o.code,
            data: o,
            msg: o.msg,
            message: o.msg
        };
        return o;
    }).catch(function(t) {
        throw t;
    });
}, y = function() {
    var e = t(r.default.mark(function t(e) {
        var n, o;
        return r.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                return t.next = 2, f(e);

              case 2:
                return n = t.sent, o = n.data, t.abrupt("return", o);

              case 5:
              case "end":
                return t.stop();
            }
        }, t, void 0);
    }));
    return function(t) {
        return e.apply(this, arguments);
    };
}();

module.exports = {
    request: y
};