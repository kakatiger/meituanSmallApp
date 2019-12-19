var t = require("./event.js"), a = require("./utils.js");

Component({
    externalClasses: [ "midas-simple" ],
    properties: {
        sendLoadPoint: {
            type: Boolean,
            value: !1
        },
        sendReachPoint: {
            type: Boolean,
            value: !1
        },
        extra: {
            type: String,
            value: ""
        },
        callbackParams: {
            type: String,
            value: ""
        },
        loadExtra: {
            type: String,
            value: ""
        },
        impressionExtra: {
            type: String,
            value: ""
        },
        clickExtra: {
            type: String,
            value: ""
        },
        paddingTop: {
            type: String,
            value: ""
        },
        paddingRight: {
            type: String,
            value: ""
        },
        paddingBottom: {
            type: String,
            value: ""
        },
        paddingLeft: {
            type: String,
            value: ""
        },
        groupName: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        onClick: function() {
            try {
                this.triggerEvent("clickend", this.data.callbackParams, this.data.clickExtra);
            } catch (t) {}
        }
    },
    created: function() {
        this.isSendImpression = !1;
        var t = this;
        this._cleanSendImpressionHandle = function(a, e) {
            (e || a === t.data.groupName) && (t.isSendImpression = !1);
        }, a.addCleanImpressionFn(this._cleanSendImpressionHandle);
    },
    attached: function() {},
    ready: function() {
        var a = this;
        try {
            a.triggerEvent("loadend", a.data.callbackParams, a.data.loadExtra);
        } catch (e) {}
        var e = a.createSelectorQuery();
        e.selectViewport().fields({
            size: !0
        });
        var i = this.data.paddingTop && parseFloat(this.data.paddingTop) || 0, n = this.data.paddingRight && parseFloat(this.data.paddingRight) || 0, s = this.data.paddingBottom && parseFloat(this.data.paddingBottom) || 0, r = this.data.paddingLeft && parseFloat(this.data.paddingLeft) || 0, d = e.select(".midas-wraper").boundingClientRect();
        this.__scroll = function() {
            a.isSendImpression || d.exec(function(t) {
                if (!a.isSendImpression) {
                    var e = t[0], d = t[1];
                    if (d) {
                        var o = d.top < e.height - s && d.bottom > 0 + i, l = d.left < e.width - r && d.right > 0 + n;
                        if (o && l) {
                            a.isSendImpression = !0;
                            try {
                                a.triggerEvent("impressionend", a.data.callbackParams, a.data.impressionExtra);
                            } catch (t) {}
                        }
                    }
                }
            });
        }, t.onScroll(this.__scroll), setTimeout(function() {
            a.__scroll();
        }, 10);
    },
    moved: function() {},
    detached: function() {
        t.offScroll(this.__scroll), a.removeCleanImpressionFn(this._cleanSendImpressionHandle);
    }
});