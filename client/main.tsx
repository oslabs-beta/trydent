import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './scss/application.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)