var t, e = require("./midas.outlet.js");

exports.targgerInit = function() {
    var r = getCurrentPages(), i = r[r.length - 1];
    i !== t && (t = i, e.init());
};