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

    chrome.storage.sync.get(["textSize", "textFamily", "lineHeight", "fontColor", "linksColor", "titleColor"], function (result) {
        console.log("Current text size: " + result.textSize);
        console.log("Current text family: " + result.textFamily);
        console.log("Current line height: " + result.lineHeight);
        console.log("Current font color: " + result.fontColor);
        console.log("Current links color: " + result.linksColor);
        console.log("Current title color: " + result.titleColor);

        var tags = document.getElementsByTagName("*");
        var titles = ["H1","H2","H3","H4","H5"]; // https://stackoverflow.com/questions/2430000/determine-if-string-is-in-list-in-javascript

        for (let i = 0; i < tags.length; i++) {
            // console.log(tags[i].tagName);

            if (result.fontColor !== undefined && tags[i].tagName !== "A" && !titles.includes(tags[i].tagName)) {
                tags[i].style.color = result.fontColor;
            }else if (result.linksColor !== undefined && tags[i].tagName === "A"){
                tags[i].style.color = result.linksColor;
            }else if (result.titleColor !== undefined && titles.includes(tags[i].tagName)){
                tags[i].style.color = result.titleColor;
            }

            tags[i].style.fontFamily = result.textFamily;
            tags[i].style.fontSize = result.textSize + "px";
            tags[i].style.lineHeight = result.lineHeight + "";
        }

        console.log("Done")
    })

}