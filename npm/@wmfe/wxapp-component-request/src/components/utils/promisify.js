Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../npm/promise-polyfill/lib/index.js"));

exports.default = function(r) {
    return function() {
        var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        return new e.default(function(e, t) {
            n.success = e, n.fail = function(e) {
                e.errMsg && !e.message && (e.message = e.errMsg), t(e);
            }, r(n);
        });
    };
};