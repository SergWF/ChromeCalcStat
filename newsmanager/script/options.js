function save_options() {
    var options = {
        injectedPage: document.getElementById("injectedPageName").value,
        md5Path: document.getElementById("md5Path").value,
        triggerPath: document.getElementById("triggerPath").value
    }
    console.log(options);
    localStorage.options = JSON.stringify(options);
    document.getElementById("saveStatus").innerHTML = "Saved";
    setTimeout(function () {
        status.innerHTML = "";
    }, 750);

}

function restore_options() {
    var storage = localStorage.options;
    var options = storage ? JSON.parse(storage) : getDefaultOptions();
    document.getElementById("injectedPageName").value = options.injectedPage;
    document.getElementById("md5Path").value = options.md5Path;
    document.getElementById("triggerPath").value = options.triggerPath;
}

function getDefaultOptions() {
    return {
        injectedPage: "change_news.htm",
        md5Path: "//input[@name='md5']",
        triggerPath: "//input[@type='submit']"
    }
}

document.addEventListener('DOMContentLoaded', function () {
    restore_options();
    document.getElementById('saveButton').addEventListener('click', save_options);
});
