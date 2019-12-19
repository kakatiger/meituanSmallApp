Component({
    properties: {
        innerText: {
            type: String,
            value: "default value"
        },
        headshot: {
            type: Array,
            value: []
        },
        wait: {
            type: Boolean,
            value: !0
        },
        collected: {
            type: Number,
            value: 0
        },
        collecting: {
            type: Number,
            value: 0
        },
        creator: {
            type: Boolean,
            value: !1
        },
        myCart: {
            type: Array,
            value: []
        }
    },
    data: {
        someData: {}
    },
    methods: {
        cancel: function(e) {
            this.triggerEvent("myCancel", e.detail);
        },
        invite: function(e) {
            this.triggerEvent("myInvite", e.detail);
        },
        showCart: function(e) {
            this.triggerEvent("myShowCart", e.detail);
        }
    }
});