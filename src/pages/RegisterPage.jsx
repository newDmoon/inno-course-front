import React, { useState } from "react";
import { register } from "../api/authApi";
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
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    birthDate: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleRegister = async () => {
    setLoading(true);
    setErrorMessage("");
    setFieldErrors({});

    try {
      await register(form);
      navigate("/login");
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
        } else {
          setErrorMessage(data?.message || "Registration failed");
        }
      } else {
        setErrorMessage("Server is unavailable");
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
          Register
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Name"
          value={form.name}
          onChange={handleChange("name")}
          margin="normal"
          error={!!fieldErrors.name}
          helperText={fieldErrors.name}
        />

        <TextField
          fullWidth
          label="Surname"
          value={form.surname}
          onChange={handleChange("surname")}
          margin="normal"
          error={!!fieldErrors.surname}
          helperText={fieldErrors.surname}
        />

        <TextField
          fullWidth
          label="Email"
          value={form.email}
          onChange={handleChange("email")}
          margin="normal"
          error={!!fieldErrors.email}
          helperText={fieldErrors.email}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange("password")}
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

        <TextField
          fullWidth
          label="Birth Date"
          type="date"
          value={form.birthDate}
          onChange={handleChange("birthDate")}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!fieldErrors.birthDate}
          helperText={fieldErrors.birthDate}
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
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Register"
          )}
        </Button>
      </Paper>
    </Box>
  );
}
