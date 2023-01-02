// Loads extension's last state
const tipografiaDropdown = document.querySelectorAll(".tipografiaDropdown");

tipografiaDropdown.forEach((e) => {
    e.addEventListener("click", () => {
        const showDropDown = document.getElementById("showTipografiaDropDown");
        showDropDown.style.display = showDropDown.style.display === "block" ? "none" : "block"; 
    });
});

const contrastDropdown = document.querySelectorAll(".contrastDropdown");

contrastDropdown.forEach((e) => {
    e.addEventListener("click", () => {
        const showDropDown = document.getElementById("showContrastDropDown");
        showDropDown.style.display = showDropDown.style.display === "block" ? "none" : "block"; 
    });
});

const configDropdown = document.getElementById("configDropdown");

configDropdown.addEventListener("click", () => {
    const showDropDown = document.getElementById("showConfigDropdown");
    showDropDown.style.display = showDropDown.style.display === "block" ? "none" : "block"; 
});

const mouseDropdown = document.querySelectorAll(".mouseDropdown");

mouseDropdown.forEach((e) => {
    e.addEventListener("click", () => {
        const showDropDown = document.getElementById("showMouseDropDown");
        showDropDown.style.display = showDropDown.style.display === "block" ? "none" : "block"; 
    });
});


async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

chrome.runtime.sendMessage({ msg: "load" }, function (response) {

    currentUrl = getCurrentTab().then((data) => {
        let iconColor = document.getElementById("ttsIcon");

        if (data.url !== response.lastUrl || response.reloaded === true) {
            tts.title = "false";

            pauseResumeTTS.innerHTML = `<div class="texto">Pausar</div>
                                            <span class="icono">
                                                <svg id="ttsIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.84 170.1"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path class="cls-1" d="M45.56,8.23V161.87a8.22,8.22,0,0,1-8.22,8.23H8.23A8.22,8.22,0,0,1,0,161.87V8.23A8.22,8.22,0,0,1,8.23,0H37.34A8.22,8.22,0,0,1,45.56,8.23ZM120.61,0H91.5a8.22,8.22,0,0,0-8.22,8.23V161.87a8.22,8.22,0,0,0,8.22,8.23h29.11a8.22,8.22,0,0,0,8.23-8.23V8.23A8.22,8.22,0,0,0,120.61,0Z"/></g></g></svg></span>`;
            iconColor.style.fill = "#ffffff";
            
            chrome.storage.sync.set({ reloaded: false }, function () {
                console.log('Page was reloaded');
            });

        } else {
            tts.title = response.ttsRunning + "";
            console.log("not reloaded")
            if (response.ttsRunning === "true") {
                iconColor.style.fill = "#ffff00";
            } else {
                iconColor.style.fill = "#ffffff";
            }

            if (response.ttsPauseResume === "pause") {
                pauseResumeTTS.title = "pause";
                pauseResumeTTS.innerHTML = `<div class="texto">Pausar</div>
                                            <span class="icono">
                                                <svg id="ttsIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.84 170.1"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path class="cls-1" d="M45.56,8.23V161.87a8.22,8.22,0,0,1-8.22,8.23H8.23A8.22,8.22,0,0,1,0,161.87V8.23A8.22,8.22,0,0,1,8.23,0H37.34A8.22,8.22,0,0,1,45.56,8.23ZM120.61,0H91.5a8.22,8.22,0,0,0-8.22,8.23V161.87a8.22,8.22,0,0,0,8.22,8.23h29.11a8.22,8.22,0,0,0,8.23-8.23V8.23A8.22,8.22,0,0,0,120.61,0Z"/></g></g></svg></span>`;
            } else {
                pauseResumeTTS.title = "resume";
                pauseResumeTTS.innerHTML = `<div class="texto">Play</div>
                                            <span class="icono">
                                                <svg id="ttsIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122 138.78"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path class="cls-1" d="M118.59,63.47,10.25.93A6.83,6.83,0,0,0,0,6.85V131.94a6.84,6.84,0,0,0,10.25,5.92L118.59,75.31A6.84,6.84,0,0,0,118.59,63.47Z"/></g></g></svg></span>`;
            }
        }
    });


    document.getElementById("divIncreaseText").style.display = response.displayEnlarge;
    document.getElementById("divReduceText").style.display = response.displayReduce;
    document.getElementById("divIncreaseLine").style.display = response.displayIncreaseLineHeight;
    document.getElementById("divReduceLine").style.display = response.displayReduceLineHeight;

    if (response.displayFont != "block" &&
        response.displayColorPickerTitle != "block" &&
        response.displayColorPickerText != "block" &&
        response.displayColorPickerLinks != "block" &&
        response.displaySpacing != "block") {
        document.getElementById("divTipografia").style.display = "none";
    } else {
        document.getElementById("divFont").style.display = response.displayFont === "block" ? "flex" : "none";
        document.getElementById("divColorTitle").style.display = response.displayColorPickerTitle === "block" ? "flex" : "none";
        document.getElementById("divColorText").style.display = response.displayColorPickerText === "block" ? "flex" : "none";
        document.getElementById("divColorLinks").style.display = response.displayColorPickerLinks === "block" ? "flex" : "none";
        document.getElementById("divSpacing").style.display = response.displaySpacing;
        document.getElementById("divTipografia").style.display = "flex";
    }

    document.getElementById("tts").style.display = response.displayTTS === "block" ? "flex" : "none";
    document.getElementById("pauseResumeTTS").style.display = response.displayTTS === "block" ? "flex" : "none";

    document.getElementById("divLoad").style.display = response.displayLoadSettings === "block" ? "flex" : "none";
    document.getElementById("divHelp").style.display = response.displayHelp === "block" ? "flex" : "none";

    if (response.displayPredefinedBk != "block" && response.displayCustomBk != "block") {
        document.getElementById("divDropdownContraste").style.display = "none";
    } else {
        document.getElementById("divColoresPredTitle").style.display = response.displayPredefinedBk === "block" ? "flex" : "none";
        document.getElementById("divColoresPredBox").style.display = response.displayPredefinedBk === "block" ? "flex" : "none";
        predefinedBkColorbtns.forEach((e) => {
            e.style.display = response.displayPredefinedBk;
        });
        document.getElementById("divCustomBkTitle").style.display = response.displayCustomBk === "block" ? "flex" : "none";
        document.getElementById("divCustomBkPicker").style.display = response.displayCustomBk === "block" ? "flex" : "none";
        document.getElementById("divDropdownContraste").style.display = "flex";
    }

    // textSpacing.checked = response.spacing;
});

