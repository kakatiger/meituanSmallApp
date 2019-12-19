function t(t) {
    return function() {
        var i = t.apply(this, arguments);
        return new n(function(t, e) {
            return function r(o, a) {
                try {
                    var s = i[o](a), l = s.value;
                } catch (o) {
                    return void e(o);
                }
                if (!s.done) return n.resolve(l).then(function(t) {
                    r("next", t);
                }, function(t) {
                    r("throw", t);
                });
                t(l);
            }("next");
        });
    };
}

function i(t, i, e) {
    return i in t ? Object.defineProperty(t, i, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[i] = e, t;
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../npm/babel-runtime/regenerator/index.js")), r = require("../../utils/poi-list-filter.js"), n = require("../../npm/promise-polyfill/promise.js"), o = require("../../utils/object-assign.js"), a = require("../../utils/deduplication.js")(function(t) {
    return t.id;
}), s = {
    poilistCancelLoading: function() {
        this.poilistBlocking = !1, this.poilistDebounce += 1;
    },
    onClickPoilistActvs: function(t) {
        var e = t.currentTarget.dataset.index, r = this.data.poilist[e]._actvs_expand;
        this.setData(i({}, "poilist[" + e + "]._actvs_expand", !r));
    },
    poilistLoad: function(i) {
        var n = this;
        return t(e.default.mark(function t() {
            var o, s, l, u;
            return e.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (o = n.poilistDebounce, n.poilistBlocking) return t.abrupt("return", {
                        valid: !1
                    });
                    t.next = 3;
                    break;

                  case 3:
                    return n.poilistBlocking = !0, s = void 0, t.prev = 5, t.next = 8, n._poilistLoad(i);

                  case 8:
                    s = t.sent, t.next = 16;
                    break;

                  case 11:
                    if (t.prev = 11, t.t0 = t.catch(5), o === n.poilistDebounce) throw n.poilistBlocking = !1, 
                    t.t0;
                    t.next = 16;
                    break;

                  case 16:
                    if (o === n.poilistDebounce) return l = s.poilist, u = i ? r(l, n.filterParam.sort_type, n.filterParam.activity_filter_codes) : a(n.data.poilist.concat(r(l, n.filterParam.sort_type, n.filterParam.activity_filter_codes))), 
                    s.poilist = u, s.valid = !0, n.poilistBlocking = !1, t.abrupt("return", s);
                    t.next = 23;
                    break;

                  case 23:
                    return t.abrupt("return", {
                        valid: !1
                    });

                  case 24:
                  case "end":
                    return t.stop();
                }
            }, t, n, [ [ 5, 11 ] ]);
        }))();
    }
};

module.exports = function(t) {
    var i = t.data, e = t.onClickPoilistItem;
    return i.poilist = [], t.onClickPoilistItem = function(t) {
        e && e.call(this, t), this.onClickNavigator(t);
    }, t.poilistDebounce = 0, t.poilistBlocking = !1, o(t, s);
};