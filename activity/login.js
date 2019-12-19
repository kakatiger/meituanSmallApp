function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            return function i(n, s) {
                try {
                    var o = t[n](s), r = o.value;
                } catch (n) {
                    return void a(n);
                }
                if (!o.done) return Promise.resolve(r).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(r);
            }("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/babel-runtime/regenerator/index.js")), a = require("../actions/user.js"), i = require("../api/analytics.js").event, n = require("../utils/mix.js"), s = require("./common/finger.js"), o = require("../utils/object-assign.js"), r = require("../utils/wx.js").storage.getItem, u = require("../api/wx.js"), c = u.login, p = u.getUserInfo, d = require("../api/index.js"), g = d.accountLogin, l = d.mobileLogin, h = d.verifyCodeSend, w = d.verifyCodeCheck, D = d.getCaptchaUrl, b = require("../utils/wx.js").storage.setItem, v = require("../constants.js").KEY_USER_INFO, f = function(e) {
    var t = e.nickName, a = e.avatarUrl, i = e.gender, n = e.city, s = e.province, o = e.country;
    return b(v, {
        nickName: t,
        avatarUrl: a,
        gender: i,
        city: n,
        province: s,
        country: o
    });
}, _ = {
    userEncodeData: {
        wm_uuid: "",
        code: "",
        bind: !0,
        raw_data: "",
        signature: "",
        iv2: "",
        encrypted_data2: "",
        iv: "",
        encrypted_data: "",
        wechat_fingerprint: "",
        login_scene: 0
    },
    loginProcessing: !1,
    login: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var i, n, s, o, r, u, d, l, h, w, D, b, v;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, c();

                  case 2:
                    return i = e.sent, n = i.code, e.next = 6, p();

                  case 6:
                    return s = e.sent, o = s.rawData, r = s.signature, u = s.encryptData, d = s.encryptedData, 
                    l = s.iv, h = s.userInfo, a.userEncodeData.code = n, a.userEncodeData.raw_data = o, 
                    a.userEncodeData.signature = r, a.userEncodeData.encrypted_data2 = d, a.userEncodeData.iv2 = l, 
                    e.next = 20, f(h);

                  case 20:
                    return e.next = 22, g(a.encryptParam({
                        wxCode: n,
                        rawData: o,
                        signature: r
                    }, {
                        encryptData: u,
                        encryptedData: d,
                        iv: l
                    }));

                  case 22:
                    if (w = e.sent, D = w.openId, b = w.code, v = w.message, a.open_id = D, a.rawData = o, 
                    a.signature = r, a.encryptData = u, a.encryptedData = d, a.iv = l, w.userInfo = h, 
                    0 !== b) throw {
                        code: b,
                        message: v,
                        msg: v,
                        data: w
                    };
                    e.next = 33;
                    break;

                  case 33:
                    return e.abrupt("return", w);

                  case 34:
                  case "end":
                    return e.stop();
                }
            }, e, a);
        }))();
    },
    auth: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var n, o, r, u, d, g, l, h, w, D, b, v, f, _, C, m, N;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (a.loginProcessing) return e.abrupt("return");
                    e.next = 2;
                    break;

                  case 2:
                    if (r = o = n = void 0, (u = getApp()).eventBus.on("user:setauth", function() {
                        a.auth();
                    }), a.loginProcessing = !0, e.prev = 8, d = getApp().store.getState().user, n = d.user_id, 
                    o = d.open_id, !(r = d.token)) {
                        e.next = 17;
                        break;
                    }
                    u.eventBus.fire("user:login"), e.next = 25;
                    break;

                  case 17:
                    return e.next = 19, a.login();

                  case 19:
                    g = e.sent, n = g.userId, o = g.openId, r = g.token, a.storeUser({
                        user_id: n,
                        token: r,
                        open_id: o
                    }), u.eventBus.fire("user:login");

                  case 25:
                    a.loading(!1), a.loginProcessing = !1, e.next = 62;
                    break;

                  case 29:
                    if (e.prev = 29, e.t0 = e.catch(8), l = e.t0.code, h = e.t0.message, e.t0.data, 
                    w = h && -1 !== h.indexOf("getUserInfo") && -1 !== h.indexOf("auth"), a.loginProcessing = !1, 
                    !w) {
                        e.next = 40;
                        break;
                    }
                    a.setData({
                        poiDataNew: {
                            loginPopup: !0,
                            isshowAuth: !0,
                            showCouponDialog: !0
                        }
                    }), e.next = 62;
                    break;

                  case 40:
                    if (101155 === l) return D = a, e.next = 44, c();
                    e.next = 61;
                    break;

                  case 44:
                    return b = e.sent, v = b.code, e.next = 48, p();

                  case 48:
                    f = e.sent, _ = f.rawData, C = f.signature, m = f.encryptedData, N = f.iv, a.userEncodeData.code = v, 
                    a.userEncodeData.raw_data = _, a.userEncodeData.signature = C, a.userEncodeData.encrypted_data2 = m, 
                    a.userEncodeData.iv2 = N, s.g(function(e) {
                        D.userEncodeData.wechat_fingerprint = e, i({
                            event_type: "view",
                            val_lab: {
                                custom: {}
                            },
                            val_bid: "b_3ut8vr0p"
                        }), a.data.isGetPhoneToLogin || D.setData({
                            poiDataNew: Object.assign({}, D.data.poiDataNew, {
                                isshowLogin: !0,
                                loginPopup: !0,
                                isshowAuth: !1,
                                disableCapture: !0,
                                showCouponDialog: !0
                            })
                        }), D.data.poiDataNew.isshowGetCapture && (i({
                            event_type: "view",
                            val_lab: {
                                custom: {}
                            },
                            val_bid: "b_5yinz47u"
                        }), D.setData({
                            poiDataNew: Object.assign({}, D.data.poiDataNew, {
                                isshowLogin: !1,
                                loginPopup: !0,
                                isShowImgCapture: !1,
                                isshowGetCapture: !0,
                                inputCapture: !0,
                                isshowAuth: !1,
                                showCouponDialog: !0
                            })
                        })), D.data.poiDataNew.isShowImgCapture && D.setData({
                            poiDataNew: Object.assign({}, D.data.poiDataNew, {
                                isShowImgCapture: !0,
                                imgCapture: !0,
                                isshowGetCapture: !1,
                                isshowLogin: !1,
                                loginPopup: !0,
                                isshowAuth: !1,
                                showCouponDialog: !0
                            })
                        });
                    }), e.next = 62;
                    break;

                  case 61:
                    101172 === l ? (a.storeUser({
                        token: ""
                    }), a.confirm({
                        message: "啊哦, 出错了, 请再试一下",
                        textCancel: "稍后再说",
                        textOK: "重新授权",
                        ok: function() {
                            a.auth();
                        }
                    })) : -1 === l || void 0 === l ? a.confirm({
                        message: "啊哦, 出错了, 请再试一下",
                        textCancel: "稍后再说",
                        textOK: "重新授权",
                        ok: function() {
                            a.auth();
                        }
                    }) : a.alert({
                        message: h
                    });

                  case 62:
                    a.loading(!1);

                  case 63:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 8, 29 ] ]);
        }))();
    },
    getPhone: function() {
        this.setData({
            isGetPhoneToLogin: !0
        }), this.data.poiDataNew.isshowGetCapture && i({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_5yinz47u"
        }), this.data.poiDataNew.isshowLogin && i({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_o4pn5n1u"
        });
    },
    bindGetUserInfo: function() {
        this.auth();
    },
    getPhoneNumber: function(a) {
        var i = this, n = a.detail;
        return e(t.default.mark(function e() {
            var a, s, o, u, c, p, d, g, h, w, D, b, v, f, _, C, m, N, x, y;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (a = getApp(), -(e.prev = 1) === n.errMsg.indexOf("ok")) return e.abrupt("return");
                    e.next = 4;
                    break;

                  case 4:
                    return s = void 0, e.prev = 5, e.next = 8, r("UUID");

                  case 8:
                    s = e.sent, i.userEncodeData.wm_uuid = s.data, e.next = 16;
                    break;

                  case 12:
                    e.prev = 12, e.t0 = e.catch(5), o = e.t0.message, console.log(o);

                  case 16:
                    return i.userEncodeData.iv = n.iv, i.userEncodeData.encrypted_data = n.encryptedData, 
                    u = i.userEncodeData, c = u.wm_uuid, p = u.code, d = u.bind, g = u.raw_data, h = u.signature, 
                    w = u.iv2, D = u.encrypted_data2, b = u.iv, v = u.encrypted_data, f = u.wechat_fingerprint, 
                    _ = u.login_scene, e.next = 21, l({
                        wm_uuid: c,
                        code: p,
                        bind: d,
                        raw_data: g,
                        signature: h,
                        iv2: w,
                        encrypted_data2: D,
                        iv: b,
                        encrypted_data: v,
                        wechat_fingerprint: f,
                        login_scene: _
                    });

                  case 21:
                    C = e.sent, m = C.login_data, N = m.userid, x = m.openid, y = m.token, i.storeUser({
                        user_id: N,
                        token: y,
                        open_id: x
                    }), a.eventBus.fire("user:login"), i.loading(!1), e.next = 37;
                    break;

                  case 31:
                    e.prev = 31, e.t1 = e.catch(1), p = e.t1.code, o = e.t1.message, e.t1.data, i.toast({
                        message: o
                    });

                  case 37:
                  case "end":
                    return e.stop();
                }
            }, e, i, [ [ 1, 31 ], [ 5, 12 ] ]);
        }))();
    },
    clearPhone: function() {
        this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                LoginMobileText: "",
                disableCapture: !0
            })
        });
    },
    onLoginMobileInput: function(e) {
        var t = e.detail.value;
        this.setData({
            LoginMobileText: t,
            poiDataNew: Object.assign(this.data.poiDataNew, {
                LoginMobileText: t
            })
        }), this.onLoginMobileConfirm();
    },
    onLoginMobileConfirm: function() {
        /^\d{11}$/.test(this.data.LoginMobileText) ? this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                disableCapture: !1,
                isShowClearPhoneBtn: !0
            })
        }) : this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                disableCapture: !0,
                isShowClearPhoneBtn: !1
            })
        });
    },
    onLoginVerifyCodeInput: function(e) {
        var t = e.detail.value;
        this.setData({
            VerifyCodeText: t,
            poiDataNew: Object.assign(this.data.poiDataNew, {
                VerifyCodeText: t
            })
        }), "" !== t ? this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                disableCapture: !1
            })
        }) : this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                disableCapture: !0
            })
        });
    },
    onLoginCaptchInput: function(e) {
        var t = e.detail.value;
        this.setData({
            inputCaptcha: t,
            poiDataNew: Object.assign(this.data.poiDataNew, {
                inputCaptchaValue: t
            })
        }), "" !== t ? this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                disableCapture: !1
            })
        }) : this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                disableCapture: !0
            })
        });
    },
    onClickSendCodeBtn: function() {
        var a = this;
        return e(t.default.mark(function e() {
            var n, s, o, r, u, c, p, d, g;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (i({
                        event_type: "click",
                        val_lab: {
                            custom: {}
                        },
                        val_bid: "b_kewbgbsf"
                    }), !0 === a.data.poiDataNew.disableCapture) return e.abrupt("return");
                    e.next = 3;
                    break;

                  case 3:
                    return a.loading(!0), n = getApp(), e.prev = 5, s = a.open_id, o = a.rawData, r = a.signature, 
                    e.next = 9, w(a.encryptParam({
                        phone: a.data.LoginMobileText,
                        rawData: o,
                        signature: r,
                        openId: s,
                        code: a.data.VerifyCodeText
                    }));

                  case 9:
                    u = e.sent, c = u.code, p = u.message, d = u.userId, g = u.token, 0 === c ? (a.storeUser({
                        user_id: d,
                        token: g,
                        open_id: s
                    }), n.eventBus.fire("user:login")) : a.toast({
                        message: p
                    }), e.next = 20;
                    break;

                  case 17:
                    e.prev = 17, e.t0 = e.catch(5), a.toast({
                        message: e.t0.message
                    });

                  case 20:
                    a.loading(!1);

                  case 21:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 5, 17 ] ]);
        }))();
    },
    toOpenAuth: function() {
        i({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_2pia8bla"
        });
    },
    changePhone: function() {
        this.data.poiDataNew.isshowGetCapture ? this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                isshowLogin: !0,
                changePhone: !1,
                isShowImgCapture: !1,
                inputCapture: !1,
                disableCapture: !0,
                nowPhone: this.data.LoginMobileText
            })
        }) : this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                isshowLogin: !0,
                changePhone: !1,
                isshowGetCapture: !1,
                imgCapture: !1,
                disableCapture: !0,
                nowPhone: this.data.LoginMobileText
            })
        }), console.log(this.data.LoginMobileText), "" !== this.data.LoginMobileText ? this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                disableCapture: !1
            })
        }) : this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                disableCapture: !0
            })
        }), i({
            event_type: "click",
            val_lab: {
                custom: {}
            },
            val_bid: "b_swsmdn7l"
        });
    },
    cancelChange: function() {
        var e = this;
        e.data.poiDataNew.isShowImgCapture ? (this.setData({
            poiDataNew: Object.assign(e.data.poiDataNew, {
                changePhone: !1,
                isshowLogin: !1,
                imgCapture: !0
            })
        }), "" !== e.data.inputCaptcha ? e.setData({
            poiDataNew: Object.assign(e.data.poiDataNew, {
                disableCapture: !1
            })
        }) : e.setData({
            poiDataNew: Object.assign(e.data.poiDataNew, {
                disableCapture: !0
            })
        })) : (this.setData({
            poiDataNew: Object.assign(e.data.poiDataNew, {
                changePhone: !1,
                isshowLogin: !1,
                inputCapture: !0
            })
        }), "" !== e.data.VerifyCodeText ? e.setData({
            poiDataNew: Object.assign(e.data.poiDataNew, {
                disableCapture: !1
            })
        }) : e.setData({
            poiDataNew: Object.assign(e.data.poiDataNew, {
                disableCapture: !0
            })
        }));
    },
    onClickGetCodeBtn: function(a) {
        var n = this, s = a.target.dataset.type;
        return e(t.default.mark(function e() {
            var a, o, r, u;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (console.log(s), i({
                        event_type: "click",
                        val_lab: {
                            custom: {}
                        },
                        val_bid: "b_ru4h551o"
                    }), !0 === n.data.poiDataNew.disableCapture && "reGet" !== s) return e.abrupt("return");
                    e.next = 4;
                    break;

                  case 4:
                    return n.loading(!0), n.setData({
                        countdown: !0,
                        VerifyCodeText: "",
                        inputCaptchaValue: "",
                        poiDataNew: Object.assign(n.data.poiDataNew, {
                            VerifyCodeText: "",
                            inputCaptchaValue: ""
                        })
                    }), e.prev = 6, e.next = 9, n.sendCode();

                  case 9:
                    a = e.sent, o = a.code, r = a.message, u = !1, 0 === o ? (n.toast({
                        message: "已发送验证码"
                    }), u = !0) : 101089 === o ? n.toast({
                        message: r
                    }) : 101091 === o || 101092 === o ? n.showCaptchaModal() : n.toast({
                        message: r
                    }), u ? (n.startCountdown(), n.setData({
                        poiDataNew: Object.assign(n.data.poiDataNew, {
                            isshowGetCapture: !0,
                            inputCapture: !0,
                            login_mobile_countdown: !0,
                            isshowLogin: !1,
                            disableCapture: !0,
                            login_reget: !1,
                            isShowImgCapture: !1,
                            VerifyCodeText: "",
                            changePhone: !1
                        })
                    }), i({
                        event_type: "view",
                        val_lab: {
                            custom: {}
                        },
                        val_bid: "b_5yinz47u"
                    })) : n.setData({
                        poiDataNew: Object.assign(n.data.poiDataNew, {
                            login_mobile_countdown: !1
                        })
                    }), e.next = 22;
                    break;

                  case 17:
                    e.prev = 17, e.t0 = e.catch(6), r = e.t0.message, n.setData({
                        countdown: !1
                    }), n.toast({
                        message: r
                    });

                  case 22:
                    n.loading(!1);

                  case 23:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 6, 17 ] ]);
        }))();
    },
    sendCode: function() {
        var e = this.open_id, t = this.rawData, a = this.signature, i = this.data, n = i.LoginMobileText, s = i.inputCaptcha;
        return h(this.encryptParam({
            phone: n,
            openId: e,
            rawData: t,
            signature: a,
            captcha: s
        }));
    },
    startCountdown: function() {
        var e = this, t = this, a = this.data.LoginMobileText.substr(0, 3) + "****" + this.data.LoginMobileText.substr(7, 11);
        console.log(a), this.setData({
            poiDataNew: Object.assign(t.data.poiDataNew, {
                login_mobile_seconds: 60
            })
        }), this.setData({
            poiDataNew: Object.assign(t.data.poiDataNew, {
                loginMobileTips: "验证码已发送至：" + a
            })
        }), setTimeout(function a() {
            var i = e.data.poiDataNew.login_mobile_seconds;
            i <= 0 ? e.setData({
                poiDataNew: Object.assign(t.data.poiDataNew, {
                    login_mobile_countdown: !1,
                    login_reget: !0
                })
            }) : (e.setData({
                poiDataNew: Object.assign(t.data.poiDataNew, {
                    login_mobile_seconds: i - 1
                })
            }), setTimeout(a, 1e3));
        }, 1e3);
    },
    showCaptchaModal: function() {
        this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                disableCapture: !0,
                isShowImgCapture: !0,
                isshowGetCapture: !1,
                imgCapture: !0,
                isshowLogin: !1,
                captchUrl: D(),
                changePhone: !1
            })
        });
    },
    changeCaptch: function() {
        this.setData({
            poiDataNew: Object.assign(this.data.poiDataNew, {
                captchUrl: D(),
                inputCaptchaValue: ""
            })
        });
    },
    onClickPopupClose: function() {
        this.setData({
            loginPopup: !1,
            pageState: "bind"
        }), this.loading(!1);
    },
    encryptParam: function(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this, a = t.encryptData, i = t.encryptedData, n = t.iv;
        return i && n ? (e.encryptedData = i, e.iv = n) : e.encryptData = a, e;
    },
    storeUser: function(e) {
        getApp().store.dispatch((0, a.store)(e));
    }
};

module.exports = function(e) {
    return n(o(e, _));
};