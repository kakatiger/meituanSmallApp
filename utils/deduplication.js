module.exports = function(r) {
    return function(e) {
        var n = new Set();
        return e.reduce(function(e, t) {
            var u = r(t);
            return n.has(u) || (n.add(u), e.push(t)), e;
        }, []);
    };
};