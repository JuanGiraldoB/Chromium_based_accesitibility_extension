// Loads extension's last state
chrome.runtime.sendMessage({ msg: "load" }, function (response) {
    tts.value = response.ttsRunning;

    if (response.ttsPauseResume === "pause") {
        pauseResumeTTS.value = "pause";
        pauseResumeTTS.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
    } else {
        pauseResumeTTS.value = "resume";
        pauseResumeTTS.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
    }

    increaseText.style.display = response.displayEnlarge;
    reduceText.style.display = response.displayReduce;
    increaseLines.style.display = response.displayIncreaseLineHeight;
    reduceLines.style.display = response.displayReduceLineHeight;
    font.style.display = response.displayFont;
    document.getElementById("lblSelectColor").style.display = response.displayColorPicker;
    colorPicker.style.display = response.displayColorPicker;
    tagToColor.style.display = response.displayColorPicker;

    tts.style.display = response.displayTTS;
    pauseResumeTTS.style.display = response.displayTTS;
    openOptions.style.display = response.displayOptions;

    load.style.display = response.displayLoadSettings;
    invertColor.style.display = response.displayInvertColor;

});

// Go to options page

function openExtensionOptions() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}

const openOptions = document.getElementById("goToOptions");
openOptions.addEventListener('click', openExtensionOptions);


function checkPressedKey(command, key) {
    var func = [0, 1];

    if (command === "enlarge-text" || key === "1") {
        func[0] = changeTextSize;
        func[1] = "increase";
    } else if (command === "reduce-text" || key === "2") {
        func[0] = changeTextSize;
        func[1] = "reduce";
    } else if (command === "increase-line-height" || key === "3") {
        func[0] = changeLineHeight;
        func[1] = "increase";
    } else if (command === "reduce-line-height" || key === "4") {
        func[0] = changeLineHeight;
        func[1] = "reduce";
    } else if (command === "invert-colors" || key === "5") {
        func[0] = invertBKColor;
    } else if (command === "go-to-options" || key === "6") {
        openExtensionOptions();
        return;
    } else if (command === "activate-tts" || key === "7") {
        changeTTSRunningValue();
        func[0] = textToSpeech;
        func[1] = tts.value;
    } else if (command === "pause/resume-tts" || key === "8") {
        changeTTSPauseResumeHtmlState();
        func[0] = resumePause;
        func[1] = pauseResumeTTS.value;
    } else {
        func[0] = undefined;
    }

    return func;
}

chrome.commands.onCommand.addListener((command) => {
    var func = checkPressedKey(command, undefined);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: func[0],
            args: [func[1]]
        });
    });
});


window.addEventListener("keydown", function (event) {
    func = checkPressedKey(undefined, event.key);

    if (typeof func[0] === "undefined") {
        return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: func[0],
            args: [func[1]]
        });
    });
});