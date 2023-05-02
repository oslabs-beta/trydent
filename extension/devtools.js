// Creates the Trydent panel in the dev tools
chrome.devtools.panels.create(
  'Trydent',
  null, // logo path (none at the moment)
  'panel.html', // HTML served to the panel
  null, // callback function
);

// basically tracking whether devtools.js is connected to background.js
let isConnected = false;

// connection to the background page
let backgroundPageConnection;

// array to store the recorded events
const eventArr = [];
// add in isMonitioring boolean to see if "start recording" has been clicked -- intial value false 
let isMonitoring = false; 

// test object used to create test script
const describeObj = {
  URL: null,
  description: 'Test go Boom',
  writeUp: "This is a test and it's going to work :)... eventually",
  itStatements: [
    {
      itStatement: 'Track my random clicks',
      eventArr,
    },
  ],
};

// Function to connect the devtools to the background page
const connectToBackground = () => {

  // establishes a connection to background with a specific name (name is not that important)
  backgroundPageConnection = chrome.runtime.connect({
    name: 'devtools-page',
  });

  // sends a message to the background to inject content-script into the inspected window
  backgroundPageConnection.postMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    scriptToInject: 'content-script.js',
  });

  // listens for messages from the background page and add them to eventArr **where to put this... isn't pushing into eventArr fffs"
  backgroundPageConnection.onMessage.addListener((message) => {
    console.log('This is the message in devtools.js: ', message);
    // Grab current URL for when the test is intiated - check to see if the describeObj.url has a value -- if not assign it one
    if (isMonitioring){
      if (describeObj.URL === null) describeObj.URL = message.URL;
      eventArr.push(message);
    console.log('This is our updated events array: ', eventArr)
    // input history querys the DOM for the classname and returns an HTMLCollection which is type array
    // in order to append to the DOM from here, we have to treat it as an array and appropriate methods against it
    // ** should probably create a function outside of this to modularize :) - NL
    const inputHistory = document.getElementsByClassName('input-history')
    const input = document.createElement('li')
    input.innerText = message.action
    inputHistory[0].appendChild(input)
    }
  });
  // set the connection status to true
  isConnected = true;
  //  set our isMonitoring to true so we start adding events into the eventArr. This is more important to have so we can STOP recording as well
  isMonitoring = true; 
  // clear eventArr for a new test
  eventArr.splice(0, eventArr.length);
};

// Listen for the "startRecording" event triggered from TestPage
window.addEventListener('startRecording', (e) => {
  // if connection is not established, connect to background
  if (!isConnected) {
    describeObj.itStatements[0].itStatement = e.detail.inputValue
    // assign our it description in here 
    connectToBackground();
  }
});

//add an event listener to listen for tab change??
// Listen for the "stoptRecording" event triggered from TestPage
window.addEventListener('stopRecording', (e) => {
  // if connection is not established, connect to background
  if (isConnected) {
    isMonitioring = false; 
    console.log(describeCreatorImport());
  }
});


// Listen for the "describeStatement" event triggered from WelcomePage
window.addEventListener('describeStatement', (e) => {
  // assign describeObj value 
  describeObj.description = e.detail.inputValue
});

// async function to import describeCreator and execute it with describeObj
async function describeCreatorImport() {
  const { describeCreator } = await import("./bundles/utils/testCreator.js");
  return describeCreator(describeObj);
}

// SAM I SWEAR TO GOD IF YOU DELETE THIS AGAIN IM COMING FOR YOU!!
//  This is how you can return a value without it being a promise 
// // (async function() {
// //   console.log(await describeCreatorImport());
// // })();
// });


   
