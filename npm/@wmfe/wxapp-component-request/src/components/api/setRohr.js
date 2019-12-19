Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.setRohr = void 0;

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../../@mtfe/wxapp-rohr/dist/rohr.js"));

exports.setRohr = function(r) {
    r._token = e.default.r(r);
};