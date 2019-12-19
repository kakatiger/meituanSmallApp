function n() {
    var n = getCurrentPages() || [];
    return n.length ? n[n.length - 1].__route__ : "app";
}

function e() {
    return wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(n) {
        n && (o.network = n.networkType);
    }), new Promise(function(n, e) {
        wx.getNetworkType({
            success: function(e) {
                n(e.networkType);
            },
            fail: function() {
                n("unknown network");
            }
        }), setTimeout(function() {
            n("unknown network");
        }, 2e3);
    });
}

function t() {
    return new Promise(function(n, e) {
        wx.getSystemInfo({
            success: function(e) {
                var t = e.system, r = void 0 === t ? "" : t, o = e.version, i = void 0 === o ? "Unknown" : o, s = e.SDKVersion, u = void 0 === s ? "Unknown" : s, a = r.toLowerCase().match(/ios/) ? "iOS" : "Android";
                n({
                    os: a,
                    wxVersion: i,
                    wxLibVersion: u
                });
            },
            fail: function() {
                n("unknown system");
            }
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function(n, e) {
    if (Array.isArray(n)) return n;
    if (Symbol.iterator in Object(n)) return function(n, e) {
        var t = [], r = !0, o = !1, i = void 0;
        try {
            for (var s, u = n[Symbol.iterator](); !(r = (s = u.next()).done) && (t.push(s.value), 
            !e || t.length !== e); r = !0) ;
        } catch (n) {
            o = !0, i = n;
        } finally {
            try {
                !r && u.return && u.return();
            } finally {
                if (o) throw i;
            }
        }
        return t;
    }(n, e);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
};

exports.getPageUrl = n, exports.getEnv = function() {
    var i = n();
    return new Promise(function(n, s) {
        Object.keys(o).length ? n(Object.assign({
            pageUrl: i
        }, o)) : Promise.all([ e(), t() ]).then(function(e) {
            var t = r(e, 2), s = t[0], u = t[1];
            o = Object.assign({}, u, {
                container: "MicroMessenger"
            }, {
                network: s
            }, {
                unionId: ""
            }), n(Object.assign({}, o, {
                pageUrl: i
            }));
        }).catch(function() {
            n({});
        });
    });
};

var o = {};