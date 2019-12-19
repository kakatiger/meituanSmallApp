module.exports = {
    changeUrlArg: function(e, r, t) {
        var l = r + "=([^&]*)", n = r + "=" + t;
        return e.match(l) ? e.replace(new RegExp("(" + r + "=)([^&]*)"), n) : e.match("[?]") ? e + "&" + n : e + "?" + n;
    },
    delUrlArg: function(e, r) {
        var t = e, l = "", n = "";
        if (-1 < t.indexOf("?") && (l = t.split("?")[0] + "?", n = t.split("?")[1]), -1 < n.indexOf(r)) {
            for (var i = {}, a = n.split("&"), c = 0; c < a.length; c++) a[c] = a[c].split("="), 
            i[a[c][0]] = a[c][1];
            return delete i[r], l + JSON.stringify(i).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
        }
        return t;
    }
};