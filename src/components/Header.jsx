import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CustomThemeContext } from "../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Header() {
  const { auth, logout: contextLogout } = useContext(AuthContext);
  const { toggleTheme, mode } = useContext(CustomThemeContext);
  const navigate = useNavigate();

  const isUser = auth?.roles?.includes("ROLE_USER");
  const isAdmin = auth?.roles?.includes("ROLE_ADMIN");

  const logout = () => {
    contextLogout();
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/profile");
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

          {auth && isUser && (
            <>
              <Button color="inherit" component={Link} to="/cart">
                Cart
              </Button>
              <Button color="inherit" component={Link} to="/orders">
                Orders
              </Button>
            </>
          )}

          {auth && isAdmin && (
            <>
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
              <Button color="inherit" component={Link} to="/cards">
                Cards
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>

          {auth ? (
            <>
              <Typography
                variant="subtitle1"
                sx={{ cursor: "pointer", mx: 2 }}
                onClick={goToProfile}
                title="Go to your profile"
              >
                {auth.sub}
              </Typography>
              <Button color="inherit" onClick={logout}>
                Sign-out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Sign-in
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Sign-up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
