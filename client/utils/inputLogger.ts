
/**
 * Recursive helper function to get the XPath of an element
 * @param element - The HTMLElement for which the XPath is to be generated
 * @returns The XPath of the provided HTMLElement
 */
function getElementXPath(element: HTMLElement): string {
  // Base Case: If the element is the document body, return the tagName
  if (element === document.body) {
    return element.tagName.toLowerCase();
  }
  // Get the ID (if any) of the element
  const id = element.id ? `[@id='${element.id}']` : '';
  // Get the class name (if any) of the element
  const className = element.className ? `[@class='${element.className}']` : '';
  // Initialize the siblingIndex to 1
  let siblingIndex = 1;
  // Start with the current element and move to the previous sibling
  let sibling: Element | null = element;
  // While there is a previous sibling, increment the siblingIndex and move to the previous sibling
  while (sibling.previousElementSibling) {
    sibling = sibling.previousElementSibling;
    siblingIndex++;
  } 
  // Recursively call the function for the parentNode and append the current element's tagName and siblingIndex
  return `${getElementXPath((element.parentNode as Node) as HTMLElement)}/${element.tagName.toLowerCase()}${id}${className}[${siblingIndex}]`;
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
  const xPath = getElementXPath(event.target as HTMLElement);
  console.log(`User interaction with element: ${xPath}`);
  // Get the event type
  const eventType = event.type;
  console.log(`Event type: ${eventType}`);

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
 * @returns {Array<{ xPath: string; eventType: string; inputValue?: string }>} - The array of recorded events
 * Each event object includes:
 * 1. xPath (string): The XPath of the element that was interacted with
 * 2. eventType (string): The type of event that was triggered (click, input, or change)
 * 3. inputValue (string | undefined): The value of the input element (if applicable)
 */
function getRecordedEvents(): Array<RecordedEvent> {
  return recordedEvents;
}


// Export the getRecordedEvents function
export { getRecordedEvents };