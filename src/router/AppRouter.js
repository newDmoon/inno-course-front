import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import UsersPage from "../pages/UsersPage";
import CardsPage from "../pages/CardsPage";
import HomePage from "../pages/HomePage";
import GoodsPage from "../pages/GoodsPage";
import { AuthContext } from "../context/AuthContext";

export default function AppRouter() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/goods" element={<GoodsPage />} />
      <Route path="/login" element={<LoginPage />} />

      {auth ? (
        <>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/cards" element={<CardsPage />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}
