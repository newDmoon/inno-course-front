import React from "react";
import { Box } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout({ children }) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer />
    </Box>
  );
}
