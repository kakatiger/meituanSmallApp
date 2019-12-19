function i(i) {
    return function() {
        var e = i.apply(this, arguments);
        return new Promise(function(i, n) {
            return function t(a, o) {
                try {
                    var r = e[a](o), s = r.value;
                } catch (a) {
                    return void n(a);
                }
                if (!r.done) return Promise.resolve(s).then(function(i) {
                    t("next", i);
                }, function(i) {
                    t("throw", i);
                });
                i(s);
            }("next");
        });
    };
}

var e = function(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), n = require("../../npm/@dp/owl-wxapp/es6/index.js"), t = require("../base.js"), a = require("../../utils/mix.js"), o = require("../../components/rohr/rohr.js"), r = require("../../api/index.js").poiQualification, s = require("../../constants.js"), c = s.CODE_GOTO_LOGIN, u = s.ANTI_SPIDER_FORCE_LOGIN, f = {
    pageName: "qualification",
    data: {
        noDataShown: !0,
        poiSafeInfoShown: !1,
        qualiPicsShown: !1,
        foodClassifyShown: !1,
        qualify_show_type: 0,
        qualify_pics: [],
        certify_info: {},
        classify_pic: [],
        support_classify: !1,
        gradeMap: {
            0: "未设置",
            1: "优秀",
            2: "良好",
            3: "一般",
            4: "较差",
            5: "中等"
        },
        classifyMap: {
            2: "A",
            3: "C",
            5: "B"
        },
        levelMap: {
            0: "未设置",
            1: "A",
            2: "B",
            3: "C",
            4: "D"
        }
    },
    poiID: "",
    onLoad: function(n) {
        var t = this, a = n.poi_id, o = n.cat_id, r = void 0 === o ? "" : o, s = n.hash_id, c = void 0 === s ? "" : s;
        return i(e.default.mark(function i() {
            return e.default.wrap(function(i) {
                for (;;) switch (i.prev = i.next) {
                  case 0:
                    return t.poiID = a, t.cat_id = r, t.hash_id = c, i.next = 5, t.loadQualificaitonData(a);

                  case 5:
                  case "end":
                    return i.stop();
                }
            }, i, t);
        }))();
    },
    loadQualificaitonData: function(n) {
        var t = this;
        return i(e.default.mark(function i() {
            var a, o, s, f, p, l, d, _, h, w, y;
            return e.default.wrap(function(i) {
                for (;;) switch (i.prev = i.next) {
                  case 0:
                    return a = void 0, i.prev = 1, i.next = 4, r({
                        wm_poi_id: n
                    });

                  case 4:
                    a = i.sent, i.next = 10;
                    break;

                  case 7:
                    i.prev = 7, i.t0 = i.catch(1), i.t0 && i.t0.code === c && (t[u] = function() {
                        t.loadQualificaitonData(n);
                    });

                  case 10:
                    a ? (s = (o = a).qualify_pics, f = o.certify_info, p = o.classify_pic, l = o.support_classify, 
                    d = +a.qulify_show_type, y = w = h = _ = !1, 3 === d ? (f.permit_num && (_ = !0), 
                    h = !0) : 1 === d ? h = !(_ = !1) : 2 === d ? (f.licence_num && (_ = !0), h = !1) : w = !0, 
                    f && !f.company_name && (_ = !1), !f.permit_num && p && 0 !== p.length && (y = !0), 
                    t.setData({
                        poiSafeInfoShown: _,
                        noDataShown: w,
                        qualiPicsShown: h,
                        foodClassifyShown: y,
                        qualify_pics: s,
                        classify_pic: p,
                        certify_info: f,
                        support_classify: l
                    })) : t.setData({
                        noDataShown: !0
                    }), t.loading(!1);

                  case 12:
                  case "end":
                    return i.stop();
                }
            }, i, t, [ [ 1, 7 ] ]);
        }))();
    },
    onClickPhotos: function(i) {
        var e = i.currentTarget.dataset, n = e.picarry, t = e.picnow;
        wx.previewImage({
            current: n[t],
            urls: n
        });
    },
    onShow: function() {
        var i = getApp();
        i.afterLoginAction === u && (i.afterLoginAction = "", "function" == typeof this[u] && this[u]());
    }
};

(0, n.page)(a(f, t, o));