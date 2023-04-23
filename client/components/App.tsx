import React from "react";
import EventLogger from "./EventLogger";

/**
 * App is root component of application
 * @component
 */
const App: React.FC = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <button>Click Me</button>
      <button>Click Me 2</button>
      <input type="text" placeholder="Type here" />

      {/* EventLogger component is responsible for displaying the recorded user input events */}
      <EventLogger />
    </div>
  );
}

export default App;
