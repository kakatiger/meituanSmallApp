var e = require("../../utils/object-assign.js"), t = {
    headerIndexOnScroll: function(e) {
        var t = this.data.headerIndex.hideLoc;
        !t && 150 < e ? this.setDataHeaderIndex({
            hideLoc: !0
        }) : t && e <= 150 && this.setDataHeaderIndex({
            hideLoc: !1
        });
    },
    setDataHeaderIndex: function(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : function() {}, a = {};
        Object.keys(e).forEach(function(t) {
            a["headerIndex." + t] = e[t];
        }), this.setData(a, t);
    }
};

module.exports = function(a) {
    return a.data.headerIndex = {
        hideLoc: !1
    }, e(a, t), a;
};