function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, n) {
            return function o(r, u) {
                try {
                    var i = e[r](u), f = i.value;
                } catch (r) {
                    return void n(r);
                }
                if (!i.done) return Promise.resolve(f).then(function(t) {
                    o("next", t);
                }, function(t) {
                    o("throw", t);
                });
                t(f);
            }("next");
        });
    };
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getSetting = exports.getLocation = exports.getSystemInfo = exports.requestApi = void 0;

var o = t(require("../../../../../babel-runtime/regenerator/index.js")), r = "function" == typeof Symbol && "symbol" == n(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : n(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : n(t);
}, u = t(require("../utils/promisify.js")), i = t(require("../utils/param.js"));

exports.requestApi = function() {
    var t = e(o.default.mark(function t(e, n) {
        var f, s;
        return o.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                return (f = n.data) && "object" === (void 0 === f ? "undefined" : r(f)) && (n.data = (0, 
                i.default)(f)), s = (0, u.default)(e), n.isRequest = !0, t.abrupt("return", s(n));

              case 5:
              case "end":
                return t.stop();
            }
        }, t, void 0);
    }));
    return function(e, n) {
        return t.apply(this, arguments);
    };
}(), exports.getSystemInfo = function() {
    return (0, u.default)(wx.getSystemInfo)();
}, exports.getLocation = function() {
    return (0, u.default)(wx.getLocation)();
}, exports.getSetting = function() {
    return (0, u.default)(wx.getSetting)();
};