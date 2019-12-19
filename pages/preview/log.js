var i = require("../../utils/object-assign.js"), e = {
    USABLEADDR: 1
}, t = function(i) {
    return i === e.USABLEADDR;
}, l = {
    lx_address_type: 0,
    getPreviewType: function() {
        return this.data.isInSharing ? 1 : 0;
    },
    lxAllView: function(i) {
        var e = i.previewData, t = void 0 === e ? {} : e;
        this.lxAddrView(t).lxSubmitView();
    },
    lxAddrView: function(i) {
        var e = i.address_type, l = void 0 === e ? 0 : e;
        return this.lxMge.view({
            val_bid: "b_zXVeV",
            custom: {
                address_type: this.lx_address_type || l,
                is_recommend: t(l) ? 1 : 0
            }
        }), this;
    },
    lxAddrClick: function(i) {
        var e = i.currentTarget.dataset.addressType, l = void 0 === e ? 0 : e;
        this.lxMge.click({
            val_bid: "b_Cuvkr",
            custom: {
                is_recommend: t(l) ? 1 : 0
            }
        }), this.lxMge.click({
            val_bid: "b_eOtfh",
            custom: {
                preview_type: this.getPreviewType()
            }
        });
    },
    lxArrivalTimeClick: function() {
        this.lxMge.click({
            val_bid: "b_8Xs6V",
            custom: {
                preview_type: this.getPreviewType()
            }
        });
    },
    lxFoodToggleOpenClick: function() {
        this.lxMge.click({
            val_bid: "b_lxmcrvvx"
        });
    },
    lxFoodToggleCloseClick: function() {
        this.lxMge.click({
            val_bid: "b_or3smks8"
        });
    },
    lxRedpackClick: function() {
        this.lxMge.click({
            val_bid: "b_1CdKD",
            custom: {
                preview_type: this.getPreviewType()
            }
        });
    },
    lxShopCouponClick: function() {
        this.lxMge.click({
            val_bid: "b_f6INz",
            custom: {
                preview_type: this.getPreviewType()
            }
        });
    },
    lxPayTypeClick: function(i) {
        this.lxMge.click({
            val_bid: "b_ksH4S",
            custom: {
                pay_type: i,
                preview_type: this.getPreviewType()
            }
        });
    },
    lxRemindClick: function() {
        this.lxMge.click({
            val_bid: "b_e64riq44",
            custom: {
                preview_type: this.getPreviewType()
            }
        });
    },
    lxDinnerClick: function(i) {
        this.lxMge.click({
            val_bid: "b_uWU2j",
            custom: {
                dinner_usercount: i,
                preview_type: this.getPreviewType()
            }
        });
    },
    lxSubmitView: function() {
        this.lxMge.view({
            val_bid: "b_JPPE5"
        });
    },
    lxNoAddrView: function() {
        this.lxMge.view({
            val_bid: "b_zc57bupl"
        });
    },
    lxSubmitClick: function() {
        var i = this.data.poi_id;
        this.lxMge.click({
            val_bid: "b_ciJxy",
            poi_id: i,
            custom: {
                preview_type: this.getPreviewType()
            }
        });
    },
    lxPrivacySwitchStatusView: function(i) {
        var e = i.previewData.token;
        this.lxMge.view({
            val_bid: "b_lfipvofu",
            token: e
        });
    },
    lxPrivacySwitchStatusClick: function() {
        var i = this.data, e = i.previewData.token, t = i.privacy.using;
        this.lxMge.click({
            val_bid: "b_4hkay8i6",
            token: e,
            custom: {
                status: t
            }
        });
    },
    lxChangeToSelfpickTagClick: function() {
        this.lxMge.click({
            val_bid: "b_d526k4n8"
        });
    },
    lxSelfpickCheckMapClick: function() {
        this.lxMge.click({
            val_bid: "b_gesje92i"
        });
    },
    lxPatchOrderRoleView: function(i) {
        var e = i.pindan_role;
        this.lxMge.view({
            val_bid: "b_u1p3521a",
            custom: {
                pindan_role: e
            }
        });
    },
    lxShowMoreView: function() {
        this.lxMge.view({
            val_bid: "b_qhy8hkuu",
            custom: {
                preview_type: this.getPreviewType()
            }
        });
    },
    lxShowMoreClick: function() {
        this.lxMge.click({
            val_bid: "b_3bt2p6zd",
            custom: {
                preview_type: this.getPreviewType()
            }
        });
    },
    lxShowCloseView: function() {
        this.lxMge.view({
            val_bid: "b_ptbwzmzk",
            custom: {
                preview_type: this.getPreviewType()
            }
        });
    },
    lxShowCloseClick: function() {
        this.lxMge.click({
            val_bid: "b_fn6ljsn1",
            custom: {
                preview_type: this.getPreviewType()
            }
        });
    }
};

module.exports = function(e) {
    return i(e, l), e;
};