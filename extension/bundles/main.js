import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './scss/application.scss';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(_jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }), document.getElementById('root'));
