import { getRelativeXPath, inputEventListener } from '../../../client/utils/inputLogger';
describe('testing if jest is even working', () => {
  test('should return true', () => {
    expect(true).toBe(true);
  });
});

// Test suite for getRelativeXPath function
describe('getRelativeXPath', () => {
  // Helper function to set up a simple DOM structure for testing
  const setupDOM = () => {
    document.body.innerHTML = `
      <div>
        <p id="test" class="test" data-cy="data-cy-test" data-test="data-test-test" data-testid="data-testid-test">Paragraph 1</p>
        <p>Paragraph 2</p>
        <div>
          <span>Span 1</span>
          <span>Span 2</span>
        </div>
      </div>
    `;
  };

  // Call setupDOM before each test
  beforeEach(() => {
    setupDOM();
  });

  test('should generate a relative XPath for an element without unique attribute', () => {
    const span1 = document.querySelector('span');
    if (!span1 || !(span1 instanceof HTMLElement)) throw new Error('Test element not found');
    const xpath = getRelativeXPath(span1);
    expect(xpath).toBe('/html[1]/body[1]/div[1]/div[1]/span[1]');
  });

  test('should prioritize data-cy attribute over data-test and data-testid and id', () => {
    const p1 = document.querySelector('.test');
    if (!p1 || !(p1 instanceof HTMLElement)) throw new Error('Test element not found');
    const xpath = getRelativeXPath(p1);
    expect(xpath).toBe('//p[@data-cy="data-cy-test"]');
  });

  test('should prioritize data-test attribute over data-testid and id', () => {
    const p1 = document.querySelector('.test');
    if (!p1 || !(p1 instanceof HTMLElement)) throw new Error('Test element not found');
    p1.removeAttribute('data-cy');
    const xpath = getRelativeXPath(p1);
    expect(xpath).toBe('//p[@data-test="data-test-test"]');
  });

  test('should generate a relative XPath with data-testid over id', () => {
    const p1 = document.querySelector('.test');
    if (!p1 || !(p1 instanceof HTMLElement)) throw new Error('Test element not found');
    p1.removeAttribute('data-cy');
    p1.removeAttribute('data-test');
    const xpath = getRelativeXPath(p1);
    expect(xpath).toBe('//p[@data-testid="data-testid-test"]');
  });

  test('should generate a relative XPath with id if no other attributes available', () => {
    const p1 = document.querySelector('.test');
    if (!p1 || !(p1 instanceof HTMLElement)) throw new Error('Test element not found');
    p1.removeAttribute('data-cy');
    p1.removeAttribute('data-test');
    p1.removeAttribute('data-testid');
    const xpath = getRelativeXPath(p1);
    expect(xpath).toBe('//p[@id="test"]');
  });

  test('should return an empty string if the element is null', () => {
    const xpath = getRelativeXPath(null);
    expect(xpath).toBe('');
  });
});

// Test suite for inputEventListener function
describe('inputEventListener', () => {
  let button: HTMLElement;
  let input: HTMLInputElement;
  let consoleSpy: jest.SpyInstance;
  // Initialize the recordedEvents array to store the recorded events
  let recordedEvents: any[];
  // Setup DOM before each test case
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="testButton">Click me</button>
      <input id="testInput" type="text" />
    `;

    button = document.getElementById('testButton') as HTMLElement;
    input = document.getElementById('testInput') as HTMLInputElement;

    // Spy on console.log to verify log messages. Replace console.log with a mock function 
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    let recordedEvents = [];
  });

  // Teardown function to run after each test case in this test suite
  afterEach(() => {
    // Restore the original console.log function after each test
    // This cleans up the side effects and ensure other tests are not affected
    consoleSpy.mockRestore();
  });

  test('should handle click events and log the interaction', () => {
    // Call inputEventListener with the click event and callback to store recorded events
    button.addEventListener('click', (event) =>
      inputEventListener(event as MouseEvent, (recordedEvent: any) => {
        recordedEvents.push(recordedEvent);
      })
    );
  
    // Simulate a click event
    button.click();
  
    // Check if console.log was called with the expected message
    const xPath = getRelativeXPath(button);
    expect(consoleSpy).toHaveBeenCalledWith(`User interaction with element: ${xPath}, Event type: click`);
  
    // Check if the click event was recorded in the recordedEvents array
    expect(recordedEvents).toHaveLength(1);
    expect(recordedEvents[0]).toEqual({ xPath, eventType: 'click' });
  });
  

  test('should handle input events and log the interaction', () => {
    // Manually focus the input element without triggering a click event
    (input as HTMLInputElement).focus({ preventScroll: true });
  
    // Clear the recordedEvents array before simulating the input event
    recordedEvents.length = 0;
  
    // Call inputEventListener with the input event and a callback to store the recorded event
    input.addEventListener('input', (event) =>
      inputEventListener(event as InputEvent, (recordedEvent: any) => {
        recordedEvents.push(recordedEvent);
      })
    );
  
    // Simulate an input event
    const inputValue = 'test value';
    input.value = inputValue;
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
  
    // Check if console.log was called with the expected message
    const xPath = getRelativeXPath(input);
    expect(consoleSpy).toHaveBeenCalledWith(
      `User interaction with element: ${xPath}, Event type: input, Input value: ${inputValue}`
    );
  
    // Check if the input event was recorded in the recordedEvents array
    expect(recordedEvents).toHaveLength(1);
    expect(recordedEvents[0]).toEqual({ xPath, eventType: 'input', inputValue });
  });
});