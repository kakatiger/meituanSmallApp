function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, o, c) {
    function f() {
        m === b && (m = b.slice());
    }
    function s() {
        return l;
    }
    function y(e) {
        if ("function" != typeof e) throw new Error("Expected listener to be a function.");
        var t = !0;
        return f(), m.push(e), function() {
            if (t) {
                t = !1, f();
                var o = m.indexOf(e);
                m.splice(o, 1);
            }
        };
    }
    function a(e) {
        if (!(0, r.default)(e)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
        if (void 0 === e.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
        if (h) throw new Error("Reducers may not dispatch actions.");
        try {
            h = !0, l = p(l, e);
        } finally {
            h = !1;
        }
        for (var t = b = m, o = 0; o < t.length; o++) (0, t[o])();
        return e;
    }
    var d;
    if ("function" == typeof o && void 0 === c && (c = o, o = void 0), void 0 !== c) {
        if ("function" != typeof c) throw new Error("Expected the enhancer to be a function.");
        return c(t)(e, o);
    }
    if ("function" != typeof e) throw new Error("Expected the reducer to be a function.");
    var p = e, l = o, b = [], m = b, h = !1;
    return a({
        type: u.INIT
    }), (d = {
        dispatch: a,
        subscribe: y,
        getState: s,
        replaceReducer: function(e) {
            if ("function" != typeof e) throw new Error("Expected the nextReducer to be a function.");
            p = e, a({
                type: u.INIT
            });
        }
    })[i.default] = function() {
        var e, t = y;
        return (e = {
            subscribe: function(e) {
                function o() {
                    e.next && e.next(s());
                }
                if ("object" !== (void 0 === e ? "undefined" : n(e))) throw new TypeError("Expected the observer to be an object.");
                return o(), {
                    unsubscribe: t(o)
                };
            }
        })[i.default] = function() {
            return this;
        }, e;
    }, d;
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = "function" == typeof Symbol && "symbol" == o(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : o(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : o(e);
};

exports.__esModule = !0, exports.ActionTypes = void 0, exports.default = t;

var r = e(require("../../lodash/isPlainObject.js")), i = e(require("../../symbol-observable/index.js")), u = exports.ActionTypes = {
    INIT: "@@redux/INIT"
};