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

// Load saved data
const load = document.getElementById("load");

load.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: loadData,
    });
});

function loadData() {
    console.log("Loading data...")

    new Promise(resolve => {

        chrome.storage.local.get(["textSize", "textFamily", "lineHeight"], function (result) {
            console.log("Current text size: " + result.textSize)
            console.log("Current text family: " + result.textFamily)
            console.log("Current line height: " + result.lineHeight)
            let data = {
                "textFamily": result.textFamily,
                "textSize": result.textSize,
                "lineHeight": result.lineHeight
            }
            resolve(data);
        })

    }).then(data => {
        console.log("Changing values...")

        var tags = document.getElementsByTagName("*");
        for (let i = 0; i < tags.length; i++) {
            tags[i].style.fontSize = data["textSize"] + "px";
            tags[i].style.fontFamily = data["textFamily"];
            tags[i].style.lineHeight = data["lineHeight"] + "";
        }

        console.log("Done")
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

// Add commands ?

function commandTest() {
    chrome.commands.onCommand.addListener(function (command) {
        if (command === "Ctrl+L") {
            console.log("Ctrl-L successful.");
        }
        else if (command === "Ctrl+M") {
            console.log("Ctrl+M successful.");
        }
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

// Text to speech
// ToDo: Avoid having to click twice to change tts.value
const tts = document.getElementById("tts");

tts.addEventListener("click", async () => {
    tts.value = tts.value === "true" ? "false" : "true";

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: textToSpeech,
        args: [tts.value, tts]
    });
});


function textToSpeech(ttsValue) {
    var tags = document.querySelectorAll("p, span, h1, h2, h3, h4, a, b, img, td");

    // if the tags have the "addedFunction" attribute it means the eventIstener has already
    // been added to the tags so there is no need to run the "for each" after this if statement
    if (tags[0].hasAttribute("addedFunction")) {
        if (ttsValue != "true") {
            console.log("1: ")
            tags.forEach((tag) => {
                tag.setAttribute("ttsActive", "false")
            })

            return;

        } else {
            console.log("2: ")
            tags.forEach((tag) => {
                tag.setAttribute("ttsActive", "true")
            })

            return;
        }
    }

    tags.forEach((tag) => {
        tag.setAttribute("addedFunction", "1")
        tag.addEventListener("click", function clicked(e) {

            var msg = new SpeechSynthesisUtterance();
            var language = document.documentElement.lang;

            msg.rate = 5;
            msg.lang = language == "es" ? "es" : "en";
            msg.text = "";

            if (tag.getAttribute("ttsActive") === "false") {
                return;
            }
            if (tag.tagName == "IMG") {
                msg.text = tag.alt;
            } else {
                msg.text = e.target.innerText;
            }


            tag.style.backgroundColor = "yellow";
            window.speechSynthesis.speak(msg);

            let interval = setInterval(() => {
                if (!speechSynthesis.speaking) {
                    window.speechSynthesis.cancel();
                    tag.style.removeProperty('background-color');
                    clearInterval(interval);
                    msg.text = "";
                }
            }, 1000);

        });
    });

}

// Pause - Resume TTS
const pauseResumeTTS = document.getElementById("pauseResumeTTS");

pauseResumeTTS.addEventListener("click", async () => {

    if (pauseResumeTTS.value === "pause") {
        pauseResumeTTS.value = "resume";
        pauseResumeTTS.innerHTML = '<i class="bi bi-pause-circle-fill"></i>'
    } else {
        pauseResumeTTS.value = "pause";
        pauseResumeTTS.innerHTML = '<i class="bi bi-play-circle-fill"></i>'
    }

    // pauseResumeTTS.value = pauseResumeTTS.value === "pause" ? "resume": "pause";

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: stopTTS,
        args: [pauseResumeTTS.value]
    });
});

function stopTTS(pause) {
    console.log(pause)

    if (pause === "pause") {
        window.speechSynthesis.pause();
    } else {
        window.speechSynthesis.resume();
    }

}