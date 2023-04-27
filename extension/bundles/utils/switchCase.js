// ###TO-DO: basic switch case function, will expand upon this later
export function switchCase(event) {
    const { selector, action, input, URL } = event;
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
