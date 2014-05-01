if (document.getElementById('extra')) {
    console.log(localStorage.report);
    $.get(chrome.extension.getURL('script/injectedIntoPage.js'),
        function (data) {
            injectScript(data);
            placeAddReportLogic();
            placeShowReportDiv((localStorage.report ? JSON.parse(localStorage.report) : []).length);
            placeReportPresentationDiv();
        }
    );
}else{
    console.log('extra not found');
}
function injectScript(data) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.innerHTML = data;
    document.getElementsByTagName("head")[0].appendChild(script);

}

function placeAddReportLogic() {
    var submit = document.evaluate("//input[@type='submit']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    var deleteCheckBox = document.evaluate("//input[@name='delete']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    var addToReportDiv = document.createElement("div");
    addToReportDiv.id = "addToReportDiv";
    //addToReportDiv.innerHTML = "<input type='button' onclick='addToReport();' value='Добавить в отчет'>";
    addToReportDiv.innerHTML = "<input type='submit' onclick='addToReport();' value='Добавить в отчет'>";
    deleteCheckBox.parentNode.insertBefore(addToReportDiv, deleteCheckBox.nextSibling);
    submit.style.display = 'none';
}

function placeShowReportDiv(currSize) {
    var showReportDiv = document.createElement("div");
    showReportDiv.id = "showReportDiv";
    showReportDiv.innerHTML = "В отчете: <span id='reportCount'>"+currSize+"</span><input type='button' onclick='showReport();' value='Посмотреть отчет' />";
    var form = document.evaluate("//form", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    form.parentNode.insertBefore(showReportDiv, form);
}

function placeReportPresentationDiv() {
    var reportPresentationDiv =
        "<div id='reportPresentationDiv'>" +
            "<div>" +
            "В отчете: <span id='reportCountTab'></span> записей " +
            "<input type='button' onclick='clearReport();' value='Очистить'/> " +
            "<input type='button' style='float: right;' onclick='closeReport();' value='X' />" +
            "</div>" +
            "<table id='reportPresentationTable' style='font: 12px arial'></table>" +
            "</div>";
    $(reportPresentationDiv).css({
        "position": "fixed",
        "margin": 1,
        "padding": 5,
        "top": 50, "right": 10,
        "height": 500, "width": 520,
        "background-color": "#efe",
        "font": "10px arial",
        "zIndex": 1000000,
        "overflowY": "scroll",
        "display": "none"
    }).appendTo('body');
}

