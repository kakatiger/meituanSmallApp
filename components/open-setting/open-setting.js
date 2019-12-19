var t = require("../../utils/object-assign.js"), e = {
    openSettingShow: function() {
        this.openSettingSetData({
            show: !0
        });
    },
    openSettingHide: function() {
        this.openSettingSetData({
            show: !1
        });
    },
    openSettingSetData: function(t) {
        var e = this;
        return new Promise(function(n) {
            var i = {};
            Object.keys(t).forEach(function(e) {
                i["openSetting." + e] = t[e];
            }), e.setData(i, n);
        });
    }
};

module.exports = function(n) {
    return n.data.openSetting = {
        show: !1
    }, t(n, e), n;
};