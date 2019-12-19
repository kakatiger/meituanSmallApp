function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            return function a(i, r) {
                try {
                    var o = t[i](r), u = o.value;
                } catch (i) {
                    return void n(i);
                }
                if (!o.done) return Promise.resolve(u).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(u);
            }("next");
        });
    };
}

var n = e(require("../../npm/babel-runtime/regenerator/index.js")), a = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
}, i = require("../../npm/@dp/owl-wxapp/es6/index.js"), r = e(require("../../api/uuid-inject.js")), o = require("../../components/webview/const.js"), u = require("../../actions/web-view.js"), s = (0, 
r.default)(), c = require("../../components/rohr/rohr.js"), d = require("../../utils/mix.js"), l = require("../../api/wx.js").navigateBack, v = require("../base.js"), w = {
    LOGIN: "afterLoginAction"
}, f = {
    isActivity: null,
    uuid: null
}, h = [ "loginData", "redirectUrl" ], p = function() {}, g = function(e) {
    return "function" == typeof e;
}, b = (0, require("../../weapp-redux/index.js").connect)(function(e) {
    var t = e.user, n = void 0 === t ? {} : t, a = e.webview, i = a.CONST, r = a.loginData, o = a.baseData, u = a.shareConfig, s = a.webviewUrl;
    return {
        hasLogin: Boolean(n.token),
        CONST: i,
        shareConfig: u,
        webviewUrl: s,
        user: n,
        webviewData: {
            loginData: r,
            baseData: o,
            webviewUrl: s
        }
    };
}, function(e) {
    return {
        updateWebview: function(t) {
            return e((0, u.updateWebview)(t));
        },
        rollbackWebview: function(t) {
            return e((0, u.rollbackWebview)(t));
        }
    };
}), D = {
    pageName: "web-view",
    data: {
        type: null,
        _type: null,
        loaded: !1,
        scenes: null,
        canUseWebview: wx.canIUse("web-view")
    },
    onTouchMove: function() {},
    onTap: function() {},
    onShareAppMessage: function() {
        var e = (0, o.getState)()[o.CONST.KEY_WEBVIEW_SHARE], t = this.data, n = t.shareConfig, i = t.webviewData, r = i.webviewUrl;
        if (e) return this.updateWebview(a({}, i, {
            shareConfig: e
        })), e;
        /%/.test(r) || (r = encodeURIComponent(r));
        var u = Object.assign({}, {
            path: "/pages/web-view/web-view?redirectUrl=" + r
        }, n || {});
        return this.updateWebview(a({}, i, {
            shareConfig: u
        })), u;
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    showLoading: function() {
        wx.showLoading({
            title: "加载中"
        });
    },
    hideLoading: function() {
        wx.hideLoading();
    },
    delayBack: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
        this.toast({
            message: e
        }), setTimeout(function() {
            l();
        }, t);
    },
    catchLoadError: function() {
        var e = this;
        setTimeout(function() {
            var t = e.data, n = t.type, a = t.CONST, i = t.webviewData;
            return t.webviewUrl || i.webviewUrl ? (n && n in a || (e.hideLoading(), e.setData({
                type: a.REDIRECT
            })), e) : e.delayBack("需要配置url", 2e3);
        }, 3e3);
    },
    updatePartData: function(e) {
        var t = this.data, n = t.webviewData, a = t.CONST.REDIRECT, i = JSON.parse(JSON.stringify(n), function(e, t) {
            if (-1 === h.indexOf(e)) return t;
        });
        e !== a || i.loginData || this.updateLoginData(i), this.updateWebview(i);
    },
    resolveLoginTag: function() {
        var e = getApp(), t = e[w.LOGIN], n = this.data, i = n.webviewData, r = n.CONST.REDIRECT, u = n._type;
        if (!t) return this.setData({
            type: u
        });
        var s = "", c = wx.getStorageSync("webviewUrl") || i.webviewUrl, d = c.indexOf("#"), l = -1 !== c.indexOf("?") ? "&" : "?";
        return e[w.LOGIN] = null, -1 !== d && (s = c.substr(d), c = c.substring(0, d)), 
        Object.assign(i, {
            webviewUrl: "" + c + l + w.LOGIN + "=" + t + s
        }), this.updateLoginData(i, wx.getStorageSync("user")), this.setData({
            type: r,
            webviewData: a({}, i, {
                redirectUrl: o.middlePageUrl
            })
        });
    },
    decodeUrl: function(e) {
        return decodeURIComponent(decodeURIComponent(e));
    },
    needStoreUrl: function(e) {
        return e && -1 === e.indexOf(w.LOGIN);
    },
    isValidUrl: function(e) {
        return e && /^http/.test(e);
    },
    storeDataIfNeed: function(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : p, n = this.data.webviewData.webviewUrl;
        g(e) && (t = e, e = this.data.type), n && this.needStoreUrl(n) && wx.setStorageSync("webviewUrl", n), 
        this.updatePartData(e), g(t) && t.call(this);
    },
    checkSceneToHome: function() {
        var e = this.data.scenes, t = void 0 === e ? null : e, n = String(wx.getStorageSync("wx_scene") || 0);
        n && t && t.length && -1 !== t.indexOf(n) && wx.switchTab({
            url: "/pages/index/index"
        });
    },
    checkOnHideReset: function(e) {
        var t = e.onHideRemain, n = void 0 !== t && t;
        return this.onHideRemain = !!n, this;
    },
    checkScene: function(e) {
        var t = e.scenes, n = void 0 === t ? "" : t;
        if (n = n || null) try {
            n = n.split(/\s*,\s*/), this.setData({
                scenes: n
            });
        } catch (e) {
            this.delayBack("场景值：" + n + "有误", 2e3, e);
        }
        return this;
    },
    checkShareMenu: function(e) {
        var t = e.isHideShareMenu;
        return void 0 !== t && t && wx.hideShareMenu(), this;
    },
    loginDataNeedUpdate: function(e) {
        var t = !e || !e.token, n = ((0, o.getState)() || {}).user, a = void 0 === n ? {} : n, i = a.token, r = void 0 === i ? "" : i, u = a.user_id, s = void 0 === u ? "" : u;
        return t || e.token !== r || e.userid !== s;
    },
    isActivity: function(e) {
        return /market\.waimai\.(test\.sankuai|meituan)\.com/g.test(decodeURIComponent(e));
    },
    updateLoginData: function(e, a) {
        var i = this;
        return t(n.default.mark(function t() {
            var r, u, c, d, l, v, w, h, p;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (r = (0, o.getState)() || {}, a = a || r.user || {}, c = (u = a).open_id, d = void 0 === c ? "" : c, 
                    l = u.token, v = void 0 === l ? "" : l, w = u.user_id, h = void 0 === w ? "" : w, 
                    e.loginData = {
                        openid: d,
                        token: v,
                        userid: h
                    }, f.isActivity) return t.prev = 5, t.next = 8, s();
                    t.next = 15;
                    break;

                  case 8:
                    p = t.sent, e.loginData.iuuid = p, t.next = 15;
                    break;

                  case 12:
                    t.prev = 12, t.t0 = t.catch(5), console.error(t.t0);

                  case 15:
                    return t.abrupt("return", e);

                  case 16:
                  case "end":
                    return t.stop();
                }
            }, t, i, [ [ 5, 12 ] ]);
        }))();
    },
    onLoad: function() {
        var e = this, a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        return t(n.default.mark(function t() {
            var i, r, o, u, s, c, d, l, v, w, h, p, g, b, D;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (i = void 0, r = a.type, o = void 0 === r ? null : r, u = e.data.webviewData, 
                    s = e.data, c = s.canUseWebview, d = s.CONST, l = d.DIRECT, v = d.REDIRECT, h = (w = u).loginData, 
                    p = w.baseData, g = a.redirectUrl, b = void 0 === g ? null : g, e.handleOnLoadFunc(a), 
                    c) {
                        t.next = 10;
                        break;
                    }
                    return e.loading(!1), t.abrupt("return", e.compat());

                  case 10:
                    if (!b) {
                        t.next = 18;
                        break;
                    }
                    if (i = e.decodeUrl(b), u.webviewUrl = i, !e.isValidUrl(i)) {
                        t.next = 17;
                        break;
                    }
                    e.setData({
                        webviewData: u
                    }), t.next = 18;
                    break;

                  case 17:
                    return t.abrupt("return", e.delayBack("跳转链接：" + i + "有误", 2e3));

                  case 18:
                    if (e.catchLoadError(), f.isActivity = e.isActivity(i), f.isActivity && (D = String(wx.getStorageSync("wx_scene") || 0), 
                    p.wx_scene = D, o = v), !o) {
                        t.next = 29;
                        break;
                    }
                    if (o === v && e.loginDataNeedUpdate(h)) return t.next = 25, e.updateLoginData(u);
                    t.next = 26;
                    break;

                  case 25:
                    u = t.sent;

                  case 26:
                    e.storeDataIfNeed(o), t.next = 30;
                    break;

                  case 29:
                    o = h ? v : l;

                  case 30:
                    return t.abrupt("return", e.setData({
                        webviewData: u,
                        _type: o,
                        type: o
                    }));

                  case 31:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    handleOnLoadFunc: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        this.checkShareMenu(e).checkOnHideReset(e).checkScene(e);
    },
    clearState: function() {
        (0, o.getState)()[o.CONST.KEY_WEBVIEW_SHARE] = null;
    },
    onShow: function() {
        this.data.loaded ? (this.checkSceneToHome(), this.resolveLoginTag()) : this.setData({
            loaded: !0
        });
    },
    onReady: function() {},
    onHide: function() {
        var e = this;
        this.storeDataIfNeed(function() {
            e.onHideRemain || e.setData({
                type: null
            });
        });
    },
    onUnload: function() {
        this.clearState(), this.rollbackWebview();
    },
    getReportData: function() {
        return {};
    }
};

(0, i.page)(d(D, b, v, c));