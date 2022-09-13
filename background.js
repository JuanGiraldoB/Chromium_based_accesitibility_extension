var lineHeightValue = 1.5
var textSizeValue = 16
var textFamilyValue = "Arial"
var ttsRunningValue = "false"
var ttsPauseResumeValue = "pause"

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        lineHeight: lineHeightValue,
        textSize: textSizeValue,
        textFamily: textFamilyValue,
        ttsRunning: ttsRunningValue,
        ttsPauseResume: ttsPauseResumeValue
    }, () => {
        console.log("Line height: " + lineHeightValue);
        console.log("Text size: " + textSizeValue);
        console.log("text family: " + textFamilyValue);
        console.log("tts status: " + ttsRunningValue);
        console.log("tts stop/resume: " + ttsPauseResumeValue);
    });
})

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.msg === "load") {
            chrome.storage.local.get(["ttsRunning", "ttsPauseResume"], function (result) {
                sendResponse({
                    ttsRunning: result.ttsRunning,
                    ttsPauseResume: result.ttsPauseResume
                });
            });

        } else if (request.msg === "save") {
            if (request.ttsRunning) {
                chrome.storage.local.set({ ttsRunning: request.ttsRunning }, function () {
                    console.log('Running?: ' + request.ttsRunning);
                });
            } else if (request.ttsPauseResume) {
                chrome.storage.local.set({ ttsPauseResume: request.ttsPauseResume }, function () {
                    console.log('Paused?: ' + request.ttsPauseResume);
                });
            }

        }


        return true; // Ref: https://stackoverflow.com/questions/59914490/how-to-handle-unchecked-runtime-lasterror-the-message-port-closed-before-a-res
    }
);