var e = require("../utils/object-assign.js"), t = require("../store.js");

module.exports = function() {
    var i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, r = t.getState(), u = r.poi.id, s = r.buyTogether[u], o = s && s.uTime ? s.uTime : 0;
    return e(i, {
        utime: o
    });
};