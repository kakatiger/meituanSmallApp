var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "function" == typeof Symbol && "symbol" == o(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : o(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : o(t);
};

exports.default = function(o) {
    for (var e = arguments.length, r = Array(1 < e ? e - 1 : 0), n = 1; n < e; n++) r[n - 1] = arguments[n];
    for (var y = r.length, f = 0; f < y; ++f) {
        var u = r[f];
        if (u && "object" === (void 0 === u ? "undefined" : t(u))) for (var i = Object.keys(u), l = i.length - 1; -1 < l; --l) {
            var b = i[l];
            o[b] = u[b];
        }
    }
    return JSON.parse(JSON.stringify(o));
};