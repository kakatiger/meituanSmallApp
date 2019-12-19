module.exports = function(e, r) {
    var t = 0, s = 375;
    return wx.getSystemInfo({
        success: function(u) {
            s = u.screenWidth, "px" === r ? t = Number(e * s / 750) : "rpx" === r && (t = Number(750 * e / s));
        }
    }), t;
};