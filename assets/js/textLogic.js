// Change text size
const increaseText = document.getElementById("increaseText");

increaseText.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeTextSize,
        args: ["increase"]
    });
});

const reduceText = document.getElementById("reduceText");

reduceText.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeTextSize,
        args: ["reduce"]
    });
});

function changeTextSize(type) {
    var tags = document.getElementsByTagName("*");
    var titles = ["H1", "H2", "H3", "H4", "H5"];

    for (let i = 0; i < tags.length; i++) {
        var size = parseInt(window.getComputedStyle(tags[i], null).getPropertyValue("font-size"));

        if (type === "increase") {
            size += 1;
        } else {
            size -= 1;
        }

        tags[i].style.fontSize = size + "px";
    }

    chrome.storage.sync.set({ textSize: size }, () => {
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
    var tags = document.getElementsByTagName("*");

    for (let i = 0; i < tags.length; i++) {
        tags[i].style.fontFamily = newFont;
    }

    chrome.storage.sync.set({ textFamily: newFont }, () => {
        console.log("Saved font family: " + newFont);
    });
}

// Increase line height
const increaseLines = document.getElementById("increaseLine");

increaseLines.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeLineHeight,
        args: ["increase"]
    });
});

// Reduce line height
const reduceLines = document.getElementById("reduceLine");

reduceLines.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeLineHeight,
        args: ["reduce"]
    });
});

function changeLineHeight(type) {
    chrome.storage.sync.get(["lineHeight"], function (result) {
        console.log("Current line height: " + result.lineHeight);
        var lineHeight = result.lineHeight;

        lineHeight = type === "increase" ? lineHeight + 0.5 : lineHeight - 0.5;

        if (lineHeight > 3) {
            lineHeight = 3;
        } else if (lineHeight < 1) {
            lineHeight = 1;
        }

        var tags = document.getElementsByTagName("*");

        for (let i = 0; i < tags.length; i++) {
            tags[i].style.lineHeight = lineHeight + "";
        }

        chrome.storage.sync.set({ lineHeight: lineHeight }, () => {
            console.log("Saved line height:" + lineHeight);
        });
    });
}


// Change font color, text/links/titles
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
    var tags = document.querySelectorAll(tag);

    for (let i = 0; i < tags.length; i++) {
        tags[i].style.color = color;
    }

    if (tag === "a,cite") {
        chrome.storage.sync.set({ linksColor: color }, () => {
            console.log("Saved links color: " + color);
        });
    } else if (tag === "span,p,div,td,th") {
        chrome.storage.sync.set({ fontColor: color }, () => {
            console.log("Saved font color: " + color);
        });
    } else if (tag === "h1,h2,h3,h4,h5") {
        chrome.storage.sync.set({ titleColor: color }, () => {
            console.log("Saved titles color: " + color);
        });
    }

}

// Invert colors
const invertColor = document.getElementById("invertColor");

invertColor.addEventListener("click", async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: invertBKColor
    });
});

function invertBKColor() {
    let htmlFilter = document.querySelector('html');
    console.log(htmlFilter.style.filter);
    htmlFilter.style.filter = htmlFilter.style.filter === 'invert(100%)' ? 'invert(0%)' : 'invert(100%)';
}

// Change background color
const bkColor = document.getElementById("bkColor");

bkColor.addEventListener("input", async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeBKColor,
        args: [bkColor.value]
    });
});

function changeBKColor(color) {
    var tags = document.querySelectorAll("*");

    for (let i = 0; i < tags.length; i++) {
        tags[i].style.backgroundColor = color;
    }
}

// Change background color predefined
const predefinedBkColorbtns = document.querySelectorAll(".predefinedBkColor");

predefinedBkColorbtns.forEach((e) => {
    e.addEventListener("click", async () => {

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: changeBKColorPredefined,
            args: [e.style.backgroundColor, e.style.color]
        });
    });
});

function changeBKColorPredefined(background, color) {

    var tags = document.querySelectorAll("*");

    for (let i = 0; i < tags.length; i++) {
        tags[i].style.backgroundColor = background;
        tags[i].style.color = color;
    }
}