import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserContext from './UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

localStorage.setItem("isAuth",false);
root.render(
  <React.StrictMode>
    <UserContext>
    <App />
    </UserContext>
  </React.StrictMode>
);

