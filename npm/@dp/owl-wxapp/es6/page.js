Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(o, e) {
    var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : Page, a = e.onLoad, n = e.onReady, t = e.onHide, c = e.onUnload, l = e.onPullDownRefresh, s = o.pageSpeed, i = o.cfgManager, d = o.error;
    e.onLoad = function(o) {
        try {
            s.pageLoad(i);
        } catch (o) {
            console.log("onLoad error:" + o.stack || o);
        }
        a && a.call(this, o);
    }, e.imageError = function(o) {
        d.pushError({
            content: o.detail && o.detail.errMsg,
            category: "jsError",
            sec_category: "image error",
            level: "error"
        });
    }, e.onReady = function(o) {
        try {
            s.pageReady();
        } catch (o) {
            console.log("onReady error:" + o.stack || o);
        }
        n && n.call(this, o);
    }, e.onHide = function(o) {
        try {
            s.report();
        } catch (o) {
            console.log("page onHide error:" + o.stack || o);
        }
        t && t.call(this, o);
    }, e.onUnload = function(o) {
        try {
            s.report();
        } catch (o) {
            console.log("page onUnload error:" + o.stack || o);
        }
        c && c.call(this, o);
    }, e.onPullDownRefresh = function(o) {
        try {
            s.pullRefresh();
        } catch (o) {
            console.log("page pullRefresh error:" + o.stack || o);
        }
        l && l.call(this, o);
    }, r(e);
};