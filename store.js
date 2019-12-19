function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var r = e(require("./api/wmRequest.js")), t = e(require("./utils/createEnhancer.js")), u = (0, 
require("./npm/redux/lib/index.js").createStore)(require("./reducers/index.js"), (0, 
t.default)({
    beforeDispatch: [],
    afterDispatch: [ r.default.update ]
}));

module.exports = u;