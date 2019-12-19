var e = require("../toggle-more/const.js");

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        spu: {
            type: Object,
            value: {}
        },
        index: {
            type: Number,
            value: 0
        }
    },
    data: {
        showSlot: !1,
        inited: !1
    },
    methods: {
        checkUsage: function() {
            (0, e.canIUseThis)();
        },
        imgClickCallback: function(e) {
            var t = e.currentTarget.dataset;
            this.triggerEvent("imgEvent", t);
        }
    },
    attached: function() {
        this.checkUsage();
    },
    ready: function() {}
});