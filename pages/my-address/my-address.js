function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new a(function(e, r) {
            return function n(i, s) {
                try {
                    var d = t[i](s), o = d.value;
                } catch (i) {
                    return void r(i);
                }
                if (!d.done) return a.resolve(o).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(o);
            }("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), r = require("../../npm/@dp/owl-wxapp/es6/index.js"), n = require("../../actions/addr-edit.js"), i = require("../../actions/purchase.js"), a = require("../../npm/promise-polyfill/promise.js"), s = require("../../api/index.js"), d = s.addrGet, o = s.addrEdit, c = require("../../utils/wx.js"), u = c.navigateTo, l = c.navigateBack, f = require("../../weapp-redux/index.js").connect, g = require("../base.js"), p = require("../../utils/object-assign.js"), h = require("../../utils/mix.js"), v = require("../../components/draw-delete/draw-delete.js"), m = g({
    pageName: "my-address",
    data: {
        isClickManageBtn: !1,
        changeManageIcon: !0,
        addresses: [],
        message: "",
        scroll: !0,
        hasUndoneAddr: !1
    },
    onClickDel: function(r) {
        for (var n, i = this, a = r.currentTarget.dataset.id, s = this.data.addresses, d = null, c = s.length - 1; -1 < c; --c) {
            var u = s[c];
            if (String(u.id) === String(a)) {
                d = u;
                break;
            }
        }
        d && this.confirm({
            title: "是否删除该地址？",
            message: "删除之后将无法恢复",
            ok: (n = e(t.default.mark(function e() {
                var r;
                return t.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.prev = 0, e.next = 3, o(p(d, {
                            type: 2
                        }));

                      case 3:
                        return e.next = 5, i.refresh();

                      case 5:
                        i.alert({
                            message: "操作成功"
                        }), e.next = 12;
                        break;

                      case 8:
                        e.prev = 8, e.t0 = e.catch(0), r = e.t0.message, i.alert({
                            messag: "操作失败" + r
                        });

                      case 12:
                      case "end":
                        return e.stop();
                    }
                }, e, i, [ [ 0, 8 ] ]);
            })), function() {
                return n.apply(this, arguments);
            }),
            cancel: function() {
                console.log("取消");
            }
        });
    },
    onClickAddress: function(e) {
        var t = this, r = e.currentTarget.dataset, n = r.id, i = r.can, a = this.data, s = a.addresses;
        if (a.poi_id) if ("0" !== String(i)) {
            for (var d = null, o = s.length - 1; -1 < o; --o) {
                var c = s[o];
                if (String(c.id) === n) {
                    d = c;
                    break;
                }
            }
            d && (this.setRecipient(d), l());
        } else this.confirm({
            title: "该地址不在商家配送范围",
            message: "亲，再确认下您的收货地址吧",
            textOK: "确认位置",
            ok: function() {
                t.edit(n);
            }
        });
    },
    edit: function(e) {
        for (var t = this.data, r = t.addresses, n = t.poi_id, i = null, a = r.length - 1; -1 < a; --a) {
            var s = r[a];
            if (String(s.id) === String(e)) {
                i = s;
                break;
            }
        }
        i && (this.dispatchAddrEdit(i), u({
            url: "../addr-add/addr-add?action=edit&addr_id=" + e + "&poi_id=" + n
        }));
    },
    onClickModify: function(e) {
        var t = e.currentTarget.dataset.id;
        this.edit(t);
    },
    onClickRefreshPage: function() {
        this.refresh();
    },
    manageAddress: function() {
        this.setData({
            isClickManageBtn: !this.data.isClickManageBtn,
            changeManageIcon: !this.data.changeManageIcon
        });
    },
    refresh: function() {
        var r = this;
        return e(t.default.mark(function e() {
            var n, i, a, s, o, c;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return r.loading(!0), n = r.data.poi_id, i = {
                        type: 1
                    }, n && (i = {
                        type: 2,
                        wm_poi_id: n
                    }), e.prev = 4, e.next = 7, d(i);

                  case 7:
                    a = e.sent, s = !!a.filter(function(e) {
                        return e.bind_type < 11;
                    }).length, r.setData({
                        addresses: a,
                        hasUndoneAddr: s
                    }), r.error(), e.next = 18;
                    break;

                  case 13:
                    e.prev = 13, e.t0 = e.catch(4), o = e.t0.code, c = e.t0.message, 401 === o ? r.error({
                        message: "您尚未登录哦~",
                        img: "no-net",
                        textOK: "登录",
                        ok: function() {
                            u({
                                url: "../loginV2/login?login_page=3"
                            });
                        }
                    }) : r.error({
                        message: "服务器发生异常" + c,
                        img: "no-net",
                        textOK: "重试",
                        ok: function() {
                            r.refresh();
                        }
                    });

                  case 18:
                    r.loading(!1);

                  case 19:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 4, 13 ] ]);
        }))();
    },
    onShow: function() {
        this.refresh(), this.deleteInit("addresses");
    },
    onLoad: function(e) {
        var t = e.poi_id, r = void 0 === t ? "" : t;
        this.setData({
            poi_id: r
        });
    }
});

(0, r.page)(h(m, f(void 0, function(e) {
    return {
        dispatchAddrEdit: function(t) {
            return e((0, n.set)(t));
        },
        setRecipient: function(t) {
            return e((0, i.setRecipient)(t));
        }
    };
}), v));