var e = require("../../utils/version-compare.js"), t = Object.freeze({
    openSetting: "2.0.7",
    getUserInfo: "1.3.0"
});

Component({
    properties: {
        message: {
            type: String,
            value: ""
        },
        textCancel: {
            type: String,
            value: ""
        },
        textOk: {
            type: String,
            value: ""
        },
        SDKVersion: {
            type: String,
            value: ""
        },
        openType: {
            type: String,
            value: "openSetting"
        },
        moveup: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        useButton: !1
    },
    methods: {
        onClickBackdrop: function() {
            this.triggerEvent("onClickBackdrop");
        },
        onClickCancel: function() {
            this.triggerEvent("onClickCancel");
        },
        onClickOk: function() {
            var e = this;
            this.triggerEvent("onClickOk"), this.data.useButton || wx.canIUse && wx.canIUse("openSetting") && wx.openSetting({
                success: function(t) {
                    return e.openSettingSuccCb({
                        detail: t
                    });
                }
            });
        },
        openSettingSuccCb: function(e) {
            var t = e.detail;
            this.triggerEvent("onOpenSettingSucc", t);
        },
        preventTapBubble: function() {}
    },
    ready: function() {
        var n = this.data.SDKVersion, i = this.data.openType;
        n || (n = wx.getSystemInfoSync().SDKVersion), e(n, t[i]) && this.setData({
            useButton: !0,
            SDKVersion: n
        });
    }
});