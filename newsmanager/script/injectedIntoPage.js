var md5Path = "//input[@name='md5']";

function addToReport() {
    var md5Element = document.evaluate(md5Path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    saveRecord(md5Element.value);
}

function getReport() {
    return localStorage.report ? JSON.parse(localStorage.report) : [];
}

function saveReport(report) {
    localStorage.report = JSON.stringify(report);
    if(document.getElementById('reportCount')){
        document.getElementById('reportCount').innerHTML = report.length;
    }
    if(document.getElementById('reportCountTab')){
        document.getElementById('reportCountTab').innerHTML = report.length;
    }
}

function saveRecord(md5Value, mark) {
    var report = getReport();
    var index = findRecord(report, md5Value);
    if (index == -1) {
        report.push({md5:md5Value, mark:mark});
    }else{
        report[index].mark = mark;
    }
    saveReport(report);
}


function findRecord(report, md5Value){
    for (var r in report) {
        if (report[r].md5 === md5Value) {
            return r;
        }
    }
    return -1;
}

function showReport() {
    var report = getReport();
    document.getElementById("reportCountTab").innerHTML = report.length;
    var reportPresentationTable = document.getElementById('reportPresentationTable');
    clearReportTable(reportPresentationTable);
    fillReportTable(reportPresentationTable, report);
    reportPresentationDiv.style.display = "block";
}

function clearReportTable(table) {
    while (table.rows.length) {
        table.deleteRow(0);
    }
}

function fillReportTable(table, report) {
    for (var row in report) {
        showRecord(report[row], table);
    }
}

function getRecordString(md5Value, mark){
    return mark?'('+mark+') '+ md5Value:md5Value;
}

function refreshRecordVal(md5Value, mark){
    document.getElementById("td_" + md5Value).innerHTML = getRecordString(md5Value, mark);
}

function showRecord(record, table) {
    var removeButton = "<input type='button' value='-' onclick='removeFromReport(\"" + record.md5 + "\");'/>";
    var hzButton = "<input type='button' value='Х' onclick='saveRecord(\""+record.md5+"\", this.value); refreshRecordVal(\""+record.md5+"\", this.value);'/>";
    var dirButton = "<input type='button' value='П' onclick='saveRecord(\""+record.md5+"\", this.value); refreshRecordVal(\""+record.md5+"\", this.value);'/>";
    var dupButton = "<input type='button' value='Д' onclick='saveRecord(\""+record.md5+"\", this.value); refreshRecordVal(\""+record.md5+"\", this.value);'/>";
    var clrButton = "<input type='button' value='' onclick='saveRecord(\""+record.md5+"\", \"\"); refreshRecordVal(\""+record.md5+"\", \"\");'/>";
    var tr = document.createElement('tr');
    tr.id = "tr_" + record.md5;
    var td1 = document.createElement('td');
    td1.id = "td_" + record.md5;
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    td1.innerHTML = getRecordString(record.md5, record.mark);
    td2.innerHTML = clrButton + hzButton  + dirButton+ dupButton;
    td3.innerHTML = removeButton;
    //td2.innerHTML = markSelect  + removeButton;
    table.appendChild(tr);
}

function removeFromReport(md5) {
    if (confirm("Удалить запись [" + md5 + "] ?")) {
        var report = getReport();
        console.log("count = " + report.length);
        var index = findRecord(report, md5)
        console.log("index = " + index);
        if ((-1 < index) && (index < report.length)) {
            report.splice(index, 1);
            saveReport(report);
            showReport();
        }


    }
}

function removeRow(tr_Id) {
    document.getElementById(tr_Id).parentNode.deleteRow(document.getElementById("tr_" + record).parentNode.rowIndex);
}

function closeReport() {
    document.getElementById("reportPresentationDiv").style.display = "none";
}

function clearReport() {
    if (confirm("Очистить отчет?")) {
        if (confirm("Точно? Восстановить нельзя будет!")) {
            saveReport([]);
            clearReportTable(document.getElementById('reportPresentationTable'));
        }
    }
}