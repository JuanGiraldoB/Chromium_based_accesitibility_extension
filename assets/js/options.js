speechSynthesis.addEventListener("voiceschanged", () => {
    console.log("Voices loaded: ", speechSynthesis.getVoices().length);
});

const saveBtn = document.getElementById("save");

saveBtn.addEventListener("click", () => {
    chrome.storage.sync.set({
        displayEnlarge: isChecked("checkEnlarge") + "",
        displayReduce: isChecked("checkReduce") + "",
        displayIncreaseLineHeight: isChecked("checkIncreaseLine") + "",
        displayReduceLineHeight: isChecked("checkReduceLine") + "",
        displayColorPicker: isChecked("checkColorPicker") + "",
        displayFont: isChecked("checkFont") + "",
        displayTTS: isChecked("checkTTS") + "",
        displayLoadSettings: isChecked("checkLoadSettings") + "",
        displayOptions: isChecked("checkOptions") + "",
        displayInvertColor: isChecked("checkInvertColor")
    });
});

function isChecked(id) {
    return document.getElementById(id).checked ? "block" : "none";
}

function restoreOptions() {
    chrome.storage.sync.get([
        "displayEnlarge",
        "displayReduce",
        "displayFont",
        "displayIncreaseLineHeight",
        "displayReduceLineHeight",
        "displayColorPicker",
        "displayTTS",
        "displayOptions",
        "displayLoadSettings",
        "displayInvertColor"],
        function (result) {
            document.getElementById("checkEnlarge").checked = isDisplayed(result.displayEnlarge),
                document.getElementById("checkReduce").checked = isDisplayed(result.displayReduce),
                document.getElementById("checkIncreaseLine").checked = isDisplayed(result.displayIncreaseLineHeight),
                document.getElementById("checkReduceLine").checked = isDisplayed(result.displayReduceLineHeight),
                document.getElementById("checkColorPicker").checked = isDisplayed(result.displayColorPicker),
                document.getElementById("checkFont").checked = isDisplayed(result.displayFont),
                document.getElementById("checkTTS").checked = isDisplayed(result.displayTTS),
                document.getElementById("checkLoadSettings").checked = isDisplayed(result.displayLoadSettings),
                document.getElementById("checkOptions").checked = isDisplayed(result.displayOptions),
                document.getElementById("checkInvertColor").checked = isDisplayed(result.displayInvertColor)
        });
}

function isDisplayed(value) {
    return value == "block" ? true : false;
}

const ttsPitch = document.getElementById("ttsPitch");
const ttsSpeed = document.getElementById("ttsSpeed");
const ttsGenre = document.querySelectorAll(".ttsVoiceGenere");

ttsGenre.forEach((e) => {
    e.addEventListener("click", testTTSParams.bind(null, e, undefined, undefined))
});
ttsSpeed.addEventListener("change", testTTSParams.bind(null, undefined, ttsSpeed, undefined));
ttsPitch.addEventListener("change", testTTSParams.bind(null, undefined, undefined, ttsPitch));

function testTTSParams(genre, speed, pitch){
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    var msg = new SpeechSynthesisUtterance();

    msg.text = "This is a test";
    msg.voice = genre ? voices[genre.value] : voices[2];
    msg.rate = speed ? speed.value : 1; // Between 0.1 and 10
    msg.pitch = pitch ? pitch.value : 1; // Between 1 and 2

    synth.speak(msg);

    let interval = setInterval(() => {
        if (!speechSynthesis.speaking) {
            synth.cancel();
            clearInterval(interval);
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', restoreOptions);