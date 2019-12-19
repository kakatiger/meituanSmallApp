function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), i = require("../env.js"), n = require("../util/util.js"), r = function() {
    function r(t) {
        e(this, r), this.cfgManager = t, this.speed = {}, this.firstContentfullPaint = {}, 
        this.moduleFirstRenderTime = {}, this.pageSource = {};
    }
    return t(r, [ {
        key: "pushSpeed",
        value: function(e, t, n) {
            var r = this, a = this.speed;
            this.pageSource, a[e] || (a[e] = {}, a[e].customspeed = []), (0, i.getEnv)().then(function(i) {
                var s = i;
                s.pageurl = e || s.pageUrl, delete s.pageUrl;
                var o = r.cfgManager.config, u = o.project, l = o.unionId, f = o.wxAppVersion;
                Object.assign(a[e], s, {
                    project: u,
                    timestamp: Date.now(),
                    unionId: l,
                    speed: "0|0|0",
                    wxAppVersion: f
                }), a[e].customspeed[t] = n;
            });
        }
    }, {
        key: "start",
        value: function(e, t) {
            this["start-" + e + "-" + t] = Date.now();
        }
    }, {
        key: "end",
        value: function(e, t) {
            var i = this["start-" + e + "-" + t], n = this["start-app-0"];
            n && (delete this["start-app-0"], this.pushSpeed("app", 0, Date.now() - n)), i ? this.pushSpeed(e, t, Date.now() - i) : console.log("请先埋点 start");
        }
    }, {
        key: "addSource",
        value: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "default";
            try {
                if (this._refresh) return;
                var t = (0, i.getPageUrl)();
                this.pageSource[t] || (this.pageSource[t] = {}), this.pageSource[t].source = e;
            } catch (e) {
                console.log("addSource error", JSON.stringify(e));
            }
        }
    }, {
        key: "addPoint",
        value: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
            if (!this._refresh) if (t || (t = (0, i.getPageUrl)() || ""), "app" === t) this.pushSpeed("app", e.position, Date.now() - this._appStart); else {
                var n = this._start || Date.now(), r = void 0;
                if (void 0 === e.position) return void console.log("请先埋点position");
                if (void 0 !== e.duration) r = e; else if (void 0 !== n) {
                    var a = e.timeStamp || +Date.now();
                    r = {
                        position: e.position,
                        duration: a - n
                    };
                }
                r && this.pushSpeed(t, r.position, r.duration);
            }
        }
    }, {
        key: "createFirstContentfulPaint",
        value: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [ "default" ], t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
            try {
                if (this._refresh) return;
                var n = (0, i.getPageUrl)();
                this.firstContentfullPaint[n] || (this.firstContentfullPaint[n] = {}), this.firstContentfullPaint[n][t] = e;
            } catch (e) {
                console.log("create first error", JSON.stringify(e));
            }
        }
    }, {
        key: "addFirstContentfulPaint",
        value: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "default", t = arguments[1];
            if (!this._refresh) {
                var n = (0, i.getPageUrl)(), r = void 0;
                try {
                    this.firstContentfullPaint[n] || (this.firstContentfullPaint[n] = {}), r = t || +new Date() - this._start, 
                    this.moduleFirstRenderTime[n] || (this.moduleFirstRenderTime[n] = {}), this.moduleFirstRenderTime[n][e] || (this.moduleFirstRenderTime[n][e] = r);
                } catch (e) {
                    console.log("add first error", JSON.stringify(e));
                }
            }
        }
    }, {
        key: "_getPageFirstPaint",
        value: function(e, t) {
            var i = this, n = void 0;
            this.firstContentfullPaint[e] && (n = this.firstContentfullPaint[e][t]);
            var r = 0;
            return n.map(function(t) {
                r = Math.max(i.moduleFirstRenderTime[e][t], r);
            }), r;
        }
    }, {
        key: "appLaunch",
        value: function(e) {
            this._appStart = e, this.addPoint({
                position: 0
            }, "app");
        }
    }, {
        key: "pageLoad",
        value: function() {
            this._start = Date.now(), this._refresh = !1;
        }
    }, {
        key: "pageReady",
        value: function() {
            this.addPoint({
                position: 0
            }, (0, i.getPageUrl)());
        }
    }, {
        key: "pullRefresh",
        value: function() {
            this._refresh = !0;
        }
    }, {
        key: "report",
        value: function() {
            var e = this, t = this.cfgManager;
            if (!(Math.random() > t.get("page").sample)) {
                var i = this.speed, r = this.firstContentfullPaint, a = this.moduleFirstRenderTime, s = t.getApiPath("page");
                Object.keys(i).map(function(t) {
                    var o = Object.assign({}, i[t]);
                    if (r[t]) {
                        var u = e.firstContentfullPaint[t];
                        for (var l in u) o.customspeed[l] = e._getPageFirstPaint(t, l);
                    }
                    o.customspeed = o.customspeed.join("|");
                    var f = (0, n.stringify)(s);
                    f = (0, n.stringify)(f, o), i[t] && delete i[t], a[t] && delete a[t], r[t] && delete r[t], 
                    (0, n.requestQueue)({
                        url: f,
                        header: {
                            "content-type": "application/x-www-form-urlencoded;"
                        },
                        method: "GET",
                        success: function() {}
                    });
                });
            }
        }
    } ]), r;
}();

exports.default = r;