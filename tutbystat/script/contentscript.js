chrome.extension.onRequest.addListener(onRequest);

$.get(chrome.extension.getURL('script/injectedToNewsPage.js'),
    function(data) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = data;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
);

function onRequest(request, sender, sendResponse) {
    getStatistic();
    //sendResponse(/*{"symbols": 1, "imgs": 5, "vids": 4}*/ {});
}

function getStatistic(sCnt) {
    document.defaultView.chromeExtension = chrome.extension;
    var $article = getArticleDiv();
    if ($article.length) {
        var $div = $article.clone();
        $div.find('.m_header, .b-soc-top, .b-article-details, .infoBlock footnote, script').remove();
        var imgCnt = $('img', $div).length;
        var viCnt = $('object', $div).length + $('iframe', $div).length;
        if (!sCnt) {
            $div.find(".TitledImage, .article_image, object, iframe").remove();
            $div.find("a:contains('Открыть/cкачать видео')").remove();
            $div.find("blockquote > div > a").remove();

            var text = decode($div.text());
            sCnt = text.match(/[^\s]/ig).length;
        }
        showStatDiv(sCnt, imgCnt, viCnt, text);
    } else {
        alert("Not found");
    }
}


function getArticleDiv() {
    var $div = $('div.article, [data-activity-factor = "article"]');
    var $article = $('div#article_body, div.article', $div);
    return ($article.length > 0) ? $article : $div;
}

function showStatDiv(symbCount, imgCount, videoCount, text) {
    $.get(chrome.extension.getURL('page/statDiv.html'),
        function(divHtml) {
            $(divHtml).css({
                "position": "fixed",
                "margin": 10,
                "padding": 20,
                "top": 10, "right": 10,
                "background-color": "#fee",
                "font":"14px arial",
                "zIndex": 2000000
            }).appendTo('body');
            document.getElementById("statSymbolsCount").innerHTML=symbCount;
            document.getElementById("statImagesCount").innerHTML=imgCount;
            document.getElementById("statVideoCount").innerHTML=videoCount;
            updateStorageStatus();
            if(videoCount > 0){
                getVideoCalculator(videoCount);
            }
        }
    );
    $.get(chrome.extension.getURL('page/textDiv.html'),
        function(divText) {
            $(divText).css({
                "position": "fixed",
                "margin": 1,
                "padding": 5,
                "bottom": 10, "right": 10,
                "height":400, "width":400,
                "background-color": "#efe",
                "font":"12px arial",
                "zIndex": 1000000,
                "overflow": "none",
                "display": "none"
            }).appendTo('body');
            document.getElementById("TBTextArea").innerHTML=text;
        }
    );

}


function decode(text) {
    if (!text) {
        return "";
    }
    var res = text.replace(/(<([^>]+)>)/ig, "").replace(/\&nbsp;/g, " ").replace(/&(?:[a-z]+|#x?\d+);/i, "#");
    return res;
}



function getVideoCalculator(videoCount) {
    var d = "<div>";
    for (var i = 1; i <= videoCount; i++) {
        d = d + "<div style='width: 300px'>Время:<input id='hours" + i + "' type='text' value='0' style='width:40px'/>:<input id='minutes" + i + "' type='text' value='0' style='width:40px'/>:<input id='seconds" + i + "' type='text' value='0' style='width:40px'/></div>";
    }
    d = d + "<div><input type='button' value='calc' onclick='calcSeconds();'><span id='videoSeconds' style='margin-left: 10px'>0</span> сек.</div>";
    d = d + "</div>";
    $(d).appendTo("div#TBVideoCalc");
}


