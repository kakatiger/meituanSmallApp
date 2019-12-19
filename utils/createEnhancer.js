Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = Object.assign || function(r) {
    for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
    }
    return r;
};

exports.default = function() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
    return function(e) {
        return function(n, a, o) {
            var c = e(n, a, o);
            return r({}, c, {
                dispatch: function(r) {
                    var e = t.beforeDispatch || [], n = t.afterDispatch || [], a = [ r, c ];
                    e.forEach(function(r) {
                        return r.apply(void 0, a);
                    });
                    var o = c.dispatch(r);
                    return n.forEach(function(r) {
                        return r.apply(void 0, a);
                    }), o;
                }
            });
        };
    };
};