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

function inputEventListener(event, callback) {
  // Get the xPath of the element that was interacted with
  const xPath = getRelativeXPath(event.target);
  // Get the event type
  const eventType = event.type;
  // Store different event types using a switch statement 
  switch (eventType) {
      case 'click':
          // ! WARNING: Removal of these tests will fail some of the tests in the inputLogger.test.ts file. Can put an x before the test to skip it.
          console.log(`User interaction with element: ${xPath}, Event type: ${eventType}`);
          callback({ xPath, eventType });
          break;
      case 'input':
      case 'change':
          // Get the input value for input and change events and log those as well
          const inputValue = event.target.value;
          // ! WARNING: Removal of these tests will fail some of the tests in the inputLogger.test.ts file. Can put an x before the test to skip it.
          console.log(`User interaction with element: ${xPath}, Event type: ${eventType}, Input value: ${inputValue}`);
          callback({ xPath, eventType, inputValue });
          break;
      default:
          // Log a message for unhandled event types
          console.log(`Unhandled event type: ${eventType}`);
  }
}
function getRelativeXPath(element) {
  // If the element is null or undefined, return an empty string
  if (!element)
      return '';
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
  if (attr)
      return `//${tagName}${attr}`;
  // Calculate position of the element among siblings with the same tag
  let position = 1;
  let sibling = element.previousElementSibling;
  while (sibling) {
      if (sibling.tagName.toLowerCase() === tagName)
          position++;
      sibling = sibling.previousElementSibling;
  }
  // Generate parent element's xPath and append current element's tag name and position
  const parentXPath = getRelativeXPath(element.parentElement);
  return `${parentXPath}/${tagName}[${position}]`;
}

document.addEventListener('click', (event) => {
  const xPath = getRelativeXPath(event.target);
  console.log('Clicked element XPath:', xPath);
  window.postMessage({ xPath }, '*');
  chrome.runtime.sendMessage({ action: 'logEvent', xPath: { xPath } });
});



// Set up the inputEventListener with an empty callback function
inputEventListener({}, () => {});
