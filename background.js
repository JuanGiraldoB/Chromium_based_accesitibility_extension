const lineHeightValue = 1.5;
const textSizeValue = 16;
const textFamilyValue = "Arial";
const ttsRunningValue = "false";
const ttsPauseResumeValue = "pause";
const displayEnlargeValue = "block";
const displayReduceValue = "block";
const displayFontValue = "block";
const displayIncreaseLineHeightValue = "block";
const displayReduceLineHeightValue = "block";
const displayColorPickerValue = "block";
const displayTTSValue = "block";
const displayHelpValue = "block";
const displayLoadSettingsValue = "block";
const fontColorValue = undefined;
const linksColorValue = undefined;
const titleColorValue = undefined;
const displayInvertColorValue = "block";
const ttsGenreValue = 2;
const ttsSpeedValue = 1;
const ttsPitchValue = 1;
const ttsHighlightColorValue = "#ffff00";
const spacingValue = "false";
const predefinedBkValue = false;
const predefinedFontColorValue = undefined;
const predefinedBkColorValue = undefined;
const customBkValue = undefined;
const displayColorPickerTitleValue = "block";
const displayColorPickerTextValue = "block";
const displayColorPickerLinksValue = "block";
const displaySpacingValue = "block";
const displayPredefinedBkValue = "block";
const displayCustomBkValue = "block";
const lastUrlValue = undefined;
const reloadedValue = false;

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
        displayHelp: displayHelpValue,
        displayLoadSettings: displayLoadSettingsValue,
        fontColor: fontColorValue,
        linksColor: linksColorValue,
        titleColor: titleColorValue,
        displayInvertColor: displayInvertColorValue,
        ttsGenre: ttsGenreValue,
        ttsSpeed: ttsSpeedValue,
        ttsPitch: ttsPitchValue,
        ttsHighlightColor: ttsHighlightColorValue,
        spacing: spacingValue,
        predefinedBk: predefinedBkValue,
        predefinedFontColor: predefinedBkColorValue,
        predefinedBkColor: predefinedBkColorValue,
        customBk: customBkValue,
        displayColorPickerTitle: displayColorPickerTitleValue,
        displayColorPickerText: displayColorPickerTextValue,
        displayColorPickerLinks: displayColorPickerLinksValue,
        displaySpacing: displaySpacingValue,
        displayPredefinedBk: displayPredefinedBkValue,
        displayCustomBk: displayCustomBkValue,
        lastUrl: lastUrlValue,
        reloaded: reloadedValue

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
                "displayHelp",
                "displayLoadSettings",
                "displayInvertColor",
                "spacing",
                "displayColorPickerTitle",
                "displayColorPickerText",
                "displayColorPickerLinks",
                "displaySpacing",
                "displayPredefinedBk",
                "displayCustomBk",
                "lastUrl",
                "reloaded"],
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
                        displayHelp: result.displayHelp,
                        displayInvertColor: result.displayInvertColor,
                        spacing: result.spacing,
                        displayColorPickerTitle: result.displayColorPickerTitle,
                        displayColorPickerText: result.displayColorPickerText,
                        displayColorPickerLinks: result.displayColorPickerLinks,
                        displaySpacing: result.displaySpacing,
                        displayPredefinedBk: result.displayPredefinedBk,
                        displayCustomBk: result.displayCustomBk,
                        lastUrl: result.lastUrl,
                        reloaded: result.reloaded
                    });
                });

        } else if (request.msg === "saveTTSRunning") {
            if (request.ttsRunning) {
                chrome.storage.sync.set({ ttsRunning: request.ttsRunning }, function () {
                    console.log('Running?: ' + request.ttsRunning);
                });
            } else if (request.ttsPauseResume) {
                chrome.storage.sync.set({ ttsPauseResume: request.ttsPauseResume }, function () {
                    console.log('Paused?: ' + request.ttsPauseResume);
                });
            }

        } else if (request.msg === "spacingState") {
            chrome.storage.sync.set({ spacing: request.spacingState }, function () {
                console.log('Spacing state: ' + request.spacingState);
            });
        }

        return true; // Ref: https://stackoverflow.com/questions/59914490/how-to-handle-unchecked-runtime-lasterror-the-message-port-closed-before-a-res
    }
);


// Ref: https://stackoverflow.com/questions/45139926/how-to-check-if-a-tab-has-been-reloaded-in-background-js
// https://developer.chrome.com/docs/extensions/reference/history/#transition_types
chrome.webNavigation.onCommitted.addListener((details) => {
    if (["reload"].includes(details.transitionType)) {
        chrome.storage.sync.set({ reloaded: true }, function () {
            console.log('Page was reloaded');
        });

    } else if (["link", "typed", "generated"].includes(details.transitionType)) {
        chrome.storage.sync.set({ reloaded: false }, function () {
            console.log('New page');
        });
    }
});