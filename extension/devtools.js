// Creates the Trydent panel in the dev tools
chrome.devtools.panels.create(
  'Trydent',
  null, // logo path (none at the moment)
  'panel.html', // HTML served to the panel
  null, // callback function
);

// array to store the recorded events
const eventArr = [];
// test object used to create test script
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

// establishes a connection to background with a specific name (name is not that important)
const backgroundPageConnection = chrome.runtime.connect({
  name: 'devtools-page',
});

chrome.runtime.onMessage.addListener((message) => {
  // grab current url for when the test is initiated - check to see if the describeObj.url has a value -- if not assign it one
  if (describeObj.URL === null) describeObj.URL = message.URL;
  eventArr.push(message);
  // console.log('This is our updated events array: ', eventArr);
  // input history querys the DOM for the classname and returns an HTMLCollection which is type array
  // in order to append to the DOM from here, we have to treat it as an array and appropriate methods against it
  // ** should probably create a function outside of this to modularize :) - NL
  const inputHistory = document.getElementsByClassName('input-history');
  const input = document.createElement('li');
  input.innerText = `${message.action}${message.input ? ` to:  ${message.input}` : ''}`;
  inputHistory[0].appendChild(input);
  input.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
})

// Listen for the "describeStatement" event triggered from WelcomePage
window.addEventListener('describeStatement', (e) => {
  // assign describeObj value 
  describeObj.description = e.detail.inputValue
});

// Listen for the "startRecording" event triggered from TestPage
window.addEventListener('startRecording', (e) => {
  describeObj.itStatements[0].itStatement = e.detail.inputValue
  // clear eventArr for a new test
  eventArr.splice(0, eventArr.length);
});

// Listen for the "stoptRecording" event triggered from TestPage
window.addEventListener('stopRecording', (e) => {
  //  async function so when generated code is assigned its a string and not a promise, this allows CodeBlock.tsx to easily catch the message
  (async function() {
    let generatedCode = await describeCreatorImport();
    // console.log("gen code: ", generatedCode);
    window.postMessage({ type: 'GENERATED_CODE', code: generatedCode })
  })();
});


// async function to import describeCreator and execute it with describeObj
async function describeCreatorImport() {
  const { describeCreator } = await import("./bundles/utils/testCreator.js");
  return describeCreator(describeObj);
}

// Relay the tab ID to the background page as an object
backgroundPageConnection.postMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: 'content-script.js',
});


/**
 * This is how you can return a value without it being a promise 
// (async function() {
//   console.log(await describeCreatorImport());
// })();
// });
*/
   