function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.OWL = exports.owl = void 0;

var t = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var n = r[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, t, n) {
        return t && e(r.prototype, t), n && e(r, n), r;
    };
}();

exports.page = function(e) {
    var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : Page;
    (0, l.default)(v, e, r);
}, exports.app = function(e) {
    var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : App;
    (0, c.default)(v, e, r);
}, exports.request = function(e) {
    var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : v;
    return (0, a.default)(e, r);
};

var n = e(require("./error/index.js")), i = e(require("./resource/index.js")), a = e(require("./resource/request.js")), o = e(require("./page/index.js")), u = e(require("./metric/index.js")), s = e(require("./log/index.js")), f = e(require("./config.js")), g = require("./env.js"), l = e(require("./page.js")), c = e(require("./app.js")), d = e(require("./error/model.js")), p = e(require("./util/logan.js")), h = function() {
    function e(t) {
        r(this, e);
        var a = new f.default(t);
        this.error = new n.default(a), this.resource = new i.default(a, this.error), this.pageSpeed = new o.default(a), 
        this.logManager = new s.default(a), this.cfgManager = a, this.init();
    }
    return t(e, [ {
        key: "init",
        value: function() {
            var e = this;
            (0, g.getEnv)().then(function(r) {
                e.cfgManager.setExtension(r);
            });
        }
    }, {
        key: "newMetric",
        value: function() {
            return new u.default(this.cfgManager);
        }
    }, {
        key: "report",
        value: function() {
            this.error.report(), this.resource.report(), this.pageSpeed.report();
        }
    } ]), e;
}(), v = new h({});

v.OWL = h, v.errorModel = d.default, v.start = function(e) {
    if (!this.isStarted && (this.isStarted = !0, e && v.cfgManager.set(e), this.cfgManager.get("logan").enable)) {
        var r = this.cfgManager.get("logan").Logan, t = this.cfgManager.get("logan").config, n = this.cfgManager.get("project");
        p.default.ready({
            LoganAPI: r,
            project: n,
            loganConfig: t
        });
    }
}, exports.owl = v, exports.OWL = h;