// Import the getRelativeXPath function and inputEventListener from the inputLogger module
import { inputEventListener, getRelativeXPath } from './bundles/client/utils/inputLogger';

document.addEventListener('click', (event) => {
  const xPath = getRelativeXPath(event.target);
  console.log('Clicked element XPath:', xPath);
  window.postMessage({ xPath }, '*');
  chrome.runtime.sendMessage({ action: 'logEvent', xPath: { xPath } });
});

// Set up the inputEventListener with an empty callback function
inputEventListener({}, () => {});
