
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

/**
 * Listener function for user input events
 * @param event - The event object representing the user input (Mouse event, Input event, or just a generic event)
 * @returns void, just console logs the XPath of the element that was interacted with
 */
function inputEventListener(event: MouseEvent | InputEvent | Event) {
  const xPath = getElementXPath(event.target as HTMLElement);
  console.log(`User interaction with element: ${xPath}`);
}

// Add event listeners for clicks, inputs, and change events
// Use the inputEventListener function as the callback and set the capture option to true
document.addEventListener('click', inputEventListener as EventListener, true);
document.addEventListener('input', inputEventListener as EventListener, true);
document.addEventListener('change', inputEventListener as EventListener, true);