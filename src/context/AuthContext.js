import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

function parseJwt(token) {
  try {
    const base64 = token.split(".")[1];
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function AuthProvider({ children }) {
  const token = localStorage.getItem("accessToken");
  const [auth, setAuth] = useState(token ? parseJwt(token) : null);

  const login = (access, refresh) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    setAuth(parseJwt(access));
  };

  const logout = () => {
    localStorage.clear();
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
