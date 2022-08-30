console.log('background running')

chrome.runtime.onMessage.addListener(data => {
    prueba()
})


chrome.commands.onCommand.addListener(function (command) {
    if (command === "Ctrl+L") {
        console.log("Ctrl-L successful.");
    }
    else if (command === "Ctrl+M") {
        console.log("Ctrl+M successful.");
    }
});