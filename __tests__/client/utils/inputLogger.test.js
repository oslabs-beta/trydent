const { getRelativeXPath, inputEventListener } = require('../../../client/utils/inputLogger');

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
    if (!span1) throw new Error('Test element not found');
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
  let button;
  let input;
  let consoleSpy;
  const recordedEvents = [];

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="testButton">Click me</button>
      <input id="testInput" type="text" />
    `;

    button = document.getElementById('testButton');
    input = document.getElementById('testInput');

    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should handle click events and log the interaction', () => {
    // Call inputEventListener with the click event and callback to store recorded events
    button.addEventListener('click', (event) => inputEventListener(event, (recordedEvent) => {
      recordedEvents.push(recordedEvent);
    }));

    // Simulate a click event
    button.click();

    // Check if console.log was called with the expected message
    const xPath = getRelativeXPath(button);
    expect(consoleSpy).toHaveBeenCalledWith(`User interaction with element: ${xPath}, Event type: click`);

    // Check if the click event was recorded in the recordedEvents array
    expect(recordedEvents).toHaveLength(1);
    expect(recordedEvents[0]).toEqual({ xPath, eventType: 'click' });
  });
});
