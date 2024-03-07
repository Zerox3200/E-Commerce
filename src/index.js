import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import UserContextProvider from './Context/UserContext.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContextProvider } from './Context/CartContext.js';
let query = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartContextProvider>
    <UserContextProvider>
      <QueryClientProvider client={query}>
        <App />
      </QueryClientProvider>
    </UserContextProvider>
  </CartContextProvider>
);


reportWebVitals();
