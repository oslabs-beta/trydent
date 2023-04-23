import { getRelativeXPath, inputEventListener, RecordedEvent, getRecordedEvents } from '../inputLogger';

// Test suite for getRelativeXPath function
describe('getRelativeXPath', () => {
  // Helper function to set up a simple DOM structure for testing
  const setupDOM = () => {
    document.body.innerHTML = `
      <div>
        <p class="test">Paragraph 1</p>
        <p>Paragraph 2</p>
        <div>
          <span>Span 1</span>
          <span>Span 2</span>
        </div>
      </div>
    `;
  };

  test('should generate a relative XPath for an element without unique attribute', () => {
    setupDOM();
    const span1 = document.querySelector('span');
    if (!span1 || !(span1 instanceof HTMLElement)) throw new Error('Test element not found');
    const xpath = getRelativeXPath(span1);
    expect(xpath).toBe('/html[1]/body[1]/div[1]/div[1]/span[1]');
  });

  test('should generate a relative XPath for an element with a unique attribute', () => {
    setupDOM();
    const p1 = document.querySelector('.test');
    if (!p1 || !(p1 instanceof HTMLElement)) throw new Error('Test element not found');
    const xpath = getRelativeXPath(p1, 'class');
    expect(xpath).toBe('//p[@class="test"]');
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
  let consoleSpy: jest.SpyInstance; //
  let recordedEvents: Array<RecordedEvent>;

  // Setup function to run before each test case in this test suite
  beforeEach(() => {
    // Create DOM elements for testing
    document.body.innerHTML = `
      <button id="testButton">Click me</button>
      <input id="testInput" type="text" />
    `;

    button = document.getElementById('testButton') as HTMLElement;
    input = document.getElementById('testInput') as HTMLInputElement;

    // Spy on console.log to verify log messages. Replace console.log with a mock function 
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Access the recordedEvents array
    recordedEvents = getRecordedEvents();
  });

  // Teardown function to run after each test case in this test suite
  afterEach(() => {
    // Restore the original console.log function after each test
    // This cleans up the side effects and ensure other tests are not affected
    consoleSpy.mockRestore();
  });

  test('should handle click events and log the interaction', () => {
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
  
    // Simulate an input event
    const inputValue = 'test value';
    input.value = inputValue;
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
  
    // Check if console.log was called with the expected message
    const xPath = getRelativeXPath(input);
    expect(consoleSpy).toHaveBeenCalledWith(`User interaction with element: ${xPath}, Event type: input, Input value: ${inputValue}`);
  
    // Check if the input event was recorded in the recordedEvents array
    expect(recordedEvents).toHaveLength(1);
    expect(recordedEvents[0]).toEqual({ xPath, eventType: 'input', inputValue });
  });
  
});
