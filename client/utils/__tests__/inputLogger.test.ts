// inputLogger.test.ts
import { getRelativeXPath } from '../inputLogger';

describe('getRelativeXPath', () => {
  // Set up a simple DOM structure for testing
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
