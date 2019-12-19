exports.ENV = {
    BETA: "beta",
    PPE: "ppe",
    PRODUCT: "product"
}, exports.ACT_TYPE = {
    LOAD_POINT: 1,
    CLICK_POINT: 2,
    IMPRESSION_POINT: 3,
    REACH_POINT: 4
}, exports.SERVER_TYPE = {
    DIANPING: "dianping",
    MEITUAN: "meituan",
    MEITUAN_WAIMAI: "meituan_waimai"
}, exports.SERVER_TYPE_URL = {}, exports.SERVER_TYPE_URL[exports.SERVER_TYPE.DIANPING] = {}, 
exports.SERVER_TYPE_URL[exports.SERVER_TYPE.DIANPING][exports.ENV.BETA] = "//m.51ping.com/adp/log", 
exports.SERVER_TYPE_URL[exports.SERVER_TYPE.DIANPING][exports.ENV.PPE] = "//m.51ping.com/adp/log", 
exports.SERVER_TYPE_URL[exports.SERVER_TYPE.DIANPING][exports.ENV.PRODUCT] = "//m.dianping.com/adp/log", 
exports.SERVER_TYPE_URL[exports.SERVER_TYPE.MEITUAN] = {}, exports.SERVER_TYPE_URL[exports.SERVER_TYPE.MEITUAN][exports.ENV.BETA] = "//mlog.test.meituan.com/log", 
exports.SERVER_TYPE_URL[exports.SERVER_TYPE.MEITUAN][exports.ENV.PPE] = "//mlog.test.meituan.com/log", 
exports.SERVER_TYPE_URL[exports.SERVER_TYPE.MEITUAN][exports.ENV.PRODUCT] = "//mlog.meituan.com/log", 
exports.SERVER_TYPE_URL[exports.SERVER_TYPE.MEITUAN_WAIMAI] = {}, exports.SERVER_TYPE_URL[exports.SERVER_TYPE.MEITUAN_WAIMAI][exports.ENV.BETA] = "//mlog.51ping.com/mtwmadlog", 
exports.SERVER_TYPE_URL[exports.SERVER_TYPE.MEITUAN_WAIMAI][exports.ENV.PPE] = "//mlog.dianping.com/mtwmdebug", 
exports.SERVER_TYPE_URL[exports.SERVER_TYPE.MEITUAN_WAIMAI][exports.ENV.PRODUCT] = "//mlog.dianping.com/mtwmadlog", 
exports.NETWORK_TYPE = {
    unknown: -1,
    none: -1,
    wifi: 0,
    "2g": 1,
    "3g": 2,
    "4g": 3
};