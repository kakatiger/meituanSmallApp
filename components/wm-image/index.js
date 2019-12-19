Component({
    properties: {
        src: {
            type: String,
            value: ""
        },
        failClass: {
            type: String,
            value: ""
        },
        defaultImgSrc: {
            type: String,
            value: ""
        }
    },
    data: {
        loadFail: !1
    },
    methods: {
        onImgLoadError: function() {
            this.setData({
                loadFail: !0
            });
        }
    }
});