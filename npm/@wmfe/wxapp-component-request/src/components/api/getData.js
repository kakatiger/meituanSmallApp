function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            return function a(n, u) {
                try {
                    var o = t[n](u), s = o.value;
                } catch (n) {
                    return void r(n);
                }
                if (!o.done) return Promise.resolve(s).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(s);
            }("next");
        });
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getData = void 0;

var r = e(require("../../../../../babel-runtime/regenerator/index.js")), a = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
}, n = require("./wx.js"), u = e(require("../utils/object-assign.js"));

exports.getData = function() {
    var e = t(r.default.mark(function e(t) {
        var o, s, m, i, c, l, d, f, p, w, v, _, x, h, P, g, b, q;
        return r.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, !(o = t.requestInitData)) {
                    e.next = 49;
                    break;
                }
                if (s = {}, m = {}, i = o.wmCommonParams, c = o.rohrParams, l = o.request, m = c || {}, 
                f = (d = s = i || {}).wm_dtype, p = d.wm_dversion, w = d.wm_actual_longitude, v = d.wm_actual_latitude, 
                f && p) {
                    e.next = 25;
                    break;
                }
                return e.prev = 10, e.next = 13, (0, n.getSystemInfo)();

              case 13:
                _ = e.sent, x = _.model, h = _.version, s = (0, u.default)({}, a({}, s), {
                    wm_dtype: s.wm_dtype || x,
                    wm_dversion: s.wm_dversion || h
                }), s = (0, u.default)({}, s, t.updateWmCommonParams), m = (0, u.default)({}, m, t.updateRohrParams), 
                t.requestInitData = {
                    wmCommonParams: s,
                    rohrParams: m,
                    request: l
                }, e.next = 25;
                break;

              case 22:
                e.prev = 22, e.t0 = e.catch(10), console.log(e.t0);

              case 25:
                if (w && v) {
                    e.next = 46;
                    break;
                }
                return e.prev = 26, e.next = 29, (0, n.getSetting)();

              case 29:
                if ((P = e.sent).authSetting["scope.userLocation"]) return e.next = 34, (0, n.getLocation)();
                e.next = 41;
                break;

              case 34:
                g = e.sent, b = g.longitude, q = g.latitude, s = (0, u.default)({}, a({}, s), {
                    wm_actual_longitude: s.wm_actual_longitude || b,
                    wm_actual_latitude: s.wm_actual_latitude || q
                }), s = (0, u.default)({}, s, t.updateWmCommonParams), m = (0, u.default)({}, m, t.updateRohrParams), 
                t.requestInitData = {
                    wmCommonParams: s,
                    rohrParams: m,
                    request: l
                };

              case 41:
                e.next = 46;
                break;

              case 43:
                e.prev = 43, e.t1 = e.catch(26), console.log(e.t1);

              case 46:
                return e.abrupt("return", {
                    wmCommonParams: s || {},
                    rohrParams: m || {},
                    request: l || wx.request
                });

              case 49:
                return e.abrupt("return", {
                    wmCommonParams: {},
                    rohrParams: {},
                    request: wx.request
                });

              case 50:
                e.next = 56;
                break;

              case 52:
                return e.prev = 52, e.t2 = e.catch(0), console.log(e.t2), e.abrupt("return", {
                    wmCommonParams: {},
                    rohrParams: {},
                    request: wx.request
                });

              case 56:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 0, 52 ], [ 10, 22 ], [ 26, 43 ] ]);
    }));
    return function(t) {
        return e.apply(this, arguments);
    };
}();