var t = String.prototype.replace, r = /%20/g;

module.exports = {
    default: "RFC3986",
    formatters: {
        RFC1738: function(e) {
            return t.call(e, r, "+");
        },
        RFC3986: function(t) {
            return t;
        }
    },
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
};