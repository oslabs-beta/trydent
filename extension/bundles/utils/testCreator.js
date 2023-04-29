function switchCase(event) {
  const {
    selector, action, input, URL,
  } = event;
  switch (action) {
    case 'click':
      return `cy.xpath('["${selector}"]').click();
        cy.url().should('include','${URL}');`;
      break;
    case 'input':
      return `cy.xpath('["${selector}"]').input('${input}');`;
      break;
    case 'navigate':
      return `cy.url().should('include','${URL}');`;
      break;
    default:
      return 'didnt input a valid action';
  }
}

export function describeCreator(obj) {
  // destructuring the 'describe' object
  const {
    URL, description, writeUp, itStatements,
  } = obj;
    // create line for describe statement in which we call the it creator?
    // ###TO-DO: push 'it' statement down to itCreator
  const resultStr = `
    //${writeUp}
    describe('${description}', () => {
      beforeEach(() => {
        cy.visit('${URL}')
        cy.window().should('have.property', 'appReady', true)
      })
        
      ${itCreator(itStatements, URL)}
    })`;
  return resultStr;
}
/**
  *
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
function actionCreator(eObj, URL) {
  // deconstructing event object
  const { itStatement, eventArr } = eObj;
  let textBlock = '';
  // parse through eventArr to look at each event individually
  eventArr.forEach((event) => {
    // switchCase imported from switchCase.ts
    if (textBlock !== '') {
      textBlock += `
        `;
    }
    textBlock += switchCase(event);
  });
  // return a block of text that includes each event text, statment, visit location
  const resultText = `'${itStatement}', () => {
        ${textBlock}
      }`;
  return resultText;
}
