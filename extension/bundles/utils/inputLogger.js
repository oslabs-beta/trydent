/**
 * Recursive function that generates a relative XPath for the given HTML element.
 * It takes an optional unique attribute of id to enhance the uniqueness of the generated XPath.
 *
 * @param element - The HTMLElement for which the XPath is to be generated.
 * @returns The relative XPath of the provided HTMLElement.
 */
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
/**
 * Listener function for user input events
 * Function is used in EventLogger.tsx component to record and display user input events
 * [STRETCH] Maybe add generic Events and KeyboardEvents to the type Union and add support for those event types later
 *
 * @param event - The event object representing the user input (Mouse event or Input event)
 * @param callback - The callback function that receives the recorded event object
 * @returns void, just console logs the XPath, event type, and change of the element that was interacted with
 */
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
export { getRelativeXPath, inputEventListener };
