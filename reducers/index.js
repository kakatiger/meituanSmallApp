var e = require("../npm/redux/lib/index.js"), r = require("./addr-edit.js"), i = require("./cart.js"), u = require("./poi.js"), s = require("./dev.js"), t = require("./user.js"), d = require("./recipient.js"), a = require("./purchase.js"), j = require("./wx.js"), q = require("./extradata.js"), c = require("./web-view.js"), p = require("./buy-together.js"), o = (0, 
e.combineReducers)({
    addrEdit: r,
    cart: i,
    poi: u,
    dev: s,
    user: t,
    recipient: d,
    purchase: a,
    wx: j,
    extradata: q,
    webview: c,
    buyTogether: p
});

module.exports = o;