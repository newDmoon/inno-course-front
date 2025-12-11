import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 6,
        py: 3,
        textAlign: "center",
        borderTop: "1px solid",
      }}
    >
      <Box sx={{ mb: 1 }}>
        <IconButton
          component="a"
          href="https://github.com/newDmoon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </IconButton>

        <IconButton
          component="a"
          href="https://www.linkedin.com/in/dmitry-novogrodsky/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </IconButton>

        <IconButton
          component="a"
          href="https://t.me/dnoviy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TelegramIcon />
        </IconButton>
      </Box>

      <Typography sx={{ fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} Innowise Internship by @dnoviy (Dmitry
        Novogrodsky)
      </Typography>
    </Box>
  );
}
