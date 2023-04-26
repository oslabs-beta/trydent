import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './scss/application.scss';
ReactDOM.render(_jsx(React.StrictMode, { children: _jsx(App, {}) }), document.getElementById('root'));
