function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, n) {
            return function a(i, r) {
                try {
                    var s = e[i](r), o = s.value;
                } catch (i) {
                    return void n(i);
                }
                if (!s.done) return Promise.resolve(o).then(function(t) {
                    a("next", t);
                }, function(t) {
                    a("throw", t);
                });
                t(o);
            }("next");
        });
    };
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), n = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
}, a = require("../../api/index.js"), i = a.privacyInfo, r = a.privacyBinding, s = {
    RUNNER: 0,
    SHOPPER: 1
};

module.exports = function(a) {
    return n({}, a, {
        data: n({}, a.data, {
            privacy: {
                usingPrivacy: !1,
                scene: "",
                modalStatus: 0,
                dailingPhone: "",
                targetPhone: "",
                exception: {
                    mainMsg: "服务不稳定，号码保护暂时不可用",
                    subMsg: "您可以使用真实号码继续拨号"
                },
                isInputError: !1,
                inputPhoneStr: "",
                inputFocus: !1,
                isExpired: 0
            }
        }),
        checkTelephone: function(t) {
            return (t = t.replace(/\s/g, "")) && /^1[3-9][0-9]{9}$/.test(t);
        },
        fmtMsg: function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "-";
            return (t.replace(/\s/g, "") || "").replace(/(\d{3})(\d{4})(\d{4})/g, function(t, n, a, i) {
                return [ n, a, i ].join(e);
            });
        },
        updatePrivacyStatus: function(t) {
            var e = this.data.privacy;
            this.setData({
                privacy: n({}, e, t)
            });
        },
        switchMap: function(t) {
            var e = this.data.showMap, n = this.mapSwtich, a = this.pageScrollY, i = this.mapHeight, r = "HIDE" === t ? 0 : n, s = "SHOW" !== t;
            if (void 0 !== e) {
                if ("SHOW" === t) return void this.setData({
                    showMap: r,
                    disableReload: s
                });
                -1 !== i ? a <= i && this.setData({
                    showMap: r,
                    disableReload: s
                }) : this.setData({
                    showMap: r,
                    disableReload: s
                });
            }
        },
        contact: function(t) {
            var e = this.updatePrivacyStatus, n = this.switchMap;
            e({
                modalStatus: 0,
                inputFocus: !1
            }), n("SHOW"), wx.makePhoneCall({
                phoneNumber: t,
                success: function() {},
                fail: function() {},
                complete: function() {}
            });
        },
        handleResp: function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], n = t.code, a = t || {}, i = a.phone, r = a.action, s = a.main_desc, o = a.sub_desc, u = a.log_field.is_expired, c = this.fmtMsg, p = this.updatePrivacyStatus, h = this.contact;
            void 0 === n ? 3 !== r ? (1 === r && (e ? h(i) : p({
                dailingPhone: c(i),
                modalStatus: 1
            })), 2 === r && p({
                modalStatus: 3,
                targetPhone: i,
                exception: {
                    mainMsg: s,
                    subMsg: o
                },
                isExpired: u
            }), p({
                inputPhoneStr: ""
            })) : this.toast({
                message: "操作过于频繁，请稍后再试"
            }) : p({
                modalStatus: 3,
                targetPhone: i,
                isExpired: u
            });
        },
        fetchPrivacy: function() {
            var a = this, r = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "SHOPPER";
            return t(e.default.mark(function t() {
                var o, u, c, p, h, d, l, v, f;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return o = a.updatePrivacyStatus, u = a.genPrivacyReqParam, c = a.handleResp, p = a.switchMap, 
                        h = a.data.privacy.dailingPhone, d = u(r), l = h || d.user_phone, v = n({}, d, {
                            user_phone: l.replace(/-/g, ""),
                            scene_code: s[r]
                        }), p("HIDE"), o({
                            scene: r
                        }), t.prev = 7, t.t0 = c, t.next = 11, i(v);

                      case 11:
                        t.t1 = t.sent, (0, t.t0)(t.t1), t.next = 19;
                        break;

                      case 15:
                        t.prev = 15, t.t2 = t.catch(7), f = JSON.parse(d.third_party_phone)[0], c({
                            code: 2,
                            phone: f,
                            log_field: {
                                is_expired: 0
                            }
                        });

                      case 19:
                      case "end":
                        return t.stop();
                    }
                }, t, a, [ [ 7, 15 ] ]);
            }))();
        },
        bindingPrivacy: function(a) {
            var i = this, o = a.currentTarget.dataset.entrance;
            return t(e.default.mark(function t() {
                var a, u, c, p, h, d, l, v, f, g, P, S, y;
                return e.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (a = i.fmtMsg, u = i.updatePrivacyStatus, c = i.checkTelephone, p = i.handleResp, 
                        h = i.genPrivacyReqParam, d = i.data.privacy, l = d.inputPhoneStr, v = d.dailingPhone, 
                        f = d.scene, g = v.replace(/-/g, ""), 1 != +o) {
                            t.next = 9;
                            break;
                        }
                        if (c(l)) {
                            t.next = 7;
                            break;
                        }
                        return u({
                            isInputError: !0
                        }), t.abrupt("return");

                      case 7:
                        u({
                            dailingPhone: a(l),
                            inputFocus: !1
                        }), g = l.replace(/\s/g, "");

                      case 9:
                        return P = h(f), S = n({}, P, {
                            scene_code: s[f],
                            user_phone: g
                        }), t.prev = 11, t.t0 = p, t.next = 15, r(S);

                      case 15:
                        t.t1 = t.sent, (0, t.t0)(t.t1, !0), t.next = 23;
                        break;

                      case 19:
                        t.prev = 19, t.t2 = t.catch(11), y = JSON.parse(P.third_party_phone)[0], p({
                            code: 2,
                            phone: y,
                            log_field: {
                                is_expired: 0
                            }
                        });

                      case 23:
                      case "end":
                        return t.stop();
                    }
                }, t, i, [ [ 11, 19 ] ]);
            }))();
        },
        onTapChangeDailingPhone: function() {
            (0, this.updatePrivacyStatus)({
                modalStatus: 2,
                inputFocus: !0
            });
        },
        onTapCancelChangeDailingPhone: function() {
            var t = this.updatePrivacyStatus;
            setTimeout(function() {
                t({
                    modalStatus: 1,
                    inputPhoneStr: "",
                    isInputError: !1,
                    inputFocus: !1
                });
            }, 200);
        },
        onTapCallWithoutPrivacy: function() {
            var t = this.data.privacy.targetPhone;
            this.contact(t);
        },
        onTapCancelCall: function() {
            var t = this.updatePrivacyStatus, e = this.switchMap;
            t({
                modalStatus: 0
            }), e("SHOW");
        },
        onInputChange: function(t) {
            var e = this.updatePrivacyStatus, n = this.checkTelephone, a = this.data.privacy.isInputError, i = t.detail.value;
            3 < (i = i.replace(/\s/g, "").substring(0, 11)).length && (i = i.substring(0, 3) + " " + i.substring(3, i.length)), 
            8 < i.length && (i = i.substring(0, 8) + " " + i.substring(8, i.length)), e({
                inputPhoneStr: i,
                isInputError: 13 === i.length ? !n(i) : !!i && a
            });
        },
        onTapClearInputText: function() {
            (0, this.updatePrivacyStatus)({
                inputPhoneStr: "",
                isInputError: !1
            });
        },
        prohibitScroll: function() {}
    });
};