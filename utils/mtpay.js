var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, e = "function" == typeof Symbol && "symbol" == o(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : o(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : o(e);
}, n = require("../api/wx.js").navigateTo, t = require("../constants.js").MT_PAY, r = wx.getStorageSync, i = function() {
    return "qa" === r("ENV");
}, u = function() {
    return i() ? "https://stable.pay.test.sankuai.com/i/cashier/show/index" : "https://mpay.meituan.com/i/cashier/show/index";
}, c = function() {
    var o = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e = o.tradeno, n = void 0 === e ? "" : e, t = o.pay_token, i = void 0 === t ? "" : t, u = o.pay_success_url, c = void 0 === u ? "" : u;
    return "?redr_url=&auth=v2&dp_cityid=1&from_dp=0&nb_app=weixin&token=" + ((r("user") || {}).token || "") + "&tradeno=" + n + "&pay_token=" + i + "&pay_success_url=" + encodeURIComponent(encodeURIComponent(c));
};

module.exports = {
    mtpay: function() {
        var o = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        return new Promise(function(e) {
            var t = "" + u() + c(o);
            n({
                url: "../web-view/web-view?type=DIRECT&onHideRemain=1&redirectUrl=" + encodeURIComponent(t)
            }), e();
        });
    },
    isMtpay: function(o) {
        return "object" === (void 0 === o ? "undefined" : e(o)) ? o.wm_order_pay_channel === t : o === t;
    }
};