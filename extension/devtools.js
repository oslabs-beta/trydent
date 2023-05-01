// Creates the panels in the dev tools
chrome.devtools.panels.create(
  "Trydent",
  null, // logo path
  "panel.html", // HTML served to the panel
  null
);

let isConnected = false;
let backgroundPageConnection;

const connectToBackground = () => {
  backgroundPageConnection = chrome.runtime.connect({
    name: "devtools-page",
  });

  backgroundPageConnection.postMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    scriptToInject: "content-script.js",
  });

  backgroundPageConnection.onMessage.addListener((message) => {
    eventArr.push(message);
  });

  isConnected = true;
};

// Listen for the "startRecording" event from TestPage.tsx
window.addEventListener("startRecording", (e) => {
  if (!isConnected) {
    connectToBackground();
  }
});

const eventArr = [];

const panel = document.getElementById("panel");

const describeObj = {
  URL: "localhost:3000",
  description: "Test go Boom",
  writeUp: "This is a test and it's going to work :)... eventually",
  itStatements: [
    {
      itStatement: "Track my random clicks",
      eventArr: eventArr,
    },
  ],
};

async function describeCreatorImport() {
  const { describeCreator } = await import("./bundles/utils/testCreator.js");
  return describeCreator(describeObj);
}

const submitButton = document.createElement("button");
panel.appendChild(submitButton);
submitButton.innerText = "submit";
submitButton.addEventListener("click", async (e) => {
  console.log("clicked submit");
  console.log("events array?", eventArr);

  console.log(describeCreatorImport());
});
