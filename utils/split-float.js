module.exports = function(t) {
    var e = "" + t, r = e.split(".");
    return 1 < r.length ? [ r[0], "." + r[1] ] : [ e, "" ];
};