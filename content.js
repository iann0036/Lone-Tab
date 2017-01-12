var headElement = (document.head||document.documentElement);

var injectJs = function(fileName) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(fileName);
    headElement.insertBefore(s, headElement.firstElementChild);
};

var injectJsStr = function(str) {
    var s = document.createElement('script');
    s.innerHTML = str;
    headElement.insertBefore(s, headElement.firstElementChild);
};

chrome.storage.local.get('active',function(active){
    if (active.active) {
        chrome.runtime.sendMessage("", function(response) {
            injectJsStr("var loneTabId=" + response);
            injectJs("common.js");
            injectJs("inject.js");
        });
    }
});
