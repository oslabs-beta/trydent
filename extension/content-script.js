
// small test to confirm content script is actively communicating with the background.js
alert("My Dev Tool's content script is running!");


// document.addEventListener('click', function(event) {
//     // Send a message to the background script with the target element's tag name
//     chrome.runtime.sendMessage({ action: 'click', tagName: event.target.tagName });
//   });

document.addEventListener('click', function(event) {
    const xpath = getXPath(event.target);
    console.log('Clicked element XPath:', xpath);
    chrome.runtime.sendMessage({action: 'click', xpath:`${xpath}`})
  });
  
  function getXPath(element) {
    if (element && element.nodeType === Node.ELEMENT_NODE) {
      const paths = [];
      while (element) {
        console.log(element)
        const index = getIndex(element);
        const tagName = element.tagName;
        const path = `${tagName}[${index}]`;
        console.log(path)
        paths.unshift(path);
        element = element.parentNode;
      }
      return `//${paths.join('/')}`;
    }
    return '';
  }
  
  function getIndex(element) {
    let index = 1;
    let sibling = element.previousSibling;
    while (sibling) {
      if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === element.tagName) {
        index++;
      }
      sibling = sibling.previousSibling;
    }
    return index;
  }
  

// To investigate further, but below is most likely how the content-script communicates through the pipeline to the devtool
// Message flows from the injected script, to the content script, to the background script, and finally to the DevTools page. 
// window.addEventListener('message', function(event) {
//     // Only accept messages from the same frame
//     if (event.source !== window) {
//       return;
//     }
  
//     var message = event.data;
  
//     // Only accept messages that we know are ours
//     if (typeof message !== 'object' || message === null ||
//         message.source !== 'my-devtools-extension') {
//       return;
//     }
  
//     chrome.runtime.sendMessage(message);
//   });

