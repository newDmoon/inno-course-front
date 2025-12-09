import React, { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";

export const CustomThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#c63031" : "#c63031",
          },
          secondary: {
            main: mode === "light" ? "#ff9800" : "#ffb74d",
            contrastText: "#000",
          },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#645d6a",
            paper: mode === "light" ? "#fff" : "#1d1d1d", // фон Card, Paper и т.д.
            Box: mode === "light" ? "#fff" : "#645d6a", // фон Card, Paper и т.д.
          },
        },
      }),
    [mode]
  );

return (
    <CustomThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> 
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          {children}
        </Box>
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
};
