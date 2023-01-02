speechSynthesis.addEventListener("voiceschanged", () => {
    console.log("Voices loaded: ", speechSynthesis.getVoices().length);
});

function isChecked(id) {
    return document.getElementById(id).checked ? "block" : "none";
}

function displayBlock(style) {
    return style === "block" ? "none" : "block";
}

function displayFlex(style) { 
    return style === "flex" ? "none" : "flex";
}

function saveChanges() {
    chrome.storage.sync.set({
        displayEnlarge: isChecked("checkEnlarge"),
        displayReduce: isChecked("checkReduce"),
        displayIncreaseLineHeight: isChecked("checkIncreaseLine"),
        displayReduceLineHeight: isChecked("checkReduceLine"),
        displayFont: isChecked("checkFont"),
        displayTTS: isChecked("checkTTS"),
        displayLoadSettings: isChecked("checkLoad"),
        displayHelp: isChecked("checkHelp"),
        // displayInvertColor: isChecked("checkInvertColor"),
        // ttsPitch: ttsPitch.value,
        ttsSpeed: ttsSpeed.value,
        // ttsGenre: document.querySelector('input[name="ttsGenre"]:checked').value,
        ttsHighlightColor: ttsColor.value,
        displayColorPickerTitle : isChecked("checkColorPickerTitle"),
        displayColorPickerText : isChecked("checkColorPickerText"),
        displayColorPickerLinks : isChecked("checkColorPickerLinks"),
        displaySpacing: isChecked("checkSpacing"),
        displayPredefinedBk: isChecked("checkPredefinedBk"),
        displayCustomBk: isChecked("checkCustomBk")
    });
}

const ttsPitch = document.getElementById("ttsPitch");
const ttsSpeed = document.getElementById("ttsSpeed");
const ttsGenre = document.querySelectorAll(".ttsVoiceGenere");
const ttsColor = document.getElementById("ttsColor");

const saveBtn = document.getElementById("save");

const checkEnlarge = document.getElementById("checkEnlarge");

checkEnlarge.addEventListener("change", () => {
    const div = document.getElementById("divIncreaseText");
    div.style.display = displayBlock(div.style.display); 
    saveChanges();
});

const checkReduce = document.getElementById("checkReduce");

checkReduce.addEventListener("change", () => {
    const div = document.getElementById("divReduceText");
    div.style.display = displayBlock(div.style.display);
    saveChanges();
});

const checkIncreaseLine = document.getElementById("checkIncreaseLine");

checkIncreaseLine.addEventListener("change", () => {
    const div = document.getElementById("divIncreaseLine");
    div.style.display = displayBlock(div.style.display);
    saveChanges();
});

const checkReduceLine = document.getElementById("checkReduceLine");

checkReduceLine.addEventListener("change", () => {
    const div = document.getElementById("divReduceLine");
    div.style.display = displayBlock(div.style.display);
    saveChanges();
});

const checkFont = document.getElementById("checkFont");

checkFont.addEventListener("change", () => {
    const div = document.getElementById("divFont");
    div.style.display = displayFlex(div.style.display);
    saveChanges();
});

const checkTTS = document.getElementById("checkTTS");

checkTTS.addEventListener("change", () => {
    const div = document.getElementById("tts");
    const divPause = document.getElementById("pauseResumeTTS");
    div.style.display = displayFlex(div.style.display);
    divPause.style.display = displayFlex(divPause.style.display);
    saveChanges();
});

const checkLoad = document.getElementById("checkLoad");

checkLoad.addEventListener("change", () => {
    const div = document.getElementById("divLoad");
    div.style.display = displayFlex(div.style.display);
    saveChanges();
});

const checkHelp = document.getElementById("checkHelp");

checkHelp.addEventListener("change", () => {
    const div = document.getElementById("divHelp");
    div.style.display = displayFlex(div.style.display);
    saveChanges();
});

const checkColorPickerTitle = document.getElementById("checkColorPickerTitle");

checkColorPickerTitle.addEventListener("change", () => {
    const div = document.getElementById("divColorTitle");
    div.style.display = displayFlex(div.style.display);
    saveChanges();
});

const checkColorPickerText = document.getElementById("checkColorPickerText");

