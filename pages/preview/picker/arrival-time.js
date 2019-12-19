function e(e) {
    return function() {
        var i = e.apply(this, arguments);
        return new t(function(e, r) {
            return function a(n, s) {
                try {
                    var l = i[n](s), u = l.value;
                } catch (n) {
                    return void r(n);
                }
                if (!l.done) return t.resolve(u).then(function(e) {
                    a("next", e);
                }, function(e) {
                    a("throw", e);
                });
                e(u);
            }("next");
        });
    };
}

var i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../npm/babel-runtime/regenerator/index.js")), r = require("../../../api/index.js").orderDeliverTime, a = require("../../../utils/object-assign.js"), t = require("../../../npm/promise-polyfill/promise.js"), n = {
    hideArrivalTime: function() {
        this.setData({
            "arrivalTime.show": !1
        });
    },
    onClickArrivalTime: function() {
        var a = this;
        return e(i.default.mark(function e() {
            var t, n, s, l, u, o, c, m, v, d, x, f, p, T, h, _, b, k;
            return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return a.lxArrivalTimeClick(), e.prev = 1, a.loading(!0), t = a.data.poi_id, n = a.business_type, 
                    e.next = 6, r({
                        wmPoiId: t,
                        wm_poi_id: t,
                        business_type: n
                    });

                  case 6:
                    s = e.sent, l = s.expected_arrival_timelist, u = a.data.previewData.expected_arrival_info.unixtime, 
                    o = [], m = l[c = 0] && l[0].timelist || [], v = [], d = 0, x = l.length;

                  case 14:
                    if (!(d < x)) {
                        e.next = 35;
                        break;
                    }
                    if (f = l[d], p = f.status, T = f.date, h = f.info, _ = f.timelist, o.push(T), 0 !== p) {
                        e.next = 31;
                        break;
                    }
                    v.push(_), b = _.length - 1;

                  case 20:
                    if (!(-1 < b)) {
                        e.next = 29;
                        break;
                    }
                    if (_[b].unixtime === u) return c = d, m = _, e.abrupt("break", 29);
                    e.next = 26;
                    break;

                  case 26:
                    --b, e.next = 20;
                    break;

                  case 29:
                    e.next = 32;
                    break;

                  case 31:
                    v.push(h);

                  case 32:
                    ++d, e.next = 14;
                    break;

                  case 35:
                    a.expected_arrival_timelist = v, a.setData({
                        "arrivalTime.show": !0,
                        "arrivalTime.days": o,
                        "arrivalTime.dayIndex": c,
                        "arrivalTime.selectedDayIndex": c,
                        "arrivalTime.unixtime": u,
                        "arrivalTime.arrival_timelist": m
                    }), e.next = 43;
                    break;

                  case 39:
                    e.prev = 39, e.t0 = e.catch(1), k = e.t0.message, a.alert({
                        message: k
                    });

                  case 43:
                    a.loading(!1);

                  case 44:
                  case "end":
                    return e.stop();
                }
            }, e, a, [ [ 1, 39 ] ]);
        }))();
    },
    onClickArrivalTimeDay: function(e) {
        var i = e.currentTarget.dataset.index, r = this.expected_arrival_timelist[i], t = {
            "arrivalTime.dayIndex": i,
            "arrivalTime.scrollTop": 0
        };
        a(t, "string" == typeof r ? {
            "arrivalTime.arrival_timelist": null,
            "arrivalTime.info": r
        } : {
            "arrivalTime.arrival_timelist": r,
            "arrivalTime.info": null
        }), this.setData(t);
    },
    onClickArrivalTimeItem: function(e) {
        var i = e.currentTarget.dataset.unixtime;
        this.setData({
            "arrivalTime.show": !1,
            formValidState: ""
        }), this.refresh({
            expected_arrival_time: i
        });
    }
};

module.exports = function(e) {
    return e.data.arrivalTime = {
        scrollTop: 0,
        show: !1,
        info: null,
        dayIndex: 0,
        selectedDayIndex: 0,
        unixtime: 0,
        days: [],
        arrival_timelist: []
    }, e.expected_arrival_timelist = [], a(e, n);
};