function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            return function n(u, a) {
                try {
                    var s = t[u](a), i = s.value;
                } catch (u) {
                    return void r(u);
                }
                if (!s.done) return Promise.resolve(i).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(i);
            }("next");
        });
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getUuidApi = void 0;

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../../babel-runtime/regenerator/index.js")), r = require("../utils/wx.js"), n = require("../utils/constants.js"), u = function(e) {
    return (0, r.requestApi)(e).then(function(e) {
        var t = e.statusCode, r = e.errMsg, n = e.data;
        if ("200" !== String(t)) {
            var u = "Status code not 200[" + t + "]: " + r;
            throw {
                code: -t,
                data: n,
                msg: u,
                message: u
            };
        }
        var a = n.code, s = n.data, i = n.msg;
        if (0 !== a) throw {
            code: a,
            data: n,
            msg: i,
            message: i
        };
        return s;
    }).catch(function(e) {
        var t = "网络异常，请重试";
        throw e.msg = e.msg || t, e.message = e.message || t, e;
    });
};

exports.getUuidApi = function() {
    var a = e(t.default.mark(function e(a, s) {
        var i, o, c, d, f, v, p;
        return t.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return i = "", e.prev = 1, e.next = 4, (0, r.getStorage)("ENV");

              case 4:
                o = e.sent, c = o.data, i = c, e.next = 12;
                break;

              case 9:
                e.prev = 9, e.t0 = e.catch(1), i = "";

              case 12:
                return d = i ? {
                    "x-env": i
                } : {}, f = s.uuid ? {
                    uuid: s.uuid
                } : {}, v = n.CTYPE_CHANNEL[a] || a, p = {
                    url: "https://" + n.DOMAIN + "/" + v + n.PATH,
                    data: s,
                    header: Object.assign({}, d, f),
                    method: "POST"
                }, e.abrupt("return", u(p));

              case 17:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 1, 9 ] ]);
    }));
    return function(e, t) {
        return a.apply(this, arguments);
    };
}();