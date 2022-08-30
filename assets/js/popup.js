// Enlarge text
const enlarge = document.getElementById("enlarge");

enlarge.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: enlargeText,
        //args: ["prueba"]
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

        chrome.storage.local.get(["textSize", "textFamily"], function (result) {
            console.log("Current text size: " + result.textSize)
            console.log("Current text family: " + result.textFamily)
            let data = {
                "textFamily": result.textFamily,
                "textSize": result.textSize
            }
            resolve(data);
        })

    }).then(data => {
        console.log("Changing text size...")

        tags = document.getElementsByTagName("*");
        for (let i = 0; i < tags.length; i++) {
            tags[i].style.fontSize = data["textSize"] + "px";
            tags[i].style.fontFamily = data["TextFamily"];
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

// Change line height

function changeLineHeight() {
    tags = document.getElementsByTagName("*");

    for (let i = 0; i < tags.length; i++) {
        tags[i].style.lineHeight = '3';
    }

}

// Text to speech
const tts = document.getElementById("tts");

tts.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: textToSpeech,
    });
});


function textToSpeech() {
    let msg = new SpeechSynthesisUtterance();
    msg.text = "";
    
    tags = document.querySelectorAll("p, span, h1, h2, h3, a, code");

    tags.forEach((tag) => {
        tag.addEventListener('click', (e) => {
            
            msg.text = e.target.innerText;
            tag.style.backgroundColor = "yellow";
            window.speechSynthesis.speak(msg);
            
            let interval = setInterval(() => {
                if(!speechSynthesis.speaking){
                    tag.style.removeProperty('background-color');;
                    clearInterval(interval);
                }
            }, 100);

        });
    });

    //window.speechSynthesis.speak(text)

}