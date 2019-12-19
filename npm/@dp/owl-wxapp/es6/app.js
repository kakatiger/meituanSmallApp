Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(o, t) {
    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : App, c = t.onLaunch, r = t.onError, e = t.onHide, a = t.onPageNotFound, l = o.pageSpeed, s = o.error, u = o.resource;
    t.onLaunch = function(o) {
        try {
            var t = Date.now();
            l.appLaunch(t);
        } catch (o) {
            console.log("onLaunch error:" + o.stack || o);
        }
        c.call(this, o);
    }, t.onError = function(o) {
        try {
            s.onError(o);
        } catch (o) {
            console.log("onError catch:" + o.stack || o);
        }
        r && r.call(this, o);
    }, t.onHide = function() {
        try {
            s.report(), u.report();
        } catch (o) {
            console.log("onHide catch:" + o.stack || o);
        }
        e && e.call(this);
    }, t.onPageNotFound = function(o) {
        try {
            o && s.addError("page not found", o.path);
        } catch (o) {
            console.log("onPageNotFound catch:" + o.stack || o);
        }
        a && a.call(this);
    }, n(t);
};