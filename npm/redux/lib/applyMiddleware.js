exports.__esModule = !0;

var t = Object.assign || function(t) {
    for (var r = 1; r < arguments.length; r++) {
        var e = arguments[r];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    }
    return t;
};

exports.default = function() {
    for (var e = arguments.length, n = Array(e), a = 0; a < e; a++) n[a] = arguments[a];
    return function(e) {
        return function(a, u, o) {
            var c, i = e(a, u, o), s = i.dispatch, f = {
                getState: i.getState,
                dispatch: function(t) {
                    return s(t);
                }
            };
            return c = n.map(function(t) {
                return t(f);
            }), s = r.default.apply(void 0, c)(i.dispatch), t({}, i, {
                dispatch: s
            });
        };
    };
};

var r = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./compose.js"));