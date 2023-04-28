// Creates the panels in the dev tools
chrome.devtools.panels.create(
  'Trydent',
  null, // logo path
  'panel.html', // HTML served to the panel
  null,
);

const backgroundPageConnection = chrome.runtime.connect({
  name: 'devtools-page',
});

const eventArr = [];

chrome.runtime.onMessage.addListener((message) => {
  // Handle responses from the background page, if any
  eventArr.push(message);
  console.log('message received:', message);
  console.log('all the events: ', eventArr);
});

const panel = document.getElementById('panel');

const submitButton = document.createElement('button');
panel.appendChild(submitButton);
submitButton.innerText = 'submit';
submitButton.addEventListener('click', (e) => {
  console.log('clicked submit');
  console.log('events array?', eventArr);
  eventArr.forEach((message) => {
    const testItem = document.createElement('div');
    testItem.innerText = `Action: ${message.action} \n Selector: ${message.selector} \n URL: ${message.URL} \n Input: ${message.input}`;
    panel.appendChild(testItem);
    eventArr.splice(0, eventArr.length);
    console.log('cleared the event Arr: ', eventArr);
  });
});

// Relay the tab ID to the background page as an object
backgroundPageConnection.postMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: 'content-script.js',
});
