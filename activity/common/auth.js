var e = {
    auth: function() {
        var e = wx.openSetting;
        e && e({
            success: function(e) {
                e.authSetting["scope.userInfo"] && (getApp().eventBus.fire("user:setauth"), wx.navigateBack());
            }
        });
    }
};

Page(e);