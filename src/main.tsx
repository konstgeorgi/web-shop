import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from "./router/Router.tsx";
import {CartProvider} from "./context/CartProvider.tsx";
import {ProductProvider} from "./context/ProductProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ProductProvider>
      <CartProvider>
        <Router />
      </CartProvider>
      </ProductProvider>
  </React.StrictMode>,
)
