function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, i) {
            return function a(r, n) {
                try {
                    var o = e[r](n), s = o.value;
                } catch (r) {
                    return void i(r);
                }
                if (!o.done) return Promise.resolve(s).then(function(t) {
                    a("next", t);
                }, function(t) {
                    a("throw", t);
                });
                t(s);
            }("next");
        });
    };
}

function e(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../npm/babel-runtime/regenerator/index.js")), a = require("../utils/object-assign.js"), r = require("../utils/camel-case.js"), n = require("../api/wx.js"), o = n.makePhoneCall, s = n.showNavigationBarLoading, u = n.hideNavigationBarLoading, c = n.showLoading, l = n.hideLoading, h = require("../weapp-redux/index.js").connect, d = require("../utils/mix.js"), f = require("../utils/wx.js").storage.getItem, v = require("../api/index.js"), p = require("../api/analytics.js").pv, g = require("../utils/param.js"), m = v.ready, y = require("../api/wx.js"), w = y.setNavigationBarTitle, _ = y.requestJSON, x = y.navigateTo, S = require("../utils/trace-tag-manager.js"), T = require("../utils/random-item.js"), k = require("../utils/starts-with.js"), U = require("../constants.js").SHARE_MESSAGES, D = require("../utils/lx.js"), b = require("../constants.js"), q = b.bucketname, C = b.clientid, j = b.serverMaxUploadSize, M = b.maxUploadTimeout, L = function(t) {
    return t;
}, N = {
    loading: {
        show: !0,
        catchtouchmove: !1
    },
    toast: {
        show: !1
    },
    alert: {
        show: !1,
        type: "alert"
    },
    confirm: {
        show: !1,
        type: "confirm"
    },
    error: {
        show: !1,
        type: "error"
    },
    spiderError: {
        show: !1,
        type: "error"
    },
    compat: {
        show: !1,
        type: "error"
    },
    actionSheet: {
        show: !1
    },
    verify: {
        show: !1,
        verifyUrl: ""
    },
    iptPhone: {
        show: !1,
        inputValue: "",
        type: "iptPhone",
        isRight: !1,
        error: !1,
        hasValue: !1
    },
    spider_error: {
        show: !1,
        type: "error"
    }
}, P = null;

