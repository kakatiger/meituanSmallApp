function e(e) {
    return e === n.SERVER_TYPE.MEITUAN_WAIMAI ? i : t;
}

var a = require("./event.js"), t = require("./emitter.js"), i = require("./emitter_waimai.js"), n = require("./enum.js"), r = require("./utils_waimai.js");

Component({
    externalClasses: [ "midas" ],
    properties: {
        env: {
            type: String,
            value: n.ENV.PRODUCT
        },
        serverType: {
            type: String,
            value: n.SERVER_TYPE.MEITUAN_WAIMAI
        },
        ishttps: {
            type: Boolean,
            value: !0
        },
        sendLoadPoint: {
            type: Boolean,
            value: !1
        },
        sendReachPoint: {
            type: Boolean,
            value: !1
        },
        adidx: {
            type: String,
            value: ""
        },
        feedback: {
            type: String,
            value: ""
        },
        extra: {
            type: String,
            value: ""
        },
        callbackParams: {
            type: String,
            value: ""
        },
        jumpLink: {
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
        reachExtra: {
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
            var a = this;
            e(this.data.serverType).sendClickPoint(this.data.feedback, this.data.adidx, this.data.extra, a.data).then(function(t) {
                try {
                    a.triggerEvent("clickend", a.data.callbackParams);
                } catch (t) {}
                a.data.jumpLink && wx.navigateTo({
                    url: a.data.jumpLink,
                    success: function() {
                        a.data.sendReachPoint && e(a.data.serverType).sendReachPoint(a.data.feedback, a.data.adidx, a.data.extra, a.data);
                        try {
                            a.triggerEvent("reachend", a.data.callbackParams);
                        } catch (e) {}
                    }
                });
            });
        }
    },
    created: function() {
        this.isSendImpression = !1, this.data.groupName || (this.data.groupName = r.getCurrentPageName());
        var e = this;
        this._cleanSendImpressionHandle = function(a, t) {
            (t || a === e.data.groupName) && (e.isSendImpression = !1);
        }, r.addCleanImpressionFn(this._cleanSendImpressionHandle);
    },
    attached: function() {},
    ready: function() {
        var t = this;
        this.data.sendLoadPoint && e(this.data.serverType).sendLoadPoint(this.data.feedback, this.data.adidx, this.data.extra, t.data);
        try {
            t.triggerEvent("loadend", t.data.callbackParams);
        } catch (i) {}
        var i = t.createSelectorQuery();
        i.selectViewport().fields({
            size: !0
        });
        var n = i.select(".midas-wraper").boundingClientRect();
        this.__scroll = function() {
            t.isSendImpression || n.exec(function(a) {
                if (!t.isSendImpression) {
                    var i = a[0], n = a[1];
                    if (n) {
                        var r = n.top < i.height - 1 && 1 < n.bottom, s = n.left < i.width - 1 && 1 < n.right;
                        if (r && s) {
                            t.isSendImpression = !0, e(t.data.serverType).sendImpressionPoint(t.data.feedback, t.data.adidx, t.data.extra, t.data);
                            try {
                                t.triggerEvent("impressionend", t.data.callbackParams);
                            } catch (a) {}
                        }
                    }
                }
            });
        }, a.onScroll(this.__scroll), setTimeout(function() {
            t.__scroll();
        }, 10);
    },
    moved: function() {},
    detached: function() {
        a.offScroll(this.__scroll), r.removeCleanImpressionFn(this._cleanSendImpressionHandle);
    }
});