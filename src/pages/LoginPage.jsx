import React, { useState, useContext } from "react";
import { login } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginPage() {
  const { login: loginCtx } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({}); 

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    setFieldErrors({});

    try {
      const res = await login({ email, password });
      loginCtx(res.data.accessToken, res.data.refreshToken);
      window.location.href = "/";
    } catch (err) {
      console.error(err);

      if (err.response) {
        const { status, data } = err.response;

        if (status === 400 && data?.validationErrors) {
          const errors = {};
          data.validationErrors.forEach((e) => {
            errors[e.field] = e.message;
          });
          setFieldErrors(errors);
        }
        else if (status === 401) {
          setErrorMessage(data?.message);
        } 
        else if (status === 404) {
          setErrorMessage(data?.message);
        }
        else {
          setErrorMessage(data?.message);
        }
      } else {
        setErrorMessage("Server is unavailible");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          Sign in
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          autoFocus
          error={!!fieldErrors.email}
          helperText={fieldErrors.email}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          error={!!fieldErrors.password}
          helperText={fieldErrors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            mt: 3,
            borderRadius: 2,
            py: 1.5,
            textTransform: "none",
            fontWeight: "bold",
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign in"}
        </Button>
      </Paper>
    </Box>
  );
}
