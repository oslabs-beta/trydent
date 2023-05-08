/**
 * Describes the structure for a Describe object that contains information
 * about the test, including a URL, description, writeUp, and itStatements.
 * @typedef {Object} Describe
 * @property {string} URL - The URL of the page being tested
 * @property {string} description - A description of the test block
 * @property {string} writeUp - A write-up related to the test
 * @property {itObject[]} itStatements - An array of it statement objects
 */
export type Describe = {
  URL: string;
  description: string;
  writeUp: string;
  itStatements: itObject[];
};

/**
 * Describes the structure for an itObject that contains information
 * about each it statement, including the itStatement text and an array
 * of event objects.
 * @typedef {Object} itObject
 * @property {string} itStatement - The text of the it statement
 * @property {EventObj[]} eventArr - An array of event objects
 */
export type itObject = {
  itStatement: string;
  eventArr: EventObj[];
};

/**
 * Describes the structure for an EventObj that contains information
 * about each event, including the selector, action, and optional properties
 * such as input, URL, a (anchor tag flag), and href.
 * @typedef {Object} EventObj
 * @property {string} selector - The selector used to target the DOM element
 * @property {string} action - The type of action performed on the element
 * @property {string} [input] - The input value, if applicable
 * @property {string} [URL] - The current URL, if applicable
 * @property {boolean} [a] - A flag indicating if the element is an anchor tag
 * @property {string} [href] - The href value, if the element is an anchor tag
 */
export type EventObj = {
  selector: string;
  action: string;
  input: string | inputObj ;
  URL?: string;
  a?: boolean;
  href?: string;
};

export type inputObj = {
  localName: string,
  className: string,
  innerHTML: string,
  outerHTML: string,
  id: string,
  innerText: string,
  outerText: string,
}