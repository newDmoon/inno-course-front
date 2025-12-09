import React, { useContext } from "react";
import { AppBar, Toolbar, Button, Box, Typography, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CustomThemeContext } from "../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Header() {
  const { auth, setAuth } = useContext(AuthContext);
  const { toggleTheme, mode } = useContext(CustomThemeContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuth(false);
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Inno-shop
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Main
          </Button>
          <Button color="inherit" component={Link} to="/goods">
            Goods
          </Button>

          {auth && (
            <>
              <Button color="inherit" component={Link} to="/users">
                Пользователи
              </Button>
              <Button color="inherit" component={Link} to="/cards">
                Карты
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>

          {auth ? (
            <Button color="inherit" onClick={logout}>
              Sign-out
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Sign-in
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
