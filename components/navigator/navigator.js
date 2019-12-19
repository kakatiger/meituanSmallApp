Component({
    externalClasses: [ "view-class", "navigator-class" ],
    properties: {
        url: {
            type: String,
            value: ""
        }
    },
    methods: {
        onTab: function() {
            this.triggerEvent("navtap");
        }
    }
});