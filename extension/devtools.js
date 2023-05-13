// Creates the Trydent panel in the dev tools
chrome.devtools.panels.create(
  '🔱 Trydent',
  null, // logo path (none at the moment)
  'panel.html', // HTML served to the panel
  null, // callback function
);
