module.exports = function() {
    var e = getCurrentPages() || [];
    return e.length ? e[e.length - 1].__route__ : "";
};