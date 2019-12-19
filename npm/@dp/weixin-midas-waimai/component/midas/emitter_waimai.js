function n(n, e) {
    return new Promise(function(t, o) {
        var r = {};
        r.wm_ad_log = encodeURIComponent(JSON.stringify(e)), wx.request({
            url: n,
            data: r,
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

function e(e, t) {
    return n(i.getBaseUrl(t), e);
}

function t() {
    function n() {
        if (r.length) {
            var n = r.slice(0);
            r = [], e(n.map(function(n) {
                return n[0];
            }), n[0][1]);
        }
    }
    var t, r = [], i = o.config.maxSendSize || 10;
    return function() {
        r.length > i && n(), t && clearTimeout(t), r.push(arguments), t = setTimeout(function() {
            n();
        }, 200);
    };
}

var o = require("./config.js"), r = require("./enum.js"), i = require("./utils_waimai.js"), c = t(), u = t();

exports.sendClickPoint = function(n, t, o, c) {
    return e([ i.buildActionUrl(decodeURIComponent(n) + (o ? "&" + o : "") + (c.clickExtra ? "&" + c.clickExtra : ""), t, r.ACT_TYPE.CLICK_POINT, c) ], c);
}, exports.sendLoadPoint = function(n, e, t, o) {
    return c(i.buildActionUrl(decodeURIComponent(n) + (t ? "&" + t : "") + (o.loadExtra ? "&" + o.loadExtra : ""), e, r.ACT_TYPE.LOAD_POINT, o), o);
}, exports.sendImpressionPoint = function(n, e, t, o) {
    return u(i.buildActionUrl(decodeURIComponent(n) + (t ? "&" + t : "") + (o.impressionExtra ? "&" + o.impressionExtra : ""), e, r.ACT_TYPE.IMPRESSION_POINT, o), o);
}, exports.sendReachPoint = function(n, t, o, c) {
    return e([ i.buildActionUrl(decodeURIComponent(n) + (o ? "&" + o : "") + (c.reachExtra ? "&" + c.reachExtra : ""), t, r.ACT_TYPE.REACH_POINT, c) ], c);
};