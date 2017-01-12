var marshall = function(str, tabId) {
    return "LT*" + tabId + "*" + str;
}

var unmarshall = function(str, tabId) {
    if (str.substring(3,str.indexOf("*",3)) == tabId)
        return str.substring(str.indexOf("*",3)+1);
    
    return null;
}

var processCookieStr = function(cookiesStr, tabId) {
    var cookieStrList = cookiesStr.split('; ');
    var newStrList = [];
    cookieStrList.forEach(function(cookieStr){
        if (cookieStr.indexOf("LT*")==0) {
            var msg = unmarshall(cookieStr, tabId);
            if (msg !== null)
                newStrList.push(msg);
        }
    });

    return newStrList.join("; ");
};

var processSetCookieStr = function(str, tabId) {
    return marshall(str, tabId);
};
