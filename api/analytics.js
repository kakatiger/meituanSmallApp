var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/@analytics/wechat-sdk/lib/index.js")), t = require("../constants.js"), a = require("../utils/object-assign.js");

e.default.set("app", t.VERSION);

var l = function() {
    var t = e.default.get("uid"), a = e.default.get("wxid"), l = getApp().store.getState().user, u = l.user_id, i = l.open_id, n = !t || "0" === t;
    if (!(u && "0" !== u || n)) return e.default.set("uid", 0);
    n && e.default.set("uid", u || 0);
    var r = !a || "" === a;
    return i && "" !== i || r ? (r && e.default.set("wxid", i || ""), !0) : e.default.set("wxid", "");
}, u = {
    init: function() {
        e.default.init("https://report.meituan.com", {
            appnm: "waimai_wxapp",
            category: "waimai"
        });
    },
    event: function(t) {
        u.set_lch(), l(), t.val_lab = t.val_lab ? t.val_lab : {};
        var i = getApp().store.getState().wx, n = i.longitude, r = i.latitude, d = i.wx_scene, s = {};
        if (s = t.val_lab.custom ? (t.val_lab.custom.longitude = n, t.val_lab.custom.latitude = r, 
        t.val_lab) : a(t.val_lab, {
            custom: {
                longitude: n,
                latitude: r
            }
        }), "pageview" === t.event_type) try {
            var c = getCurrentPages();
            1 === c.length ? s.custom.wx_scene = d : s.custom.wx_scene = "length: " + c.length;
        } catch (t) {
            console.log(t);
        }
        "pageview" === t.event_type ? e.default.pageView(t.cid, s) : "view" === t.event_type ? e.default.moduleView(t.val_bid, s) : "click" === t.event_type ? e.default.moduleClick(t.val_bid, s) : "order" === t.event_type && e.default.order(t.val_bid, s.order_id);
    },
    pv: function() {
        u.set_lch();
        var e = "", t = getCurrentPages(), l = t[t.length - 1], i = getApp().store.getState().user.user_id, n = {
            custom: {
                user_id: i
            }
        }, r = l.getReportData();
        if (!r || !0 !== r.manual_pv) {
            var d = r.val ? r.val : {};
            d.cat_id && (n.custom.cat_id = d.cat_id), d.label_word && (n.custom.label_word = d.label_word), 
            r.cid && (e = r.cid), n = a(n, d), u.event({
                event_type: "pageview",
                cid: e,
                uid: i || 0,
                val_lab: n
            });
        }
    },
    manual_pv: function(e) {
        u.set_lch(), u.event({
            event_type: "pageview",
            cid: e.c_id,
            val_lab: e.val_lab ? e.val_lab : {}
        });
    },
    setEnv: function(t, a) {
        e.default.set(t, a);
    },
    route: null,
    set_lch: function() {
        try {
            var t = getCurrentPages()[0].route;
            if (t === u.route) return;
            u.route = t;
            for (var a = !1, l = [ "sharecoupon", "wx-gift", "activity-invite" ], i = 0; i < l.length; i++) new RegExp(l[i]).test(t) && (a = !0);
            if (a) e.default.set("lch", "wxi"); else try {
                var n = wx.getStorageSync("wx_scene");
                e.default.set("lch", n || "wx");
            } catch (t) {
                e.default.set("lch", "wx");
            }
        } catch (t) {
            e.default.set("lch", "wx");
        }
    }
};

u.turnOnValidate = e.default.turnOnValidate, u.start = e.default.start, u.quit = e.default.quit, 
module.exports = u;