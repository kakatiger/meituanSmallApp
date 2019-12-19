var n = require("../api/analytics.js"), t = n.event, e = n.manual_pv, i = {
    BID: "入参有误，格式可为以下两种：\n    1.(val_bid = '埋点val_bid', val_lab = {埋点扩展信息})\n    2.({val_bid, ...val_lab})\n  "
}, r = [ "val_bid" ], l = function() {
    var n = 0 < arguments.length && void 0 !== arguments[0] && arguments[0], t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
    if (!n) throw new Error(t);
}, a = function(n) {
    return "[object Object]" === Array.prototype.toString.call(n);
}, o = function(n) {
    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "", o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
    return "string" == typeof e ? t({
        event_type: n,
        val_bid: e,
        val_lab: o
    }) : (l(a(e), i.BID), e = (o = e).val_bid, t({
        event_type: n,
        val_bid: e,
        val_lab: JSON.parse(JSON.stringify(o), function(n, t) {
            if (-1 === r.indexOf(n)) return t;
        })
    }));
};

module.exports = {
    lxMpt: function(n, t) {
        return "function" == typeof e ? e({
            cid: n,
            val_lab: t
        }) : null;
    },
    lxMge: {
        view: function(n, t) {
            return o("view", n, t);
        },
        click: function(n, t) {
            return o("click", n, t);
        },
        order: function(n, t) {
            return o("order", n, t);
        }
    }
};