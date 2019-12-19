function e() {
    try {
        return u || (u = decodeURIComponent(wx.getStorageSync("_lx_sdk_lxcuid") || ""));
    } catch (e) {}
}

function t() {
    try {
        return p || (p = decodeURIComponent(wx.getStorageSync("uuid") || ""));
    } catch (e) {}
}

function n() {
    try {
        return R || (R = decodeURIComponent(wx.getStorageSync("openid") || ""));
    } catch (e) {}
}

function r() {
    try {
        return E || (E = decodeURIComponent(wx.getStorageSync("unionid") || ""));
    } catch (e) {}
}

var c = require("./enum.js");

exports.getBaseUrl = function(e) {
    var t = e.serverType, n = e.env, r = c.SERVER_TYPE_URL[t] || c.SERVER_TYPE_URL[c.SERVER_TYPE.DIANPING];
    return (e.ishttps ? "https:" : "http:") + (r[n] || r[c.ENV.PRODUCT]);
};

var i = /(?:^|&)act=[^?&=]*/gi, o = /(?:^|&)openid=([^?&=]*)/i, a = /(?:^|&)dpid=[^?&=]*/gi, d = /(?:^|&)adidx=[^?&=]*/gi, u = "", p = "", R = "", E = "", g = 0;

exports.buildActionUrl = function(u, p, R, E) {
    var l = e(), s = t(), v = n(), S = "";
    S += "&unionid=" + r() + "&adidx=" + p;
    var _ = (u = u.replace(d, "")).match(o), h = _ && _[1] || "";
    return v && h.length < 10 && (u.match(o) && (u = u.replace(o, "")), S += "&openid=" + v), 
    u.replace(i, ""), u = u.replace(a, ""), E.serverType === c.SERVER_TYPE.MEITUAN ? u + "&act=" + R + (S += "&mtdpid=" + l + "&iuuid=" + s) + "&t=" + new Date().valueOf() + "&i=v1_" + ++g : u + "&act=" + R + (S += "&dpid=" + l) + "&t=" + new Date().valueOf() + "&i=v1_" + ++g;
};