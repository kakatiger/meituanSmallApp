function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            return function a(n, o) {
                try {
                    var u = t[n](o), s = u.value;
                } catch (n) {
                    return void r(n);
                }
                if (!u.done) return Promise.resolve(s).then(function(e) {
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
}), exports.storeData = void 0;

var r = e(require("../../../../../babel-runtime/regenerator/index.js")), a = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
}, n = e(require("../utils/object-assign.js")), o = require("./wm-params.js"), u = require("./wx.js"), s = function(e, t, r, a) {
    try {
        var u = (0, o.wmParams)(t);
        u = (0, n.default)({}, u, e.updateWmCommonParams), r = (0, n.default)({}, r, e.updateRohrParams), 
        e.requestInitData = {
            wmCommonParams: u,
            rohrParams: r,
            request: a
        };
    } catch (e) {
        console.log(e);
    }
};

exports.storeData = function() {
    var e = t(r.default.mark(function e(o, i) {
        var c, l, m, d, f, p, v, w, _ = i.wmCommonParams, h = i.isNeedWmParams, x = i.rohrParams, g = i.catRequest;
        return r.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (l = (c = _).wm_dtype, m = c.wm_dversion, d = c.wm_actual_longitude, f = c.wm_actual_latitude, 
                !h) {
                    e.next = 18;
                    break;
                }
                if (s(o, _, x, g), l && m) {
                    e.next = 17;
                    break;
                }
                return e.prev = 4, e.next = 7, (0, u.getSystemInfo)();

              case 7:
                p = e.sent, v = p.model, w = p.version, _ = (0, n.default)({}, a({}, _), {
                    wm_dtype: _.wm_dtype || v,
                    wm_dversion: _.wm_dversion || w
                }), s(o, _, x, g), e.next = 17;
                break;

              case 14:
                e.prev = 14, e.t0 = e.catch(4), console.log(e.t0);

              case 17:
                d && f || wx.getSetting({
                    success: function() {
                        var e = t(r.default.mark(function e(t) {
                            var i, c, l;
                            return r.default.wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                  case 0:
                                    if (t.authSetting["scope.userLocation"]) return e.prev = 1, e.next = 4, (0, u.getLocation)();
                                    e.next = 14;
                                    break;

                                  case 4:
                                    i = e.sent, c = i.longitude, l = i.latitude, _ = (0, n.default)({}, a({}, _), {
                                        wm_actual_longitude: _.wm_actual_longitude || c,
                                        wm_actual_latitude: _.wm_actual_latitude || l
                                    }), s(o, _, x, g), e.next = 14;
                                    break;

                                  case 11:
                                    e.prev = 11, e.t0 = e.catch(1), console.log(e.t0);

                                  case 14:
                                  case "end":
                                    return e.stop();
                                }
                            }, e, void 0, [ [ 1, 11 ] ]);
                        }));
                        return function(t) {
                            return e.apply(this, arguments);
                        };
                    }()
                });

              case 18:
              case "end":
                return e.stop();
            }
        }, e, void 0, [ [ 4, 14 ] ]);
    }));
    return function(t, r) {
        return e.apply(this, arguments);
    };
}();