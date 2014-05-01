var reportName="TBReport";


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(checkForValidUrl(tab.url)){
        chrome.pageAction.show(tabId);
    }
});

chrome.pageAction.onClicked.addListener(function(tabId, changeInfo, tab) {
    showStatistics();
});



chrome.contextMenus.create({title: "Быстрый подсчет символов",
    contexts: ["selection"],
    onclick: function (info, tab) {
        alert(info.selectionText.match(/[^\s]/g).length + " / " + info.selectionText.length);
    }
});


function onRequest(){
    console.log("REQUEST!");
}


function checkForValidUrl(url) {
    console.log("check: " + url);
    var m = url.match(/\S+tut.by\/\S+\/\d+.html/i);
    console.log("m: " + m);
    return m && m.length > 0;
};


function showStatistics() {
    chrome.tabs.getSelected(null, function (tab) {
        console.log("send Message from tab " + tab.id);
        chrome.tabs.sendRequest(tab.id, {ask: "statistic"}, function (response) {
            //alert("response ok");
        });
    });
}


function addUrl(url){
    var report = getReport();
    report.push(url.split("?")[0]);
    writeReport(report);
}

function getReport(){
    var report = localStorage.getItem(reportName);
    return report?JSON.parse(report):[];
}

function writeReport(report){
    localStorage.setItem(reportName, JSON.stringify(report));
}

function showReport(){
    chrome.pageAction.show();
}