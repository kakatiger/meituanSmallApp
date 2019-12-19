var e = function() {
    return this;
}() || Function("return this")(), r = e.regeneratorRuntime && 0 <= Object.getOwnPropertyNames(e).indexOf("regeneratorRuntime"), t = r && e.regeneratorRuntime;

if (e.regeneratorRuntime = void 0, module.exports = require("./runtime.js"), r) e.regeneratorRuntime = t; else try {
    delete e.regeneratorRuntime;
} catch (r) {
    e.regeneratorRuntime = void 0;
}