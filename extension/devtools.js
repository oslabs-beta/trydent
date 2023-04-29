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
// add in isMonitioring boolean to see if "start recording" has been clicked -- intial value false 
//  create eventlistener to monitor "start recording"
  //  grab intial url 
  //  grab value from describe box
  //  grab value from it description box
  //  change is monitoring to true 

chrome.runtime.onMessage.addListener((message) => {
  // Handle responses from the background page, if any
  // if (isMonitoring){ // we want a conditional here to check isMonitoring so once we click start recording we begin to build our eventArr 
  eventArr.push(message);
  // }
});

const panel = document.getElementById('panel');

const describeObj = {
  URL: 'localhost:3000',
  description: 'Test go Boom',
  writeUp: 'This is a test and its going to work :)... eventually',
  itStatements: [
    {
      itStatement: 'Track my random clicks',
      eventArr: eventArr,
    },
  ],
};

  async function describeCreatorImport() {
  const { describeCreator} = await import('./bundles/utils/testCreator.js');
  return describeCreator(describeObj);
}

// This is how you can return a value without it being a promise 
// (async function() {
//   console.log(await describeCreatorImport());
// })();

const submitButton = document.createElement('button');
panel.appendChild(submitButton);
submitButton.innerText = 'submit';
submitButton.addEventListener('click', async (e) => {
  console.log('clicked submit');
  console.log('events array?', eventArr);

  console.log(describeCreatorImport());
  
});


// Relay the tab ID to the background page as an object
backgroundPageConnection.postMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: 'content-script.js',
});


   