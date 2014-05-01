function showText() {
    var el = document.getElementById('TBtextDiv');
    if (el.style.display == 'none') {
        document.getElementById('TBshowTextButton').value = 'Убрать текст';
        el.style.display = 'block';
    } else {
        document.getElementById('TBshowTextButton').value = 'Показать текст';
        el.style.display = 'none';
    }
}

function calcSeconds() {
    var videoCount = document.getElementById('statVideoCount').innerHTML;
    console.log(videoCount);
    var h = 0, m = 0, s = 0;
    for (var i = 1; i <= videoCount; i++) {
        h += (+document.getElementById('hours' + i).value);
        m += (+document.getElementById('minutes' + i).value);
        s += (+document.getElementById('seconds' + i).value);
    }
    var ss = h * 3600 + m * 60 + s;
    document.getElementById('videoSeconds').innerHTML = ss;
}


function reCalcText(text) {
    document.getElementById('statSymbolsCount').innerHTML = (text.match(/[^\s]/ig) || '').length;
}

function addUrlToReport(){
    /*
    var url = document.URL.split("?")[0];
    var el = document.getElementById('TBToReportButton');
    var report = getReport();
    report.push(url);
    writeReport(report);
    updateStorageStatus();
    */
    console.log("------------------------");
    console.log(chromeExtension);
    console.log("------------------------");
    /*
    chrome.extension.sendRequest({do: "add_url", url:url}, function (response) {
        console.log("response OK: " + response);
    });
    */
}

function updateStorageStatus(){
    var report = getReport();
    document.getElementById('TBNewsInStorage').innerHTML =  report?report.length:0;
}

function getReport(){
    var report = localStorage.getItem(reportName);
    return report?JSON.parse(report):[];
}

function writeReport(report){
    localStorage.setItem(reportName, JSON.stringify(report));
}
function showReport(){
    var report = getReport();
    console.log("start report");
    for(var row in report){
        console.log(report[row]);
    }
    console.log("end report");
}