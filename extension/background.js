// upon connection execute the content-script 
chrome.runtime.onConnect.addListener(function(devToolsConnection) {
    // assign the listener function to a variable so we can remove it later
    const devToolsListener = function(message, sender, sendResponse) {
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
    
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        // Check if the message is a click event
        if (message.action === 'click') {
            console.log('clicked, message: ',)
            console.log(message)
          // Send the message to the DevTools panel
          chrome.devtools.panels.sendMessage('panel', message);
        }
      });

    // removes the event listener when disconnecting
    devToolsConnection.onDisconnect.addListener(function() {
         devToolsConnection.onMessage.removeListener(devToolsListener);
    });
});
