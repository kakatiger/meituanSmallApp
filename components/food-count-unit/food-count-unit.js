Component({
    properties: {
        foodItem: String,
        item: Object,
        cartCountMap: Object,
        foodStatus: Number,
        poiStatus: Number
    },
    methods: {
        onClickAddFood: function(t) {
            var o = t.currentTarget.dataset, e = o.id, i = o.foodid, d = o.attrs, r = void 0 === d ? [] : d, n = o.item;
            this.triggerEvent("onClickAddFood", {
                id: e,
                foodid: i,
                attrs: r,
                item: n
            });
        },
        onClickDelFood: function(t) {
            var o = t.currentTarget.dataset, e = o.id, i = o.foodid, d = o.attrs, r = void 0 === d ? [] : d, n = o.item;
            this.triggerEvent("onClickDelFood", {
                id: e,
                foodid: i,
                attrs: r,
                item: n
            });
        },
        onClickChooseFood: function(t) {
            var o = t.currentTarget.dataset, e = o.id, i = o.item;
            this.triggerEvent("onClickChooseFood", {
                id: e,
                item: i
            });
        },
        onClickModalFoodDel: function(t) {
            var o = t.currentTarget.dataset;
            this.triggerEvent("onClickModalFoodDel", o);
        },
        onClickModalFoodAdd: function(t) {
            var o = t.currentTarget.dataset;
            this.triggerEvent("onClickModalFoodAdd", o);
        }
    }
});