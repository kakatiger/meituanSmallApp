function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            return function i(a, n) {
                try {
                    var o = t[a](n), s = o.value;
                } catch (a) {
                    return void r(a);
                }
                if (!o.done) return Promise.resolve(s).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(s);
            }("next");
        });
    };
}

function t(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/babel-runtime/regenerator/index.js")), i = require("../utils/object-assign.js"), a = require("../api/wx.js"), n = a.makePhoneCall, o = a.showNavigationBarLoading, s = a.hideNavigationBarLoading, u = require("../weapp-redux/index.js").connect, c = require("../utils/mix.js"), l = require("../utils/wx.js").storage.getItem, h = require("../api/index.js"), f = require("../api/analytics.js").pv, d = require("../utils/param.js"), g = h.ready, p = require("../api/wx.js"), v = p.setNavigationBarTitle, m = p.requestJSON, _ = require("../utils/trace-tag-manager.js"), y = require("../utils/random-item.js"), w = require("../utils/starts-with.js"), x = require("../constants.js").SHARE_MESSAGES, S = {
    loading: {
        show: !0
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
    actionSheet: {
        show: !1
    },
    verify: {
        show: !1,
        verifyUrl: ""
    }
}, U = null;

module.exports = function(a) {
    var p = a.data, T = a.onLoad, k = a.onUnload, D = a.onShow, q = a.onHide, C = a.onShareAppDesc, j = a.getReportData, M = a.mixin, N = a.mapStateToData, b = a.mapDispatchToPage, O = a.needLocation, P = void 0 !== O && O, R = {
        pageHidden: !1,
        pageUnloaded: !1,
        data: i({}, S, p),
        _events: {
            alert_ok: null,
            confirm_cancel: null,
            confirm_ok: null,
            error_ok: null,
            actionSheet_ok: null,
            actionSheet_cancel: null
        },
        onClickBaseActionSheet: function(e) {
            var t = e.currentTarget.dataset, r = t.item, i = t.index, a = this._events, n = a.actionSheet_ok, o = a.actionSheet_cancel;
            a.actionSheet_ok = null, a.actionSheet_cancel = null;
            var s = S.actionSheet;
            this.setData({
                actionSheet: s
            }), r ? n && n(parseInt(i, 10)) : o && o();
        },
        onClickBaseComponent: function(e) {
            var r = e.currentTarget.dataset, i = r.action, a = r.type, n = r.persist, o = S[a];
            if (o) {
                var s = a + "_" + i, u = this._events, c = u[s];
                n || (u[a + "_ok"] = null, u[a + "_cancel"] = null, this.setData(t({}, a, o))), 
                c && c.call(this);
            }
        },
        alert: function(e) {
            var t = e.title, r = e.message, i = e.ok, a = e.textOK;
            this._events.alert_ok = i, this.setData({
                alert: {
                    show: !0,
                    type: "alert",
                    title: t,
                    message: r,
                    textOK: a
                }
            });
        },
        confirm: function(e) {
            var t = e.title, r = e.message, i = e.ok, a = e.cancel, n = e.textOK, o = e.textCancel;
            this._events.confirm_cancel = a, this._events.confirm_ok = i, this.setData({
                confirm: {
                    show: !0,
                    type: "confirm",
                    title: t,
                    message: r,
                    textOK: n,
                    textCancel: o || "取消"
                }
            });
        },
        error: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.ok, r = e.img, i = e.message, a = e.textOK;
            i ? (this._events.spider_error_ok = t, this.setData({
                error: {
                    show: !0,
                    type: "spider_error",
                    img: r,
                    message: i,
                    textOK: a
                }
            })) : this.setData({
                error: S.error
            });
        },
        spiderError: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.ok, r = e.img, i = e.message, a = e.textOK, n = e.customer_ip;
            this._events.error_ok = t, this.setData({
                spiderError: {
                    show: !0,
                    type: "error",
                    img: r,
                    message: i,
                    textOK: a,
                    customer_ip: n
                }
            });
        },
        actionSheet: function(e) {
            var t = e.itemList, r = e.ok, i = e.cancel;
            this._events.actionSheet_ok = r, this._events.actionSheet_cancel = i, this.setData({
                actionSheet: {
                    show: !0,
                    itemList: t
                }
            });
        },
        loading: function(e) {
            e ? o() : s(), this.setData({
                loading: {
                    show: !!e
                }
            });
        },
        toastTo: -1,
        toast: function(e) {
            var t = this, r = e.message, i = e.className, a = void 0 === i ? "" : i, n = e.duration, o = void 0 === n ? 3e3 : n;
            this.clearTimeout(this.toastTo), this.toastTo = this.setTimeout(function() {
                t.setData({
                    toast: S.toast
                });
            }, o), this.setData({
                toast: {
                    show: !0,
                    message: r,
                    className: a
                }
            });
        },
        _toMap: null,
        _toPending: 0,
        _toCount: 0,
        resetToMapIfNeeded: function() {
            (!this._toMap || 0 === this._toPending && 100 < this._toCount) && (this._toMap = Object.create(null), 
            this._toCount = 0);
        },
        verify: function(e) {
            var t = e.verifyUrl, r = e.imageUrl;
            this.setData({
                verify: {
                    show: !0,
                    verifyUrl: t,
                    imageUrl: r,
                    imageUrlRequest: r,
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
        onVerifyInput: function(e) {
            var t = e.detail.value;
            this.setData({
                verify: {
                    show: !0,
                    verifyUrl: this.data.verify.verifyUrl,
                    imageUrl: this.data.verify.imageUrl,
                    imageUrlRequest: this.data.verify.imageUrlRequest,
                    verify_input: t
                }
            });
        },
        verifyRequest: function() {
            var t = this;
            return e(r.default.mark(function e() {
                var i, a, n, o, s, u, c, h;
                return r.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return i = void 0, e.prev = 1, e.next = 4, l("UUID");

                      case 4:
                        i = (i = e.sent).data, e.next = 13;
                        break;

                      case 8:
                        e.prev = 8, e.t0 = e.catch(1), a = e.t0.message, i = "", console.log(a);

                      case 13:
                        return n = d({
                            uuid: i,
                            platform: 13,
                            partner: 4,
                            captchacode: t.data.verify.verify_input
                        }), e.next = 16, m({
                            url: t.data.verify.verifyUrl + "&" + n,
                            method: "GET"
                        });

                      case 16:
                        1 === (o = e.sent).status ? (s = getCurrentPages(), u = s.length - 1, c = "/" + s[u].route + "?" + d(s[u].options), 
                        console.log(c), 0 <= [ "pages/index/index", "pages/orders/orders", "pages/mine/mine" ].indexOf(s[u].route) ? wx.reLaunch({
                            url: c
                        }) : wx.redirectTo({
                            url: c
                        })) : (h = o.error.split(" ")[1].split(":")[1], t.toast({
                            message: h
                        }), t.verifyChange());

                      case 18:
                      case "end":
                        return e.stop();
                    }
                }, e, t, [ [ 1, 8 ] ]);
            }))();
        },
        setTimeout: function(e) {
            function t(t, r) {
                return e.apply(this, arguments);
            }
            return t.toString = function() {
                return e.toString();
            }, t;
        }(function(e, t) {
            var r = this;
            this.resetToMapIfNeeded();
            var i = this._toMap;
            this._toPending += 1, this._toCount += 1;
            var a = setTimeout(function() {
                r._toPending -= 1, i[a] = null, r.resetToMapIfNeeded(), e();
            }, t);
            return i[a] = a;
        }),
        clearTimeout: function(e) {
            function t(t) {
                return e.apply(this, arguments);
            }
            return t.toString = function() {
                return e.toString();
            }, t;
        }(function(e) {
            var t = this._toMap;
            t && t[e] && (this._toPending -= 1, t[e] = null, this.resetToMapIfNeeded()), clearTimeout(e);
        }),
        cleanTimeouts: function() {
            var e = this._toMap;
            if (e) {
                for (var t = Object.keys(e), r = t.length - 1; -1 < r; --r) {
                    var i = e[t[r]];
                    null !== i && clearTimeout(i);
                }
                this._toMap = null;
            }
        },
        onUnload: function() {
            this.cleanTimeouts(), k && k.call(this), this.pageUnloaded = !0;
        },
        onLoad: function(e) {
            var t = this;
            this.pageUnloaded = !1, this.__pageLoadTime__ = Date.now();
            var r = U;
            U = null;
            var a = e.utm_source, n = e.scene;
            if (a && h.setUTMSource(a), n) {
                var s = decodeURIComponent(n).match(/utm\!\w*/)[0];
                s && s.split("!")[1] && h.setUTMSource(s.split("!")[1]);
            }
            var u = getApp().store.getState().extradata.from;
            "mt" === u ? h.setUTMSource(7777) : "ticket" === u ? h.setUTMSource(7800) : "dianping-wxapp" === u && h.setUTMSource(7858), 
            T && g(function() {
                T.call(t, i(e, r)), t.data.loading.show && o(), f();
            }, P);
        },
        onShow: function() {
            var e = this;
            this.pageHidden = !1;
            try {
                var t = Number(wx.getStorageSync("wx_scene"));
                if (t && (1001 === t || 1019 === t || 1089 === t)) {
                    for (var r = !1, i = getApp().getCurrentPage().route, a = [ "wx-gift-new", "wx-gift" ], n = 0; n < a.length; n++) new RegExp(a[n]).test(i) && (r = !0);
                    r || wx.switchTab({
                        url: "/pages/index/index"
                    });
                }
            } catch (e) {
                console.log(e);
            }
            D && g(function() {
                D.call(e);
            }, P);
        },
        onHide: function() {
            q && q.call(this), this.pageHidden = !0;
        },
        setNavigationBarTitle: function(e) {
            this.pageUnloaded || v(e);
        },
        showPhoneCall: function(e) {
            var t = e.phones, r = e.texts, i = void 0 === r ? t : r;
            this.actionSheet({
                itemList: i,
                ok: function(e) {
                    n({
                        phoneNumber: t[e]
                    });
                }
            });
        },
        traceTagStart: function(e) {
            return _.start(e);
        },
        traceTagGet: function(e) {
            return _.get(e);
        },
        traceTagEnd: function(e) {
            return _.end(e);
        },
        onShareAppDesc: function() {
            return (C ? C.call(this) : "") || y(x);
        },
        getReportData: function() {
            return (j ? j.call(this) : null) || {};
        },
        onClickNavigator: function(e) {
            var t = e.currentTarget.dataset, r = {};
            Object.keys(t).forEach(function(e) {
                if (3 < e.length && w(e, "arg")) {
                    var i = e.slice(3), a = i.toLowerCase();
                    a !== i && (r[a] = t[e]);
                }
            }), U = r;
        }
    }, L = {
        api: h,
        onShareAppMessage: function() {
            var e = this.pageName || "unknown";
            return {
                title: "美团外卖",
                desc: this.onShareAppDesc(),
                path: "/pages/index/index?from=from_share_" + e
            };
        }
    };
    a.store && (N || b) && console.error("Store already existed");
    var E = i(L, a, R), A = E.store ? E : u(N, b)(E);
    return M && M.length ? c(A, M) : A;
};