import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

function InfoCard({ title, children }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        mb: 3,
        flex: "1 1 300px",
        minWidth: 280,
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const frontendTech = [
    "React 18",
    "Material UI (MUI)",
    "Axios",
    "React Router v6",
  ];
  const backendTech = [
    "Java 21 + Spring Boot 3.4",
    "MapStruct",
    "JWT + Authentication",
    "Microservices Architecture with Patterns",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
  ];

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 6, px: 2 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Inno-shop – Internship Project
      </Typography>

      <Typography variant="h6" align="center" sx={{ mb: 6 }}>
        Educational project developed for an internship at Innowise Group
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <InfoCard title="About the Project">
          <Typography variant="body1">
            Inno-shop is a demo project designed to test backend API
            functionality, implement architecture design, and build a
            client-side application using modern technologies.
          </Typography>
        </InfoCard>

        <InfoCard title="Innowise Group">
          <Typography variant="body1">
            Innowise Group is an international IT company with offices
            worldwide, specializing in full-cycle software development.
            <br />
            <br />
            The company operates in over 30 technology domains, including
            fintech, healthcare, e-commerce, entertainment, blockchain, and
            enterprise solutions.
          </Typography>
        </InfoCard>

        <InfoCard title="Project Technologies">
          <Typography variant="body1" sx={{ mb: 2 }}>
            The project uses a modern technology stack:
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ flex: "1 1 200px" }}>
              <Typography
                variant="h6"
                sx={{ mb: 1, fontWeight: "bold", color: "primary.main" }}
              >
                Frontend
              </Typography>
              <Box sx={{ ml: 2 }}>
                {frontendTech.map((tech) => (
                  <Typography key={tech}>• {tech}</Typography>
                ))}
              </Box>
            </Box>

            <Box sx={{ flex: "1 1 200px" }}>
              <Typography
                variant="h6"
                sx={{ mb: 1, fontWeight: "bold", color: "primary.main" }}
              >
                Backend & Architecture
              </Typography>
              <Box sx={{ ml: 2 }}>
                {backendTech.map((tech) => (
                  <Typography key={tech}>• {tech}</Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </InfoCard>
      </Box>
    </Box>
  );
}
