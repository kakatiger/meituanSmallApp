var e = require("./object-assign.js"), n = {}, t = require("../api/index.js").getFilterConditions;

module.exports = {
    get: function(r) {
        var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        return n[r] ? n[r] : t(e(i, {
            filter_scene: 1
        })).then(function(e) {
            return n[r] = e;
        });
    },
    clear: function(e) {
        e ? n[e] = null : n = {};
    }
};