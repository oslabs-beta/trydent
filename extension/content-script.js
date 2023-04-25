
// small test to confirm content script is actively communicating with the background.js
alert("My Dev Tool's content script is running!");
document.body.style.backgroundColor = "red";

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

