import { getElementXPath, getRecordedEvents } from '../inputLogger';

describe('getElementXPath', () => {
  it('should return the correct XPath for a simple DOM structure', () => {
    document.body.innerHTML = `
      <div id="container">
        <button id="button">Click me</button>
      </div>
    `;

    const button = document.getElementById('button') as HTMLElement;
    const xPath = getElementXPath(button);

    expect(xPath).toBe('/html/body/div[@id=\'container\']/button[@id=\'button\']');
  });
  
  it('should return the correct XPath for a more complex DOM structure', () => {
    document.body.innerHTML = `
    <div id="main">
      <div class="wrapper">
        <div class="item" id="item-1">
          <button class="action">Action 1</button>
        </div>
        <div class="item" id="item-2">
          <button class="action">Action 2</button>
          <div class="sub-item">
            <button id="sub-action">Sub Action</button>
          </div>
        </div>
      </div>
      <div class="footer">
        <button class="action">Footer Action</button>
      </div>
    </div>
    `;

    const subActionButton = document.getElementById('sub-action') as HTMLElement;
    const xPath = getElementXPath(subActionButton);

    expect(xPath).toBe('/html/body/div[@id=\'main\']/div[@class=\'wrapper\'][1]/div[@id=\'item-2\'][@class=\'item\']/div[@class=\'sub-item\'][2]/button[@id=\'sub-action\']');
  })
});
