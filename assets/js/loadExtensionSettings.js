// Load saved data
const load = document.getElementById("load");

load.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: loadSettings,
    });
});

function loadSettings() {
    console.log("Loading settings...")

    chrome.storage.local.get(["textSize", "textFamily", "lineHeight"], function (result) {
        console.log("Current text size: " + result.textSize)
        console.log("Current text family: " + result.textFamily)
        console.log("Current line height: " + result.lineHeight)

        var tags = document.getElementsByTagName("*");

        for (let i = 0; i < tags.length; i++) {
            tags[i].style.fontFamily = result.textFamily;
            tags[i].style.fontSize = result.textSize + "px";
            tags[i].style.lineHeight = result.lineHeight + "";
        }

        console.log("Done")
    })

}

const openOptions = document.getElementById("goToOptions");

openOptions.addEventListener('click', function () {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});