function i(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.wmParams = void 0;

var e = i(require("../utils/random-id.js")), d = i(require("../utils/visit-id.js"));

exports.wmParams = function(i) {
    var t = i.wm_ctype, o = void 0 === t ? "" : t, _ = i.wm_dtype, m = void 0 === _ ? "" : _, u = i.wm_dversion, a = void 0 === u ? "" : u, w = i.wm_uuid, r = void 0 === w ? "" : w, v = i.wm_longitude, n = void 0 === v ? "" : v, s = i.wm_latitude, l = void 0 === s ? "" : s, c = i.wm_visitid, p = void 0 === c ? "" : c, g = i.wm_appversion, f = void 0 === g ? "" : g, y = i.wm_channel, q = void 0 === y ? "" : y, j = i.wm_did, k = void 0 === j ? "" : j, x = i.wm_logintoken, P = void 0 === x ? "" : x, h = i.req_time, M = void 0 === h ? "" : h, b = i.waimai_sign, D = void 0 === b ? "" : b, O = i.wm_actual_longitude, T = void 0 === O ? "" : O, z = i.wm_actual_latitude, A = void 0 === z ? "" : z, B = i.userid, C = void 0 === B ? "" : B, E = i.user_id, F = void 0 === E ? "" : E, G = i.wm_mac, H = void 0 === G ? "" : G;
    return {
        wm_ctype: o,
        wm_dtype: m,
        wm_dversion: a,
        wm_uuid: r || (0, e.default)(),
        wm_longitude: n || T,
        wm_latitude: l || A,
        wm_visitid: p || (0, d.default)(),
        wm_appversion: f,
        wm_channel: q,
        wm_did: k,
        wm_logintoken: P,
        userToken: P || "",
        req_time: M || Date.now(),
        waimai_sign: D || "/",
        wm_actual_longitude: T,
        wm_actual_latitude: A,
        userid: C,
        user_id: F,
        wm_mac: H
    };
};