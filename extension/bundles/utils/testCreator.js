function switchCase(event) {
    let { selector, action, input, URL, a, href } = event;
    if (a == true) {
        action = 'navigate';
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
      cy.location('pathname').should("contains",'${href}');`;
            break;
        case 'assertion':
            let finalText = '';
            finalText += `cy.xpath('${selector}').should('exist');`;
            // if contains a inner text or outerText
            if (href && a === true) {
                finalText += `cy.xpath('${selector}').should("have.attr", "href").should("contains", "${href}");`;
            }
            if (input.innerHTML !== '' && input.innerHTML) {
                finalText += `cy.xpath('${selector}').should('have.html',${JSON.stringify(input.innerHTML)}).and('be.visible');`;
            }
            if (input.id !== '' && input.id) {
                finalText += `cy.xpath('${selector}').should('have.id', '${input.id}');`;
            }
            if (input.className !== '' && input.className) {
                finalText += `cy.xpath('${selector}').should('have.class', '${input.className}');`;
            }
            return finalText;
        case 'readystatechange':
            return `cy.url('eq', '${URL}')`;
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
export function describeCreator(obj) {
    const { URL, description, writeUp, itStatements } = obj;
    let resultStr;
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
function itCreator(itStatementsArr, URL) {
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
function actionCreator(eObj, URL) {
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
export default { switchCase, describeCreator };
