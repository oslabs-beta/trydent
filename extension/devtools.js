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
let isMonitioring = false; 

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
    if (describeObj.URL === null) describeObj.URL = message.URL;
    eventArr.push(message);
  });
  // set the connection status to true
  isConnected = true;
  //  set our isMonitoring to true so we start adding events into the eventArr. This is more important to have so we can STOP recording as well
  isMonitioring = true; 
  // Grab describe statement box value -- I might want to move this to where start test button is clicked?? 
  // describeObj.description = '';
};

// Listen for the "startRecording" event triggered from TestPage
window.addEventListener('startRecording', (e) => {
  // if connection is not established, connect to background
  if (!isConnected) {
    connectToBackground();
  }
});

// Listen for the "startRecording" event triggered from TestPage
window.addEventListener('stopRecording', (e) => {
  // if connection is not established, connect to background
  if (isConnected) {
    isMonitioring = false; 
    console.log(describeCreatorImport());
    eventArr.splice(0, eventArr.length)
  }
});

// get the panel DOM elements from panel.html
const panel = document.getElementById('panel');

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


   