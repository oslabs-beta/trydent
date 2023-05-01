// upon connection execute the content-script
chrome.runtime.onConnect.addListener((devToolsConnection) => {
  // assign the listener function to a variable so we can remove it later
  const devToolsListener = function (message, sender, sendResponse) {
    console.log('we are in background.js');

    // Inject a content script into the identified tab
    chrome.scripting.executeScript({
      target: { tabId: message.tabId },
      files: [message.scriptToInject],
    }, () => {
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
  // removes the event listener when disconnecting
  devToolsConnection.onMessage.addListener(devToolsListener);
  devToolsConnection.onDisconnect.addListener(() => {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Check if the message is a click event
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
});
