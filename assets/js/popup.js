// Loads extension's last state
chrome.runtime.sendMessage({ msg: "load" }, function (response) {
    tts.value = response.ttsRunning

    if (response.ttsPauseResume === "pause") {
        pauseResumeTTS.value = "pause" 
        pauseResumeTTS.innerHTML = '<i class="bi bi-pause-circle-fill"></i>'
        
    } else {
        pauseResumeTTS.value = "resume"
        pauseResumeTTS.innerHTML = '<i class="bi bi-play-circle-fill"></i>'
    }
    
    enlarge.style.display = response.displayEnlarge;
    reduce.style.display = response.displayReduce;
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

});