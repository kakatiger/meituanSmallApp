var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : t(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
};

!function() {
    function t(t) {
        for (var e = t.length; 0 <= --e; ) t[e] = 0;
    }
    function a(t, e, a, n, r) {
        this.static_tree = t, this.extra_bits = e, this.extra_base = a, this.elems = n, 
        this.max_length = r, this.has_stree = t && t.length;
    }
    function n(t, e) {
        this.dyn_tree = t, this.max_code = 0, this.stat_desc = e;
    }
    function r(t) {
        return t < 256 ? nt[t] : nt[256 + (t >>> 7)];
    }
    function i(t, e) {
        t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255;
    }
    function s(t, e, a) {
        t.bi_valid > X - a ? (t.bi_buf |= e << t.bi_valid & 65535, i(t, t.bi_buf), t.bi_buf = e >> X - t.bi_valid, 
        t.bi_valid += a - X) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += a);
    }
    function h(t, e, a) {
        s(t, a[2 * e], a[2 * e + 1]);
    }
    function o(t, e) {
        for (var a = 0; a |= 1 & t, t >>>= 1, a <<= 1, 0 < --e; ) ;
        return a >>> 1;
    }
    function l(t, e, a) {
        var n, r, i = new Array(W + 1), s = 0;
        for (n = 1; n <= W; n++) i[n] = s = s + a[n - 1] << 1;
        for (r = 0; r <= e; r++) {
            var h = t[2 * r + 1];
            0 !== h && (t[2 * r] = o(i[h]++, h));
        }
    }
    function _(t) {
        var e;
        for (e = 0; e < L; e++) t.dyn_ltree[2 * e] = 0;
        for (e = 0; e < M; e++) t.dyn_dtree[2 * e] = 0;
        for (e = 0; e < P; e++) t.bl_tree[2 * e] = 0;
        t.dyn_ltree[2 * Y] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0;
    }
    function d(t) {
        8 < t.bi_valid ? i(t, t.bi_buf) : 0 < t.bi_valid && (t.pending_buf[t.pending++] = t.bi_buf), 
        t.bi_buf = 0, t.bi_valid = 0;
    }
    function u(t, e, a, n) {
        var r = 2 * e, i = 2 * a;
        return t[r] < t[i] || t[r] === t[i] && n[e] <= n[a];
    }
    function f(t, e, a) {
        for (var n = t.heap[a], r = a << 1; r <= t.heap_len && (r < t.heap_len && u(e, t.heap[r + 1], t.heap[r], t.depth) && r++, 
        !u(e, n, t.heap[r], t.depth)); ) t.heap[a] = t.heap[r], a = r, r <<= 1;
        t.heap[a] = n;
    }
    function c(t, e, a) {
        var n, i, o, l, _ = 0;
        if (0 !== t.last_lit) for (;n = t.pending_buf[t.d_buf + 2 * _] << 8 | t.pending_buf[t.d_buf + 2 * _ + 1], 
        i = t.pending_buf[t.l_buf + _], _++, 0 === n ? h(t, i, e) : (h(t, (o = rt[i]) + J + 1, e), 
        0 !== (l = Q[o]) && s(t, i -= it[o], l), h(t, o = r(--n), a), 0 !== (l = Z[o]) && s(t, n -= st[o], l)), 
        _ < t.last_lit; ) ;
        h(t, Y, e);
    }
    function p(t, e) {
        var a, n, r, i = e.dyn_tree, s = e.stat_desc.static_tree, h = e.stat_desc.has_stree, o = e.stat_desc.elems, _ = -1;
        for (t.heap_len = 0, t.heap_max = K, a = 0; a < o; a++) 0 !== i[2 * a] ? (t.heap[++t.heap_len] = _ = a, 
        t.depth[a] = 0) : i[2 * a + 1] = 0;
        for (;t.heap_len < 2; ) i[2 * (r = t.heap[++t.heap_len] = _ < 2 ? ++_ : 0)] = 1, 
        t.depth[r] = 0, t.opt_len--, h && (t.static_len -= s[2 * r + 1]);
        for (e.max_code = _, a = t.heap_len >> 1; 1 <= a; a--) f(t, i, a);
        for (r = o; a = t.heap[1], t.heap[1] = t.heap[t.heap_len--], f(t, i, 1), n = t.heap[1], 
        t.heap[--t.heap_max] = a, t.heap[--t.heap_max] = n, i[2 * r] = i[2 * a] + i[2 * n], 
        t.depth[r] = (t.depth[a] >= t.depth[n] ? t.depth[a] : t.depth[n]) + 1, i[2 * a + 1] = i[2 * n + 1] = r, 
        t.heap[1] = r++, f(t, i, 1), 2 <= t.heap_len; ) ;
        t.heap[--t.heap_max] = t.heap[1], function(t, e) {
            var a, n, r, i, s, h, o = e.dyn_tree, l = e.max_code, _ = e.stat_desc.static_tree, d = e.stat_desc.has_stree, u = e.stat_desc.extra_bits, f = e.stat_desc.extra_base, c = e.stat_desc.max_length, p = 0;
            for (i = 0; i <= W; i++) t.bl_count[i] = 0;
            for (o[2 * t.heap[t.heap_max] + 1] = 0, a = t.heap_max + 1; a < K; a++) (i = o[2 * o[2 * (n = t.heap[a]) + 1] + 1] + 1) > c && (i = c, 
            p++), o[2 * n + 1] = i, l < n || (t.bl_count[i]++, s = 0, f <= n && (s = u[n - f]), 
            h = o[2 * n], t.opt_len += h * (i + s), d && (t.static_len += h * (_[2 * n + 1] + s)));
            if (0 !== p) {
                do {
                    for (i = c - 1; 0 === t.bl_count[i]; ) i--;
                    t.bl_count[i]--, t.bl_count[i + 1] += 2, t.bl_count[c]--, p -= 2;
                } while (0 < p);
                for (i = c; 0 !== i; i--) for (n = t.bl_count[i]; 0 !== n; ) (r = t.heap[--a]) > l || (o[2 * r + 1] !== i && (t.opt_len += (i - o[2 * r + 1]) * o[2 * r], 
                o[2 * r + 1] = i), n--);
            }
        }(t, e), l(i, _, t.bl_count);
    }
    function g(t, e, a) {
        var n, r, i = -1, s = e[1], h = 0, o = 7, l = 4;
        for (0 === s && (o = 138, l = 3), e[2 * (a + 1) + 1] = 65535, n = 0; n <= a; n++) r = s, 
        s = e[2 * (n + 1) + 1], ++h < o && r === s || (h < l ? t.bl_tree[2 * r] += h : 0 !== r ? (r !== i && t.bl_tree[2 * r]++, 
        t.bl_tree[2 * q]++) : h <= 10 ? t.bl_tree[2 * F]++ : t.bl_tree[2 * G]++, i = r, 
        l = (h = 0) === s ? (o = 138, 3) : r === s ? (o = 6, 3) : (o = 7, 4));
    }
    function b(t, e, a) {
        var n, r, i = -1, o = e[1], l = 0, _ = 7, d = 4;
        for (0 === o && (_ = 138, d = 3), n = 0; n <= a; n++) if (r = o, o = e[2 * (n + 1) + 1], 
        !(++l < _ && r === o)) {
            if (l < d) for (;h(t, r, t.bl_tree), 0 != --l; ) ; else 0 !== r ? (r !== i && (h(t, r, t.bl_tree), 
            l--), h(t, q, t.bl_tree), s(t, l - 3, 2)) : l <= 10 ? (h(t, F, t.bl_tree), s(t, l - 3, 3)) : (h(t, G, t.bl_tree), 
            s(t, l - 11, 7));
            i = r, d = (l = 0) === o ? (_ = 138, 3) : r === o ? (_ = 6, 3) : (_ = 7, 4);
        }
    }
    function v(t, e, a, n) {
        var r, h, o;
        s(t, (N << 1) + (n ? 1 : 0), 3), h = e, o = a, d(r = t), i(r, o), i(r, ~o), H.arraySet(r.pending_buf, r.window, h, o, r.pending), 
        r.pending += o;
    }
    function m(t, e) {
        return t.msg = gt[e], e;
    }
    function w(t) {
        return (t << 1) - (4 < t ? 9 : 0);
    }
    function y(t) {
        for (var e = t.length; 0 <= --e; ) t[e] = 0;
    }
    function k(t) {
        var e = t.state, a = e.pending;
        a > t.avail_out && (a = t.avail_out), 0 !== a && (H.arraySet(t.output, e.pending_buf, e.pending_out, a, t.next_out), 
        t.next_out += a, e.pending_out += a, t.total_out += a, t.avail_out -= a, e.pending -= a, 
        0 === e.pending && (e.pending_out = 0));
    }
    function z(t, e) {
        ut._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, e), 
        t.block_start = t.strstart, k(t.strm);
    }
    function x(t, e) {
        t.pending_buf[t.pending++] = e;
    }
    function A(t, e) {
        t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e;
    }
    function S(t, e) {
        var a, n, r = t.max_chain_length, i = t.strstart, s = t.prev_length, h = t.nice_match, o = t.strstart > t.w_size - Et ? t.strstart - (t.w_size - Et) : 0, l = t.window, _ = t.w_mask, d = t.prev, u = t.strstart + It, f = l[i + s - 1], c = l[i + s];
        t.prev_length >= t.good_match && (r >>= 2), h > t.lookahead && (h = t.lookahead);
        do {
            if (l[(a = e) + s] === c && l[a + s - 1] === f && l[a] === l[i] && l[++a] === l[i + 1]) {
                i += 2, a++;
                do {} while (l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && i < u);
                if (n = It - (u - i), i = u - It, s < n) {
                    if (t.match_start = e, h <= (s = n)) break;
                    f = l[i + s - 1], c = l[i + s];
                }
            }
        } while ((e = d[e & _]) > o && 0 != --r);
        return s <= t.lookahead ? s : t.lookahead;
    }
    function B(t) {
        var e, a, n, r, i, s, h, o, l, _, d = t.w_size;
        do {
            if (r = t.window_size - t.lookahead - t.strstart, t.strstart >= d + (d - Et)) {
                for (H.arraySet(t.window, t.window, d, d, 0), t.match_start -= d, t.strstart -= d, 
                t.block_start -= d, e = a = t.hash_size; n = t.head[--e], t.head[e] = d <= n ? n - d : 0, 
                --a; ) ;
                for (e = a = d; n = t.prev[--e], t.prev[e] = d <= n ? n - d : 0, --a; ) ;
                r += d;
            }
            if (0 === t.strm.avail_in) break;
            if (s = t.strm, h = t.window, o = t.strstart + t.lookahead, l = r, _ = void 0, _ = s.avail_in, 
            l < _ && (_ = l), a = 0 === _ ? 0 : (s.avail_in -= _, H.arraySet(h, s.input, s.next_in, _, o), 
            1 === s.state.wrap ? s.adler = ft(s.adler, h, _, o) : 2 === s.state.wrap && (s.adler = pt(s.adler, h, _, o)), 
            s.next_in += _, s.total_in += _, _), t.lookahead += a, t.lookahead + t.insert >= jt) for (i = t.strstart - t.insert, 
            t.ins_h = t.window[i], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[i + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[i + jt - 1]) & t.hash_mask, 
            t.prev[i & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = i, i++, t.insert--, !(t.lookahead + t.insert < jt)); ) ;
        } while (t.lookahead < Et && 0 !== t.strm.avail_in);
    }
    function C(t, e) {
        for (var a, n; ;) {
            if (t.lookahead < Et) {
                if (B(t), t.lookahead < Et && e === bt) return Rt;
                if (0 === t.lookahead) break;
            }
            if (a = 0, t.lookahead >= jt && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + jt - 1]) & t.hash_mask, 
            a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 
            0 !== a && t.strstart - a <= t.w_size - Et && (t.match_length = S(t, a)), t.match_length >= jt) if (n = ut._tr_tally(t, t.strstart - t.match_start, t.match_length - jt), 
            t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= jt) {
                for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + jt - 1]) & t.hash_mask, 
                a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, 
                0 != --t.match_length; ) ;
                t.strstart++;
            } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], 
            t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask; else n = ut._tr_tally(t, 0, t.window[t.strstart]), 
            t.lookahead--, t.strstart++;
            if (n && (z(t, !1), 0 === t.strm.avail_out)) return Rt;
        }
        return t.insert = t.strstart < jt - 1 ? t.strstart : jt - 1, e === vt ? (z(t, !0), 
        0 === t.strm.avail_out ? Ht : Nt) : t.last_lit && (z(t, !1), 0 === t.strm.avail_out) ? Rt : Vt;
    }
    function T(t, e) {
        for (var a, n, r; ;) {
            if (t.lookahead < Et) {
                if (B(t), t.lookahead < Et && e === bt) return Rt;
                if (0 === t.lookahead) break;
            }
            if (a = 0, t.lookahead >= jt && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + jt - 1]) & t.hash_mask, 
            a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 
            t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = jt - 1, 
            0 !== a && t.prev_length < t.max_lazy_match && t.strstart - a <= t.w_size - Et && (t.match_length = S(t, a), 
            t.match_length <= 5 && (1 === t.strategy || t.match_length === jt && 4096 < t.strstart - t.match_start) && (t.match_length = jt - 1)), 
            t.prev_length >= jt && t.match_length <= t.prev_length) {
                for (r = t.strstart + t.lookahead - jt, n = ut._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - jt), 
                t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= r && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + jt - 1]) & t.hash_mask, 
                a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 
                0 != --t.prev_length; ) ;
                if (t.match_available = 0, t.match_length = jt - 1, t.strstart++, n && (z(t, !1), 
                0 === t.strm.avail_out)) return Rt;
            } else if (t.match_available) {
                if ((n = ut._tr_tally(t, 0, t.window[t.strstart - 1])) && z(t, !1), t.strstart++, 
                t.lookahead--, 0 === t.strm.avail_out) return Rt;
            } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (n = ut._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), 
        t.insert = t.strstart < jt - 1 ? t.strstart : jt - 1, e === vt ? (z(t, !0), 0 === t.strm.avail_out ? Ht : Nt) : t.last_lit && (z(t, !1), 
        0 === t.strm.avail_out) ? Rt : Vt;
    }
    function D(t, e, a, n, r) {
        this.good_length = t, this.max_lazy = e, this.nice_length = a, this.max_chain = n, 
        this.func = r;
    }
    function j() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, 
        this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, 
        this.method = xt, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, 
        this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, 
        this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, 
        this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, 
        this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, 
        this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, 
        this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new H.Buf16(2 * Tt), 
        this.dyn_dtree = new H.Buf16(2 * (2 * Bt + 1)), this.bl_tree = new H.Buf16(2 * (2 * Ct + 1)), 
        y(this.dyn_ltree), y(this.dyn_dtree), y(this.bl_tree), this.l_desc = null, this.d_desc = null, 
        this.bl_desc = null, this.bl_count = new H.Buf16(Dt + 1), this.heap = new H.Buf16(2 * St + 1), 
        y(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new H.Buf16(2 * St + 1), 
        y(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, 
        this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, 
        this.bi_valid = 0;
    }
    function I(t) {
        var e;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = zt, (e = t.state).pending = 0, 
        e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? Ut : Ot, 
        t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = bt, ut._tr_init(e), mt) : m(t, wt);
    }
    function E(t) {
        var e, a = I(t);
        return a === mt && ((e = t.state).window_size = 2 * e.w_size, y(e.head), e.max_lazy_match = _t[e.level].max_lazy, 
        e.good_match = _t[e.level].good_length, e.nice_match = _t[e.level].nice_length, 
        e.max_chain_length = _t[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, 
        e.insert = 0, e.match_length = e.prev_length = jt - 1, e.match_available = 0, e.ins_h = 0), 
        a;
    }
    function U(t, e, a, n, r, i) {
        if (!t) return wt;
        var s = 1;
        if (e === yt && (e = 6), n < 0 ? (s = 0, n = -n) : 15 < n && (s = 2, n -= 16), r < 1 || At < r || a !== xt || n < 8 || 15 < n || e < 0 || 9 < e || i < 0 || kt < i) return m(t, wt);
        8 === n && (n = 9);
        var h = new j();
        return (t.state = h).strm = t, h.wrap = s, h.gzhead = null, h.w_bits = n, h.w_size = 1 << h.w_bits, 
        h.w_mask = h.w_size - 1, h.hash_bits = r + 7, h.hash_size = 1 << h.hash_bits, h.hash_mask = h.hash_size - 1, 
        h.hash_shift = ~~((h.hash_bits + jt - 1) / jt), h.window = new H.Buf8(2 * h.w_size), 
        h.head = new H.Buf16(h.hash_size), h.prev = new H.Buf16(h.w_size), h.lit_bufsize = 1 << r + 6, 
        h.pending_buf_size = 4 * h.lit_bufsize, h.pending_buf = new H.Buf8(h.pending_buf_size), 
        h.d_buf = 1 * h.lit_bufsize, h.l_buf = 3 * h.lit_bufsize, h.level = e, h.strategy = i, 
        h.method = a, E(t);
    }
    function O(t, e) {
        if (e < 65537 && (t.subarray && Mt || !t.subarray && Lt)) return String.fromCharCode.apply(null, H.shrinkBuf(t, e));
        for (var a = "", n = 0; n < e; n++) a += String.fromCharCode(t[n]);
        return a;
    }
    function R(t) {
        if (!(this instanceof R)) return new R(t);
        this.options = H.assign({
            level: Ft,
            method: Qt,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: Gt,
            to: ""
        }, t || {});
        var e = this.options;
        e.raw && 0 < e.windowBits ? e.windowBits = -e.windowBits : e.gzip && 0 < e.windowBits && e.windowBits < 16 && (e.windowBits += 16), 
        this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Xt(), 
        this.strm.avail_out = 0;
        var a = Jt.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
        if (a !== qt) throw new Error(gt[a]);
        if (e.header && Jt.deflateSetHeader(this.strm, e.header), e.dictionary) {
            var n;
            if (n = "string" == typeof e.dictionary ? Wt.string2buf(e.dictionary) : "[object ArrayBuffer]" === Yt.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary, 
            (a = Jt.deflateSetDictionary(this.strm, n)) !== qt) throw new Error(gt[a]);
            this._dict_set = !0;
        }
    }
    var V, H = (function(t, a) {
        var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
        a.assign = function(t) {
            for (var a = Array.prototype.slice.call(arguments, 1); a.length; ) {
                var n = a.shift();
                if (n) {
                    if ("object" != (void 0 === n ? "undefined" : e(n))) throw new TypeError(n + "must be non-object");
                    for (var r in n) n.hasOwnProperty(r) && (t[r] = n[r]);
                }
            }
            return t;
        }, a.shrinkBuf = function(t, e) {
            return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e, t);
        };
        var r = {
            arraySet: function(t, e, a, n, r) {
                if (e.subarray && t.subarray) t.set(e.subarray(a, a + n), r); else for (var i = 0; i < n; i++) t[r + i] = e[a + i];
            },
            flattenChunks: function(t) {
                var e, a, n, r, i, s;
                for (e = n = 0, a = t.length; e < a; e++) n += t[e].length;
                for (s = new Uint8Array(n), e = r = 0, a = t.length; e < a; e++) i = t[e], s.set(i, r), 
                r += i.length;
                return s;
            }
        }, i = {
            arraySet: function(t, e, a, n, r) {
                for (var i = 0; i < n; i++) t[r + i] = e[a + i];
            },
            flattenChunks: function(t) {
                return [].concat.apply([], t);
            }
        };
        a.setTyped = function(t) {
            t ? (a.Buf8 = Uint8Array, a.Buf16 = Uint16Array, a.Buf32 = Int32Array, a.assign(a, r)) : (a.Buf8 = Array, 
            a.Buf16 = Array, a.Buf32 = Array, a.assign(a, i));
        }, a.setTyped(n);
    }(0, (V = {
        exports: {}
    }).exports), V.exports), N = 0, J = 256, L = J + 1 + 29, M = 30, P = 19, K = 2 * L + 1, W = 15, X = 16, Y = 256, q = 16, F = 17, G = 18, Q = [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0 ], Z = [ 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13 ], $ = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7 ], tt = [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ], et = new Array(2 * (L + 2));
    t(et);
    var at = new Array(2 * M);
    t(at);
    var nt = new Array(512);
    t(nt);
    var rt = new Array(256);
    t(rt);
    var it = new Array(29);
    t(it);
    var st = new Array(M);
    t(st);
    var ht, ot, lt, _t, dt = !1, ut = {
        _tr_init: function(t) {
            dt || (function() {
                var t, e, n, r, i, s = new Array(W + 1);
                for (r = n = 0; r < 28; r++) for (it[r] = n, t = 0; t < 1 << Q[r]; t++) rt[n++] = r;
                for (rt[n - 1] = r, r = i = 0; r < 16; r++) for (st[r] = i, t = 0; t < 1 << Z[r]; t++) nt[i++] = r;
                for (i >>= 7; r < M; r++) for (st[r] = i << 7, t = 0; t < 1 << Z[r] - 7; t++) nt[256 + i++] = r;
                for (e = 0; e <= W; e++) s[e] = 0;
                for (t = 0; t <= 143; ) et[2 * t + 1] = 8, t++, s[8]++;
                for (;t <= 255; ) et[2 * t + 1] = 9, t++, s[9]++;
                for (;t <= 279; ) et[2 * t + 1] = 7, t++, s[7]++;
                for (;t <= 287; ) et[2 * t + 1] = 8, t++, s[8]++;
                for (l(et, L + 1, s), t = 0; t < M; t++) at[2 * t + 1] = 5, at[2 * t] = o(t, 5);
                ht = new a(et, Q, J + 1, L, W), ot = new a(at, Z, 0, M, W), lt = new a(new Array(0), $, 0, P, 7);
            }(), dt = !0), t.l_desc = new n(t.dyn_ltree, ht), t.d_desc = new n(t.dyn_dtree, ot), 
            t.bl_desc = new n(t.bl_tree, lt), t.bi_buf = 0, t.bi_valid = 0, _(t);
        },
        _tr_stored_block: v,
        _tr_flush_block: function(t, e, a, n) {
            var r, i, h = 0;
            0 < t.level ? (2 === t.strm.data_type && (t.strm.data_type = function(t) {
                var e, a = 4093624447;
                for (e = 0; e <= 31; e++, a >>>= 1) if (1 & a && 0 !== t.dyn_ltree[2 * e]) return 0;
                if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return 1;
                for (e = 32; e < J; e++) if (0 !== t.dyn_ltree[2 * e]) return 1;
                return 0;
            }(t)), p(t, t.l_desc), p(t, t.d_desc), h = function(t) {
                var e;
                for (g(t, t.dyn_ltree, t.l_desc.max_code), g(t, t.dyn_dtree, t.d_desc.max_code), 
                p(t, t.bl_desc), e = P - 1; 3 <= e && 0 === t.bl_tree[2 * tt[e] + 1]; e--) ;
                return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e;
            }(t), r = t.opt_len + 3 + 7 >>> 3, (i = t.static_len + 3 + 7 >>> 3) <= r && (r = i)) : r = i = a + 5, 
            a + 4 <= r && -1 !== e ? v(t, e, a, n) : 4 === t.strategy || i === r ? (s(t, 2 + (n ? 1 : 0), 3), 
            c(t, et, at)) : (s(t, 4 + (n ? 1 : 0), 3), function(t, e, a, n) {
                var r;
                for (s(t, e - 257, 5), s(t, a - 1, 5), s(t, n - 4, 4), r = 0; r < n; r++) s(t, t.bl_tree[2 * tt[r] + 1], 3);
                b(t, t.dyn_ltree, e - 1), b(t, t.dyn_dtree, a - 1);
            }(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, h + 1), c(t, t.dyn_ltree, t.dyn_dtree)), 
            _(t), n && d(t);
        },
        _tr_tally: function(t, e, a) {
            return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, 
            t.pending_buf[t.l_buf + t.last_lit] = 255 & a, t.last_lit++, 0 === e ? t.dyn_ltree[2 * a]++ : (t.matches++, 
            e--, t.dyn_ltree[2 * (rt[a] + J + 1)]++, t.dyn_dtree[2 * r(e)]++), t.last_lit === t.lit_bufsize - 1;
        },
        _tr_align: function(t) {
            var e;
            s(t, 2, 3), h(t, Y, et), 16 === (e = t).bi_valid ? (i(e, e.bi_buf), e.bi_buf = 0, 
            e.bi_valid = 0) : 8 <= e.bi_valid && (e.pending_buf[e.pending++] = 255 & e.bi_buf, 
            e.bi_buf >>= 8, e.bi_valid -= 8);
        }
    }, ft = function(t, e, a, n) {
        for (var r = 65535 & t | 0, i = t >>> 16 & 65535 | 0, s = 0; 0 !== a; ) {
            for (a -= s = 2e3 < a ? 2e3 : a; i = i + (r = r + e[n++] | 0) | 0, --s; ) ;
            r %= 65521, i %= 65521;
        }
        return r | i << 16 | 0;
    }, ct = function() {
        for (var t, e = [], a = 0; a < 256; a++) {
            t = a;
            for (var n = 0; n < 8; n++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
            e[a] = t;
        }
        return e;
    }(), pt = function(t, e, a, n) {
        var r = ct, i = n + a;
        t ^= -1;
        for (var s = n; s < i; s++) t = t >>> 8 ^ r[255 & (t ^ e[s])];
        return -1 ^ t;
    }, gt = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
    }, bt = 0, vt = 4, mt = 0, wt = -2, yt = -1, kt = 4, zt = 2, xt = 8, At = 9, St = 286, Bt = 30, Ct = 19, Tt = 2 * St + 1, Dt = 15, jt = 3, It = 258, Et = It + jt + 1, Ut = 42, Ot = 113, Rt = 1, Vt = 2, Ht = 3, Nt = 4;
    _t = [ new D(0, 0, 0, 0, function(t, e) {
        var a = 65535;
        for (a > t.pending_buf_size - 5 && (a = t.pending_buf_size - 5); ;) {
            if (t.lookahead <= 1) {
                if (B(t), 0 === t.lookahead && e === bt) return Rt;
                if (0 === t.lookahead) break;
            }
            t.strstart += t.lookahead, t.lookahead = 0;
            var n = t.block_start + a;
            if ((0 === t.strstart || t.strstart >= n) && (t.lookahead = t.strstart - n, t.strstart = n, 
            z(t, !1), 0 === t.strm.avail_out)) return Rt;
            if (t.strstart - t.block_start >= t.w_size - Et && (z(t, !1), 0 === t.strm.avail_out)) return Rt;
        }
        return t.insert = 0, e === vt ? (z(t, !0), 0 === t.strm.avail_out ? Ht : Nt) : (t.strstart > t.block_start && (z(t, !1), 
        t.strm.avail_out), Rt);
    }), new D(4, 4, 8, 4, C), new D(4, 5, 16, 8, C), new D(4, 6, 32, 32, C), new D(4, 4, 16, 16, T), new D(8, 16, 32, 32, T), new D(8, 16, 128, 128, T), new D(8, 32, 128, 256, T), new D(32, 128, 258, 1024, T), new D(32, 258, 258, 4096, T) ];
    var Jt = {
        deflateInit: function(t, e) {
            return U(t, e, xt, 15, 8, 0);
        },
        deflateInit2: U,
        deflateReset: E,
        deflateResetKeep: I,
        deflateSetHeader: function(t, e) {
            return t && t.state ? 2 !== t.state.wrap ? wt : (t.state.gzhead = e, mt) : wt;
        },
        deflate: function(t, e) {
            var a, n, r, i;
            if (!t || !t.state || 5 < e || e < 0) return t ? m(t, wt) : wt;
            if (n = t.state, !t.output || !t.input && 0 !== t.avail_in || 666 === n.status && e !== vt) return m(t, 0 === t.avail_out ? -5 : wt);
            if (n.strm = t, a = n.last_flush, n.last_flush = e, n.status === Ut) if (2 === n.wrap) t.adler = 0, 
            x(n, 31), x(n, 139), x(n, 8), n.gzhead ? (x(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), 
            x(n, 255 & n.gzhead.time), x(n, n.gzhead.time >> 8 & 255), x(n, n.gzhead.time >> 16 & 255), 
            x(n, n.gzhead.time >> 24 & 255), x(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), 
            x(n, 255 & n.gzhead.os), n.gzhead.extra && n.gzhead.extra.length && (x(n, 255 & n.gzhead.extra.length), 
            x(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (t.adler = pt(t.adler, n.pending_buf, n.pending, 0)), 
            n.gzindex = 0, n.status = 69) : (x(n, 0), x(n, 0), x(n, 0), x(n, 0), x(n, 0), x(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), 
            x(n, 3), n.status = Ot); else {
                var s = xt + (n.w_bits - 8 << 4) << 8;
                s |= (2 <= n.strategy || n.level < 2 ? 0 : n.level < 6 ? 1 : 6 === n.level ? 2 : 3) << 6, 
                0 !== n.strstart && (s |= 32), s += 31 - s % 31, n.status = Ot, A(n, s), 0 !== n.strstart && (A(n, t.adler >>> 16), 
                A(n, 65535 & t.adler)), t.adler = 1;
            }
            if (69 === n.status) if (n.gzhead.extra) {
                for (r = n.pending; n.gzindex < (65535 & n.gzhead.extra.length) && (n.pending !== n.pending_buf_size || (n.gzhead.hcrc && n.pending > r && (t.adler = pt(t.adler, n.pending_buf, n.pending - r, r)), 
                k(t), r = n.pending, n.pending !== n.pending_buf_size)); ) x(n, 255 & n.gzhead.extra[n.gzindex]), 
                n.gzindex++;
                n.gzhead.hcrc && n.pending > r && (t.adler = pt(t.adler, n.pending_buf, n.pending - r, r)), 
                n.gzindex === n.gzhead.extra.length && (n.gzindex = 0, n.status = 73);
            } else n.status = 73;
            if (73 === n.status) if (n.gzhead.name) {
                r = n.pending;
                do {
                    if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > r && (t.adler = pt(t.adler, n.pending_buf, n.pending - r, r)), 
                    k(t), r = n.pending, n.pending === n.pending_buf_size)) {
                        i = 1;
                        break;
                    }
                    x(n, i = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0);
                } while (0 !== i);
                n.gzhead.hcrc && n.pending > r && (t.adler = pt(t.adler, n.pending_buf, n.pending - r, r)), 
                0 === i && (n.gzindex = 0, n.status = 91);
            } else n.status = 91;
            if (91 === n.status) if (n.gzhead.comment) {
                r = n.pending;
                do {
                    if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > r && (t.adler = pt(t.adler, n.pending_buf, n.pending - r, r)), 
                    k(t), r = n.pending, n.pending === n.pending_buf_size)) {
                        i = 1;
                        break;
                    }
                    x(n, i = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0);
                } while (0 !== i);
                n.gzhead.hcrc && n.pending > r && (t.adler = pt(t.adler, n.pending_buf, n.pending - r, r)), 
                0 === i && (n.status = 103);
            } else n.status = 103;
            if (103 === n.status && (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && k(t), 
            n.pending + 2 <= n.pending_buf_size && (x(n, 255 & t.adler), x(n, t.adler >> 8 & 255), 
            t.adler = 0, n.status = Ot)) : n.status = Ot), 0 !== n.pending) {
                if (k(t), 0 === t.avail_out) return n.last_flush = -1, mt;
            } else if (0 === t.avail_in && w(e) <= w(a) && e !== vt) return m(t, -5);
            if (666 === n.status && 0 !== t.avail_in) return m(t, -5);
            if (0 !== t.avail_in || 0 !== n.lookahead || e !== bt && 666 !== n.status) {
                var h = 2 === n.strategy ? function(t, e) {
                    for (var a; ;) {
                        if (0 === t.lookahead && (B(t), 0 === t.lookahead)) {
                            if (e === bt) return Rt;
                            break;
                        }
                        if (t.match_length = 0, a = ut._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, 
                        t.strstart++, a && (z(t, !1), 0 === t.strm.avail_out)) return Rt;
                    }
                    return t.insert = 0, e === vt ? (z(t, !0), 0 === t.strm.avail_out ? Ht : Nt) : t.last_lit && (z(t, !1), 
                    0 === t.strm.avail_out) ? Rt : Vt;
                }(n, e) : 3 === n.strategy ? function(t, e) {
                    for (var a, n, r, i, s = t.window; ;) {
                        if (t.lookahead <= It) {
                            if (B(t), t.lookahead <= It && e === bt) return Rt;
                            if (0 === t.lookahead) break;
                        }
                        if (t.match_length = 0, t.lookahead >= jt && 0 < t.strstart && (n = s[r = t.strstart - 1]) === s[++r] && n === s[++r] && n === s[++r]) {
                            i = t.strstart + It;
                            do {} while (n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && r < i);
                            t.match_length = It - (i - r), t.match_length > t.lookahead && (t.match_length = t.lookahead);
                        }
                        if (t.match_length >= jt ? (a = ut._tr_tally(t, 1, t.match_length - jt), t.lookahead -= t.match_length, 
                        t.strstart += t.match_length, t.match_length = 0) : (a = ut._tr_tally(t, 0, t.window[t.strstart]), 
                        t.lookahead--, t.strstart++), a && (z(t, !1), 0 === t.strm.avail_out)) return Rt;
                    }
                    return t.insert = 0, e === vt ? (z(t, !0), 0 === t.strm.avail_out ? Ht : Nt) : t.last_lit && (z(t, !1), 
                    0 === t.strm.avail_out) ? Rt : Vt;
                }(n, e) : _t[n.level].func(n, e);
                if (h !== Ht && h !== Nt || (n.status = 666), h === Rt || h === Ht) return 0 === t.avail_out && (n.last_flush = -1), 
                mt;
                if (h === Vt && (1 === e ? ut._tr_align(n) : 5 !== e && (ut._tr_stored_block(n, 0, 0, !1), 
                3 === e && (y(n.head), 0 === n.lookahead && (n.strstart = 0, n.block_start = 0, 
                n.insert = 0))), k(t), 0 === t.avail_out)) return n.last_flush = -1, mt;
            }
            return e !== vt ? mt : n.wrap <= 0 ? 1 : (2 === n.wrap ? (x(n, 255 & t.adler), x(n, t.adler >> 8 & 255), 
            x(n, t.adler >> 16 & 255), x(n, t.adler >> 24 & 255), x(n, 255 & t.total_in), x(n, t.total_in >> 8 & 255), 
            x(n, t.total_in >> 16 & 255), x(n, t.total_in >> 24 & 255)) : (A(n, t.adler >>> 16), 
            A(n, 65535 & t.adler)), k(t), 0 < n.wrap && (n.wrap = -n.wrap), 0 !== n.pending ? mt : 1);
        },
        deflateEnd: function(t) {
            var e;
            return t && t.state ? (e = t.state.status) !== Ut && 69 !== e && 73 !== e && 91 !== e && 103 !== e && e !== Ot && 666 !== e ? m(t, wt) : (t.state = null, 
            e === Ot ? m(t, -3) : mt) : wt;
        },
        deflateSetDictionary: function(t, e) {
            var a, n, r, i, s, h, o, l, _ = e.length;
            if (!t || !t.state) return wt;
            if (2 === (i = (a = t.state).wrap) || 1 === i && a.status !== Ut || a.lookahead) return wt;
            for (1 === i && (t.adler = ft(t.adler, e, _, 0)), a.wrap = 0, _ >= a.w_size && (0 === i && (y(a.head), 
            a.strstart = 0, a.block_start = 0, a.insert = 0), l = new H.Buf8(a.w_size), H.arraySet(l, e, _ - a.w_size, a.w_size, 0), 
            e = l, _ = a.w_size), s = t.avail_in, h = t.next_in, o = t.input, t.avail_in = _, 
            t.next_in = 0, t.input = e, B(a); a.lookahead >= jt; ) {
                for (n = a.strstart, r = a.lookahead - (jt - 1); a.ins_h = (a.ins_h << a.hash_shift ^ a.window[n + jt - 1]) & a.hash_mask, 
                a.prev[n & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = n, n++, --r; ) ;
                a.strstart = n, a.lookahead = jt - 1, B(a);
            }
            return a.strstart += a.lookahead, a.block_start = a.strstart, a.insert = a.lookahead, 
            a.lookahead = 0, a.match_length = a.prev_length = jt - 1, a.match_available = 0, 
            t.next_in = h, t.input = o, t.avail_in = s, a.wrap = i, mt;
        },
        deflateInfo: "pako deflate (from Nodeca project)"
    }, Lt = !0, Mt = !0;
    try {
        String.fromCharCode.apply(null, [ 0 ]);
    } catch (t) {
        Lt = !1;
    }
    try {
        String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (t) {
        Mt = !1;
    }
    for (var Pt = new H.Buf8(256), Kt = 0; Kt < 256; Kt++) Pt[Kt] = 252 <= Kt ? 6 : 248 <= Kt ? 5 : 240 <= Kt ? 4 : 224 <= Kt ? 3 : 192 <= Kt ? 2 : 1;
    Pt[254] = Pt[254] = 1;
    var Wt = {
        string2buf: function(t) {
            var e, a, n, r, i, s = t.length, h = 0;
            for (r = 0; r < s; r++) 55296 == (64512 & (a = t.charCodeAt(r))) && r + 1 < s && 56320 == (64512 & (n = t.charCodeAt(r + 1))) && (a = 65536 + (a - 55296 << 10) + (n - 56320), 
            r++), h += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4;
            for (e = new H.Buf8(h), r = i = 0; i < h; r++) 55296 == (64512 & (a = t.charCodeAt(r))) && r + 1 < s && 56320 == (64512 & (n = t.charCodeAt(r + 1))) && (a = 65536 + (a - 55296 << 10) + (n - 56320), 
            r++), e[i++] = a < 128 ? a : (e[i++] = a < 2048 ? 192 | a >>> 6 : (e[i++] = a < 65536 ? 224 | a >>> 12 : (e[i++] = 240 | a >>> 18, 
            128 | a >>> 12 & 63), 128 | a >>> 6 & 63), 128 | 63 & a);
            return e;
        },
        buf2binstring: function(t) {
            return O(t, t.length);
        },
        binstring2buf: function(t) {
            for (var e = new H.Buf8(t.length), a = 0, n = e.length; a < n; a++) e[a] = t.charCodeAt(a);
            return e;
        },
        buf2string: function(t, e) {
            var a, n, r, i, s = e || t.length, h = new Array(2 * s);
            for (a = n = 0; a < s; ) if ((r = t[a++]) < 128) h[n++] = r; else if (4 < (i = Pt[r])) h[n++] = 65533, 
            a += i - 1; else {
                for (r &= 2 === i ? 31 : 3 === i ? 15 : 7; 1 < i && a < s; ) r = r << 6 | 63 & t[a++], 
                i--;
                h[n++] = 1 < i ? 65533 : r < 65536 ? r : (r -= 65536, h[n++] = 55296 | r >> 10 & 1023, 
                56320 | 1023 & r);
            }
            return O(h, n);
        },
        utf8border: function(t, e) {
            var a;
            for ((e = e || t.length) > t.length && (e = t.length), a = e - 1; 0 <= a && 128 == (192 & t[a]); ) a--;
            return a < 0 ? e : 0 === a ? e : a + Pt[t[a]] > e ? a : e;
        }
    }, Xt = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, 
        this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, 
        this.data_type = 2, this.adler = 0;
    }, Yt = Object.prototype.toString, qt = 0, Ft = -1, Gt = 0, Qt = 8;
    R.prototype.push = function(t, e) {
        var a, n, r = this.strm, i = this.options.chunkSize;
        if (this.ended) return !1;
        n = e === ~~e ? e : !0 === e ? 4 : 0, "string" == typeof t ? r.input = Wt.string2buf(t) : "[object ArrayBuffer]" === Yt.call(t) ? r.input = new Uint8Array(t) : r.input = t, 
        r.next_in = 0, r.avail_in = r.input.length;
        do {
            if (0 === r.avail_out && (r.output = new H.Buf8(i), r.next_out = 0, r.avail_out = i), 
            1 !== (a = Jt.deflate(r, n)) && a !== qt) return this.onEnd(a), !(this.ended = !0);
            0 !== r.avail_out && (0 !== r.avail_in || 4 !== n && 2 !== n) || ("string" === this.options.to ? this.onData(Wt.buf2binstring(H.shrinkBuf(r.output, r.next_out))) : this.onData(H.shrinkBuf(r.output, r.next_out)));
        } while ((0 < r.avail_in || 0 === r.avail_out) && 1 !== a);
        return 4 === n ? (a = Jt.deflateEnd(this.strm), this.onEnd(a), this.ended = !0, 
        a === qt) : 2 !== n || (this.onEnd(qt), !(r.avail_out = 0));
    }, R.prototype.onData = function(t) {
        this.chunks.push(t);
    }, R.prototype.onEnd = function(t) {
        t === qt && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = H.flattenChunks(this.chunks)), 
        this.chunks = [], this.err = t, this.msg = this.strm.msg;
    };
    var Zt = function(t, e) {
        var a = new R(e);
        if (a.push(t, !0), a.err) throw a.msg || gt[a.err];
        return a.result;
    }, $t = function(t) {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(t);
    }, te = "undefined" != typeof top && top.btoa || function(t) {
        for (var e = [], a = 0, n = t.length, r = 0, i = 0; i < n; ++i) 3 === (a += 1) && (a = 0), 
        r = t.charCodeAt(i), 0 === a ? e.push($t(63 & (t.charCodeAt(i - 1) << 2 | r >> 6)), $t(63 & r)) : 1 === a ? e.push($t(r >> 2 & 63)) : e.push($t(63 & (t.charCodeAt(i - 1) << 4 | r >> 4))), 
        i === n - 1 && 0 < a && e.push($t(r << (3 - a << 1) & 63));
        if (a) for (;a < 3; ) a += 1, e.push("=");
        return e.join("");
    }, ee = function(t) {
        var e = Zt(JSON.stringify(t), {
            to: "string"
        });
        return te(e);
    }, ae = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : e(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
    }, ne = {
        f: 0,
        r: 0,
        w: 0,
        h: 0
    }, re = {
        rId: 0,
        ts: 0,
        cts: 0,
        brVD: [],
        brR: [],
        bI: [],
        mT: [],
        kT: [],
        aT: [],
        tT: [],
        sign: ""
    };
    try {
        wx.getSystemInfo({
            success: function(t) {
                var e = t.pixelRatio, a = t.windowWidth, n = t.windowHeight;
                ne.r = e, ne.w = a, ne.h = n;
            }
        });
    } catch (t) {}
    var ie = {
        i: function(t) {
            ne.f = t;
        },
        m: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e = t.touches, a = t.changedTouches, n = a && a[0] || e && e[0];
            if (n) {
                var r = n.clientX, i = void 0 === r ? 0 : r, s = n.clientY, h = void 0 === s ? 0 : s, o = e && e.length || a && a.length || 0;
                re.mT = [ i + "," + h ].concat(re.mT.slice(0, 29)), re.tT = [ i + "," + h + "," + o ].concat(re.tT.slice(0, 29));
            }
        },
        t: function() {
            var t = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).detail, e = t && t.x || 0, a = t && t.y || 0;
            re.aT = [ e + "," + a + ",view" ].concat(re.aT.slice(0, 29));
        },
        r: function(t) {
            !function() {
                if (re.rId = ne.f, 0 === re.ts && (re.ts = Date.now()), 0 === re.brVD.length || 0 === re.brVD[0] || 0 === re.brVD[1]) {
                    var t = ne.r, e = ne.w, a = ne.h, n = [ e, a ], r = [ Math.round(t * e), Math.round(t * a) ], i = r;
                    re.brVD = n, re.brR = [ r, i, 24, 24 ];
                }
            }();
            var e = "", a = "";
            try {
                var n = getCurrentPages(), r = n.length;
                e = n[r - 1].__route__, 1 < r && (a = n[r - 2].__route__);
            } catch (t) {}
            var i, s, h = "";
            try {
                i = t, s = [], Object.keys(i).sort().forEach(function(t) {
                    var e = i[t];
                    "_token" !== t && (e && "object" === (void 0 === e ? "undefined" : ae(e)) && (e = JSON.stringify(e)), 
                    s.push(t + "=" + e));
                }), h = ee(s.join("&"));
            } catch (t) {}
            re.sign = h, re.cts = Date.now(), re.bI = [ e, a ];
            try {
                return ee(re);
            } catch (t) {
                return "";
            }
        }
    };
    module.exports = ie;
}();