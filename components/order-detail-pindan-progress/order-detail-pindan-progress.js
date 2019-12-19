var e = require("../toggle-more/const.js");

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        list: {
            type: Array,
            value: []
        },
        enable: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        showSlotBefore: !0,
        inited: !1
    },
    methods: {
        checkUsage: function() {
            this.data.minVersion, (0, e.canIUseThis)();
        }
    },
    attached: function() {
        this.checkUsage();
    },
    ready: function() {}
});