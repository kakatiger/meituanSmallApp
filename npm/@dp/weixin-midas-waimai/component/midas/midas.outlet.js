var i = require("./config.js"), e = require("./event.js"), r = require("./utils_waimai.js");

exports.triggerScroll = e.triggerScroll, exports.config = function(e) {
    i.config = Object.assign(i.config, e);
};

var n = function() {
    this[o] && this[o].apply(this, arguments), exports.triggerScroll();
}, o = "__$$curOnPageScroll$$__", t = "__$$curOnHide$$__", l = function i() {
    this[o] && (this.onPageScroll = this[o], this[o] = null), this.onPageScroll === n && (this.onPageScroll = null), 
    this[t] && (this[t].apply(this, arguments), this.onHide = this[t], this[t] = null), 
    this.onHide === i && (this.onHide = null);
};

exports.init = function() {
    var i = getCurrentPages(), e = i[i.length - 1];
    e.onPageScroll != n && (e[o] = e.onPageScroll, e.onPageScroll = n), e.onHide != l && (e[t] = e.onHide, 
    e.onHide = l);
}, exports.clearImpression = function(i) {
    r.clearImpression(i);
}, exports.clearAllImpression = function() {
    r.clearAllImpression();
};