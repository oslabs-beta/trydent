import React, { useState, useEffect } from 'react';
import EventLogger from './EventLogger';
import { sampleText, sampleTextFormatted } from '../utils/testCreator';

import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

// console.log(prettier.format("let a = 6  ;", {
//   parser: "babel",
//   plugins: [parserBabel]
// }))

const prettierFormat = (input) => {
  return prettier.format(input, {
    parser: 'babel',
    plugins: [parserBabel],
  });
};

// console.log(prettierFormat("let a = 6  ;"))
// console.log(sampleTextFormatted)
console.log(sampleText);
console.log(prettierFormat(sampleText));
console.log('sampleTextFormatted:', sampleTextFormatted);

const displayText = `
//High level description on how the button should be clicked
describe("click on the thing", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
    cy.window().should("have.property", "appReady", true);
  });

  it("should be a click3", () => {
    cy.xpath('[".XPATH"]').click();
    cy.url().should("include", "/user/login");
    cy.xpath('[".XPATH"]').input("typed into the box");
  });
  it("should be a input4", () => {
    cy.xpath('[".XPATH"]').click();
    cy.url().should("include", "/user/login");
    cy.xpath('[".XPATH"]').input("typed into the box");
  });
});
`

const App: React.FC = () => {
  return (
    <div>
      <h1>Logged Events</h1>
      <p>Pain</p>
      <h3>Code Block</h3>
      {/* display displayText in an HTML code block that preserves its indentation */}
      <pre>
        <code>{displayText}</code>
      </pre>
      <EventLogger />
    </div>
  );
};

export default App;
