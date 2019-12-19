var n = [];

exports.addCleanImpressionFn = function(o) {
    n.push(o);
}, exports.clearImpression = function(o) {
    n.forEach(function(n) {
        n && n(o);
    });
}, exports.clearAllImpression = function() {
    n.forEach(function(n) {
        n && n(null, !0);
    });
}, exports.removeCleanImpressionFn = function(o) {
    for (var e = n.length; -1 < e; e--) n[e] === o && n.splice(e, 1);
};