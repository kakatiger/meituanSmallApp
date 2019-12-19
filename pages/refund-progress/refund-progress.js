function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new s(function(e, r) {
            return function n(a, i) {
                try {
                    var o = t[a](i), u = o.value;
                } catch (a) {
                    return void r(a);
                }
                if (!o.done) return s.resolve(u).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(u);
            }("next");
        });
    };
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), r = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
}, n = require("../../npm/@dp/owl-wxapp/es6/index.js"), s = require("../../npm/promise-polyfill/promise.js"), a = require("../../api/index.js"), i = a.refundStatus, o = a.cancelRefundComplaints, u = require("../../components/privacy_protection/privacy_protection.js"), d = require("../../utils/mix.js"), c = require("../base.js"), l = {
    pageName: "refund-progress",
    data: {
        view_id: 0,
        result: {},
        refund_record_list: [],
        privacy_req_param: {
            order_view_id: "",
            third_party_phone: "",
            user_phone: ""
        }
    },
    loadRecordList: function() {
        var n = this;
        return e(t.default.mark(function e() {
            var s, a, o, u, d, c, l, _, p, f, h, v, g, w, m, y, x;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n.loading(!0), e.prev = 1, e.next = 4, i({
                        order_view_id: n.view_id
                    });

                  case 4:
                    for (s = e.sent, a = 0; a < s.refund_record_list.length; a++) {
                        for (o = s.refund_record_list[a], u = o.refund_deadline_time, d = 0, d = u < 60 ? u + "分钟" : (u - (c = u % 60)) / 60 + "小时" + c + "分钟", 
                        l = 0; l < o.refund_status_list.length; l++) o.refund_status_list[l].sub_desc = o.refund_status_list[l].sub_desc.replace(/\{deadline\}/g, d);
                        for (_ = 0; _ < o.refund_status_list.length; _++) {
                            if (p = o.refund_status_list[_].keyword, f = [], "" !== p) if (1 < o.refund_status_list[_].sub_desc.split(p).length) {
                                for (f = o.refund_status_list[_].sub_desc.split(p), h = 0; h < f.length; h++) f[h] = {
                                    word: f[h]
                                };
                                f.splice(1, 0, {
                                    keyword: p,
                                    refund_no: o.refund_status_list[_].refund_no
                                });
                            } else f.push({
                                word: o.refund_status_list[_].sub_desc
                            });
                            console.log(f), o.refund_status_list[_].words = f;
                        }
                        s.refund_record_list[a] = o;
                    }
                    v = s.refund_record_list, g = s.user_phone, w = s.phone_list, m = v && v instanceof Array && 0 < v.length ? (v[0] || {}).order_view_id : "", 
                    y = [], (w || []).forEach(function(e) {
                        2 === e.type && y.push(e.phone);
                    }), y = JSON.stringify(y), n.setData({
                        result: s,
                        refund_record_list: s.refund_record_list,
                        privacy: r({}, n.data.privacy, {
                            usingPrivacy: s.use_privacy
                        }),
                        privacy_req_param: {
                            order_view_id: m,
                            third_party_phone: y,
                            user_phone: g
                        }
                    }), e.next = 19;
                    break;

                  case 14:
                    e.prev = 14, e.t0 = e.catch(1), e.t0.code, x = e.t0.message, n.alert({
                        message: x
                    });

                  case 19:
                    n.loading(!1);

                  case 20:
                  case "end":
                    return e.stop();
                }
            }, e, n, [ [ 1, 14 ] ]);
        }))();
    },
    onClick_cancelrefund: function() {
        var r, n = this;
        this.confirm({
            message: "取消退款后，当前退款流程将结束，确定取消退款吗？",
            ok: (r = e(t.default.mark(function e() {
                var r;
                return t.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return n.loading(!0), e.prev = 1, e.next = 4, o({
                            hash_id: n.view_id
                        });

                      case 4:
                        n.loading(!1), n.loadRecordList(), n.alert({
                            message: "取消退款成功"
                        }), e.next = 14;
                        break;

                      case 9:
                        e.prev = 9, e.t0 = e.catch(1), r = e.t0.message, n.loading(!1), n.alert({
                            message: r
                        });

                      case 14:
                      case "end":
                        return e.stop();
                    }
                }, e, n, [ [ 1, 9 ] ]);
            })), function() {
                return r.apply(this, arguments);
            })
        });
    },
    goToRefund: function(e) {
        var t = e.currentTarget.dataset.refund_no;
        wx.navigateTo({
            url: "../refund-detail/refund-detail?hash_id=" + this.view_id + "&refund_no=" + t
        });
    },
    genPrivacyReqParam: function() {
        var e = this.data.privacy_req_param;
        return {
            order_view_id: e.order_view_id,
            third_party_phone: e.third_party_phone,
            user_phone: e.user_phone
        };
    },
    onClickButtons: function(e) {
        var t = e.currentTarget.dataset.code;
        if (2008 === t) {
            for (var r = [], n = 0; n < this.data.result.phone_list.length; n++) 3 === this.data.result.phone_list[n].type && r.push(this.data.result.phone_list[n].phone);
            var s = r.map(function(e) {
                return "客服电话：" + e;
            });
            this.showPhoneCall({
                phones: r,
                texts: s
            });
        } else if (2006 === t) {
            for (var a = [], i = 0; i < this.data.result.phone_list.length; i++) 2 === this.data.result.phone_list[i].type && a.push(this.data.result.phone_list[i].phone);
            var o = a.map(function(e) {
                return "商家电话：" + e;
            });
            this.data.privacy.usingPrivacy ? this.fetchPrivacy("SHOPPER") : this.showPhoneCall({
                phones: a,
                texts: o
            });
        } else 2007 === t ? this.onClick_cancelrefund() : 2017 === t && wx.navigateTo({
            url: "/pages/poi-complain/poi-complain?view_id=" + this.view_id
        });
    },
    onPullDownRefresh: function() {
        var r = this;
        return e(t.default.mark(function e() {
            var n;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return r.loading(!0), e.prev = 1, e.next = 4, r.loadRecordList(!0);

                  case 4:
                    e.next = 10;
                    break;

                  case 6:
                    e.prev = 6, e.t0 = e.catch(1), n = e.t0.message, r.toast({
                        message: n
                    });

                  case 10:
                    r.loading(!1), wx.stopPullDownRefresh();

                  case 12:
                  case "end":
                    return e.stop();
                }
            }, e, r, [ [ 1, 6 ] ]);
        }))();
    },
    onShow: function() {
        this.loadRecordList();
    },
    onLoad: function(e) {
        var t = e.view_id, r = e.success_message;
        r && this.toast({
            message: r
        }), this.view_id = t, this.loadRecordList();
    }
};

(0, n.page)(d(l, c, u));