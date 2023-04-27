import endent from 'endent';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

const prettierFormat = (input: string) => {
  return prettier.format(input, {
    parser: 'babel',
    plugins: [parserBabel],
  });
};

// import prettier from 'prettier';
import { Describe, itObject, EventObj } from './types/types';
import { switchCase } from './switchCase';

// ###TO-DO: Fully convert to TypeScript
// ###TO-DO: modularize switch case in actionCreator, import it from utility file

//Example object to be deleted
const describeObj = {
  URL: 'localhost:3000',
  description: 'click on the thing',
  writeUp: 'High level description on how the button should be clicked',
  itStatements: [
    {
      itStatement: 'should be a click3',
      eventArr: [
        { selector: '.XPATH', action: 'click', URL: '/user/login' },
        { selector: '.XPATH', action: 'input', URL: '/user/login', input: 'typed into the box' },
      ],
    },
    {
      itStatement: 'should be a input4',
      eventArr: [
        { selector: '.XPATH', action: 'click', URL: '/user/login' },
        { selector: '.XPATH', action: 'input', URL: '/user/login', input: 'typed into the box' },
      ],
    },
  ],
};

/**
 * Mother function, creates a textblock for an entire describe suite in Cypress.
 *
 * @param {object} describeObj - Full object that comes from user
 * @returns {string} Full cypress test suite to be sent to user
 */
function describeCreator(obj: Describe): string {
  // destructuring the 'describe' object
  const { URL, description, writeUp, itStatements } = obj;
  let resultStr;
  //create line for describe statement in which we call the it creator?
  // ###TO-DO: push 'it' statement down to itCreator
  return (resultStr = `
    //${writeUp}
    describe('${description}', () => {
      beforeEach(() => {
        cy.visit('${URL}')
        cy.window().should('have.property', 'appReady', true)
      })
        
      ${itCreator(itStatements, URL)}
    })`);
}
/**
 *
 *
 * @param {array} itStatementsArr - Array containing it statement objects.
 * @param {string} URL - URL of the page to be tested.
 * @returns {string} - Concatenated string of it statements.
 */
// ###TO-DO: Fully convert to TypeScript
function itCreator(itStatementsArr: itObject[], URL: string): string {
  // initialize empty array to push formatted it statements into
  const formattedItStatments = [];
  // initialize empty string to push formatted it statements into
  let itText = '';

  itStatementsArr.forEach((itState) => {
    // concatenate evaluated result of each itState into itText
    itText += `
    it(${actionCreator(itState, URL)})`;
  });

  return itText;
}
/**
 *
 *
 * @param {itObject} eObj - Event Object containing it statement and array of events.
 * @param {string} URL - URL of the page to be tested.
 * @returns {string} - Concatenated string of actions within it statement.
 */
function actionCreator(eObj: itObject, URL: string): string {
  //deconstructing event object
  const { itStatement, eventArr } = eObj;
  let textBlock = '';

  //parse through eventArr to look at each event individually
  eventArr.forEach((event) => {
    // switchCase imported from switchCase.ts
    if (textBlock !== '')
      textBlock += `
        `;
    textBlock += switchCase(event);
  });
  //return a block of text that includes each event text, statment, visit location
  let resultText = `'${itStatement}', () => {
        ${textBlock}
      }`;
  return resultText;
}

// ### current tests: can be deleted
let sampleText = describeCreator(describeObj);
const sampleTextFormatted = prettierFormat(sampleText);

export { sampleText, sampleTextFormatted };
