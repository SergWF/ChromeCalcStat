chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(checkForValidUrl(options.injectedPage, tab.url)){
        chrome.pageAction.show(tabId);
    }

});


function checkForValidUrl(injectedPage, url) {
    var m =url.indexOf(injectedPage);
    console.log(injectedPage + ": " + url + " "+ m);
    return url.indexOf(injectedPage) > -1;
};


