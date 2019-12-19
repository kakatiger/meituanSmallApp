var i = Object.assign || function(i) {
    for (var l = 1; l < arguments.length; l++) {
        var t = arguments[l];
        for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (i[e] = t[e]);
    }
    return i;
}, l = require("../../utils/object-assign.js"), t = {
    getToggleParams: function() {
        var i = this.data.isNormOrder ? 0 : 1;
        return {
            detail_type: i,
            custom: {
                detail_type: i
            }
        };
    },
    lxMapClick: function() {
        this.lxMge.click({
            val_bid: "b_eyViQ",
            poi_id: this.wm_poi_id || ""
        });
    },
    lxMapView: function(i) {
        !this.showMap && i && this.lxMge.view({
            val_bid: "b_0rOwO",
            poi_id: this.wm_poi_id || ""
        });
    },
    lxOrderShopView: function() {
        this.lxMge.view({
            val_bid: "b_rww3xjsy",
            poi_id: this.wm_poi_id || ""
        });
    },
    lxOrderShopClick: function() {
        this.lxMge.click({
            val_bid: "b_ILLpm",
            poi_id: this.wm_poi_id || ""
        });
    },
    lxOneMoreAgainClick: function() {
        this.lxMge.click({
            val_bid: "b_Y8pXD",
            poi_id: this.wm_poi_id || ""
        });
    },
    lxOrderFoodListClick: function() {
        this.lxMge.click({
            val_bid: "b_3nzzrujj",
            poi_id: this.wm_poi_id || ""
        });
    },
    lxShareBillView: function() {
        this.lxMge.view({
            val_bid: "b_buipko8l"
        });
    },
    lxShareBillClick: function() {
        this.lxMge.click({
            val_bid: "b_5lvvx9jc"
        });
    },
    lxShowMoreView: function() {
        this.lxMge.view(i({
            val_bid: "b_fffik4th"
        }, this.getToggleParams()));
    },
    lxShowMoreClick: function() {
        this.lxMge.click(i({
            val_bid: "b_g0dz1amc"
        }, this.getToggleParams()));
    },
    lxShowCloseView: function() {
        this.lxMge.view(i({
            val_bid: "b_l4wpe390"
        }, this.getToggleParams()));
    },
    lxShowCloseClick: function() {
        this.lxMge.click(i({
            val_bid: "b_6naqyw4r"
        }, this.getToggleParams()));
    },
    lxPindanPvView: function(i) {
        this.lxMge.view({
            val_bid: "b_wvyk3cdz",
            pindan_role: i
        });
    },
    lxQuitPindanClick: function() {
        this.lxMge.click({
            val_bid: "b_kuuml697"
        });
    },
    lxModifyPindanClick: function() {
        this.lxMge.click({
            val_bid: "b_r20q5w7d"
        });
    },
    lxSelfpickSearchMapClick: function() {
        this.lxMge.click({
            val_bid: "b_qiiu1hdw"
        });
    }
};

module.exports = function(i) {
    return l(i, t), i;
};