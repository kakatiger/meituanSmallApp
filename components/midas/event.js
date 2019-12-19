function o(o, r) {
    o && r && (f[o] = f[o] || []).push(r);
}

function r(o, r) {
    if (o) if (void 0 !== r) for (var c = f[o] = f[o] || [], n = 100; n--; ) {
        var t = c.indexOf(r);
        if (-1 === t) break;
        c.splice(t, 1);
    } else f[o] = [];
}

function c(o, r, c) {
    (f[o] = f[o] || []).forEach(function(o) {
        o.call(c, r);
    });
}

var f = {};

exports.on = o, exports.off = r, exports.emit = c, exports.onScroll = function(r) {
    o("scroll", r);
}, exports.offScroll = function(o) {
    r("scroll", o);
}, exports.triggerScroll = function(o) {
    c("scroll", o);
};