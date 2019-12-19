Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./random-id.js")), r = 0, t = "";

exports.default = function() {
    var u = Date.now();
    return (!t || r < u - 18e5) && (r = u, t = (0, e.default)()), t;
};