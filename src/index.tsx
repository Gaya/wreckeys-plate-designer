import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/style.scss';

import App from './App';
import AppContextProvider from './AppContextProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
