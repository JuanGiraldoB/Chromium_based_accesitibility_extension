var lineHeightValue = 1.5;
var textSizeValue = 16;
var textFamilyValue = "Arial";
var ttsRunningValue = "false";
var ttsPauseResumeValue = "pause";
var displayEnlargeValue = "block";
var displayReduceValue = "block";
var displayFontValue = "block";
var displayIncreaseLineHeightValue = "block";
var displayReduceLineHeightValue = "block";
var displayColorPickerValue = "block";
var displayTTSValue = "block";
var displayOptionsValue = "block";
var displayLoadSettingsValue = "block";
var fontColorValue = undefined;
var linksColorValue = undefined;
var titleColorValue = undefined;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        lineHeight: lineHeightValue,
        textSize: textSizeValue,
        textFamily: textFamilyValue,
        ttsRunning: ttsRunningValue,
        ttsPauseResume: ttsPauseResumeValue,
        displayEnlarge: displayEnlargeValue,
        displayReduce: displayReduceValue,
        displayFont: displayFontValue,
        displayIncreaseLineHeight: displayIncreaseLineHeightValue,
        displayReduceLineHeight: displayReduceLineHeightValue,
        displayColorPicker: displayColorPickerValue,
        displayTTS: displayTTSValue,
        displayOptions: displayOptionsValue,
        displayLoadSettings: displayLoadSettingsValue,
        fontColor: fontColorValue,
        linksColor: linksColorValue,
        titleColor: titleColorValue

    }, () => {
        console.log("Default values set");
    });
})

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.msg === "load") {
            chrome.storage.sync.get([
                "ttsRunning",
                "ttsPauseResume",
                "displayEnlarge",
                "displayReduce",
                "displayFont",
                "displayIncreaseLineHeight",
                "displayReduceLineHeight",
                "displayColorPicker",
                "displayTTS",
                "displayOptions",
                "displayLoadSettings"],
                function (result) {
                    sendResponse({
                        ttsRunning: result.ttsRunning,
                        ttsPauseResume: result.ttsPauseResume,
                        displayEnlarge: result.displayEnlarge,
                        displayReduce: result.displayReduce,
                        displayIncreaseLineHeight: result.displayIncreaseLineHeight,
                        displayReduceLineHeight: result.displayReduceLineHeight,
                        displayColorPicker: result.displayColorPicker,
                        displayFont: result.displayFont,
                        displayTTS: result.displayTTS,
                        displayLoadSettings: result.displayLoadSettings,
                        displayOptions: result.displayOptions
                    });
                });

        } else if (request.msg === "save") {
            if (request.ttsRunning) {
                chrome.storage.sync.set({ ttsRunning: request.ttsRunning }, function () {
                    console.log('Running?: ' + request.ttsRunning);
                });
            } else if (request.ttsPauseResume) {
                chrome.storage.sync.set({ ttsPauseResume: request.ttsPauseResume }, function () {
                    console.log('Paused?: ' + request.ttsPauseResume);
                });
            }

        }

        return true; // Ref: https://stackoverflow.com/questions/59914490/how-to-handle-unchecked-runtime-lasterror-the-message-port-closed-before-a-res
    }
);

