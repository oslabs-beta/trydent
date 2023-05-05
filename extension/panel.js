
// Array to store the recorded events
const eventArr = [];
// Test object used to create test script
const describeObj = {
  URL: null,
  description: 'Cypress test block',
  writeUp: "Trydent is cool",
  itStatements: [
    {
      itStatement: '',
      eventArr,
    },
  ],
};
// Global variable to store recording state
let recording = false;

// Establishes a connection to background with a specific name
const backgroundPageConnection = chrome.runtime.connect({
  name: 'devtools-page',
});

// Listener for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
  // Grab current url for when the test is initiated
  // Check to see if the describeObj.url has a value. If not assign it one
  if (describeObj.URL === null) describeObj.URL = message.URL;

  // If the message a is true (has anchor tag), change action to navigate
  if (message.a === true) message.action = 'navigate';

  if (recording === true) {
    // Add the message to the event array
    eventArr.push(message);
    // console.log('This is our updated events array: ', eventArr);
  
    // Input history querys the DOM for the classname and returns an HTMLCollection which is type array
    // In order to append to the DOM from here, we have to treat it as an array and appropriate methods against it
    // ** should probably create a function outside of this to modularize :) - NL
    const inputHistory = document.getElementsByClassName('input-history');
    const input = document.createElement('li');
    input.innerText = `${message.action}${message.input ? ` to:  ${message.input}` : ''}${message.a ? ` to:  ${message.href}` : ''}`;
    inputHistory[0].appendChild(input);
    input.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }
})


// Listener for the "describeStatement" event triggered from WelcomePage
window.addEventListener('describeStatement', (e) => {
  // assign describeObj value 
  describeObj.description = e.detail.inputValue
});

// Listener for the "startRecording" event triggered from TestPage
window.addEventListener('startRecording', (e) => {
  recording = true;
  describeObj.itStatements[0].itStatement = e.detail.inputValue
  // Clear eventArr for a new test
  eventArr.splice(0, eventArr.length);
});

// Listener for the "stopRecording" event triggered from TestPage
window.addEventListener('stopRecording', (e) => {
  recording = false;
  // Async function so when generated code is assigned, it's a string and not a promise
  // This allows CodeBlock.tsx to easily catch the message
  (async function() {
    let generatedCode = await describeCreatorImport();
    // console.log("Generated code: ", generatedCode);
    window.postMessage({ type: 'GENERATED_CODE', code: generatedCode })
  })();
});


/**
 * Async function to import describeCreator and execute it with describeObj
 * @returns {Promise<string>} - The generated test code
 */
async function describeCreatorImport() {
  const { describeCreator } = await import("./bundles/utils/testCreator.js");
  return describeCreator(describeObj);
}

// Relay the tab ID to the background page as an object
backgroundPageConnection.postMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: 'content-script.js',
});


/** This is how you can return a value without it being a promise 
// (async function() {
//   console.log(await describeCreatorImport());
// })();
// });
*/
   