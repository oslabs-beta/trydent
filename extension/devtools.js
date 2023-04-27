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
  console.log('message received', message);
  eventArr.push(message)
  console.log(eventArr)
});
const panel = document.getElementById('panel');

function submitToPanel(messages){
  console.log('submitting')
  messages.forEach((message)=>{
    console.log(message)
    const test = document.createElement = 'div';
      // made it into a string
    test.innerText = `Action: ${message.action} \n Selector: ${message.xPath} \n URL: ${message.URL} \n Input: ${message.input}`;
    panel.appendChild(test);
  })
}

const submitButton =  document.createElement("button")
submitButton.innerText = 'submit'
submitButton.onclick = submitToPanel(eventArr)
panel.appendChild(submitButton)


// Relay the tab ID to the background page as an object
backgroundPageConnection.postMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: 'content-script.js',
});
