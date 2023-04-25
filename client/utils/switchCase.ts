// will likely use on further switch cases
import endent from 'endent';

// define EventObj interface
interface EventObj {
  selector: string;
  action: string;
  input?: string;
}

// ###TO-DO: basic switch case function, will expand upon this later
export function switchCase(event: EventObj) {
  const { selector, action, input } = event;

  switch (action) {
    case 'click':
      return `cy.xpath('["${selector}"]').click();`;
      break;
    case 'input':
      return `cy.xpath('["${selector}"]').input('${input}')`;
      break;
    default:
      return 'didnt input a valid action';
  }
}
