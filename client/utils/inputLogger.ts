// Flag to indicate if the target element is an anchor tag with an href attribute
let a: boolean = false;
// Store the href attribute value of the anchor tag
let href: string = '';

/**
 * Get the relative XPath of an element
 * @param {HTMLElement | null} element - The target element
 * @returns {string} - The relative XPath of the element
 */
function getRelativeXPath(element: HTMLElement | null): string {
  // If the element is null or undefined, return an empty string
  if (!element) { return ''; }

  // Get the element's tag name and convert it to lowercase to follow xPath conventions
  const tagName: string = element.tagName.toLowerCase();

  // If the element is an anchor tag, check if it has an href attribute and make assignments to global variables
  if (tagName === 'a') {
    if (element.hasAttribute('href')) {
      a = true;
      href = element.getAttribute('href') || '';
    }
  }
  // Array of unique attributes to use for the XPath
  const uniqueAttributes: string[] = ['data-cy', 'data-test', 'data-testid', 'id'];
  let attr: string = '';

  // Iterate through the uniqueAttributes array and use the first one found on the element
  uniqueAttributes.some((attribute: string) => {
    if (element.hasAttribute(attribute)) {
      attr = `[@${attribute}="${element.getAttribute(attribute)}"]`;
      return true;
    }
    return false;
  });

  // If a unique attribute is found, return the xPath using that attribute
  if (attr) { return `//${tagName}${attr}`; }

  // Calculate position of the element among siblings with the same tag
  let position: number = 1;
  let sibling: Element | null = element.previousElementSibling;
  while (sibling) {
    if (sibling.tagName.toLowerCase() === tagName) { position++; }
    sibling = sibling.previousElementSibling;
  }

  // Generate parent element's xPath and append current element's tag name and position
  const parentXPath: string = getRelativeXPath(element.parentElement);
  return `${parentXPath}/${tagName}[${position}]`;
}


/**
 * Event listener for input events (click, focus, blur, change).
 * @param {Event} event - The event object
 * @param {function} callback - Callback function to execute with the recorded event data
 */
let firstKeyPressed: boolean = false;
let secondKeyPressed: boolean = false;
let assertionTarget;

function inputEventListener(event: Event, callback: any): void {
  const xPath = getRelativeXPath(event.target as HTMLElement);
  const eventType = event.type;
  let initialValue: string | undefined;
  let inputValue: string | undefined;
  let newValue: string | undefined;
  let xPathMouse: string | undefined;

  // Store different event types using a switch statement
  switch (eventType) {
    case 'click':
      callback({ xPath, eventType });
      break;
    // case 'input':
    case 'change':
      inputValue = (event.target as HTMLInputElement).value;
      callback({ xPath, eventType, inputValue });
      break;
    case 'focus':
      initialValue = (event.target as HTMLInputElement).value;
      callback({ xPath, eventType });
      break;
    case 'blur':
      newValue = (event.target as HTMLInputElement).value;
      if (initialValue !== newValue) {
        callback({ xPath, eventType: 'input', inputValue: newValue });
      }
      break;
    case 'keydown':
      // listening for first key down
      initialValue = (event.target as HTMLInputElement).value;
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
      xPathMouse = getRelativeXPath(event.target as HTMLElement);
      assertionTarget = {
        mouseXPath: xPathMouse,
        pathName: (event.target as HTMLElement).pathname,
        className: (event.target as HTMLElement).className,
        innerHTML: (event.target as HTMLElement).innerHTML,
        id: (event.target as HTMLElement).id,
        innerText: (event.target as HTMLElement).innerText,
      };
      break;
    default:
  }
}

export { getRelativeXPath, inputEventListener };
