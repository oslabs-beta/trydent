// Create a connection to the background page
const backgroundPageConnection = chrome.runtime.connect({
    name: "devtools-page"
});