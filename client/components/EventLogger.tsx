import React, { useState, useEffect } from "react";
import { inputEventListener, RecordedEvent } from "../utils/inputLogger";

/**
 * Listens to user interaction events, logging the event details and rendering the recorded events in a list
 * 
 * @component
 * @example
 * return (
 *  <EventLogger/>
 * )
 * @returns {ReactElement} A React element containing list of recorded events
 */
const EventLogger: React.FC = () => {
  // Maintain state for recorded events
  const [events, setEvents] = useState<Array<RecordedEvent>>([]);

  // Event listeners on component mount and clean up on unmount
  useEffect(() => {
    const handleEvent = (event: MouseEvent | InputEvent) => {
      // Call inputEventLIstener from utils/inputLogger.ts to process event and update events state
      inputEventListener(event, (recordedEvent: RecordedEvent) => {
        setEvents((prevEvents) => [...prevEvents, recordedEvent]);
      });
    };

    // Add event listeners for click, input, and change events
    document.addEventListener('click', handleEvent as EventListener, true);
    document.addEventListener('input', handleEvent as EventListener, true);
    document.addEventListener('change', handleEvent as EventListener, true);

    // Clean up event listeners when the component is unmounted
    return () => {
      document.removeEventListener('click', handleEvent as EventListener, true);
      document.removeEventListener('input', handleEvent as EventListener, true);
      document.removeEventListener('change', handleEvent as EventListener, true);
    };
  }, []);

  // Render list of recorded events in a separate div
  return (
    <div className="event-logger">
      {events.map((event, index) => (
        <div key={index} className="event-block">
          <p>xPath: {event.xPath}</p>
          <p>Event Type: {event.eventType}</p>
          {event.inputValue !== undefined && <p>Input Value: {event.inputValue}</p>}
        </div>
      ))}
    </div>
  );
};

export default EventLogger;
