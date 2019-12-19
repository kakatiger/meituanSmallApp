var e = require("../env.js"), o = void 0, n = !1;

module.exports = {
    queue: [],
    ready: function() {
        var u = this, l = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, g = l.LoganAPI, a = l.project, i = l.loganConfig, r = i.enableShake;
        n = !0, g ? (o = g, function() {
            if (r) {
                var n = i.appSources;
                o = o.config({
                    enableShake: r,
                    appSource: n
                });
            }
            for (o.log("[新小程序项目]：项目-> " + a + " 对应页面-> " + (0, e.getPageUrl)()); u.queue.length; ) {
                var l = u.queue.shift();
                o.log(l);
            }
        }()) : console.log("当前暂不支持log");
    },
    log: function(e) {
        1 < arguments.length && void 0 !== arguments[1] && arguments[1], n && (o ? o.log(e, "owl") : this.queue.push(e));
    }
};