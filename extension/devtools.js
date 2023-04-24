// Creates the panels in the dev tools

chrome.devtools.panels.create(
  'Trydent', 
  null, // logo path
  'panel.html', // HTML served to the panel
  null 
);