import React from "react";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import CartProvider from "./context/CartContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>
          <Layout>
            <AppRouter />
          </Layout>
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
