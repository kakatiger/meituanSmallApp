var e = require("./const.js");

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        index: {
            type: String,
            value: null
        },
        showFirst: {
            type: Boolean,
            value: !0
        },
        closeupWord: {
            type: String,
            value: e.ToggleText.closeup
        },
        expandWord: {
            type: String,
            value: e.ToggleText.expand,
            observer: function(e) {
                e && this.setData({
                    toggleWord: e
                });
            }
        },
        needToggle: {
            type: Boolean,
            value: !0
        },
        list: {
            type: Array,
            value: [],
            observer: function(e, t) {
                e && e !== t && this.initToggle();
            }
        },
        closeUpAnim: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        canToggle: !1,
        showSlotBefore: !0,
        inited: !1,
        toggleWord: e.ToggleText.expand,
        moreFoodImgClass: "",
        toggleList: [],
        copyToggleList: []
    },
    methods: Object.assign(e.baseMethod, {
        initialize: function() {
            this.initToggle();
        },
        checkUsage: function() {
            this.data.minVersion, (0, e.canIUseThis)();
        },
        initToggle: function() {
            var t = this.properties, o = t.closeupWord, i = t.needToggle, l = t.index, s = t.showFirst, g = t.list, n = this.data, a = n.toggleWord, r = n.moreFoodImgClass, c = i ? this.copyList(g || [], 3) : g, p = c, d = i && g && 3 < g.length;
            d && this.lxToggleView(), "0" === l && s && (p = c, c = g, a = o, r = e.ToggleClass), 
            this.setData({
                canToggle: d,
                toggleList: c,
                toggleWord: a,
                copyToggleList: p,
                moreFoodImgClass: r
            });
        },
        imgClickCallback: function(t) {
            var o = t.detail;
            this.triggerEvent(e.EVENT.TOGGLE_FOOD_IMAGE, o);
        },
        onTapToggle: function() {
            var t = this, o = this.data, i = o.toggleList, l = o.copyToggleList, s = this.properties, g = s.list, n = s.closeUpAnim, a = s.closeupWord, r = s.expandWord, c = i.length <= 3;
            this.lxToggleClick(), this.setData({
                toggleList: c ? g : l,
                toggleWord: c ? a : r,
                moreFoodImgClass: c ? e.ToggleClass : ""
            }, function() {
                t.lxToggleView();
            }), c || (n && this.animScrollTop(), this.scrollTopCallback());
        },
        copyList: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1];
            return e = 0 < t ? e.slice(0, t) : e;
        }
    }),
    attached: function() {
        this.checkUsage();
    },
    ready: function() {
        this.initialize();
    }
});