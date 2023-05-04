import { Describe, itObject, EventObj } from './types/types';

function switchCase(event: EventObj): string {
  let { selector, action, input, URL, a, href} = event;
  if (a == true){
    action = 'navigate'
  }
  switch (action) {
    case 'click':
      return `cy.xpath('${selector}').should('exist');
      cy.xpath('${selector}').click({force:true});`;
      break;
    case 'change':
      return `cy.xpath('${selector}').type('${input}');`;
      break;
    case 'navigate':
      return `cy.xpath('${selector}').click();
      cy.location('pathname').should('eq','${href}');`;
      break;
    default:
      return 'didnt input a valid action';
  }
}
/**
 * Mother function, creates a textblock for an entire describe suite in Cypress.
 *
 * @param {object} describeObj - Full object that comes from user
 * @returns {string} Full cypress test suite to be sent to user
 */
export function describeCreator(obj: Describe): string {
  // destructuring the 'describe' object
  const { URL, description, writeUp, itStatements } = obj;
  let resultStr;
  //create line for 'describe' statement in which we call the itCreator?
  // ###TO-DO: push 'it' statement down to itCreator
  return (resultStr = `
    //${writeUp}
    describe('${description}', () => {
      beforeEach(() => {
        cy.visit('${URL}')
      })
        
      ${itCreator(itStatements, URL)}
    })`);
}
/**
 * Separate itStatements function to make a 'describe' with multiple 'it's
 *
 * @param {array} itStatementsArr - Array containing 'it' statement objects.
 * @param {string} URL - URL of the page to be tested.
 * @returns {string} - Concatenated string of 'it' statements.
 */
// ###TO-DO: Fully convert to TypeScript
function itCreator(itStatementsArr: itObject[], URL: string): string {
  // Initialize empty array to push formatted 'it' statements into
  const formattedItStatments = [];
  // Initialize empty string to push formatted 'it' statements into
  let itText = '';

  itStatementsArr.forEach((itState) => {
    // Concatenate evaluated result of each itState into 'itText
    itText += `
    it(${actionCreator(itState, URL)})`;
  });

  return itText;
}
/**
 * Separate action function to make an 'it' statement with multiple actions
 *
 * @param {itObject} eObj - Event Object containing 'it' statement and array of events.
 * @param {string} URL - URL of the page to be tested.
 * @returns {string} - Concatenated string of actions within 'it' statement.
 */
function actionCreator(eObj: itObject, URL: string): string {
  const { itStatement, eventArr } = eObj;
  let textBlock = '';

  // Parse through eventArr to look at each event individually
  eventArr.forEach((event) => {
    // switchCase imported from switchCase.ts
    if (textBlock !== '')
      textBlock += `
        `;
    textBlock += switchCase(event);
  });
  // Return a block of text that includes each event text, statment, visit location
  let resultText = `'${itStatement}', () => {
        ${textBlock}
      }`;
  return resultText;
}
