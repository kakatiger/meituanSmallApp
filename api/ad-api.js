function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, r) {
            return function n(o, a) {
                try {
                    var u = e[o](a), i = u.value;
                } catch (o) {
                    return void r(o);
                }
                if (!u.done) return Promise.resolve(i).then(function(t) {
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
}, o = require("../utils/promisify.js").obj, a = require("../utils/param.js"), u = require("../utils/object-assign.js"), i = o(wx.request), s = require("../store.js"), c = require("../utils/deal-region-set.js").setUrl, d = {
    debug: "http://localhost:3189/",
    online: "https://adapi.waimai.meituan.com/",
    st: "https://adapi.waimai.st.meituan.com/",
    release: "https://adapi.waimai.meituan.com/",
    qa: "https://adapi-d.waimai.test.meituan.com/",
    beta: "https://adapi.waimai.meituan.com/",
    dev: "https://adapi.waimai.dev.meituan.com/"
}, m = require("../reducers/selectors/common-param.js"), l = function() {
    var e = t(r.default.mark(function t(e) {
        var o, l, p, f, y;
        return r.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                if (o = e.data, l = s.getState(), p = (p = l.dev.env) || "online", !o || "object" !== (void 0 === o ? "undefined" : n(o))) {
                    t.next = 21;
                    break;
                }
                (f = m(l)).wm_appversion = "6.4.0", y = u(f, o);
                try {
                    wx.getStorageSync("latitude") && wx.getStorageSync("longitude") && (y.wm_actual_latitude = Number(wx.getStorageSync("latitude")), 
                    y.wm_actual_longitude = Number(wx.getStorageSync("longitude")));
                } catch (t) {
                    console.log(t);
                }
                return e.method = e.method ? e.method : "POST", "GET" === e.method ? e.url = e.url + "?" + a(y) : e.data = a(y), 
                t.prev = 11, t.next = 14, c(e.url);

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
                return e.domain ? e.url = e.domain + e.url : e.url = d[p] + e.url, t.abrupt("return", i(e));

              case 23:
              case "end":
                return t.stop();
            }
        }, t, void 0, [ [ 11, 17 ] ]);
    }));
    return function(t) {
        return e.apply(this, arguments);
    };
}(), p = function(t) {
    return l(t).then(function(e) {
        var r = e.statusCode, n = e.errMsg, o = e.data, a = void 0 === t.successCode ? 0 : t.successCode;
        if ("200" !== String(r)) {
            var u = "Status code not 200[" + r + "]: " + n;
            throw {
                code: -r,
                data: o,
                msg: u,
                message: u
            };
        }
        if (o.code !== a) throw {
            code: o.code,
            data: o,
            msg: o.msg,
            message: o.msg
        };
        return o;
    }).catch(function(t) {
        throw t;
    });
}, f = function() {
    var e = t(r.default.mark(function t(e) {
        var n, o;
        return r.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                return t.next = 2, p(e);

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
    request: f
};