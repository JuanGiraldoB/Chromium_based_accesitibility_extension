// Enlarge text
const enlarge = document.getElementById("enlarge");

enlarge.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: enlargeText
    });
});

function enlargeText() {
    tags = document.getElementsByTagName("*");

    for (let i = 0; i < tags.length; i++) {
        var size = parseInt(window.getComputedStyle(tags[i], null).getPropertyValue("font-size")) + 1;
        tags[i].style.fontSize = size + "px";
    }

    chrome.storage.local.set({ textSize: size }, () => {
        console.log("Saved text size:" + size);
    });
}

// Reduce text
const reduce = document.getElementById("reduce");

reduce.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: reduceText,
    });
});


function reduceText() {
    tags = document.getElementsByTagName("*");

    for (let i = 0; i < tags.length; i++) {
        var size = parseInt(window.getComputedStyle(tags[i], null).getPropertyValue("font-size")) - 1;
        tags[i].style.fontSize = size + "px";
    }

    chrome.storage.local.set({ textSize: size }, () => {
        console.log("Saved text size:" + size);
    });
}

// Change font family
const font = document.getElementById("fontFamily");

font.addEventListener("change", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeFontFamily,
        args: [font.value]
    });
});

function changeFontFamily(newFont) {
    tags = document.getElementsByTagName("*");

    for (let i = 0; i < tags.length; i++) {
        tags[i].style.fontFamily = newFont;
    }

    chrome.storage.local.set({ textFamily: newFont }, () => {
        console.log("Saved font family: " + newFont);
    });
}

// Increase line height
const increaseLines = document.getElementById("increaseLine")

increaseLines.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: increaseLineHeight
    });
});

function increaseLineHeight() {
    new Promise(resolve => {

        chrome.storage.local.get(["lineHeight"], function (result) {
            console.log("Current line height: " + result.lineHeight)
            resolve(result.lineHeight);
        })

    }).then(lineHeight => {
        lineHeight += 0.5;

        if (lineHeight > 3) {
            lineHeight = 3;
        }

        tags = document.getElementsByTagName("*");

        for (let i = 0; i < tags.length; i++) {
            //var size = parseInt(window.getComputedStyle(tags[i], null).getPropertyValue("font-size")) - 1;
            tags[i].style.lineHeight = lineHeight + "";
        }

        chrome.storage.local.set({ lineHeight: lineHeight }, () => {
            console.log("Saved line height:" + lineHeight);
        });

    });

}

// Reduce line height
const reduceLines = document.getElementById("reduceLine")

reduceLines.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: reduceLineHeight
    });
});

function reduceLineHeight() {
    new Promise(resolve => {

        chrome.storage.local.get(["lineHeight"], function (result) {
            console.log("Current line height: " + result.lineHeight)
            resolve(result.lineHeight);
        })

    }).then(lineHeight => {
        lineHeight -= 0.5;

        if (lineHeight < 1) {
            lineHeight = 1;
        }

        tags = document.getElementsByTagName("*");

        for (let i = 0; i < tags.length; i++) {
            //var size = parseInt(window.getComputedStyle(tags[i], null).getPropertyValue("font-size")) - 1;
            tags[i].style.lineHeight = lineHeight + "";
        }

        chrome.storage.local.set({ lineHeight: lineHeight }, () => {
            console.log("Saved line height:" + lineHeight);
        });

    });

}

// Change font color <tag>
const colorPicker = document.getElementById("colorPicker");

colorPicker.addEventListener("input", async () => {

    const tagToColor = document.getElementById("tagToColor");

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeColor,
        args: [colorPicker.value, tagToColor.value]
    });
});

function changeColor(color, tag) {
    tags = document.querySelectorAll(tag);
    console.log(color)
    console.log(tag)

    for (let i = 0; i < tags.length; i++) {
        tags[i].style.color = color
    }
}