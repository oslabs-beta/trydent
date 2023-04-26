import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import EventLogger from './EventLogger';
const App = () => {
    const [events, setEvents] = useState(JSON.parse(localStorage.getItem('loggedEvents') || '[]'));
    useEffect(() => {
        if (typeof chrome === 'undefined' || typeof chrome.runtime === 'undefined') {
            console.warn('chrome.runtime is not available');
            return;
        }
        const listener = (request, sender, sendResponse) => {
            console.log('Received message:', request);
            if (request.action === 'logEvent') {
                const newEvents = [...events, request.eventData];
                setEvents(newEvents);
                localStorage.setItem('loggedEvents', JSON.stringify(newEvents));
            }
        };
        chrome.runtime.onMessage.addListener(listener);
        return () => {
            chrome.runtime.onMessage.removeListener(listener);
        };
    }, [events]);
    return (_jsxs("div", { children: [_jsx("h1", { children: "Logged Events" }), _jsx(EventLogger, {}), events.map((event, index) => (_jsx("pre", { children: JSON.stringify(event, null, 2) }, index)))] }));
};
export default App;
