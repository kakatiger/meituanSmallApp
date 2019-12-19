var r = require("../npm/qs/lib/index.js");

module.exports = function(e, a) {
    var i = "";
    try {
        if (0 !== e) {
            var n = r.parse(a);
            i = JSON.stringify({
                adType: e,
                adChargeInfo: n
            });
        }
    } catch (e) {
        console.error("charge_info 解释失败: ", e);
    }
    return i;
};