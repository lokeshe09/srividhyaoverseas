import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './styles/global.css';
import './styles/home.css';
import './styles/glass.css';
import './styles/theme.css';

// The pre-rendered HTML (scripts/prerender.mjs) contains crawlable fallback content
// inside #root; createRoot replaces it with the live app.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
