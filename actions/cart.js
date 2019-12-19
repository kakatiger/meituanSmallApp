Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("./action.js"), r = exports.CART_ADD = "CART_ADD", A = exports.CART_UPDATE_SHARE = "CART_UPDATE_SHARE", t = exports.CART_DEL = "CART_DEL", T = exports.CART_CLEAR = "CART_CLEAR", _ = exports.CART_SET_SKUS = "CART_SET_SKUS", s = exports.CART_SET = "CART_SET", R = exports.CART_VALIDATE = "CART_VALIDATE", C = exports.CART_CLEAR_MINE = "CART_CLEAR_MINE", E = exports.UPDATE_CART_SKUS = "UPDATE_CART_SKUS", o = exports.REMOVE_OTHER_CART = "REMOVE_OTHER_CART";

exports.add = e(r), exports.updateShare = e(A), exports.del = e(t), exports.clear = e(T), 
exports.setSKUs = e(_), exports.set = e(s), exports.validate = e(R), exports.clearMyCartInSharing = e(C), 
exports.updateCartSkus = e(E), exports.removeOtherCarts = e(o);