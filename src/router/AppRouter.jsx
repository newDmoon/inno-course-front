import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import UsersPage from "../pages/UsersPage";
import CardsPage from "../pages/CardsPage";
import HomePage from "../pages/HomePage";
import GoodsPage from "../pages/GoodsPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import CartPage from "../pages/CartPage";
import OrdersPage from "../pages/OrdersPage";
import { AuthContext } from "../context/AuthContext";
import CheckoutPage from "../pages/CheckoutPage";

export default function AppRouter() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/goods" element={<GoodsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {auth ? (
        <>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}
