let devToolsConnection;

// upon connection execute the content-script
chrome.runtime.onConnect.addListener((connection) => {
  devToolsConnection = connection;
  // assign the listener function to a variable so we can remove it later
  const devToolsListener = function (message, sender, sendResponse) {
    console.log('we are in background.js');

    // Inject a content script into the tab specified by the message
    chrome.scripting.executeScript({
      target: { tabId: message.tabId },
      files: [message.scriptToInject],
    }, () => {
      // send a message to the content script to start itself
      chrome.tabs.sendMessage(message.tabId, { action: 'startContentScript' });
    });
  };
  // chrome.tabs.onActivated.addListener((tabInfo) => {
  //   const { tabId } = tabInfo;
  //   console.log('changed to tab: ', tabId);
  //   chrome.scripting.executeScript({
  //     target: { tabId: message.tabId },
  //     files: [message.scriptToInject],

  //   });
  // });

  // const contentScriptListener = (message, sender, sendResponse) => {
  //   switch (message.action) {
  //     case 'click':
  //       console.log('Clicked, message: ', message);
  //       break;
  //     case 'focus':
  //       console.log('Focused, message: ', message);
  //       break;
  //     case 'blur':
  //       console.log('Blurred, message: ', message);
  //       break;
  //     case 'change':
  //       console.log('Changed, message: ', message);
  //       break;
  //     default:
  //       console.log('Unknown event, message: ', message);
  //   }
  // };
  // add devToolsListener function as a listener for messages from devtools script
  devToolsConnection.onMessage.addListener(devToolsListener);
  // remove devToolsListener function from listeners when devtools disconnects
  devToolsConnection.onDisconnect.addListener(() => {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});

// listen for message from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Check event and proceed message accordingly
  switch (message.action) {
    case 'click':
      console.log('Clicked, message: ', message);
      break;
    case 'focus':
      console.log('Focused, message: ', message);
      break;
    case 'blur':
      console.log('Blurred, message: ', message);
      break;
    case 'change':
      console.log('Changed, message: ', message);
      break;
    default:
      console.log('Unknown event, message: ', message);
  }
  if (devToolsConnection) {
    devToolsConnection.postMessage(message);
  } else {
    console.error('devToolsConnection is not established yet');
  }
});
