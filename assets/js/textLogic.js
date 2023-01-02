// Optimize for loops Reference: http://jsbench.github.io/#67b13d4e78cdd0d7a7346410d5becf12
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

function changeTextSize(...type) {
    let tags = document.getElementsByTagName("*");
    let size;

    for (let i = tags.length; i--;) {
        size = parseInt(window.getComputedStyle(tags[i], null).getPropertyValue("font-size"));

        if (type[0] === "increase") {
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

// // Change font family
const fontFamily = document.getElementById("fontFamily");

fontFamily.addEventListener("change", async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeFontFamily,
        args: [fontFamily.value]
    });
});

function changeFontFamily(...newFont) {
    let tags = document.getElementsByTagName("*");

    for (let i = tags.length; i--;) {
        tags[i].style.fontFamily = newFont[0];
    }

    chrome.storage.sync.set({ textFamily: newFont[0] }, () => {
        console.log("Saved font family: " + newFont[0]);
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

function changeLineHeight(...type) {
    chrome.storage.sync.get(["lineHeight"], function (result) {
        let lineHeight = result.lineHeight;

        lineHeight = type[0] === "increase" ? lineHeight + 0.5 : lineHeight - 0.5;

        if (lineHeight > 4) {
            lineHeight = 4;
        } else if (lineHeight < 1) {
            lineHeight = 1;
        }

        let tags = document.getElementsByTagName("*");

        for (let i = tags.length; i--;) {
            tags[i].style.lineHeight = lineHeight + "";
        }

        chrome.storage.sync.set({ lineHeight: lineHeight }, () => {
            console.log("Saved line height:" + lineHeight);
        });
    });
}

// Change font color, text/links/titles
const colorPicker = document.querySelectorAll(".colorPicker");

colorPicker.forEach((e) => {
    e.addEventListener("input", async () => {

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: changeColor,
            args: [e.value, e.name]
        });
    });
});

function changeColor(color, tag) {
    let tags;
    const tagsToExclude = ["A", "CITE", "H1", "H2", "H3", "H4", "H5", "H6"];

    if (tag === "text") {
        tags = document.getElementsByTagName("*");
    } else {
        tags = document.querySelectorAll(tag);
    }

    for (let i = tags.length; i--;) {
        if (tag === "text" && tagsToExclude.includes(tags[i].tagName)) {
            continue;
        }

        tags[i].style.color = color;
    }

    if (tag === "a,cite") {
        chrome.storage.sync.set({ linksColor: color }, () => {
            console.log("Saved links color: " + color);
        });
    } else if (tag === "text") {
        chrome.storage.sync.set({ fontColor: color }, () => {
            console.log("Saved font color: " + color);
        });
    } else if (tag === "h1,h2,h3,h4,h5") {
        chrome.storage.sync.set({ titleColor: color }, () => {
            console.log("Saved titles color: " + color);
        });
    }

}

// // Change background color
const bkColor = document.getElementById("colorPickerBackground");
const classesToAvoid = ["notyf", "notyf-announcer"];

bkColor.addEventListener("input", async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeBKColor,
        args: [bkColor.value, classesToAvoid]
    });
});

function changeBKColor(color, classesToAvoid) {
    let tags = document.querySelectorAll("*");

    for (let i = tags.length; i--;) {
        let tagClass = tags[i].className;

        if (!classesToAvoid.includes(tagClass)) {
            tags[i].style.backgroundColor = color;
        }
    }

    chrome.storage.sync.set({ customBk: color }, () => {
        console.log("Saved custom BK: " + color);
    });
}

// Change background color predefined
const predefinedBkColorbtns = document.querySelectorAll(".predefinedBkColor");

predefinedBkColorbtns.forEach((e) => {
    e.addEventListener("click", async () => {
        const background = window.getComputedStyle(e).backgroundColor;
        const color = window.getComputedStyle(e).color;
        const type = e.title;

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: changeBKColorPredefined,
            args: [background, color, classesToAvoid, type]
        });
    });
});

function changeBKColorPredefined(background, color, classesToAvoid, type) {
    let tags = document.querySelectorAll("*");

    for (let i = tags.length; i--;) {
        if (!classesToAvoid.includes(tags[i].className)) {

            if (type === "og") {
                tags[i].style.backgroundColor = '';
                tags[i].style.color = '';
            } else {
                tags[i].style.backgroundColor = background;
                tags[i].style.color = color;
            }
        }
    }

    const value = type === "og" ? false : true;

    chrome.storage.sync.set({
        predefinedBk: value,
        predefinedFontColor: color,
        predfinedBkColor: background
    }, () => {
        console.log("Saved predefined: " + value);
    });

}

// text spacing https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html

const textSpacing = document.getElementById("textSpacing");

textSpacing.addEventListener("change", async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeTextSpacing,
        args: [textSpacing.checked]
    });
});

function changeTextSpacing(...checked) {
    let tags = document.querySelectorAll("*");
    let fontSize;
    let letterSpace;
    let wordSpace;

    for (let i = tags.length; i--;) {

        if (checked[0]) {
            fontSize = parseInt(window.getComputedStyle(tags[i], null).getPropertyValue("font-size"));
            letterSpace = fontSize * 0.12;
            wordSpace = fontSize * 0.16;
        } else {
            letterSpace = "initial";
            wordSpace = "initial";
        }

        tags[i].style.letterSpacing = checked[0] ? letterSpace + "px" : letterSpace;
        tags[i].style.wordSpacing = checked[0] ? wordSpace + "px" : wordSpace;
    }

    chrome.storage.sync.set({ spacing: checked[0] }, () => {
        console.log("Saved spacing: " + checked[0]);
    });

}

