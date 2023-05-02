/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */

function getRelativeXPath(element) {
  // If the element is null or undefined, return an empty string
  if (!element) { return ''; }
  // Get the element's tag name and convert it to lowercase to follow xPath conventions
  const tagName = element.tagName.toLowerCase();
  // Array of unique attributes to use for the XPath
  const uniqueAttributes = ['data-cy', 'data-test', 'data-testid', 'id'];
  let attr = '';
  // Iterate through the uniqueAttributes array and use the first one found on the element
  uniqueAttributes.some((attribute) => {
    if (element.hasAttribute(attribute)) {
      attr = `[@${attribute}="${element.getAttribute(attribute)}"]`;
      return true;
    }
    return false;
  });
  // If a unique attribute is found, return the xPath using that attribute
  if (attr) { return `//${tagName}${attr}`; }
  // Calculate position of the element among siblings with the same tag
  let position = 1;
  let sibling = element.previousElementSibling;
  while (sibling) {
    if (sibling.tagName.toLowerCase() === tagName) { position++; }
    sibling = sibling.previousElementSibling;
  }
  // Generate parent element's xPath and append current element's tag name and position
  const parentXPath = getRelativeXPath(element.parentElement);
  return `${parentXPath}/${tagName}[${position}]`;
}

function inputEventListener(event, callback) {
  const xPath = getRelativeXPath(event.target);
  const eventType = event.type;
  let initialValue;
  let inputValue;
  let newValue;
  // Store different event types using a switch statement
  switch (eventType) {
    case 'click':
      callback({ xPath, eventType });
      break;
    // case 'input':
    case 'change':
      inputValue = event.target.value;
      callback({ xPath, eventType, inputValue });
      break;
    case 'focus':
      initialValue = event.target.value;
      callback({ xPath, eventType });
      break;
    case 'blur':
      newValue = event.target.value;
      if (initialValue !== newValue) {
        callback({ xPath, eventType: 'input', inputValue: newValue });
      }
      break;
    default:
      // Log a message for unhandled event types
      console.log(`Unhandled event type: ${eventType}`);
  }
}

// define unique ID for content script
const contentScriptId = 'contentScriptId';

// if content script has not already been injected into the page
if (!document.getElementById(contentScriptId)) {
  // create a new script tag and set id to contentScriptId and append to document head
  const scriptTag = document.createElement('script');
  scriptTag.id = contentScriptId;
  document.head.appendChild(scriptTag);

  // listen for messages from background script
  chrome.runtime.onMessage.addListener((message) => {
    // if received message is to start content script
    if (message.action === 'startContentScript') {
      // get URL of current page
      const URL = window.location.href;
      // add event listeners for 'click', 'focus', 'blur', and 'change' events
      ['click', 'focus', 'blur', 'change'].forEach((action) => {
        document.addEventListener(action, (event) => {
          // call the inputEventListener for each event
          inputEventListener(event, (recordedEvent) => {
            console.log('Content-script.js This is the recordedEvent: ', recordedEvent);
            const { xPath, eventType, inputValue } = recordedEvent;
            // send the xPath as a message to the window
            window.postMessage({ xPath }, '*');
            // send message to the background script with the event details
            chrome.runtime.sendMessage({
              action: eventType, selector: xPath, input: inputValue, URL,
            });
          });
        });
      });
      // Set up the inputEventListener with an empty callback function
      inputEventListener({}, () => {});
    }
  });
}
