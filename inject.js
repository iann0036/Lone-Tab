var cookieGetter = document.__lookupGetter__("cookie").bind(document);
var cookieSetter = document.__lookupSetter__("cookie").bind(document);

Object.defineProperty(document, 'cookie', {
    get: function() {
        var storedCookieStr = cookieGetter();
        return processCookieStr(storedCookieStr, loneTabId);
    },

    set: function(cookieString) {
        var newValue = processSetCookieStr(cookieString, loneTabId);
        return cookieSetter(newValue);
    }
});