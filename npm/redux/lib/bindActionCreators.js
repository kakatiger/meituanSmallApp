function o(o, t) {
    return function() {
        return t(o.apply(void 0, arguments));
    };
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, n = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(o) {
    return void 0 === o ? "undefined" : t(o);
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : void 0 === o ? "undefined" : t(o);
};

exports.__esModule = !0, exports.default = function(t, e) {
    if ("function" == typeof t) return o(t, e);
    if ("object" !== (void 0 === t ? "undefined" : n(t)) || null === t) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === t ? "null" : void 0 === t ? "undefined" : n(t)) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
    for (var r = Object.keys(t), i = {}, u = 0; u < r.length; u++) {
        var f = r[u], y = t[f];
        "function" == typeof y && (i[f] = o(y, e));
    }
    return i;
};