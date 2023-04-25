import endent from 'endent';
import { Describe, itObject, EventObj } from './types/types';
import { switchCase } from './switchCase';

// ###TO-DO: Fully convert to TypeScript
// ###TO-DO: modularize switch case in actionCreator, import it from utility file

//Example object to be deleted
const describeObj = {
  URL: 'localhost:3000',
  description: 'click on the thing',
  writeUp: 'High level description on how the button should be clicked',
  itStatements: [{ itStatement: 'should be a click3', eventArr: [{ selector: '.XPATH', action: 'click' }] }],
};

/**
 * Mother function, creates a textblock for an entire describe suite in Cypress.
 *
 * @param {object} describeObj - Full object that comes from user
 * @returns {string} Full cypress test suite to be sent to user
 */
function describeCreator(obj: Describe) {
  // destructuring the 'describe' object
  const { URL, description, writeUp, itStatements } = obj;
  let resultStr;
  //create line for describe statement in which we call the it creator?
  // ###TO-DO: push 'it' statement down to itCreator
  return (resultStr = `
    //${writeUp}
    describe('${description}', () => {
      it('${itCreator(itStatements, URL)}
    })`);
}

/**
 * Finds the sum of two numbers.
 *
 * @param {array} itStatementsArr - Array containing it statement objects.
 * @param {string} URL - URL of the page to be tested.
 * @returns {string} - Concatenated string of it statements.
 */
// ###TO-DO: Fully convert to TypeScript
function itCreator(itStatementsArr, URL) {
  // initialize empty array to push formatted it statements into
  const formattedItStatments = [];
  // initialize empty string to push formatted it statements into
  let itText = '';

  itStatementsArr.forEach((itState) => {
    // concatenate evaluated result of each itState into itText
    itText += `${actionCreator(itState, URL)}`;
  });

  return itText;
}
/**
 * Finds the sum of two numbers.
 *
 * @param {itObject} eObj - Event Object containing it statement and array of events.
 * @param {string} URL - URL of the page to be tested.
 * @returns {string} - Concatenated string of actions within it statement.
 */
function actionCreator(eObj: itObject, URL: string) {
  //deconstructing event object
  const { itStatement, eventArr } = eObj;
  let textBlock = '';

  //parse through eventArr to look at each event individually
  eventArr.forEach((event) => {
    // switchCase imported from switchCase.ts
    textBlock += switchCase(event);
  });
  //return a block of text that includes each event text, statment, visit location
  let resultText = `${itStatement}', () => {
        cy.visit('${URL}')
        ${textBlock}
      })`;
  return resultText;
}

// console.log(describeCreator(describeObj));

/*
case 'input':
    //some logic formatting the event into cypress code push to formatted events array
    //this may need to be in a function depending on the depth of our tests
    //ex. cy.get('${selector}').type('{input}')
    case 'change/blur':
    //some logic formatting the event into cypress code push to formatted events array
    //this may need to be in a seperate function depending on the depth of our tests
    case 'assertion/expectation':
    //some logic formatting the event into cypress code push to formatted events array
    default:
        throw new Error;
    */
