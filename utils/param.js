var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, t = "function" == typeof Symbol && "symbol" == o(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : o(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : o(t);
};

module.exports = function(o) {
    for (var n = Object.keys(o), e = [], r = n.length - 1; -1 < r; --r) {
        var y = n[r], u = o[y];
        if ("" !== u && null != u) {
            var f = void 0 === u ? "undefined" : t(u);
            u && "object" === f && (u = JSON.stringify(u)), e.push(encodeURIComponent(y) + "=" + encodeURIComponent(u));
        }
    }
    return e.join("&");
};