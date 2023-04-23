
/**
 * Recursive function that generates a relative XPath for the given HTML element.
 * It takes an optional unique attribute of id to enhance the uniqueness of the generated XPath.
 * @param element - The HTMLElement for which the XPath is to be generated.
 * @param uniqueAttribute - Optional attribute name to make the XPath more unique.
 * @returns The relative XPath of the provided HTMLElement.
 */
 export function getRelativeXPath(element: HTMLElement | null, uniqueAttribute: string = 'id'): string {
  // If the element is null or undefined, return an empty string
  if (!element) return '';
  // Get the element's tag name and convert it to lowercase to follow xPath conventions
  const tagName = element.tagName.toLowerCase();
  // Check if the element has the unique attribute and construct the attribute part of the XPath
  const attr = uniqueAttribute && element.hasAttribute(uniqueAttribute) ? `[@${uniqueAttribute}="${element.getAttribute(uniqueAttribute)}"]`: '';
  // If the element has a unique attribute, return the XPath with it
  if (attr) return `//${tagName}${attr}`;

  // Calculate the element's position among its siblings with the same tag name
  let position = 1;
  let sibling = element.previousElementSibling;
  while (sibling) {
    // Increment the position if the sibling has the same tag name
    if (sibling.tagName.toLowerCase() === tagName) position++;
    sibling = sibling.previousElementSibling;
  }

  // Recursively call the function for the parent element and append the current element with its position
  const parentXPath = getRelativeXPath(element.parentElement, uniqueAttribute);
  return `${parentXPath}/${tagName}[${position}]`;
}

// Interface representing recorded user input event
interface RecordedEvent {
  xPath: string;
  eventType: string;
  inputValue?: string;
}

// Declare a new array to store the recorded events
const recordedEvents: Array<RecordedEvent> = [];

/**
 * Listener function for user input events
 * @param event - The event object representing the user input (Mouse event or Input event)
 * @returns void, just console logs the XPath, event type, and change of the element that was interacted with
 * [STRETCH] Maybe add generic Events and KeyboardEvents to the type Union and add support for those event types later
 */
function inputEventListener(event: MouseEvent | InputEvent) {
  // Get the xPath of the element that was interacted with
  const xPath = getRelativeXPath(event.target as HTMLElement);
  // Get the event type
  const eventType = event.type;

  // Store different event types using a switch statement 
  switch (eventType) {
    case 'click':
      console.log(`User interaction with element: ${xPath}, Event type: ${eventType}`);
      recordedEvents.push({ xPath, eventType });
      break;
    case 'input':
    case 'change':
      // Get the input value for input and change events and log those as well
      const inputValue = (event.target as HTMLInputElement).value;
      console.log(`User interaction with element: ${xPath}, Event type: ${eventType}, Input value: ${inputValue}`);
      recordedEvents.push({ xPath, eventType });
      break;
    default:
      // Log a message for unhandled event types
      console.log(`Unhandled event type: ${eventType}`);
  }
}

// Add event listeners for clicks, inputs, and change events
// Use the inputEventListener function as the callback and set the capture option to true
document.addEventListener('click', inputEventListener as EventListener, true);
document.addEventListener('input', inputEventListener as EventListener, true);
document.addEventListener('change', inputEventListener as EventListener, true);


/**
 * Retrieves the array of recorded user input events
 * Each event object has the following properties: xPath, eventType, and inputValue (if applicable)
 * @returns {Array<{ RecordedEvent }>} - The array of recorded events
 * Each event object includes:
 * 1. xPath (string): The XPath of the element that was interacted with
 * 2. eventType (string): The type of event that was triggered (click, input, or change)
 * 3. inputValue (string | undefined): The value of the input element (if applicable)
 */
function getRecordedEvents(): Array<RecordedEvent> {
  return recordedEvents;
}
