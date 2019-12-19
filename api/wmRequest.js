function e(e) {
    if (Array.isArray(e)) {
        for (var r = 0, t = Array(e.length); r < e.length; r++) t[r] = e[r];
        return t;
    }
    return Array.from(e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = require("../npm/@dp/owl-wxapp/build/owl-wxapp.js"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/@wmfe/wxapp-component-request/src/components/index.js")), n = require("../constants.js"), u = require("../actions/user.js"), i = require("../actions/wx.js"), o = require("../actions/recipient.js"), a = require("../utils/random-id.js"), s = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : function(e) {
        return e;
    }, r = {};
    return "function" == typeof getApp && (r = getApp()) ? e(r) : r;
};

exports.default = {
    init: function(e) {
        var u = e.store.getState().user.open_id, i = void 0 === u ? "" : u, o = a();
        e.request = new t.default(), e.request.init({
            wmCommonParams: {
                wm_ctype: "wxapp",
                wm_appversion: n.VERSION || "0.0.1",
                wm_uuid: o || ""
            },
            rohrParams: {
                uuid: o || "",
                open_id: i || "",
                platform: 13,
                partner: 4,
                riskLevel: 1
            },
            request: r.request
        });
    },
    update: function(e) {
        var r = e.type, t = void 0, n = {}, a = (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : getApp().store).getState() || {}, p = a.user, d = p.token, c = p.user_id, l = p.open_id, m = a.recipient, _ = m.longitude, f = m.latitude, w = a.wx, g = w.longitude, q = w.latitude;
        switch (r) {
          case u.USER_STORE:
          case u.USER_LOADED:
          case u.USER_EXIT:
            t = {
                wm_logintoken: d,
                userToken: d,
                userid: c,
                user_id: c
            }, n = {
                open_id: l
            };
            break;

          case o.RECIPIENT_SET:
            t = {
                wm_longitude: _ || g,
                wm_latitude: f || q
            };
            break;

          case i.WX_SET:
            t = {
                wm_actual_longitude: g,
                wm_actual_latitude: q
            };
        }
        s(function(e) {
            t && e.request.update({
                wmCommonParams: t,
                rohrParams: n
            });
        });
    },
    forceUpdate: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        s(function(t) {
            t.request.update({
                wmCommonParams: e,
                rohrParams: r
            });
        });
    },
    req: function() {
        for (var r = arguments.length, t = Array(r), n = 0; n < r; n++) t[n] = arguments[n];
        return s(function(r) {
            var n;
            return (n = r.request).req.apply(n, e(t));
        });
    }
};