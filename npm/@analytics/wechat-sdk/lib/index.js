function e(e, t) {
    return (void 0 === e ? "undefined" : k(e)) === t;
}

function t(t) {
    return e(t, "number");
}

function n() {
    return 65535 * Math.random();
}

function r() {
    return Math.ceil(n()).toString(16);
}

function i() {
    return A.now().toString(16) + "-" + r() + "-" + r();
}

function o(e, t) {
    wx.setStorageSync(C + e, t);
}

function a(e) {
    return wx.getStorageSync(C + e);
}

function u(e) {
    wx.removeStorageSync(C + e);
}

function c() {
    return new Promise(function(e) {
        var t = wx.getSystemInfoSync(), n = "MicroMessengerWXA (" + t.model + "; " + t.system + "; " + t.pixelRatio + "dpr; language/" + t.language + ") " + t.platform + "/" + t.version + " NetType/";
        V.ct = t.platform, V.sc = t.screenWidth + "*" + t.screenHeight, V.ua = n;
        var r = a("wxid"), i = a("wxunionid");
        r && (V.wxid = r), i && (V.wxunionid = i), wx.getNetworkType({
            success: function(t) {
                V.net = t.networkType.toUpperCase(), V.ua = V.ua.replace(/(NetType\/).*/, "$1" + t.networkType.toUpperCase()), 
                e(V);
            },
            fail: function() {
                e(V);
            }
        });
    });
}

function s(e) {
    delete V[e];
}

function l(e, t, n) {
    var r = A.extend({}, V);
    "category" === e && (t = "data_sdk_" + t), "wxid" !== e && "wxunionid" !== e || o(e, t), 
    "msid" === e && V.scene && s("scene"), V[e] = t;
    var i = A.extend({}, V);
    n && n(r, i);
}

function f(e) {
    return e ? e && V[e] : V;
}

function d() {
    var e = [], t = A.now();
    return e.push(t.toString(16)), e.push(r()), e.push(r()), e.push(r()), e.join("-");
}

function v(e, t) {
    if (!F || t == U && t == N) if (t == H) {
        if (ne <= R) return ne++, void setTimeout(function() {
            p(e, q, t);
        }, ae(ne));
        ne = 0, clearTimeout(oe), oe = null, b(e, H), re = [];
    } else {
        if (z <= R) return z++, void setTimeout(function() {
            p(e, q, t);
        }, ae(z));
        if (t == U) {
            try {
                u(K);
            } catch (e) {}
            clearTimeout(oe), oe = null;
        }
        z = 0, clearTimeout($), $ = null, te.length && b(e), F = !1, ee = [];
    }
}

function m(e, t, n) {
    A.isArray(t) && t.length && wx.request({
        method: "POST",
        url: e,
        data: t,
        success: function(t) {
            t.statusCode < 400 ? h(e, n) : v(e, n);
        },
        fail: function() {
            v(e, n);
        },
        complete: function(e) {}
    });
}

function h(e, t) {
    if (t == H) return ne = 0, clearTimeout(oe), oe = null, re = [], void b(e, H);
    if (t == U) {
        clearTimeout(oe), ne = 0, oe = null;
        try {
            u(K);
        } catch (e) {}
    }
    F = !1, z = 0, ee = [], clearTimeout($), $ = null, te.length && b(e);
}

function p(e, t, n) {
    t ? (n == H ? ne = 0 : z = 0, m(e, t, n)) : m(e, n == H ? re : ee, n);
}

function y(e, t) {
    if (!Y) {
        try {
            Y = a(K) || [];
        } catch (e) {}
        Y && Y.length && ($ = !0, p(e, ee = Y));
    }
    if (t) {
        if (te.push(t), t.nm == N) {
            var n = f(), r = g();
            te = te.concat(r);
            var i = [ Object.assign({
                evs: te
            }, n) ];
            return te = [], ee = ee.concat(i, re), re = [], F = !0, void p(e, ee, N);
        }
        if (t.nm == U) {
            var u = g();
            if (te = te.concat(u), ee.length) ee[0].evs = ee[0].evs.concat(te); else {
                var c = f(), s = [ Object.assign({
                    evs: te
                }, c) ];
                ee = ee.concat(s);
            }
            te = [], ee = ee.concat(re), re = [], F = !0;
            try {
                o(K, ee);
            } catch (e) {}
            return void p(e, ee, U);
        }
        $ || F || b(e);
    }
}

