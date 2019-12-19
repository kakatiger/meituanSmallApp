function e(e) {
    return function() {
        var r = e.apply(this, arguments);
        return new Promise(function(e, t) {
            return function n(i, a) {
                try {
                    var o = r[i](a), s = o.value;
                } catch (i) {
                    return void t(i);
                }
                if (!o.done) return Promise.resolve(s).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(s);
            }("next");
        });
    };
}

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/babel-runtime/regenerator/index.js")), t = function(e, r) {
    if (Array.isArray(e)) return e;
    if (Symbol.iterator in Object(e)) return function(e, r) {
        var t = [], n = !0, i = !1, a = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (t.push(o.value), 
            !r || t.length !== r); n = !0) ;
        } catch (e) {
            i = !0, a = e;
        } finally {
            try {
                !n && s.return && s.return();
            } finally {
                if (i) throw a;
            }
        }
        return t;
    }(e, r);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, n = require("./promisify.js").obj, i = n(wx.getStorage), a = n(wx.setStorage), o = {
    getItem: function(e) {
        return i({
            key: e
        });
    },
    setItem: function(e, r) {
        return a({
            key: e,
            data: r
        });
    }
}, s = require("./change-url-arg.js"), u = s.delUrlArg, c = s.changeUrlArg;

module.exports = {
    setUrl: function() {
        var n = e(r.default.mark(function e(n, i, a) {
            var s, l, f, d, p, g;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (e.prev = 0, l = a, void 0 === (s = i) || void 0 === l) return e.next = 6, Promise.all([ o.getItem("wx_set_info", ""), o.getItem("user", {}) ]);
                    e.next = 10;
                    break;

                  case 6:
                    f = e.sent, d = t(f, 2), s = d[0].data, l = d[1].data;

                  case 10:
                    if (p = s.split("=")[0], g = s.split("=")[1], !(0 < p.length && p === String(l.user_id))) {
                        e.next = 18;
                        break;
                    }
                    p && (n = c(n, "ui", p)), g.split(",")[0] && (n = c(n, "region_id", g.split(",")[0])), 
                    g.split(",")[1] && (n = c(n, "region_version", g.split(",")[1])), e.next = 19;
                    break;

                  case 18:
                    throw new Error("header中userid和本地storage中userid不一致");

                  case 19:
                    e.next = 28;
                    break;

                  case 21:
                    e.prev = 21, e.t0 = e.catch(0), n = u(n, "ui"), n = u(n, "region_id"), -1 < (n = u(n, "region_version")).indexOf("?") && !n.split("?")[1] && (n = n.split("?")[0]), 
                    console.log(e.t0);

                  case 28:
                    return e.abrupt("return", n);

                  case 29:
                  case "end":
                    return e.stop();
                }
            }, e, void 0, [ [ 0, 21 ] ]);
        }));
        return function(e, r, t) {
            return n.apply(this, arguments);
        };
    }(),
    responseHeaderSet: function(e) {
        var r = JSON.parse(e.X_RegionInfo), t = r.ri, n = r.rv, i = r.s, a = r.ui;
        switch (i) {
          case 0:
            break;

          case 1:
            wx.setStorage({
                key: "wx_set_info",
                data: a + "=" + t + "," + n
            });
            break;

          case 2:
            wx.removeStorage({
                key: "wx_set_info"
            });
        }
    }
};