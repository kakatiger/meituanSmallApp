function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new c(function(e, a) {
            return function n(s, r) {
                try {
                    var i = t[s](r), o = i.value;
                } catch (s) {
                    return void a(s);
                }
                if (!i.done) return c.resolve(o).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(o);
            }("next");
        });
    };
}

var a = e(require("../../npm/babel-runtime/regenerator/index.js")), n = require("../../npm/@dp/owl-wxapp/es6/index.js"), s = require("../../actions/recipient.js"), r = require("../../actions/dev.js"), i = e(require("../../store.js")), o = require("../../utils/wx.js").storage.setItem, c = require("../../npm/promise-polyfill/promise.js"), u = require("../../utils/throttle.js"), l = require("../../utils/starts-with.js"), d = require("../../utils/mix.js"), h = require("../../api/analytics.js"), g = require("../../components/loc-search/loc-search.js"), p = require("../../utils/get-nearest-address.js"), f = require("../../components/open-setting/open-setting.js"), v = require("../../api/index.js"), S = v.addrGet, x = v.addrSearch, m = v.addrSuggest, w = v.posname, y = v.cityName, k = v.nearAddr, D = require("../../api/wx.js").getLocation, q = require("../../weapp-redux/index.js").connect, L = require("../base.js")({
    pageName: "loc-select",
    data: {
        addresses: [],
        hasLogin: !1,
        near: [],
        searchTextInput: "",
        searchText: "",
        searchResults: [],
        showMore: !1,
        isSuggest: !0,
        autoState: 0,
        hasMoreBtn: !1,
        inputFocus: !1,
        locCity: "",
        locState: "done",
        isDeny: !1
    },
    addressesShowLimit: 3,
    t: 0,
    addrFilter: function(e) {
        var t = e.name, a = e.address, n = e.wm_latitude, s = e.wm_longitude, r = e.location, i = e.distance, o = this.data.searchText, c = "", u = t, l = t.indexOf(o);
        return 0 <= l ? (c = t.slice(0, l), u = t.slice(l + o.length)) : o = "", 0 < (i = parseInt(i, 10)) && (1e3 <= i ? (i = (i / 1e3).toFixed(1), 
        i += "千米") : i += "米"), {
            prename: c,
            poiName: o,
            leftName: u,
            name: t,
            address: a,
            wm_latitude: n,
            wm_longitude: s,
            location: r,
            distance: i
        };
    },
    query: function(e) {
        var t = this, a = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
        if (e) {
            if ("选择城市" === this.data.locSearch.city) return this.setData({
                inputFocus: !1
            }), void this.confirm({
                message: "请先选择城市",
                textCancel: "取消",
                textOK: "确定",
                cancel: function() {},
                ok: function() {
                    t.onClickCitySelect();
                }
            });
            this.setData({
                searchText: e,
                searching: !0,
                isSuggest: a
            });
            var n = this.t, s = n + 1;
            s === n && (n = 0, s = 1), this.t = s, (a ? m : x)({
                keyword: e,
                cityname: this.data.locSearch.city || ""
            }).then(function(e) {
                if (t.t === s) {
                    var a = e.mapPoiVo;
                    t.setData({
                        searching: !1,
                        searchResults: a.map(t.addrFilter)
                    });
                }
            }).catch(function() {
                t.t === s && t.setData({
                    searching: !1,
                    searchResults: []
                });
            });
        } else this.setData({
            searchText: e,
            searchResults: [],
            searching: !1,
            isSuggest: a
        });
    },
    checkEnv: function(e) {
        if (l(e, "30191")) {
            var t = void 0, a = e.slice("30191".length).replace(/\s/g, "").toLowerCase();
            switch (a) {
              case "qalx":
              case "lx":
                a = "qalx" === a ? "qa" : "", t = h.turnOnValidate(), this.storeENV({
                    env: a
                }), wx.setClipboardData({
                    data: t
                }), this.toast({
                    message: "环境：" + (a || "线上") + "灵犀验证已开启，验证码：" + t
                });
                break;

              default:
                this.storeENV({
                    env: a
                }), this.toast({
                    message: "切换到环境[" + (a || "线上") + "]"
                });
            }
            return !0;
        }
        return !1;
    },
    onSearchSubmit: function() {
        var e = this.searchText;
        this.checkEnv(e) || (this.searchText ? this.query(e, !1) : this.alert({
            message: "请输入收货地址",
            ok: function() {}
        }));
    },
    onSearchInput: u(function(e) {
        var t = e.detail.value;
        if (this.searchText = t, this.setSearchData({
            activeTab: "",
            cityShow: !1
        }), this.checkEnv(t)) this.cleanLocationMock(); else {
            if (l(t, "location")) {
                var a = i.default.getState().dev.env;
                if ("qa" !== a && "st" !== a) return;
                var n = t.slice("location".length + 1).replace(/\s/g, "").toLowerCase().split("&"), s = n[0].split(":")[1], r = n[1].split(":")[1];
                return o("latitude", s), o("longitude", r), void this.toast({
                    message: "mock经纬度成功"
                });
            }
            this.query(t, !0);
        }
    }, 300),
    cleanLocationMock: function() {
        var e = i.default.getState().dev.env;
        if ("qa" !== e && "st" !== e) try {
            (wx.getStorageSync("latitude") || wx.getStorageSync("longitude")) && (wx.getStorageSync("latitude") && wx.removeStorageSync("latitude"), 
            wx.getStorageSync("longitude") && wx.removeStorageSync("longitude"));
        } catch (e) {
            console.log(e);
        }
    },
    onSearchClear: function() {
        this.setData({
            searchTextInput: " "
        }), this.setData({
            searchTextInput: "",
            searchText: "",
            searchResults: [],
            searching: !1
        });
    },
    onTapAddr: function(e) {
        var t = e.currentTarget.dataset, a = t.id, n = t.address, s = t.latitude, r = t.longitude, i = parseInt(s, 10), o = parseInt(r, 10), c = null;
        if (a) for (var u = this.data.addresses, l = u.length - 1; -1 < l; --l) {
            var d = u[l];
            if (String(d.id) === String(a)) {
                c = d;
                break;
            }
        }
        c ? this.setRecipient(c) : this.partialRecipient({
            address: n,
            latitude: i,
            longitude: o
        });
        var h = getApp().eventBus;
        wx.navigateBack(), h.fire("location:changed");
    },
    onClickMore: function() {
        var e = !this.data.showMore;
        this.setData({
            showMore: e
        });
    },
    onClickLocAuto: function() {
        var e = this;
        this.setData({
            autoState: 1,
            locState: "loading"
        });
        var t = this, a = setTimeout(function() {
            "loading" === t.data.locState && t.setData({
                autoState: 0,
                locState: "fail"
            });
        }, 5e3);
        D().then(function(t) {
            var n = t.latitude, s = t.longitude;
            w({
                wm_latitude: n,
                wm_longitude: s
            }).then(function(t) {
                var r = t.result;
                e.partialRecipient({
                    address: r,
                    latitude: n,
                    longitude: s
                }), e.setData({
                    autoState: 0,
                    locState: "done"
                });
                var i = getApp().eventBus;
                clearTimeout(a), i.fire("location:changed"), wx.navigateBack();
            });
        }).catch(function(t) {
            clearTimeout(a);
            var n = t && t.errMsg && -1 !== t.errMsg.toLowerCase().indexOf("auth");
            e.setData({
                autoState: 0,
                locState: "fail",
                isDeny: n
            }), n && e.locTest();
        });
    },
    locTest: function() {
        var e = wx.openSetting;
        this.setData({
            locState: "failLoc",
            isDeny: !0
        }), e ? this.openSettingShow() : this.alert({
            message: "检测到您没打开美团外卖的定位权限，请到设置启用：点击右上角按钮，进入小程序介绍页，再次点击右上角按钮，进入设置页面，打开定位权限",
            ok: function() {}
        });
    },
    getLocCity: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var n, s, r;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = "", e.loading(!0), t.prev = 2, t.next = 5, y();

                  case 5:
                    s = t.sent, (n = s.result) && (e.setData({
                        locCity: n
                    }), (r = getApp()).eventBus.fire("city:changed", n)), t.next = 13;
                    break;

                  case 10:
                    t.prev = 10, t.t0 = t.catch(2), console.error(t.t0);

                  case 13:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 2, 10 ] ]);
        }))();
    },
    onShow: function() {
        var e = this;
        return t(a.default.mark(function t() {
            var n, s, r, i, o, c, u, l, d, h, g, f, v, x, m, y, q, L, T, j, C, M;
            return a.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (n = e.store.getState(), s = n.wx, r = s.latitude, i = s.longitude, o = getApp(), 
                    c = o.eventBus, u = [], e.getLocCity(), c.on("location:changed", function() {
                        e.getLocCity();
                    }), c.on("city:changed", function() {
                        e.setSearchData({
                            city: e.data.locCity
                        });
                    }), l = e.data, d = l.hasLogin, h = l.locName, !(g = Boolean(h)) && d) return f = null, 
                    t.prev = 10, t.next = 13, S({
                        type: 1
                    });
                    t.next = 26;
                    break;

                  case 13:
                    u = t.sent, v = u.length > e.addressesShowLimit, x = e.data.showMore, e.setData({
                        addresses: u,
                        hasMoreBtn: v,
                        showMore: !!v && x,
                        hasLogin: !0,
                        inputFocus: 0 === u.length
                    }), f = p(r, i, u), t.next = 23;
                    break;

                  case 20:
                    t.prev = 20, t.t0 = t.catch(10), console.error(t.t0);

                  case 23:
                    f && (e.setRecipient(f), g = !0), t.next = 42;
                    break;

                  case 26:
                    if (d) return t.prev = 27, t.next = 30, S({
                        type: 1
                    });
                    t.next = 42;
                    break;

                  case 30:
                    u = t.sent, m = u.length > e.addressesShowLimit, y = e.data.showMore, e.setData({
                        addresses: u,
                        hasMoreBtn: m,
                        showMore: !!m && y,
                        hasLogin: !0,
                        inputFocus: 0 === u.length
                    }), t.next = 42;
                    break;

                  case 36:
                    t.prev = 36, t.t1 = t.catch(27), q = t.t1.code, L = {
                        inputFocus: 0 === e.data.addresses.length
                    }, 401 === q && (L.hasLogin = !1), e.setData(L);

                  case 42:
                    return t.prev = 42, T = [], t.next = 46, k();

                  case 46:
                    j = t.sent, T = j.mapPoiVo, e.setData({
                        near: T
                    }), t.next = 54;
                    break;

                  case 51:
                    t.prev = 51, t.t2 = t.catch(42), console.error(t.t2);

                  case 54:
                    if (g) {
                        t.next = 67;
                        break;
                    }
                    return C = "", t.prev = 56, t.next = 59, w();

                  case 59:
                    M = t.sent, C = M.result, t.next = 66;
                    break;

                  case 63:
                    t.prev = 63, t.t3 = t.catch(56), console.error(t.t3);

                  case 66:
                    C && (e.partialRecipient({
                        address: C,
                        latitude: r,
                        longitude: i
                    }), g = !0);

                  case 67:
                    g ? e.setData({
                        autoState: 0,
                        locState: "done"
                    }) : (e.setData({
                        autoState: 1,
                        locState: "loading"
                    }), D().then(e.setData({
                        autoState: 0,
                        locState: "done"
                    })).catch(function(t) {
                        var a = t && t.errMsg && -1 !== t.errMsg.toLowerCase().indexOf("auth");
                        e.setData({
                            autoState: -1,
                            locState: "fail",
                            isDeny: a
                        }), a && e.locTest();
                    })), e.loading(!1);

                  case 69:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 10, 20 ], [ 27, 36 ], [ 42, 51 ], [ 56, 63 ] ]);
        }))();
    },
    onOpenSettingSucc: function(e) {
        var t = e.detail.authSetting["scope.userLocation"];
        this.setData({
            autoState: 1,
            locState: "loading"
        }), t && (this.openSettingHide(), this.onClickLocAuto());
    }
});

(0, n.page)(d(L, q(function(e) {
    var t = e.recipient.address, a = e.user.token;
    return {
        locName: t,
        hasLogin: Boolean(a)
    };
}, function(e) {
    return {
        partialRecipient: function(t) {
            return e((0, s.partial)(t));
        },
        setRecipient: function(t) {
            return e((0, s.set)(t));
        },
        storeENV: function(t) {
            return e((0, r.storeENV)(t));
        }
    };
}), f, g));