checkColorPickerText.addEventListener("change", () => {
    const div = document.getElementById("divColorText");
    div.style.display = displayFlex(div.style.display);
    saveChanges();
});

const checkColorPickerLinks = document.getElementById("checkColorPickerLinks");

checkColorPickerLinks.addEventListener("change", () => {
    const div = document.getElementById("divColorLinks");
    div.style.display = displayFlex(div.style.display);
    saveChanges();
});

const checkSpacing = document.getElementById("checkSpacing");

checkSpacing.addEventListener("change", () => {
    const div = document.getElementById("divSpacing");
    div.style.display = displayBlock(div.style.display);
    saveChanges();
});

const checkPredefinedBk = document.getElementById("checkPredefinedBk");

checkPredefinedBk.addEventListener("change", () => {
    const div = document.getElementById("divColoresPredBox");
    const divTitle = document.getElementById("divColoresPredTitle");
    div.style.display = displayFlex(div.style.display);
    divTitle.style.display = displayFlex(divTitle.style.display);
    saveChanges();
});

const checkCustomBk = document.getElementById("checkCustomBk");

checkCustomBk.addEventListener("change", () => {
    const div = document.getElementById("divCustomBkPicker");
    const divTitle = document.getElementById("divCustomBkTitle");
    div.style.display = displayFlex(div.style.display);
    divTitle.style.display = displayFlex(divTitle.style.display);
    saveChanges();
});


function restoreOptions() {
    chrome.storage.sync.get([
        "displayEnlarge",
        "displayReduce",
        "displayFont",
        "displayIncreaseLineHeight",
        "displayReduceLineHeight",
        "displayColorPickerTitle",
        "displayColorPickerText",
        "displayColorPickerLinks",
        "displayTTS",
        "displayHelp",
        "displayLoadSettings",
        "displayInvertColor",
        "displaySpacing",
        "displayPredefinedBk",
        "displayCustomBk"],
        function (result) {
            document.getElementById("checkEnlarge").checked = isDisplayed(result.displayEnlarge),
                document.getElementById("checkReduce").checked = isDisplayed(result.displayReduce),
                document.getElementById("checkIncreaseLine").checked = isDisplayed(result.displayIncreaseLineHeight),
                document.getElementById("checkReduceLine").checked = isDisplayed(result.displayReduceLineHeight),
                document.getElementById("checkColorPickerTitle").checked = isDisplayed(result.displayColorPickerTitle),
                document.getElementById("checkColorPickerText").checked = isDisplayed(result.displayColorPickerText),
                document.getElementById("checkColorPickerLinks").checked = isDisplayed(result.displayColorPickerLinks),
                document.getElementById("checkSpacing").checked = isDisplayed(result.displaySpacing),
                document.getElementById("checkFont").checked = isDisplayed(result.displayFont),
                document.getElementById("checkTTS").checked = isDisplayed(result.displayTTS),
                document.getElementById("checkLoad").checked = isDisplayed(result.displayLoadSettings),
                document.getElementById("checkHelp").checked = isDisplayed(result.displayHelp),
                document.getElementById("checkPredefinedBk").checked = isDisplayed(result.displayPredefinedBk)
                document.getElementById("checkCustomBk").checked = isDisplayed(result.displayCustomBk)

                // document.getElementById("checkInvertColor").checked = isDisplayed(result.displayInvertColor)
        });
}

function isDisplayed(value) {
    return value == "block" ? true : false;
}


// ttsGenre.forEach((e) => {
//     e.addEventListener("change", testTTSParams.bind(null, e, undefined, undefined))
// });
ttsSpeed.addEventListener("change", testTTSParams.bind(null, ttsSpeed));
// ttsPitch.addEventListener("change", testTTSParams.bind(null, undefined, undefined, ttsPitch));

function testTTSParams(speed) {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    let msg = new SpeechSynthesisUtterance();

    msg.text = "This is a test";
    // msg.voice = genre ? voices[genre.value] : voices[2];
    msg.rate = speed ? speed.value : 1; // Between 0.1 and 10
    // msg.pitch = pitch ? pitch.value : 1; // Between 1 and 2

    synth.speak(msg);

    let interval = setInterval(() => {
        if (!speechSynthesis.speaking) {
            synth.cancel();
            clearInterval(interval);
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', restoreOptions);