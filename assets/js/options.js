const saveBtn = document.getElementById("save")

saveBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        displayEnlarge: isChecked("checkEnlarge") + "",
        displayReduce: isChecked("checkReduce") + "",
        displayIncreaseLineHeight: isChecked("checkIncreaseLine") + "",
        displayReduceLineHeight: isChecked("checkReduceLine") + "",
        displayColorPicker: isChecked("checkColorPicker") + "",
        displayFont: isChecked("checkFont") + "",
        displayTTS: isChecked("checkTTS") + "",
        displayLoadSettings: isChecked("checkLoadSettings") + "",
        displayOptions: isChecked("checkOptions") + ""
    });
});

function isChecked(id) {
    return document.getElementById(id).checked ? "block" : "none";
}

function restoreOptions() {
    chrome.storage.local.get([
        "displayEnlarge",
        "displayReduce",
        "displayFont",
        "displayIncreaseLineHeight",
        "displayReduceLineHeight",
        "displayColorPicker",
        "displayTTS",
        "displayOptions",
        "displayLoadSettings"],
        function (result) {
            document.getElementById("checkEnlarge").checked = isDisplayed(result.displayEnlarge),
                document.getElementById("checkReduce").checked = isDisplayed(result.displayReduce),
                document.getElementById("checkIncreaseLine").checked = isDisplayed(result.displayIncreaseLineHeight),
                document.getElementById("checkReduceLine").checked = isDisplayed(result.displayReduceLineHeight),
                document.getElementById("checkColorPicker").checked = isDisplayed(result.displayColorPicker),
                document.getElementById("checkFont").checked = isDisplayed(result.displayFont),
                document.getElementById("checkTTS").checked = isDisplayed(result.displayTTS),
                document.getElementById("checkLoadSettings").checked = isDisplayed(result.displayLoadSettings),
                document.getElementById("checkOptions").checked = isDisplayed(result.displayOptions)
        });
}

function isDisplayed(value) {
    return value == "block" ? true : false;
}

document.addEventListener('DOMContentLoaded', restoreOptions);