var a = require("../../npm/@dp/owl-wxapp/es6/index.js"), e = (require("../../npm/promise-polyfill/promise.js"), 
require("../base.js")), p = require("../../utils/mix.js"), t = {
    pageName: "order-info-map",
    data: {
        mapdata: null
    },
    onLoad: function() {
        console.log(getApp().mapdata), this.setData({
            mapdata: getApp().mapdata
        }), this.loading(!1);
    },
    onUnload: function() {
        getApp().mapdata = null;
    }
};

(0, a.page)(p(t, e));