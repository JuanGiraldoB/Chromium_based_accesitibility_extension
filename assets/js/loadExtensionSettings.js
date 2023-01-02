// Load saved data
const load = document.getElementById("load");

load.addEventListener("click", async () => {
    chrome.storage.sync.get(["spacing"], function (result) {
        textSpacing.checked = result.spacing;
    });


    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: loadSettings,
        args: [classesToAvoid]
    });
});


function loadSettings(...classesToAvoid) {
    function getTitleFontSize(title) {
        switch (title) {
            case "H1": return 32;
            case "H2": return 24;
            case "H3": return 20.8;
            case "H4": return 16;
            case "H5": return 12.8;
            case "H5": return 11.2;
        }
    }

    chrome.storage.sync.get(["textSize",
        "textFamily",
        "lineHeight",
        "fontColor",
        "linksColor",
        "titleColor",
        "spacing",
        "predefinedBk",
        "predefinedFontColor",
        "predfinedBkColor",
        "customBk"],
        function (result) {
            let tags = document.getElementsByTagName("*");
            let titles = ["H1", "H2", "H3", "H4", "H5", "H6"]; // https://stackoverflow.com/questions/2430000/determine-if-string-is-in-list-in-javascript
            for (let i = tags.length; i--;) {
                let tagName = tags[i].tagName;
                let tagClass = tags[i].className;

                tags[i].style.fontFamily = result.textFamily;
                tags[i].style.fontSize = result.textSize + "px";
                tags[i].style.lineHeight = result.lineHeight + "";

                if (result.spacing === true) {
                    const fontSize = parseInt(window.getComputedStyle(tags[i], null).getPropertyValue("font-size"));
                    tags[i].style.letterSpacing = fontSize * 0.16 + "px";
                    tags[i].style.wordSpacing = fontSize * 0.20 + "px";
                }

                if (result.predefinedBk === true) {
                    tags[i].style.color = result.predefinedFontColor;
                    tags[i].style.backgroundColor = result.predfinedBkColor;
                    continue;
                }

                if (!classesToAvoid[0].includes(tagClass)) {
                    tags[i].style.backgroundColor = result.customBk;
                }

                if (result.fontColor !== undefined && tagName !== "A" && !titles.includes(tagName)) {
                    tags[i].style.color = result.fontColor;
                } else if (result.linksColor !== undefined && tagName === "A") {
                    tags[i].style.color = result.linksColor;
                } else if (result.titleColor !== undefined && titles.includes(tagName)) {
                    tags[i].style.color = result.titleColor;
                    tags[i].style.fontSize = Math.abs(result.textSize - 16) + getTitleFontSize(tagName) + 5 + "px";
                }
            }
        });
        console.log("loaded");
}