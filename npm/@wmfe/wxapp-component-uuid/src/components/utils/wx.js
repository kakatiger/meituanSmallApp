function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.requestApi = exports.login = exports.setStorage = exports.getStorage = void 0;

var o = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : t(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
}, r = e(require("./promisify.js")), n = e(require("./param.js")), u = e(require("./object-assgin.js"));

exports.getStorage = function(e) {
    return (0, r.default)(wx.getStorage)({
        key: e
    });
}, exports.setStorage = function(e, t) {
    return (0, r.default)(wx.setStorage)({
        key: e,
        data: t
    });
}, exports.login = function() {
    return (0, r.default)(wx.login)();
}, exports.requestApi = function(e) {
    var t = e.data;
    return t && "object" === (void 0 === t ? "undefined" : o(t)) && (e.data = (0, n.default)(t), 
    e.header = (0, u.default)(e.header || {}, {
        "content-type": "application/x-www-form-urlencoded"
    })), (0, r.default)(wx.request)(e);
};