function b(e, t) {
    t ? oe = setTimeout(function() {
        var t = g();
        if (t.length) {
            var n = f(), r = [ Object.assign({
                evs: t
            }, n) ];
            re = re.concat(r);
        }
        re.length ? p(e, re, H) : (clearTimeout(oe), oe = null);
    }, 5e3) : $ = setTimeout(function() {
        if (!te.length) return clearTimeout($), void ($ = null);
        var t = f(), n = [ Object.assign({
            evs: te
        }, t) ];
        te = [], ee = ee.concat(n), p(e, ee);
    }, X);
}

function _(e, t) {
    if ((t = A.isObj(t) ? t : {}).mvlId && t.evs) {
        var n = t.mvlId, r = t.evs.val_lab ? t.evs.val_lab : {};
        r._tm = t.evs.tm, r._seq = t.evs.seq, ie[n] ? ie[n].val_lab.mv_list.push(r) : (t.evs.val_lab = {
            mv_list: [ r ]
        }, ie[n] = t.evs);
    }
    oe || b(e, H);
}

function g() {
    var e = [];
    for (var t in ie) e.push(ie[t]);
    return ie = {}, e;
}

function S(e, t) {
    if (JSON.stringify(e) !== JSON.stringify(t)) {
        var n = g();
        if (0 < n.length) {
            var r = [ Object.assign({
                evs: n
            }, e) ];
            re = re.concat(r);
        }
    }
}

function w() {
    c().then(function(e) {
        de = !0;
    }), this._opts = {}, B = i();
}

function x(e, t) {
    var n = a(ue);
    n || (n = []), n.length >= ce && n.shift(), t ? n.push({
        seq: e.seq,
        category: f().category,
        cid: t.val_cid,
        bid: e.val_bid,
        val_lab: e.val_lab || {}
    }) : n.push({
        seq: e.seq,
        category: f().category,
        cid: he,
        bid: e.val_bid,
        val_lab: e.val_lab || {}
    }), o(ue, n);
}

function O() {
    fe = 1, l("msid", d(), S), u(ue);
}

function j(e, t, n, r, i, o) {
    ye ? ye && ye !== f("lch") && (O(), ye = f("lch")) : ye = f("lch");
    var u = {
        nm: e,
        tm: A.now(),
        nt: Q,
        seq: fe++,
        isauto: se,
        req_id: t
    };
    if (u = A.extend(u || {}, _e), _e = {}, he) u.val_cid = he; else {
        var c = getCurrentPages();
        c && c.length && (u.val_cid = c[c.length - 1].__route__);
    }
    if (n && (u.val_lab = n), pe && (u.val_ref = pe), r && (u.val_bid = r), P && (u.refer_req_id = P), 
    o && (u = A.extend(u || {}, o), o.refer_req_id || delete u.refer_req_id, o.val_ref || delete u.val_ref), 
    e == J && i && !0 === i.sf && x(u, o), e == E || e == W || e == G) {
        var s = a(ue);
        s && (u.s_from = s);
    }
    return u;
}

