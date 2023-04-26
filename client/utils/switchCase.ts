// will likely use on further switch cases
import endent from 'endent';
import { EventObj } from './types/types';

// ###TO-DO: basic switch case function, will expand upon this later
export function switchCase(event: EventObj) {
  const { selector, action, input, URL } = event;

  switch (action) {
    case 'click':
      return `cy.xpath('["${selector}"]').click();
        cy.url().should('include','${URL}');`;
      break;
    case 'input':
      return `cy.xpath('["${selector}"]').input('${input}')`;
      break;
    case 'navigate':
      return `cy.url`;
      break;
    default:
      return 'didnt input a valid action';
  }
}
