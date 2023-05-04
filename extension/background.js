/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-undef */

/**
 * Connection to the devtools page
 * @type {chrome.runtime.Port}
 */
let devToolsConnection;

/**
 * Listener for connection from devtools page
 * Executes the content script upon connection and sets up message listeners
 * @see https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect
 * @listens chrome.runtime.onConnect
 * @param {chrome.runtime.Port} connection - connection to devtools page
 */
chrome.runtime.onConnect.addListener((connection) => {
  devToolsConnection = connection;

  /**
   * Listener function for messages fromt the devtools script
   * Injects a content script into the tab specified by the message
   *
   * @param {Object} message - The message object
   */
  const devToolsListener = function (message) {
    // console.log('we are in background.js');

    chrome.scripting.executeScript({
      target: { tabId: message.tabId },
      files: [message.scriptToInject],
    });
  };

  /**
   * Listener for tab activation events
   * Injects the content script into the activated tab
   *
   * @listens chrome.tab.onActivated
   */
  chrome.tabs.onActivated.addListener(() => {
    // console.log('changed to tab: ', tabId);
    chrome.scripting.executeScript({
      target: { tabId: message.tabId },
      files: [message.scriptToInject],
    });
  });

  // Add devToolsListener function as a listener for messages from the DevTools script
  devToolsConnection.onMessage.addListener(devToolsListener);

  // Remove devToolsListener function from listeners when the DevTools disconnects
  devToolsConnection.onDisconnect.addListener(() => {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});

/**
 * Listener for messages from the content scripts
 * Handles events and sends messages to the devtools connection
 *
 * @listens chrome.runtime.onMessage
 * @param {Object} message - The message object
 */
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

// Create a context menu item for Trydent
chrome.contextMenus.create({
  id: 'trydent-window',
  title: 'Trydent',
  contexts: ['all'],
});

/**
 * Listener for context menu item clicks
 * Opens the Trydent window when the context menu item is clicked
 *
 * @listens chrome.contextMenus.onClicked
 * @param {Object} info - Information about the context menu item that was clicked
 */
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
