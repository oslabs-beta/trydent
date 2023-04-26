// Creates the panels in the dev tools
chrome.devtools.panels.create(
  'Trydent',
  null, // logo path
  'panel.html', // HTML served to the panel
  null,
);

// const backgroundPageConnection = chrome.runtime.connect({
//   name: 'devtools-page',
// });
// backgroundPageConnection.onMessage.addListener((message) => {
//   // Handle responses from the background page, if any
//   console.log('message received', message);
// });

// // Relay the tab ID to the background page as an object
// backgroundPageConnection.postMessage({
//   tabId: chrome.devtools.inspectedWindow.tabId,
//   scriptToInject: 'content-script.js',
// });