// Go to options page

const openHelp = document.getElementById("goToHelp");
const openHelpLogo = document.getElementById("_goToHelp");
openHelp.addEventListener('click', openExtensionOptions);
openHelpLogo.addEventListener('click', openExtensionOptions);

function openExtensionOptions() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}


function checkPressedKey(command, key) {
    let func = [undefined, undefined, 1];

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
    } else if (command === "spacing" || key === "5") { // TODO: not working properly
        textSpacing.checked = !textSpacing.checked;
        func[0] = changeTextSpacing;
        func[1] = textSpacing.checked;
    } else if (command === "go-to-help" || key === "9") {
        openExtensionOptions();
        return;
    } else if (command === "activate-tts" || key === "6") {
        func[2] = lookForLang();
        changeTTSRunning();
        func[0] = textToSpeech;
        func[1] = tts.title;
    } else if (command === "pause/resume-tts" || key === "7") {
        changeTTSPauseResumeHtmlState();
        func[0] = resumePause;
        func[1] = pauseResumeTTS.title;
    } else if (command === "load-settings" || key === "8") {
        func[0] = loadSettings;
        func[1] = classesToAvoid;
    }

    return func;
}

chrome.commands.onCommand.addListener((command) => {
    let func = checkPressedKey(command, undefined);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: func[0],
            args: [func[1], func[2]]
        });
    });
});


window.addEventListener("keydown", function (event) {
    let func = checkPressedKey(undefined, event.key);
    // console.log(typeof func[0])
    if (func === undefined) {
        return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: func[0],
            args: [func[1], func[2]]
        });
    });
});