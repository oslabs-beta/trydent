import React from "react";
import EventLogger from "./EventLogger";

/**
 * App is root component of application
 * @component
 */
const App: React.FC = () => {
  return (
    <div>
      <h1 data-test="hello-class" id="hello-world-id">Hello World</h1>
      <button data-cy="click-me-class">Click Me</button>
      <button id="click-me-2-id">Click Me 2</button>
      <input type="text" placeholder="Type here" />

      {/* EventLogger component is responsible for displaying the recorded user input events */}
      <EventLogger />
    </div>
  );
}

export default App;
