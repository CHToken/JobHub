import React from 'react';
import ReactDOM from 'react-dom/client';
// import './global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WalletProvider } from './components/WalletContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <WalletProvider>
        <App />
      </WalletProvider>
  </React.StrictMode>
);

reportWebVitals();