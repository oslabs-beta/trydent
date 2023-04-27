/* eslint-disable no-plusplus */
/* eslint-disable max-len */
// // Import the getRelativeXPath function and inputEventListener from the inputLogger module
// import { inputEventListener, getRelativeXPath } from './bundles/client/utils/inputLogger';
// Load the inputLogger module dynamically
// import('./bundles/utils/inputLogger.js').then(({ inputEventListener, getRelativeXPath }) => {
//   document.addEventListener('click', (event) => {
//     const xPath = getRelativeXPath(event.target);
//     console.log('Clicked element XPath:', xPath);
//     window.postMessage({ xPath }, '*');
//     chrome.runtime.sendMessage({ action: 'logEvent', xPath: { xPath } });
//   });

//   // Set up the inputEventListener with an empty callback function
//   inputEventListener({}, () => {});
// }).catch((error) => {
//   console.error('Error loading inputLogger:', error);
// });

function getRelativeXPath(element) {
  // If the element is null or undefined, return an empty string
  if (!element) { return ''; }
  // Get the element's tag name and convert it to lowercase to follow xPath conventions
  const tagName = element.tagName.toLowerCase();
  // Array of unique attributes to use for the XPath
  const uniqueAttributes = ['data-cy', 'data-test', 'data-testid', 'id'];
  let attr = '';
  // Iterate through the uniqueAttributes array and use the first one found on the element
  for (const attribute of uniqueAttributes) {
    if (element.hasAttribute(attribute)) {
      attr = `[@${attribute}="${element.getAttribute(attribute)}"]`;
      break;
    }
  }
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

  // Store different event types using a switch statement
  switch (eventType) {
    case 'click':
      callback({ xPath, eventType });
      break;
    // case 'input':
    case 'change':
      const inputValue = event.target.value;
      callback({ xPath, eventType, inputValue });
      break;
    case 'focus':
      initialValue = event.target.value;
      callback({ xPath, eventType });
      break;
    case 'blur':
      const newValue = event.target.value;
      if (initialValue !== newValue) {
        callback({ xPath, eventType: 'input', inputValue: newValue });
      }
      break;
    default:
      // Log a message for unhandled event types
      console.log(`Unhandled event type: ${eventType}`);
  }
}

const contentScriptId = 'contentScriptId';

if (!document.getElementById(contentScriptId)) {
  const scriptTag = document.createElement('script');
  scriptTag.id = contentScriptId;
  document.head.appendChild(scriptTag);

  const URL = window.location.href;
  // change to general event listener and use switch cases
  ['click', 'focus', 'blur', 'change'].forEach((action) => {
    document.addEventListener(action, (event) => {
      inputEventListener(event, (recordedEvent) => {
        console.log('This is the recordedEvent: ', recordedEvent);
        const { xPath, eventType, inputValue } = recordedEvent;
        window.postMessage({ xPath }, '*');
        chrome.runtime.sendMessage({
          action: eventType, selector: xPath, input: inputValue, URL,
        });
      });
    });
  });
  // Set up the inputEventListener with an empty callback function
  inputEventListener({}, () => {});
}
