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

    chrome.storage.sync.set({ textSize: size }, () => {
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
    tags = document.getElementsByTagName("*");

    for (let i = 0; i < tags.length; i++) {
        tags[i].style.fontFamily = newFont;
    }

    chrome.storage.sync.set({ textFamily: newFont }, () => {
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

    chrome.storage.sync.get(["lineHeight"], function (result) {
        console.log("Current line height: " + result.lineHeight)
        var lineHeight = result.lineHeight;
        lineHeight += 0.5;

        if (lineHeight > 3) {
            lineHeight = 3;
        }

        tags = document.getElementsByTagName("*");

        for (let i = 0; i < tags.length; i++) {
            //var size = parseInt(window.getComputedStyle(tags[i], null).getPropertyValue("font-size")) - 1;
            tags[i].style.lineHeight = lineHeight + "";
        }

        chrome.storage.sync.set({ lineHeight: lineHeight }, () => {
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

    chrome.storage.sync.get(["lineHeight"], function (result) {
        console.log("Current line height: " + result.lineHeight)
        var lineHeight = result.lineHeight;
        lineHeight -= 0.5;

        if (lineHeight < 1) {
            lineHeight = 1;
        }

        tags = document.getElementsByTagName("*");

        for (let i = 0; i < tags.length; i++) {
            tags[i].style.lineHeight = lineHeight + "";
        }

        chrome.storage.sync.set({ lineHeight: lineHeight }, () => {
            console.log("Saved line height:" + lineHeight);
        });

    })
}

// Change font color, text or links
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
        tags[i].style.color = color
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
    htmlFilter = document.querySelector('html');
    console.log(htmlFilter.style.filter)
    htmlFilter.style.filter = htmlFilter.style.filter === 'invert(100%)' ? 'invert(0%)' : 'invert(100%)';
}