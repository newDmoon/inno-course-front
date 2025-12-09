import React from "react";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <AppRouter />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
