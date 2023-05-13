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