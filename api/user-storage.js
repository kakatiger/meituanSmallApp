var e = require("../actions/user.js"), t = require("./wx.js").storage.getItem, r = require("../store.js"), s = require("../constants.js").KEY_USER;

module.exports = function() {
    return t(s).then(function(t) {
        var s = t.data;
        getApp().store && getApp().store !== r && (r = getApp().store), r.dispatch((0, e.loaded)(s));
    });
};