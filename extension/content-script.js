/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
// Flag to indicate if the target element is an anchor tag with an href attribute
let a = false;
let href = '';

/**
 * Get the relative XPath of an element
 * @param {HTMLElement} element - The target element
 * @returns {string} - The relative XPath of the element
 */
function getRelativeXPath(element) {
  // If the element is null or undefined, return an empty string
  if (!element) { return ''; }

  // Get the element's tag name and convert it to lowercase to follow xPath conventions
  const tagName = element.tagName.toLowerCase();

  // If the element is an anchor tag, check if it has an href attribute and make assignments to global variables
  if (tagName === 'a') {
    if (element.hasAttribute('href')) {
      a = true;
      href = element.getAttribute('href');
    }
  }
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

/**
 * Event listener for input events (click, focus, blur, change).
 * @param {Event} event - The event object
 * @param {function} callback - Callback function to execute with the recorded event data
 */
let firstKeyPressed = false;
let secondKeyPressed = false;
let assertionTarget;

function inputEventListener(event, callback) {
  let xPath;
  if (event.type !== 'readystatechange') {
    xPath = getRelativeXPath(event.target);
  }
  const eventType = event.type;
  let initialValue;
  let inputValue;
  let newValue;
  let xPathMouse;

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
      //
    case 'readystatechange':
      initialValue = 'N/A';
      callback({ XPath: '', eventType });
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
    case 'keydown':
      // listening for first key down
      initialValue = event.target.value;
      // only changes if first key is an 'e' - will remain until key up (see 'keyup event listener')
      if (!firstKeyPressed && event.key === 'e') {
        firstKeyPressed = true;
        // eslint-disable-next-line brace-style
      }
      // listen for second key down an making sure its 'z'
      else if (firstKeyPressed && !secondKeyPressed && event.key === 'z') {
        secondKeyPressed = true;
        // trigger your event here takes assertion object created in mouseover case as input, reassigns path
        href = assertionTarget.pathName;
        callback({ xPath: assertionTarget.mouseXPath, eventType: 'assertion', inputValue: assertionTarget });
      }
      break;
    case 'keyup':
      // reset firstKeyPressed and secondKeyPressed when the keys are released
      if (event.key === 'e') {
        firstKeyPressed = false;
      } else if (event.key === 'z') {
        secondKeyPressed = false;
      }
      break;
    case 'mouseover':
      // continually reassign the Xpath and create an assertion target object as the mouse moves
      xPathMouse = getRelativeXPath(event.target);
      assertionTarget = {
        mouseXPath: xPathMouse,
        pathName: event.target.pathname,
        className: event.target.className,
        innerHTML: event.target.innerHTML,
        id: event.target.id,
        innerText: event.target.innerText,
      };
      break;
    default:
  }
}

// Store the current window's URL
const URL = window.location.href;

// Add event listeners for 'click', 'focus', 'blur', and 'change' events
['click', 'focus', 'blur', 'change', 'keydown', 'keyup', 'mouseover', 'readystatechange'].forEach((action) => {
  document.addEventListener(action, (event) => {
    // Call the inputEventListener for each event
    inputEventListener(event, (recordedEvent) => {
      const { xPath, eventType, inputValue } = recordedEvent;
      // Send the xPath as a message to the window
      window.postMessage({ xPath }, '*');
      // Send message to the background script with the event details
      chrome.runtime.sendMessage({
        action: eventType, selector: xPath, input: inputValue, URL, a, href,
      });
    });
    // Reset a and href to their default values
    a = false;
    href = '';
  });
});

// Set up the inputEventListener with an empty callback function
inputEventListener({}, () => {});
