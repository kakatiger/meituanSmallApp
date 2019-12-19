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
    for (var e = Object.keys(o), n = [], r = e.length - 1; -1 < r; --r) {
        var y = e[r], u = o[y];
        if ("" !== u && null != u) {
            var f = void 0 === u ? "undefined" : t(u);
            u && "object" === f && (u = JSON.stringify(u)), n.push(encodeURIComponent(y) + "=" + encodeURIComponent(u));
        }
    }
    return n.join("&");
};