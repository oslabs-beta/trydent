import React, { useState, useEffect } from "react";
import { inputEventListener, getRelativeXPath, RecordedEvent } from "../utils/inputLogger";

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
  // Maintain state for recorded events, focused element, and initial input value
  const [events, setEvents] = useState<Array<RecordedEvent>>([]);
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);
  const [initialValue, setInitialValue] = useState<string>('');

  // Set up event listeners on component mount and clean up on unmount
  useEffect(() => {
    // Grab URL for current window
    const URL = window.location.href;

    const handleEvent = (event: Event) => {
      // Handle focus event: set focused element and initial input value
      if (event.type === 'focus') {
        setFocusedElement(event.target as HTMLElement);
        setInitialValue((event.target as HTMLInputElement).value);
      } 
      // Handle blur event: if input value has changed, log the event and reset focused element
      else if (event.type === 'blur') {
        const newValue = (event.target as HTMLInputElement).value;
        // compare initial value to new value to avoid logging events that don't change the input value
        if (initialValue !== newValue) {
          const xPath = getRelativeXPath(event.target as HTMLElement);
          const eventType = 'input'; // ensures that the event is logged as an input event
          // update the event state with new event object
          setEvents((prevEvents) => [...prevEvents, { xPath, eventType, inputValue: newValue, URL }]);
        }
        setFocusedElement(null);
      } 
      // Handle click and other events: log the event
      else {
        inputEventListener(event as MouseEvent | InputEvent, (recordedEvent: RecordedEvent) => {
          if (recordedEvent.eventType !== 'input' && recordedEvent.eventType !== 'change') {
            setEvents((prevEvents) => [...prevEvents, {...recordedEvent, URL}]);
          }
        });
      }
    };

    // Add event listeners for click, focus, and blur events
    document.addEventListener('click', handleEvent as EventListener, true);
    document.addEventListener('focus', handleEvent as EventListener, true);
    document.addEventListener('blur', handleEvent as EventListener, true);

    // Clean up event listeners when the component is unmounted
    /* Event listeners must be unmounted to prevent memory leaks or unexpected behavior. 
    1. If not unmounted, listeners could still reference component even if it is not in DOM.
    2. If component is remounted, duplicate events could also be fired.
    */
    return () => {
      document.removeEventListener('click', handleEvent as EventListener, true);
      document.removeEventListener('focus', handleEvent as EventListener, true);
      document.removeEventListener('blur', handleEvent as EventListener, true);
    };
  }, [focusedElement]); // only re-run effect if focused element changes

  // Log to view the different events
  console.log('These are the events:', events);
  
  // Render list of recorded events in a separate div
  return (
    <div className="event-logger">
      {events.map((event, index) => (
        <div key={index} className="event-block">
          <p>xPath: {event.xPath}</p>
          <p>Event Type: {event.eventType}</p>
          <p>{window.location.href}</p>
          {event.inputValue !== undefined && <p>Input Value: {event.inputValue}</p>}
        </div>
      ))}
    </div>
  );
};

export default EventLogger;
