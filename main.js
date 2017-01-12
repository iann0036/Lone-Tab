var isActive = false;

function updateCookieSetting() {
    chrome.storage.local.get('active',function(active){
        if (active.active) {
            isActive = true;
        } else {
            isActive = false;
        }
    });
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        if (!isActive) {
            return;
        }
        details.requestHeaders.forEach(function(requestHeader){
            if (requestHeader.name.toLowerCase() === "cookie") {
                requestHeader.value = processCookieStr(requestHeader.value, details.tabId);
            }
        });
        return {
            requestHeaders: details.requestHeaders
        };
    }, {
        urls: [ "*://*/*" ]
    }, ['blocking', 'requestHeaders']
);

chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
        if (!isActive) {
            return;
        }
        details.responseHeaders.forEach(function(responseHeader){
            if (responseHeader.name.toLowerCase() === "set-cookie") {
                responseHeader.value = processSetCookieStr(responseHeader.value, details.tabId);
            }
        });
        return {
            responseHeaders: details.responseHeaders
        };
    }, {
        urls: ["*://*/*"]
    }, ['blocking','responseHeaders']
);

updateCookieSetting();

chrome.storage.onChanged.addListener(function(changes, namespace) {
    updateCookieSetting();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(sender.tab.id);
});