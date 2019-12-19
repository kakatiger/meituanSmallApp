var t = Object.assign || function(t) {
    for (var i = 1; i < arguments.length; i++) {
        var o = arguments[i];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, i = require("../../utils/object-assign.js"), o = require("../../utils/find.js"), a = require("../../utils/format-price.js");

module.exports = function(s) {
    i(s, {
        onClickChooseFood: function(i) {
            var o = i.detail, a = o.id, s = o.item, r = this.store.getState().poi.spuMap[a];
            this.data.productInfo && this.data.productInfo.show && this.hideProductInfo();
            var e = t({}, r, {
                id: a,
                tag: s.tag
            });
            this.showModalFood(e);
        },
        onClickAddFood: function(t) {
            var i = t.detail, s = i.id, r = i.foodid, e = i.attrs, d = void 0 === e ? [] : e, n = i.notLog, c = i.item;
            this.addSpeedTrackStartTime(5);
            var u;
            this.addSpeedTrackStartTime(4);
            var h = this.data.cart, p = void 0;
            p = h && h[0] ? h[0].cart : [];
            var l = o(p, function(t) {
                var i = t.id;
                return s === i;
            }), v = l ? l.count : 0;
            void 0 === (u = this.store.getState().poi.skuMap[s]) && this.lxLogWXAppError("UNDEFINED", void 0, {
                sku: u,
                id: s,
                source: "onClickAddFood"
            });
            var _ = u.min_order_count, f = u.real_stock, m = {};
            if (h.forEach(function(t) {
                m = o(t.cart, function(t) {
                    var i = t.id;
                    return s === i;
                });
            }), m && (f = m.restRealCount), -1 !== f && (f < _ || f <= v)) this.toast({
                message: "商品已达库存上限"
            }); else {
                1 < _ && 0 === v && this.toast({
                    message: "至少购买" + _ + "份"
                }), n || this.LogWhenAddFood(c), this.addFood({
                    poiID: this.poiID,
                    skuID: s,
                    attrs: d || [],
                    real_stock: f,
                    min: _,
                    foodid: r,
                    openID: this.openID
                }), this.data.isInSharing && this.data.isCreator && this.onClickAsyncFood(), this.addSpeedTrackEndTime(4);
                var g = this.data.cart, k = void 0;
                k = g && g[0] ? g[0].cart : [];
                var S = o(k, function(t) {
                    return t.id === s;
                });
                null === S && this.lxLogWXAppError("NULL", void 0, {
                    id: s,
                    cart: g,
                    source: "onClickAddFood"
                });
                var C = S.activity_type, D = S.name, I = S.actvStock, y = S.restrict, F = S.needToast, M = S.count, w = u.min_order_count, A = void 0 === w ? 1 : w, L = this.data.poiData.shopping_cart;
                (1 === C || 2 === C) && this.data.couponGoodsAddCnt === A && L && L.activity_info && L.activity_info.policy ? this.toast({
                    message: "满减与折扣/第二份半价商品不同享"
                }) : 5 === C && this.data.newUserGoodsAddCnt === A && L && L.activity_info && L.activity_info.policy && this.toast({
                    message: "满减与折扣/第二份半价商品不同享"
                });
                var T = this.data.poiData.poi_info, E = this.data.alreadySelecCount.act17, O = this.data.alreadySelecCount.act41;
                if (1 === C && 0 !== T.discount_restrict && E === T.discount_restrict + 1 ? T.restrict_toast && this.toast({
                    message: T.restrict_toast
                }) : 5 === C && 0 !== T.new_user_discount_restrict && O === T.new_user_discount_restrict + 1 ? T.new_user_discount_restrict_toast && this.toast({
                    message: T.new_user_discount_restrict_toast
                }) : !F || 1 !== C && 5 !== C || (y < I && 0 !== y ? this.toast({
                    message: "折扣菜品限购" + y + "份，超过" + y + "份恢复原价"
                }) : (0 === y && I !== 1 / 0 || 0 !== y && I < y) && this.toast({
                    message: D + "活动库存不足，部分已恢复原价"
                })), 2 === C && M === 2 * (I + 1) && this.toast({
                    message: "可优惠份数不足，超过数量恢复原价"
                }), this.data.addMoreScrollShow) {
                    for (var j = this.data.addMoreSpuList, P = 0; P < j.length; P++) if (j[P].skuid === s) {
                        2 <= j[P].minOrderCount && 0 === j[P].count ? j[P].count += j[P].minOrderCount : j[P].count += 1, 
                        j[P].totalPrice = a(j[P].count * j[P].price * 100);
                        break;
                    }
                    this.setData({
                        addMoreSpuList: j
                    });
                }
                this.addMoreProcess(this.data.poiData), this.addSpeedTrackEndTime(5);
            }
        },
        onClickDelFood: function(t) {
            var i = t.detail, o = i.id, s = i.attrs, r = void 0 === s ? [] : s, e = this.store.getState().poi.skuMap[o].min_order_count;
            if (this.delFood({
                poiID: this.poiID,
                skuID: o,
                attrs: r || [],
                min: e,
                openID: this.openID
            }), this.data.isInSharing && this.data.isCreator && this.onClickAsyncFood(), this.closeCartIfEmpty(), 
            this.data.addMoreScrollShow) {
                for (var d = this.data.addMoreSpuList, n = 0; n < d.length; n++) if (d[n].skuid === o && 0 < d[n].count) {
                    2 <= d[n].minOrderCount && d[n].count === d[n].minOrderCount ? d[n].count -= d[n].minOrderCount : d[n].count -= 1, 
                    d[n].totalPrice = a(d[n].count * d[n].price * 100);
                    break;
                }
                this.setData({
                    addMoreSpuList: d
                });
            }
            this.addMoreProcess(this.data.poiData);
        }
    });
};