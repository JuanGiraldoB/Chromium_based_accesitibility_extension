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

// Change font color <a>
const colorPickerA = document.getElementById("colorPickerA");

colorPickerA.addEventListener("input", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeColor,
        args: [colorPickerA.value, "a"]
    });
});

// Change font color <span>
const colorPickerS = document.getElementById("colorPickerS");

colorPickerS.addEventListener("input", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeColor,
        args: [colorPickerS.value, "s"]
    });
});

// Change font color <h1>
const colorPickerH1 = document.getElementById("colorPickerH1");

colorPickerH1.addEventListener("input", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeColor,
        args: [colorPickerH1.value, "h1"]
    });
});

// Change font color <h2>
const colorPickerH2 = document.getElementById("colorPickerH2");

colorPickerH2.addEventListener("input", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeColor,
        args: [colorPickerH2.value, "h2"]
    });
});

// Change font color <h3>
const colorPickerH3 = document.getElementById("colorPickerH3");

colorPickerH3.addEventListener("input", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeColor,
        args: [colorPickerH3.value, "h3"]
    });
});

// Change font color <h4>
const colorPickerH4 = document.getElementById("colorPickerH4");

colorPickerH4.addEventListener("input", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeColor,
        args: [colorPickerH4.value, "h4"]
    });
});

// Change font color <h5>
const colorPickerH5 = document.getElementById("colorPickerH5");

colorPickerH5.addEventListener("input", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeColor,
        args: [colorPickerH5.value, "h5"]
    });
});


function changeColor(val, tag) {
    tags = document.getElementsByTagName(tag);

    for (let i = 0; i < tags.length; i++) {
        tags[i].style.color = val
    }
}

