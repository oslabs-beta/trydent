import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { inputEventListener, getRelativeXPath } from "../utils/inputLogger";
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
// window.addEventListener('message', (event) => {
//   const xPath = event.data.xPath;
//   console.log('in app', xPath)
//   // Display xPath in your app UI
// });
const EventLogger = () => {
    // Maintain state for recorded events, focused element, and initial input value
    const [events, setEvents] = useState([]);
    const [focusedElement, setFocusedElement] = useState(null);
    const [initialValue, setInitialValue] = useState('');
    // Set up event listeners on component mount and clean up on unmount
    useEffect(() => {
        // Grab URL for current window
        const URL = window.location.href;
        const handleEvent = (event) => {
            // Handle focus event: set focused element and initial input value
            if (event.type === 'focus') {
                setFocusedElement(event.target);
                setInitialValue(event.target.value);
            }
            // Handle blur event: if input value has changed, log the event and reset focused element
            else if (event.type === 'blur') {
                const newValue = event.target.value;
                // compare initial value to new value to avoid logging events that don't change the input value
                if (initialValue !== newValue) {
                    const xPath = getRelativeXPath(event.target);
                    const eventType = 'input'; // ensures that the event is logged as an input event
                    // update the event state with new event object
                    setEvents((prevEvents) => [...prevEvents, { xPath, eventType, inputValue: newValue, URL }]);
                }
                setFocusedElement(null);
            }
            // Handle click and other events: log the event
            else {
                inputEventListener(event, (recordedEvent) => {
                    if (recordedEvent.eventType !== 'input' && recordedEvent.eventType !== 'change') {
                        setEvents((prevEvents) => [...prevEvents, { ...recordedEvent, URL }]);
                    }
                });
            }
        };
        // Add event listeners for click, focus, and blur events
        document.addEventListener('click', handleEvent, true);
        document.addEventListener('focus', handleEvent, true);
        document.addEventListener('blur', handleEvent, true);
        // Clean up event listeners when the component is unmounted
        /* Event listeners must be unmounted to prevent memory leaks or unexpected behavior.
        1. If not unmounted, listeners could still reference component even if it is not in DOM.
        2. If component is remounted, duplicate events could also be fired.
        */
        return () => {
            document.removeEventListener('click', handleEvent, true);
            document.removeEventListener('focus', handleEvent, true);
            document.removeEventListener('blur', handleEvent, true);
        };
    }, [focusedElement]); // only re-run effect if focused element changes
    // Log to view the different events
    console.log('These are the events:', events);
    // Render list of recorded events in a separate div
    return (_jsx("div", { className: "event-logger", children: events.map((event, index) => (_jsxs("div", { className: "event-block", children: [_jsxs("p", { children: ["xPath: ", event.xPath] }), _jsxs("p", { children: ["Event Type: ", event.eventType] }), _jsx("p", { children: window.location.href }), event.inputValue !== undefined && _jsxs("p", { children: ["Input Value: ", event.inputValue] })] }, index))) }));
};
export default EventLogger;
