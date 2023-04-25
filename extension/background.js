// upon connection execute the content-script 
chrome.runtime.onConnect.addListener(function(devToolsConnection) {
    // assign the listener function to a variable so we can remove it later
    var devToolsListener = function(message, sender, sendResponse) {
        console.log('we are in?')
        console.log(message)
        // Inject a content script into the identified tab
        chrome.scripting.executeScript(
            { 
                target:{tabId:message.tabId},
                files: [message.scriptToInject] 
            });
    }
    // add the listener
    devToolsConnection.onMessage.addListener(devToolsListener);
    // removes the event listener when disconnecting
    devToolsConnection.onDisconnect.addListener(function() {
         devToolsConnection.onMessage.removeListener(devToolsListener);
    });
});
