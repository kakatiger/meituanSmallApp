var a = require("../../utils/version-compare.js");

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        appId: {
            type: String,
            value: ""
        },
        path: {
            type: String,
            value: ""
        },
        version: {
            type: String,
            value: "release"
        },
        extraData: {
            type: Object,
            value: null
        },
        SDKVersion: {
            type: String,
            value: ""
        }
    },
    data: {
        useNavigator: !1
    },
    methods: {
        onClick: function() {
            this.triggerEvent("minaNavigateClick");
            var a = this.data, e = a.useNavigator, t = a.appId, i = a.version, r = a.path, n = a.extraData;
            e || wx.canIUse && wx.canIUse("navigateToMiniProgram") && wx.navigateToMiniProgram({
                appId: t,
                path: r,
                envVersion: i,
                extraData: n
            });
        }
    },
    ready: function() {
        var e = this.data.SDKVersion;
        e || (e = wx.getSystemInfoSync().SDKVersion), a(e, "2.0.7") && this.setData({
            useNavigator: !0,
            SDKVersion: e
        });
    }
});