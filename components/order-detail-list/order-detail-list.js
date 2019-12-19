var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (e[o] = i[o]);
    }
    return e;
}, t = require("../toggle-more/const.js"), i = require("./const.js");

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        list: {
            type: Array,
            value: [],
            observer: function(e, t) {
                e && e !== t && this.initUserList(this.initToggle);
            }
        },
        isPindanParticipant: {
            type: Boolean
        },
        needToggle: {
            type: Boolean,
            value: !0
        },
        noSeparate: {
            type: Boolean,
            value: !1
        },
        closeupWord: {
            type: String,
            value: t.ToggleText.closeup
        },
        expandWord: {
            type: String,
            value: t.ToggleText.expand,
            observer: function(e) {
                e && this.setData({
                    toggleWord: e
                });
            }
        },
        closeUpAnim: {
            type: Boolean,
            value: !1
        },
        statusData: {
            type: Object
        }
    },
    data: {
        showSlotBefore: !0,
        inited: !1,
        canToggle: !1,
        toggleWord: t.ToggleText.expand,
        moreClass: "",
        userList: [],
        toggleList: [],
        copyToggleList: [],
        minExpandNum: i.minToggleNum,
        isUserList: !1,
        isUserToggle: !1
    },
    methods: Object.assign(t.baseMethod, {
        checkUsage: function() {
            this.data.minVersion, (0, t.canIUseThis)();
        },
        imgClickCallback: function(e) {
            var i = e.detail;
            this.triggerEvent(t.EVENT.FOOD_IMAGE, i);
        },
        initUserList: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : t.initialFunc, o = this.properties.list, s = void 0 === o ? [] : o, n = s && s.length && "user_name" in s[0] || !1, l = n && s.length > i.minToggleNum || !1, a = n && s[0].foodlist && !s[0].foodlist.length ? i.maxToggleNum : i.minToggleNum;
            this.setData({
                isUserList: n,
                minExpandNum: a,
                isUserToggle: l
            }, e.bind(this, n, l));
        },
        resolveUserData: function() {
            return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : []).map(function(e) {
                return e.user_desc = i.descMap[e.patch_order_role] || "", e;
            });
        },
        initToggle: function(e, t) {
            var o = this.properties, s = o.list, n = o.expandWord, l = o.needToggle, a = this.data.minExpandNum, r = l && t;
            if (e) {
                var g = this.resolveUserData(s), c = g;
                if (l && 1 < (c = this.copyList(s || [], a || i.minToggleNum)).length) {
                    var p = c[a - 1];
                    p.foodlist = p.foodlist.slice(0, 3);
                }
                r && this.lxToggleView(), this.setData({
                    canToggle: r,
                    userList: g,
                    toggleList: c,
                    copyToggleList: c,
                    toggleWord: n,
                    moreClass: ""
                });
            }
        },
        onClickHeaderBtns: function(i) {
            var o = i.currentTarget.dataset, s = o.code, n = o.user, l = t.CODE[s];
            l ? this.triggerEvent(l, e({
                code: s
            }, n)) : console.warn("code: " + s + "，未找到相应处理");
        },
        copyList: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1];
            return e = JSON.parse(JSON.stringify(0 < t ? e.slice(0, t) : e));
        },
        onTapToggle: function() {
            var e = this, i = this.data, o = i.userList, s = i.toggleList, n = i.copyToggleList, l = i.minExpandNum, a = this.properties, r = a.closeUpAnim, g = a.closeupWord, c = a.expandWord, p = s.length <= l;
            this.lxToggleClick(), this.setData({
                toggleList: p ? o : n,
                toggleWord: p ? g : c,
                moreClass: p ? t.ToggleClass : ""
            }, function() {
                e.lxToggleView();
            }), p || (r && this.animScrollTop(), this.scrollTopCallback());
        }
    }),
    attached: function() {
        this.checkUsage();
    },
    ready: function() {
        this.initToggle();
    }
});