var M = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, T = "function" == typeof Symbol && "symbol" == M(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : M(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : M(e);
}, k = "function" == typeof Symbol && "symbol" == T(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : T(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : T(e);
}, q = void 0, A = {}, D = Object.prototype, I = D.toString, L = D.hasOwnProperty, C = "_lx_sdk_";

A.isStr = function(t) {
    return t && e(t, "string");
}, A.isObj = function(e) {
    return e && "[object Object]" === I.call(e);
}, A.now = function() {
    return new Date() - 0;
}, A.isArray = Array.isArray || function(e) {
    return "[object Array]" === I.call(e);
}, A.isArrayLike = function(e) {
    if (!e) return !1;
    var n = e.length;
    return !!A.isArray(e) || !!(e && t(n) && 0 <= n) && (!A.isObj(e) || !(1 < n) || n - 1 in e);
}, A.each = function(e, t, n) {
    var r, i, o;
    if (e) if (A.isArrayLike(e)) for (i = 0, o = e.length; i < o && !1 !== t.call(n, e[i], i, e); i++) ; else for (r in e) if (L.call(e, r) && !1 === t.call(n, e[r], r, e)) break;
}, A.extend = function e(t, n, r) {
    var i, o = !0 === t;
    return o || (r = n, n = t), n && A.isObj(n) || (n = {}), r && A.isObj(r) || (r = {}), 
    A.each(r, function(t, a) {
        o && A.isObj(r[a]) ? (i = n[a] = {}, e(o, i, r[a])) : n[a] = r[a];
    }), n;
};

var V = {
    sdk_ver: "1.5.0",
    ch: "weixin",
    lch: "wx"
};

V.lxcuid = function(e) {
    function t(e, t) {
        var n, r = 0;
        for (n = 0; n < t.length; n++) r |= l[n] << 8 * n;
        return e ^ r;
    }
    var n = a("lxcuid");
    if (n) return n;
    var r, i, u = function() {
        for (var e = 1 * new Date(), t = 0; e === 1 * new Date() && t < 200; ) t++;
        return e.toString(16) + t.toString(16);
    }, c = +(Math.random() + "").slice(2), s = e.ua || "", l = [], f = 0;
    for (r = 0; r < s.length; r++) i = s.charCodeAt(r), l.unshift(255 & i), 4 <= l.length && (f = t(f, l), 
    l = []);
    0 < l.length && (f = t(f, l)), s = f;
    var d = 0;
    e.sc && (d = +(d = e.sc.split("*"))[0] * +d[1]);
    var v = [ u(), c, s, d, u() ].map(function(e) {
        return e.toString(16);
    }).join("-");
    return o("lxcuid", v), v;
}(V);

var B, P, Z, U = "AQ", E = "PV", N = "PD", J = "MC", W = "BO", G = "BP", H = "MVL", Q = 3, R = 3, X = 500, $ = null, z = 0, F = !1, K = "lx_send_cache_data", Y = q, ee = [], te = [], ne = 0, re = [], ie = {}, oe = null, ae = function(e) {
    var t = Math;
    return t.ceil(t.min(1e3 * (.5 + t.random()) * t.pow(2, e), 15e3));
}, ue = "lx_cache_sf", ce = 500, se = 7, le = Date.now(), fe = 1, de = !1, ve = Date.now(), me = q, he = q, pe = q, ye = q, be = q, _e = {}, ge = !0, Se = w.prototype;

Se.init = function(e, t) {
    var n = this, r = n._opts;
    r.reportUrl = e;
    var i = t.appnm, o = t.category;
    i || console, o || (t.category = i), t.appnm = i, l("msid", d()), u(ue), A.each(t || {}, function(e, t) {
        if (!A.isStr(t) || q === e) return r[t];
        n.set(t, e), r[t] = e;
    });
}, Se.setUTM = function(e) {
    if (e) {
        var t = e || {}, n = t.query || {}, r = t.referrerInfo || {}, i = [ "utm_source", "utm_medium", "utm_term", "utm_content", "utm_campaign" ], o = {};
        if ("clear" === t) return void delete env.utm;
        if (n && A.each(i, function(e) {
            A.isStr(n[e]) && (o[e] = n[e]);
        }), r.extraData) {
            var a = r.extraData;
            if (A.isStr(a)) try {
                a = JSON.parse(a);
            } catch (e) {
                a = {};
            }
            A.each(i, function(e) {
                A.isStr(a[e]) && (o[e] = a[e]);
            });
        }
        A.each(i, function(e) {
            A.isStr(t[e]) && (o[e] = t[e]);
        }), o.utm_source || 1037 != t.scene && 1038 != t.scene || t.referrerInfo && t.referrerInfo.appId && (o.utm_source = t.referrerInfo.appId, 
        o.utm_medium = "otherApp"), 0 < Object.keys(o).length && (this.set("utm", o), !be && o.utm_source ? be = o.utm_source : be && be !== o.utm_source && (O(), 
        be = o.utm_source));
    }
}, Se.set = function(e, t) {
    l(e, t, S);
}, Se.get = function(e) {
    return f(e);
}, Se.start = function(e) {
    e = A.isObj(e) ? e : q, ve = Date.now(), Z = i(), B = null, he = q;
    var t = j("AS", Z, e);
    t.isauto = 6, this.send(t);
}, Se.quit = function(e) {
    e = A.isObj(e) ? e : {};
    var t = Date.now() - ve;
    e = A.extend({
        duration: "" + t
    }, e);
    var n = j(U, Z, e);
    n.isauto = 6, this.send(n);
}, Se.pageView = function(e, t) {
    B || he ? (!B || he && he !== e) && (pe = he, P = B, B = i()) : (ge || (pe = e), 
    B = i()), me = Date.now(), he = e;
    var n = j(E, B, t);
    this.send(n), ge = !1;
}, Se.pageDisappear = function(e) {
    if (e = A.isObj(e) ? e : {}, me) {
        var t = Date.now() - me;
        e = A.extend({
            duration: "" + t
        }, e);
    }
    var n = j(N, B, e);
    this.send(n), me = q;
}, Se.moduleView = function(e, t) {
    var n = j("MV", B, t, e);
    this.send(n);
}, Se.systemCheck = function(e, t) {
    var n = j("SC", B, t, e);
    this.send(n);
}, Se.moduleClick = function(e, t, n) {
    var r = j(J, B, t, e, n);
    this.send(r);
}, Se.moduleEdit = function(e, t) {
    var n = j("ME", B, t, e);
    this.send(n);
}, Se.order = function(e, t, n) {
    n = A.extend(n || {}, {
        order_id: t
    });
    var r = j(W, B, n, e);
    this.send(r);
}, Se.pay = function(e, t, n) {
    n = A.extend(n || {}, {
        order_id: t
    });
    var r = j(G, B, n, e);
    this.send(r);
}, Se.send = function(e) {
    18e5 < Date.now() - le && O(), le = Date.now();
    var t = this._opts.reportUrl;
    if (t) {
        if ("MVL" == e.nm) return void _(t, {
            mvlId: e.val_bid + e.req_id + f("category"),
            evs: e
        });
        y(t, e);
    }
}, Se.presetGeolocation = function(e, t) {
    return e && (_e.lng = e), t && (_e.lat = t), this;
}, Se.turnOnValidate = function() {
    var e, t = parseInt("10000000", 36), n = parseInt("ZZZZZZZZ", 36);
    return l("_lx_validcode", e = parseInt(Math.random() * (n - t) + t).toString(36).toUpperCase()), 
    e;
}, Se.sendEvsAsycBefore = function() {
    var e = {};
    return he && (e.val_cid = he), pe && (e.val_ref = pe), B && (e.req_id = B), P && (e.refer_req_id = P), 
    e;
}, Se.sendEvsAsycAfter = function(e, t) {
    if (!A.isObj(t) || !A.isObj(e)) return !1;
    var n = "" + t.nm.toUpperCase(), r = q;
    switch (n) {
      case "MC":
        r = j(J, B, t.valLab, t.valBid, t.options, e);
        break;

      case "MV":
        r = j("MV", B, t.valLab, t.valBid, q, e);
        break;

      case "ME":
        r = j("ME", B, t.valLab, t.valBid, q, e);
        break;

      case "BO":
        t.valLab = A.extend(t.valLab || {}, {
            order_id: t.orderId
        }), r = j(W, B, t.valLab, t.valBid, q, e);
        break;

      case "BP":
        t.valLab = A.extend(t.valLab || {}, {
            order_id: t.orderId
        }), r = j(G, B, t.valLab, t.valBid, q, e);
        break;

      default:
        return;
    }
    this.send(r);
}, Se.moduleViewList = function(e, t) {
    if (e && A.isStr(e)) {
        var n = j("MVL", B, t, e);
        this.send(n);
    }
};

var we = new w();

module.exports = we;