var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
};

Component({
    properties: {
        myOwnCartCount: {
            type: Number,
            value: 0
        },
        isHiddenCart: {
            type: Boolean
        },
        isIpx: {
            type: Boolean,
            value: !1
        },
        isHiddenGetMore: {
            type: Boolean,
            value: !1
        },
        activePanel: {
            type: Number,
            value: 0
        },
        isOtherReady: {
            type: Boolean,
            value: !1
        },
        cartAnimation: {
            type: String,
            value: ""
        },
        cartTip: {
            type: Array
        },
        addMoreShow: {
            type: Boolean,
            value: !1
        },
        cartBoxPrice: {
            type: Number,
            value: 0
        },
        cartFoodCount: {
            type: Number,
            value: 0
        },
        cartFoodPrice: {
            type: Number,
            value: 0
        },
        priceToGo: {
            type: Number,
            value: 0
        },
        cart: {
            type: Object,
            value: []
        },
        addMoreScrollShow: {
            type: Boolean,
            value: !1
        },
        addMoreSpuList: {
            type: Array,
            value: []
        },
        poiData: {
            type: Object,
            value: {}
        },
        hasUserInfo: {
            type: Boolean,
            value: !1
        },
        cartTipShow: Boolean,
        isInSharing: {
            type: Boolean,
            value: !0
        },
        isCreator: {
            type: Boolean,
            value: !1
        },
        isNewProducts: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        cartKeys: [],
        isReadyToSubmit: !1
    },
    methods: {
        onClickClearCart: function() {
            this.triggerEvent("onClickClearCart");
        },
        onClickCartFooter: function(t) {
            this.triggerEvent("onClickCartFooter", e({}, t.detail, t.target.dataset));
        },
        getUserInfo: function(e) {
            e.detail && e.detail.userInfo && this.triggerEvent("onClickCartFooter", {
                x: void 0,
                y: void 0,
                action: "submit"
            });
        },
        onAddMoreClick: function(e) {
            this.triggerEvent("onAddMoreClick");
        },
        closeAddMore: function(e) {
            this.triggerEvent("closeAddMore");
        },
        onClickAddFood: function(e) {
            this.triggerEvent("onClickAddFood", e.detail);
        },
        onClickDelFood: function(e) {
            this.triggerEvent("onClickDelFood", e.detail);
        },
        onClickClearMyCart: function(e) {
            this.triggerEvent("onClickClearMyCart");
        }
    }
});