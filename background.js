lineHeightValue = 1.5
textSizeValue = 16
textFamilyValue = "Arial"

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        lineHeight: lineHeightValue,
        textSize:   textSizeValue,
        textFamily: textFamilyValue
    }, () => {
        console.log("Line height: " + lineHeightValue);
        console.log("Text size: " + textSizeValue);
        console.log("text family: " + textFamilyValue);
    });
})