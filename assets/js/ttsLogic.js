const tts = document.getElementById("tts");
const pauseResumeTTS = document.getElementById("pauseResumeTTS");


function changeTTSRunning() {
    let iconColor = document.getElementById("ttsIcon");

    if (tts.title === "true") {
        tts.title = "false";
        iconColor.style.fill = "#ffffff";
    } else {
        tts.title = "true";
        iconColor.style.fill = "#ffff00";
    }

    chrome.runtime.sendMessage({ msg: "saveTTSRunning", ttsRunning: tts.title }, function (response) {
        console.log("Saved ttsRunning as: " + tts.title);
    });

    tab = getCurrentTab().then((tab) => {
        chrome.storage.sync.set({ lastUrl: tab.url }, () => {
            console.log("Saved last url: " + tab.url);
        });
    });

}

function lookForLang() {
    const langES = "es";
    const langEN = "en";
    const voices = window.speechSynthesis.getVoices();
    let lstLang = [0, 0];

    for (let i = 0; i < voices.length; i++) {
        const lang = voices[i].lang;

        if (lang.startsWith(langES)) {
            lstLang[0] = i;
        }

        if (lang.startsWith(langEN)) {
            lstLang[1] = i;
        }
    }

    return lstLang;
}

tts.addEventListener("click", async () => {
    window.speechSynthesis.cancel()
    const lstLang = lookForLang();
    changeTTSRunning();

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: textToSpeech,
        args: [tts.title, lstLang]
    });

});

// TODO: state not working properly
function textToSpeech(ttsRunning, lstLang) {
    let tags = document.querySelectorAll("p, span, h1, h2, h3, h4, a, b, img, td, th, i");

    // if the tags have the "addedFunction" attribute it means the eventIstener has already
    // been added to the tags so there is no need to run the "for each" after this if statement
    if (tags[0].hasAttribute("addedFunction")) {
        if (ttsRunning != "true") {
            tags.forEach((tag) => {
                tag.setAttribute("ttsActive", "false");
            });

            return;

        } else {
            tags.forEach((tag) => {
                tag.setAttribute("ttsActive", "true");
            });

            return;
        }
    }

    chrome.storage.sync.get(["ttsGenre", "ttsSpeed", "ttsPitch", "ttsHighlightColor"], function (result) {

        tags.forEach((tag) => {
            tag.setAttribute("addedFunction", "1");
            tag.setAttribute("ttsPaused", "1");

            tag.addEventListener("click", (e) => {
                e.stopPropagation();

                if (tag.getAttribute("ttsActive") === "false") {
                    return;
                }

                const synth = window.speechSynthesis;
                const voices = synth.getVoices();

                let msg = new SpeechSynthesisUtterance();
                let language = document.documentElement.lang;

                msg.rate = result.ttsSpeed;
                msg.pitch = result.ttsPitch;
                msg.voice = language == "es" ? voices[lstLang[0]] : voices[lstLang[1]];
                msg.lang = msg.voice.lang;
                msg.text = "";

                if (tag.tagName == "IMG") {
                    msg.text = tag.alt;
                } else {
                    msg.text = e.target.innerText;
                }

                tag.style.backgroundColor = result.ttsHighlightColor;
                synth.speak(msg);

                // Ref: https://dev.to/jankapunkt/cross-browser-speech-synthesis-the-hard-way-and-the-easy-way-353
                msg.onstart = () => {
                    resumeInfinity(msg);
                }

                const clear = () => { clearTimeout(timer) }

                msg.onerror = clear
                msg.onend = clear

                const resumeInfinity = (target) => {
                    // prevent memory-leak in case utterance is deleted, while this is ongoing
                    if (!target && timer) { return clear() }

                    if (tag.getAttribute("ttsPaused") !== "paused") {
                        speechSynthesis.pause();
                        speechSynthesis.resume();
                    }

                    timer = setTimeout(function () {
                        resumeInfinity(target)
                    }, 1000)
                }

                let interval = setInterval(() => {
                    if (!speechSynthesis.speaking) {
                        synth.cancel();
                        tag.style.removeProperty('background-color');
                        clearInterval(interval);
                        msg.text = "";
                    }
                }, 1000);

            }, result.ttsGenre, result.ttsSpeed, result.ttsPitch, result.ttsHighlightColor, lstLang);
        });

    });
}

// Pause - Resume TTS
function changeTTSPauseResumeHtmlState() {
    if (pauseResumeTTS.title === "pause") {
        pauseResumeTTS.title = "resume";
        pauseResumeTTS.innerHTML = `<div class="texto">Play</div>
                                    <span class="icono">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122 138.78"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path class="cls-1" d="M118.59,63.47,10.25.93A6.83,6.83,0,0,0,0,6.85V131.94a6.84,6.84,0,0,0,10.25,5.92L118.59,75.31A6.84,6.84,0,0,0,118.59,63.47Z"/></g></g></svg></span>`;
    } else {
        pauseResumeTTS.title = "pause";
        pauseResumeTTS.innerHTML = `<div class="texto">Pausar</div>
                                    <span class="icono">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.84 170.1"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path class="cls-1" d="M45.56,8.23V161.87a8.22,8.22,0,0,1-8.22,8.23H8.23A8.22,8.22,0,0,1,0,161.87V8.23A8.22,8.22,0,0,1,8.23,0H37.34A8.22,8.22,0,0,1,45.56,8.23ZM120.61,0H91.5a8.22,8.22,0,0,0-8.22,8.23V161.87a8.22,8.22,0,0,0,8.22,8.23h29.11a8.22,8.22,0,0,0,8.23-8.23V8.23A8.22,8.22,0,0,0,120.61,0Z"/></g></g></svg></span>`;
    }
}

pauseResumeTTS.addEventListener("click", async () => {
    changeTTSPauseResumeHtmlState();

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: resumePause,
        args: [pauseResumeTTS.title]
    });
});

function resumePause(...pause) {
    chrome.runtime.sendMessage({ msg: "saveTTSRunning", ttsPauseResume: pause[0] }, function (response) {
        console.log("Saved ttsPauseResume as: " + pause[0]);
    });

    if (pause[0] != "pause") {
        window.speechSynthesis.pause();
    } else {
        window.speechSynthesis.resume();
    }

    let tags = document.querySelectorAll("*");
    for (let i = tags.length; i--;) {

        if (pause[0] != "pause") {
            tags[i].setAttribute("ttsPaused", "paused");
        } else {
            tags[i].setAttribute("ttsPaused", "running");
        }

    }
}