/**
 * Recursive function that generates a relative XPath for the given HTML element.
 * It takes an optional unique attribute of id to enhance the uniqueness of the generated XPath.
 * 
 * @param element - The HTMLElement for which the XPath is to be generated.
 * @param uniqueAttribute - Optional attribute name to make the XPath more unique.
 * @returns The relative XPath of the provided HTMLElement.
 */
function getRelativeXPath(element: HTMLElement | null, uniqueAttribute: string = 'id'): string {
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

/**
 * Listener function for user input events
 * Function is used in EventLogger.tsx component to record and display user input events
 * [STRETCH] Maybe add generic Events and KeyboardEvents to the type Union and add support for those event types later
 * 
 * @param event - The event object representing the user input (Mouse event or Input event)
 * @param callback - The callback function that receives the recorded event object
 * @returns void, just console logs the XPath, event type, and change of the element that was interacted with
 */
function inputEventListener(event: MouseEvent | InputEvent, callback: (recordedEvent: RecordedEvent) => void) {
  // Get the xPath of the element that was interacted with
  const xPath = getRelativeXPath(event.target as HTMLElement);
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
      const inputValue = (event.target as HTMLInputElement).value;
      // ! WARNING: Removal of these tests will fail some of the tests in the inputLogger.test.ts file. Can put an x before the test to skip it.
      console.log(`User interaction with element: ${xPath}, Event type: ${eventType}, Input value: ${inputValue}`);
      callback({ xPath, eventType, inputValue });
      break;
    default:
      // Log a message for unhandled event types
      console.log(`Unhandled event type: ${eventType}`);
  }
}

export { getRelativeXPath, inputEventListener };
export type { RecordedEvent };
