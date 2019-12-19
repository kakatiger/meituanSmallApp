var t = function(t, a) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return function(t, a) {
        var o = [], i = !0, r = !1, e = void 0;
        try {
            for (var n, d = t[Symbol.iterator](); !(i = (n = d.next()).done) && (o.push(n.value), 
            !a || o.length !== a); i = !0) ;
        } catch (t) {
            r = !0, e = t;
        } finally {
            try {
                !i && d.return && d.return();
            } finally {
                if (r) throw e;
            }
        }
        return o;
    }(t, a);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, a = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var o = arguments[a];
        for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (t[i] = o[i]);
    }
    return t;
}, o = require("../../../utils/object-assign.js"), i = require("../../../utils/find.js"), r = require("../../../utils/format-price.js"), e = require("../../../utils/attrs-equal.js"), n = function(t) {
    return 0 === t.status && (-1 === t.real_stock || t.real_stock >= t.min_order_count);
};

module.exports = function(d) {
    d.data.modalFood = {
        show: !1,
        spu: null,
        activeAttrs: [],
        activeCount: 0,
        activeSku: 0,
        attrText: "",
        price: "",
        priceOrigin: "",
        lastAction: "init"
    }, o(d, {
        setDataModalFood: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, a = {};
            Object.keys(t).forEach(function(o) {
                a["modalFood." + o] = t[o];
            }), this.setData(a);
        },
        modalFoodFirstActiveSku: function() {
            for (var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.modalFood.spu.skus, a = t.length, o = 0; o < a; ++o) {
                var i = t[o];
                if (n(i)) return i;
            }
            return null;
        },
        modalFoodViewData: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.modalFood, a = t.spu, o = t.activeAttrs, n = t.activeSku;
            null === a && this.lxLogWXAppError("NULL", void 0, {
                data: t,
                source: "modalFoodViewData"
            });
            var d = a.skus, s = a.attrs, l = i(d, function(t) {
                return t.id === n;
            }) || d[0], u = l.spec, c = (u ? [ u ] : []).concat(s.map(function(t, a) {
                var r = t.values;
                return (i(r, function(t) {
                    var i = t.id;
                    return o[a] && i === o[a].id;
                }) || r[0]).value;
            })).join(","), v = l.price, h = l.origin_price, f = r(100 * v), p = v !== h ? r(100 * h) : "", F = this.data.cart, g = F.length ? F[0].cart : [], m = i(g, function(t) {
                var a = t.id, i = t.attrs;
                return a === n && e(i, o);
            });
            return {
                attrText: c,
                price: f,
                priceOrigin: p,
                activeCount: m ? m.count : 0
            };
        },
        onClickModalFoodBtn: function(t) {
            var a = t.currentTarget.dataset, o = a.type, i = a.id, r = a.attr, e = a.index, n = this.data.modalFood, d = n.activeSku, s = n.activeAttrs;
            "attr" === o ? s[e].id !== r.id && (this.setDataModalFood({
                activeAttrs: s.slice(0, e).concat([ r ], s.slice(e + 1)),
                lastAction: "changeAttr"
            }), this.setDataModalFood(this.modalFoodViewData())) : "sku" === o && d !== i && (this.setDataModalFood({
                activeSku: i,
                lastAction: "changeSku"
            }), this.setDataModalFood(this.modalFoodViewData()));
        },
        onClickModalFoodAdd: function(t) {
            var o = t.detail;
            this.onClickAddFood({
                detail: a({}, o, {
                    notLog: !0
                })
            }), this.LogWhenAddModalFood(t.detail.item);
            var i = this.modalFoodViewData();
            i.lastAction = "add", this.setDataModalFood(i);
        },
        LogWhenAddModalFood: function(t) {
            var a = this.data.poiData.poi_info, o = this.data.container_type, i = {
                poi_id: a.id,
                spu_id: t.id,
                container_type: o,
                category_id: t.tag
            };
            this.lxClickAddModalFood(i);
        },
        onClickModalFoodDel: function(t) {
            var a = t.detail;
            this.onClickDelFood({
                detail: a
            });
            var o = this.modalFoodViewData();
            o.lastAction = "delete", this.setDataModalFood(o);
        },
        showModalFood: function(a) {
            var r = a.name, e = a.attrs, d = a.sku_label, s = a.skus, l = a.tag, u = a.id, c = this.data.cart, v = c.length ? c[0].cart : [];
            void 0 === s && this.lxLogWXAppError("UNDEFINED", void 0, {
                source: "showModalFood",
                spu: a
            }), s.forEach(function(t) {
                t._enabled = n(t);
            });
            var h = i(v, function(t) {
                var a = t.id;
                return i(s, function(t) {
                    return a === t.id && n(t);
                });
            }), f = this.modalFoodFirstActiveSku(s), p = h ? h.id : f ? f.id : null, F = null !== p && h ? e.map(function(t) {
                var a = t.values;
                return i(h.attrs, function(t) {
                    var o = t.id;
                    return i(a, function(t) {
                        return t.id === o;
                    });
                }) || a[0];
            }) : e.map(function(a) {
                return t(a.values, 1)[0];
            }), g = {
                show: !0,
                spu: {
                    name: r,
                    attrs: e,
                    sku_label: d,
                    skus: s
                },
                tag: l,
                activeAttrs: F,
                activeSku: p,
                id: u,
                lastAction: "openModal"
            };
            o(g, this.modalFoodViewData(g)), this.setDataModalFood(g);
        },
        hideModalFood: function() {
            var t = {
                show: !1,
                spu: null,
                activeAttrs: [],
                activeCount: 0,
                activeSku: 0,
                attrText: "",
                price: "",
                priceOrigin: "",
                lastAction: "init"
            };
            t.lastAction = "hide", this.setDataModalFood(t);
        }
    });
};