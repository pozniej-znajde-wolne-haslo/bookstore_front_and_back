import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Container from './context/Container.jsx';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Container>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Container>
  </React.StrictMode>
);
