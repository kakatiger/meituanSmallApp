function e(t, r) {
    var o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : wx.request, s = t.url, a = t.reportError, i = t.isRequest, u = Date.now(), n = t.complete;
    return t.complete = function(o) {
        try {
            var i = o.statusCode, l = void 0 === i ? "500|" : i, d = o.errMsg, p = void 0 === d ? "request:ok" : d, c = Date.now() - u, v = {};
            if (a && "request:fail " !== p) {
                var f = a(o, e) || {}, y = f.log, g = void 0 === y ? "" : y, m = f.code, C = void 0 === m ? 200 : m, q = f.name, b = void 0 === q ? "" : q, x = "";
                (g || b) && (x = "ajaxError"), v = {
                    statusCode: l + "|" + C,
                    logContent: g,
                    firstCategory: x,
                    secondCategory: b || t.url
                };
            }
            r.resource.pushApi(Object.assign({
                timestamp: u,
                requestbyte: 0,
                responsebyte: 0,
                statusCode: l,
                resourceUrl: s,
                responsetime: c
            }, v));
        } finally {
            n && n.apply(this, arguments);
        }
    }, i && o(t), t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = e;