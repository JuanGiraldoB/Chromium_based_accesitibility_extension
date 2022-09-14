const tts = document.getElementById("tts");
const pauseResumeTTS = document.getElementById("pauseResumeTTS");

tts.addEventListener("click", async () => {
    console.log(tts)
    tts.value = tts.value === "true" ? "false" : "true";

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: textToSpeech,
        args: [tts.value]
    });
});


function textToSpeech(ttsRunning) {

    chrome.runtime.sendMessage({ msg: "save", ttsRunning: ttsRunning }, function (response) {
        console.log("Saved ttsRunning as: " + ttsRunning)
    });

    var tags = document.querySelectorAll("p, span, h1, h2, h3, h4, a, b, img, td");
    console.log(ttsRunning)
    // if the tags have the "addedFunction" attribute it means the eventIstener has already
    // been added to the tags so there is no need to run the "for each" after this if statement
    if (tags[0].hasAttribute("addedFunction")) {
        if (ttsRunning != "true") {
            tags.forEach((tag) => {
                tag.setAttribute("ttsActive", "false")
            })

            return;

        } else {
            tags.forEach((tag) => {
                tag.setAttribute("ttsActive", "true")
            })

            return;
        }
    }

    tags.forEach((tag) => {
        tag.setAttribute("addedFunction", "1")
        tag.addEventListener("click", function clicked(e) {

            if (tag.getAttribute("ttsActive") === "false") {
                return;
            }

            var msg = new SpeechSynthesisUtterance();
            var language = document.documentElement.lang;

            msg.rate = 10;
            msg.lang = language == "es" ? "es" : "en";
            msg.text = "";

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

pauseResumeTTS.addEventListener("click", async () => {

    if (pauseResumeTTS.value === "pause") {
        pauseResumeTTS.value = "resume";
        pauseResumeTTS.innerHTML = '<i class="bi bi-play-circle-fill"></i>'
    } else {
        pauseResumeTTS.value = "pause";
        pauseResumeTTS.innerHTML = '<i class="bi bi-pause-circle-fill"></i>'
    }

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: resumePause,
        args: [pauseResumeTTS.value]
    });
});

function resumePause(pause) {

    chrome.runtime.sendMessage({ msg: "save", ttsPauseResume: pause }, function (response) {
        console.log("Saved ttsPauseResume as: " + pause)
    });

    if (pause != "pause") {
        window.speechSynthesis.pause();
    } else {
        window.speechSynthesis.resume();
    }

}