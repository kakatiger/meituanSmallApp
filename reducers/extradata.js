var e = require("../actions/extradata.js"), t = require("../utils/object-assign.js");

module.exports = function() {
    var r = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : Object.create(null), a = arguments[1];
    return a.type === e.EXTRA_SET ? t({}, a.extra) : r;
};