module.exports = function(n) {
    var y = n.data, b = n.onLoad, O = n.onUnload, B = n.onShow, A = n.onHide, I = n.onShareAppDesc, R = n.getReportData, E = n.mixin, z = n.mapStateToData, K = n.mapDispatchToPage, H = {
        pageHidden: !1,
        pageUnloaded: !1,
        data: a({}, N, y),
        _events: {
            alert_ok: null,
            confirm_cancel: null,
            confirm_ok: null,
            error_ok: null,
            actionSheet_ok: null,
            actionSheet_cancel: null
        },
        onClickBaseActionSheet: function(t) {
            var e = t.currentTarget.dataset, i = e.item, a = e.index, r = this._events, n = r.actionSheet_ok, o = r.actionSheet_cancel;
            r.actionSheet_ok = null, r.actionSheet_cancel = null;
            var s = N.actionSheet;
            this.setData({
                actionSheet: s
            }), i ? n && n(parseInt(a, 10)) : o && o();
        },
        onClickCloseButton: function() {
            this.setData({
                confirm: {
                    show: !1
                }
            });
        },
        preventTapBubble: function() {},
        onTapBackdrop: function() {
            this.setData({
                confirm: {
                    show: !1
                }
            });
        },
        onClickBaseComponent: function(t) {
            var i = t.currentTarget.dataset, a = i.action, n = i.type, o = i.persist, s = N[r(n)];
            if (s) {
                var u = n + "_" + a, c = this._events, l = c[u];
                o || (c[n + "_ok"] = null, c[n + "_cancel"] = null, this.setData(e({}, n, s))), 
                l && l.call(this);
            }
        },
        alert: function(t) {
            var e = t.title, i = t.message, a = t.messagelist, r = t.ok, n = t.textOK, o = t.show, s = void 0 === o || o;
            this._events.alert_ok = r, this.setData({
                alert: {
                    show: s,
                    type: "alert",
                    title: e,
                    message: i,
                    messagelist: a,
                    textOK: n
                }
            });
        },
        confirm: function(t) {
            var e = t.title, i = t.message, a = t.ok, r = t.cancel, n = t.textOK, o = t.textCancel, s = t.showCloseButton, u = t.show, c = void 0 === u || u;
            this._events.confirm_cancel = r, this._events.confirm_ok = a, this.setData({
                confirm: {
                    show: c,
                    type: "confirm",
                    title: e,
                    message: i,
                    textOK: n,
                    textCancel: o || "取消",
                    showCloseButton: s
                }
            });
        },
        error: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e = t.ok, i = t.img, a = t.message, r = t.textOK;
            a ? (this._events.error_ok = e, this.setData({
                error: {
                    show: !0,
                    type: "error",
                    img: i,
                    message: a,
                    textOK: r
                }
            })) : this.setData({
                error: N.error
            });
        },
        spiderError: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e = t.ok, i = t.img, a = t.message, r = t.textOK, n = t.customer_ip;
            this._events.spider_error_ok = e, this.setData({
                spiderError: {
                    show: !0,
                    type: "spider_error",
                    img: i,
                    message: a,
                    textOK: r,
                    customer_ip: n
                }
            });
        },
        actionSheet: function(t) {
            var e = t.itemList, i = t.ok, a = t.cancel;
            this._events.actionSheet_ok = i, this._events.actionSheet_cancel = a, this.setData({
                actionSheet: {
                    show: !0,
                    itemList: e
                }
            });
        },
        loading: function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
            t ? s() : u(), this.setData({
                loading: {
                    show: !!t,
                    catchtouchmove: e
                }
            });
        },
        wxLoading: function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            t ? c(e) : l();
        },
        startLazyLoading: function() {
            var t = this, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : -1, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {
                title: "加载中..."
            };
            this.clearLazyLoading(), this.lazyTimeout = setTimeout(function() {
                t.wxLoading(!0, i);
            }, 0 <= e ? e : 3e3);
        },
        clearLazyLoading: function() {
            this.lazyTimeout && (clearTimeout(this.lazyTimeout), this.lazyTimeout = null), this.wxLoading(!1);
        },
        toastTo: -1,
        toast: function(t) {
            var e = this, i = t.message, a = t.className, r = void 0 === a ? "" : a, n = t.duration, o = void 0 === n ? 3e3 : n, s = t.callback, u = void 0 === s ? function() {} : s, c = t.showBackdrop, l = void 0 !== c && c, h = t.backdropClassName, d = void 0 === h ? "" : h;
            this.clearTimeout(this.toastTo), this.toastTo = this.setTimeout(function() {
                u(), e.setData({
                    toast: N.toast
                });
            }, o), this.setData({
                toast: {
                    show: !0,
                    message: i,
                    className: r,
                    showBackdrop: l,
                    backdropClassName: d
                }
            });
        },
        compat: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e = Object.assign({}, {
                isTab: !0,
                zIndex: 10001,
                img: "no-poi",
                url: "../../pages/index/index",
                message: "你的微信版本过低，请升级后重新进入。",
                textOK: "返回首页"
            }, t || {}, {
                show: !0,
                type: "compat"
            }), i = e.url, a = e.isTab;
            this._events.compat_ok = function() {
                return a ? wx.switchTab({
                    url: i
                }) : x({
                    url: i
                });
            }, this.setData({
                error: e
            });
        },
        isFunction: function(t) {
            var e = function(t) {
                return "function" == typeof t;
            };
            return Array.isArray(t) ? t.every(e) : t && e(t);
        },
        getMessage: function(t) {
            var e = {
                "001": "入参类型有误，必须是方法",
                "002": function(t) {
                    return t + "不能为空";
                }
            }[t];
            if (!this.isFunction(e)) return e;
            for (var i = arguments.length, a = Array(1 < i ? i - 1 : 0), r = 1; r < i; r++) a[r - 1] = arguments[r];
            return e.apply(this, a);
        },
        invariant: function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "Internal error";
            if (!t) throw new Error(e);
            return this;
        },
        matchUploadSize: function() {
            return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0) <= j;
        },
        uploadFile: function(t) {
            var e = t.bucket, i = void 0 === e ? q : e, a = t.clientid, r = void 0 === a ? String(C) : a, n = t.url, o = void 0 === n ? "qa" !== wx.getStorageSync("ENV") ? "https://pic.meituan.com/extrastorage/new/" : "https://extrauploader.inf.test.sankuai.com/extrastorage/new/" : n, s = t.filePath, u = void 0 === s ? "" : s, c = t.name, l = void 0 === c ? "waimai-wxapp-upload-file" : c, h = t.header, d = void 0 === h ? {
                isImage: String(!0),
                isHttps: String(!0)
            } : h, f = t.callback, v = void 0 === f ? L : f, p = t.fallback, g = void 0 === p ? L : p, m = t.errorCallback, y = t.debug, w = void 0 !== y && y, _ = t.progress, x = void 0 !== _ && _, S = t.timeout, T = void 0 === S ? M : S;
            i = i || q, r = r || String(C), m = m || g || L, o = "" + o + i, d["client-id"] = r, 
            w && (this.invariant(this.isFunction([ v, g, m ]), this.getMessage("001")), this.invariant(u, this.getMessage("002", "filePath")));
            var k = (getApp().store.getState() || {}).user || {};
            d.token = k.token || "";
            var U = wx.uploadFile({
                url: o,
                filePath: u,
                name: l,
                header: d,
                success: function(t) {
                    var e = t.data;
                    try {
                        var i = JSON.parse(e);
                        i && i.data && i.success ? v(i.data) : m(i.error);
                    } catch (t) {
                        m(t);
                    }
                },
                fail: function() {
                    g();
                }
            });
            this.isFunction(x) && U.onProgressUpdate(x), setTimeout(function() {
                U.abort();
            }, T || M);
        },
        _toMap: null,
        _toPending: 0,
        _toCount: 0,
        resetToMapIfNeeded: function() {
            (!this._toMap || 0 === this._toPending && 100 < this._toCount) && (this._toMap = Object.create(null), 
            this._toCount = 0);
        },
        verify: function(t) {
            var e = t.verifyUrl, i = t.imageUrl;
            this.setData({
                verify: {
                    show: !0,
                    verifyUrl: e,
                    imageUrl: i,
                    imageUrlRequest: i,
                    verify_input: ""
                }
            });
        },
        verifyClear: function() {
            this.setData({
                verify: {
                    show: !0,
                    verifyUrl: this.data.verify.verifyUrl,
                    imageUrl: this.data.imageUrl,
                    imageUrlRequest: this.data.imageUrlRequest,
                    verify_input: ""
                }
            });
        },
        verifyClose: function() {
            this.setData({
                verify: {
                    show: !1
                }
            });
        },
        verifyChange: function() {
            this.setData({
                verify: {
                    show: !0,
                    verifyUrl: this.data.verify.verifyUrl,
                    imageUrl: this.data.verify.imageUrl,
                    imageUrlRequest: this.data.verify.imageUrl + "&t=" + new Date().getTime(),
                    verify_input: ""
                }
            });
        },
        onVerifyInput: function(t) {
            var e = t.detail.value;
            this.setData({
                verify: {
                    show: !0,
                    verifyUrl: this.data.verify.verifyUrl,
                    imageUrl: this.data.verify.imageUrl,
                    imageUrlRequest: this.data.verify.imageUrlRequest,
                    verify_input: e
                }
            });
        },
        verifyRequest: function() {
            var e = this;
            return t(i.default.mark(function t() {
                var a, r, n, o, s, u, c, l;
                return i.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return a = void 0, t.prev = 1, t.next = 4, f("UUID");

                      case 4:
                        a = (a = t.sent).data, t.next = 13;
                        break;

                      case 8:
                        t.prev = 8, t.t0 = t.catch(1), r = t.t0.message, a = "", console.log(r);

                      case 13:
                        return n = g({
                            uuid: a,
                            platform: 13,
                            partner: 4,
                            captchacode: e.data.verify.verify_input
                        }), t.next = 16, _({
                            url: e.data.verify.verifyUrl + "&" + n,
                            method: "GET"
                        });

                      case 16:
                        1 === (o = t.sent).status ? (s = getCurrentPages(), u = s.length - 1, c = "/" + s[u].route + "?" + g(s[u].options), 
                        console.log(c), 0 <= [ "pages/index/index", "pages/orders/orders", "pages/mine/mine" ].indexOf(s[u].route) ? wx.reLaunch({
                            url: c
                        }) : wx.redirectTo({
                            url: c
                        })) : (l = o.error && o.error.split(" ")[1].split(":")[1], e.toast({
                            message: l
                        }), e.verifyChange());

                      case 18:
                      case "end":
                        return t.stop();
                    }
                }, t, e, [ [ 1, 8 ] ]);
            }))();
        },
        setTimeout: function(t) {
            function e(e, i) {
                return t.apply(this, arguments);
            }
            return e.toString = function() {
                return t.toString();
            }, e;
        }(function(t, e) {
            var i = this;
            this.resetToMapIfNeeded();
            var a = this._toMap;
            this._toPending += 1, this._toCount += 1;
            var r = setTimeout(function() {
                i._toPending -= 1, a[r] = null, i.resetToMapIfNeeded(), t();
            }, e);
            return a[r] = r;
        }),
        clearTimeout: function(t) {
            function e(e) {
                return t.apply(this, arguments);
            }
            return e.toString = function() {
                return t.toString();
            }, e;
        }(function(t) {
            var e = this._toMap;
            e && e[t] && (this._toPending -= 1, e[t] = null, this.resetToMapIfNeeded()), clearTimeout(t);
        }),
        cleanTimeouts: function() {
            var t = this._toMap;
            if (t) {
                for (var e = Object.keys(t), i = e.length - 1; -1 < i; --i) {
                    var a = t[e[i]];
                    null !== a && clearTimeout(a);
                }
                this._toMap = null;
            }
        },
        onUnload: function() {
            this.cleanTimeouts(), O && O.call(this), this.pageUnloaded = !0;
        },
        onLoad: function(t) {
            var e = this;
            this.pageUnloaded = !1, this.__pageLoadTime__ = Date.now();
            var i = P;
            P = null;
            var r = t.utm_source, n = t.scene;
            if (r && v.setUTMSource(r), n) {
                var o = decodeURIComponent(n).match(/utm\!\w*/)[0];
                o && o.split("!")[1] && v.setUTMSource(o.split("!")[1]);
            }
            var u = getApp().store.getState().extradata.from;
            "mt" === u ? v.setUTMSource(7777) : "ticket" === u ? v.setUTMSource(7800) : "dianping-wxapp" === u && v.setUTMSource(7858), 
            b && m(function() {
                b.call(e, a(t, i)), e.data.loading.show && s();
            });
        },
        onShow: function() {
            var t = this;
            this.pageHidden = !1, m(B ? function() {
                p(), B.call(t);
            } : p);
        },
        onHide: function() {
            A && A.call(this), this.pageHidden = !0;
        },
        setNavigationBarTitle: function(t) {
            this.pageUnloaded || w(t);
        },
        showPhoneCall: function(t) {
            var e = t.phones, i = t.texts, a = void 0 === i ? e : i;
            this.actionSheet({
                itemList: a,
                ok: function(t) {
                    o({
                        phoneNumber: e[t]
                    });
                }
            });
        },
        traceTagStart: function(t) {
            return S.start(t);
        },
        traceTagGet: function(t) {
            return S.get(t);
        },
        traceTagEnd: function(t) {
            return S.end(t);
        },
        onShareAppDesc: function() {
            return (I ? I.call(this) : "") || T(U);
        },
        getReportData: function() {
            return (R ? R.call(this) : null) || {};
        },
        onClickNavigator: function(t) {
            var e = t.currentTarget.dataset, i = {};
            Object.keys(e).forEach(function(t) {
                if (3 < t.length && k(t, "arg")) {
                    var a = t.slice(3), r = a.toLowerCase();
                    r !== a && (i[r] = e[t]);
                }
            }), P = i;
        }
    }, F = {
        api: v,
        onShareAppMessage: function() {
            var t = this.pageName || "unknown";
            return {
                title: "美团外卖",
                desc: this.onShareAppDesc(),
                path: "/pages/index/index?from=from_share_" + t
            };
        }
    };
    n.store && (z || K) && console.error("Store already existed");
    var V = a(F, n, H, D), G = V.store ? V : h(z, K)(V);
    return E && E.length ? d(G, E) : G;
};