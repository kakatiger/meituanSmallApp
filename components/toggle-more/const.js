Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.ToggleText = {
    expand: "展示更多",
    closeup: "点击收起"
}, exports.CODE = {
    0: "quitPindan",
    1: "modifyPindan"
};

var e = exports.EVENT = {
    TOGGLE_FOOD_IMAGE: "toggleImgEvent",
    FOOD_IMAGE: "foodImageEvent",
    SCROLL_TOP: "scrollTopEvent",
    CLOSEUP_LOG_VIEW: "closeupLogViewEvent",
    CLOSEUP_LOG_CLICK: "closeupLogClickEvent",
    EXPAND_LOG_VIEW: "expandLogViewEvent",
    EXPAND_LOG_CLICK: "expandLogClickEvent"
}, t = (exports.ToggleClass = "trans", exports.minVersion = "1.6.3"), n = (exports.initialFunc = function(e) {
    return e;
}, exports.compareVersion = function(e, t) {
    var n = void 0, i = void 0, o = void 0;
    e = e.split("."), t = t.split(".");
    for (var r = Math.max(e.length, t.length); e.length < r; ) e.push("0");
    for (;t.length < r; ) t.push("0");
    for (o = 0; o < r; o++) {
        if (n = parseInt(e[o], 10), (i = parseInt(t[o], 10)) < n) return 1;
        if (n < i) return -1;
    }
    return 0;
});

exports.canIUseThis = function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : t, i = wx.getSystemInfoSync().SDKVersion;
    return 0 <= n(i, e);
}, exports.baseMethod = {
    isExpand: function() {
        return this.data.toggleWord === this.properties.expandWord;
    },
    animScrollTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    scrollTopCallback: function() {
        this.triggerEvent(e.SCROLL_TOP);
    },
    lxExpandView: function() {
        this.triggerEvent(e.EXPAND_LOG_VIEW);
    },
    lxCloseupView: function() {
        this.triggerEvent(e.CLOSEUP_LOG_VIEW);
    },
    lxExpandClick: function() {
        this.triggerEvent(e.EXPAND_LOG_CLICK);
    },
    lxCloseupClick: function() {
        this.triggerEvent(e.CLOSEUP_LOG_CLICK);
    },
    lxToggleView: function() {
        return this.isExpand() ? this.lxExpandView() : this.lxCloseupView();
    },
    lxToggleClick: function() {
        return this.isExpand() ? this.lxExpandClick() : this.lxCloseupClick();
    }
};