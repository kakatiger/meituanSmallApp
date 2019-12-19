function n(n, e, t) {
    return new Promise(function(o, r) {
        wx.request({
            url: n,
            method: e,
            data: t,
            success: function() {
                o(!0);
            },
            fail: function() {
                r(!1);
            }
        });
    });
}

function e(n, e) {
    return new Promise(function(t, o) {
        wx.request({
            url: n,
            data: {
                data: JSON.stringify(e)
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function() {
                t(!0);
            },
            fail: function() {
                o(!1);
            }
        });
    });
}

function t(e, t) {
    return n(u.getBaseUrl(t) + "?" + e, "get");
}

function o(n, t) {
    return e(u.getBaseUrl(t), n);
}

function r() {
    function n() {
        if (t.length) {
            var n = t.slice(0);
            t = [], o(n.map(function(n) {
                return n[0];
            }), n[0][1]);
        }
    }
    var e, t = [], r = i.config.maxSendSize || 10;
    return function() {
        t.length > r && n(), e && clearTimeout(e), t.push(arguments), e = setTimeout(function() {
            n();
        }, 200);
    };
}

var i = require("./config.js"), c = require("./enum.js"), u = require("./utils.js"), s = r(), a = r();

exports.sendClickPoint = function(n, e, o, r) {
    return t(u.buildActionUrl(decodeURIComponent(n) + (o ? "&" + o : "") + (r.clickExtra ? "&" + r.clickExtra : ""), e, c.ACT_TYPE.CLICK_POINT, r), r);
}, exports.sendLoadPoint = function(n, e, t, o) {
    return s(encodeURIComponent(u.buildActionUrl(decodeURIComponent(n) + (t ? "&" + t : "") + (o.loadExtra ? "&" + o.loadExtra : ""), e, c.ACT_TYPE.LOAD_POINT, o)), o);
}, exports.sendImpressionPoint = function(n, e, t, o) {
    return a(encodeURIComponent(u.buildActionUrl(decodeURIComponent(n) + (t ? "&" + t : "") + (o.impressionExtra ? "&" + o.impressionExtra : ""), e, c.ACT_TYPE.IMPRESSION_POINT, o)), o);
}, exports.sendReachPoint = function(n, e, o, r) {
    return t(u.buildActionUrl(decodeURIComponent(n) + (o ? "&" + o : "") + (r.reachExtra ? "&" + r.reachExtra : ""), e, c.ACT_TYPE.REACH_POINT, r), r);
};