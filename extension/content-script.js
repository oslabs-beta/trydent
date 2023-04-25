    const xPath = getRelativeXPath(event);
    console.log('Clicked element XPath:', xPath);
    window.postMessage({xPath}, "*")
    chrome.runtime.sendMessage({action: 'click', xPath:`${xPath}`})
  });
  
function getRelativeXPath(element) {
  // If the element is null or undefined, return an empty string
  if (!element) return '';
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
  if (attr) return `//${tagName}${attr}`;
  
  // Calculate position of the element among siblings with the same tag
  let position = 1;
  let sibling = element.previousElementSibling;
  while (sibling) {
    if (sibling.tagName.toLowerCase() === tagName) position++;
    sibling = sibling.previousElementSibling;
  }
  
  // Generate parent element's xPath and append current element's tag name and position
  const parentXPath = getRelativeXPath(element.parentElement);
  return `${parentXPath}/${tagName}[${position}]`;
}
  