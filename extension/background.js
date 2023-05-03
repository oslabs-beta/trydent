/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-undef */
let devToolsConnection;

// upon connection execute the content-script
chrome.runtime.onConnect.addListener((connection) => {
  devToolsConnection = connection;
  // assign the listener function to a variable so we can remove it later
  const devToolsListener = function (message) {
    console.log('we are in background.js');

    // Inject a content script into the tab specified by the message
    chrome.scripting.executeScript({
      target: { tabId: message.tabId },
      files: [message.scriptToInject],
    });
  };

  chrome.tabs.onActivated.addListener(() => {
    // console.log('changed to tab: ', tabId);
    chrome.scripting.executeScript({
      target: { tabId: message.tabId },
      files: [message.scriptToInject],

    });
  });

  // add devToolsListener function as a listener for messages from devtools script
  devToolsConnection.onMessage.addListener(devToolsListener);

  // remove devToolsListener function from listeners when devtools disconnects
  devToolsConnection.onDisconnect.addListener(() => {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});

// listen for message from content script
chrome.runtime.onMessage.addListener((message) => {
  // Check event and proceed message accordingly
  switch (message.action) {
    case 'click':
      // console.log('Clicked, message: ', message);
      break;
    case 'focus':
      // console.log('Focused, message: ', message);
      break;
    case 'blur':
      // console.log('Blurred, message: ', message);
      break;
    case 'change':
      // console.log('Changed, message: ', message);
      break;
    default:
      // console.log('Unknown event, message: ', message);
  }
  if (devToolsConnection) {
    devToolsConnection.postMessage(message);
  } else {
    // console.error('devToolsConnection is not established yet');
  }
});

chrome.contextMenus.create({
  id: 'trydent-window',
  title: 'Trydent',
  contexts: ['all'],
});

chrome.contextMenus.onClicked.addListener(({ menuItemId }) => {
  const options = {
    type: 'panel',
    left: 0,
    top: 0,
    width: 1000,
    height: 1000,
    url: chrome.runtime.getURL('panel.html'),
  };
  if (menuItemId === 'trydent-window') chrome.windows.create(options);
});
