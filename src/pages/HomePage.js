import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

function InfoCard({ title, children }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3, flex: "1 1 300px", minWidth: 280 }}>
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
  const frontendTech = ["React 18", "Material UI (MUI)", "Axios", "React Router v6"];
  const backendTech = ["Java 21 + Spring Boot 3.4", "MapStruct", "JWT + Authentication", 
    "Microservices Architecture with patterns", "PostgreSQL", "MongoDB", "Redis", "Docker", ];

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 6, px: 2 }}>
      <Typography variant="h3" align="center" sx={{ fontWeight: "bold", mb: 4 }}>
        Inno-shop – Internship Project
      </Typography>

      <Typography variant="h6" align="center" sx={{ mb: 6 }}>
        Учебный проект, разработанный для стажировки в компании Innowise Group
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <InfoCard title="О проекте">
          <Typography variant="body1">
            Inno-shop — это демонстрационный проект, разработанный для проверки работы backend API, проектирования архитектуры и построения клиентского приложения с использованием современных технологий.
          </Typography>
        </InfoCard>

        <InfoCard title="Innowise Group">
          <Typography variant="body1">
            Innowise Group — международная IT-компания с офисами по всему миру, специализирующаяся на полном цикле разработки ПО.
            <br /><br />
            Компания работает в более чем 30 технологических доменах, включая fintech, healthcare, e-commerce, entertainment, blockchain и enterprise решения.
          </Typography>
        </InfoCard>

        <InfoCard title="Технологии проекта">
          <Typography variant="body1" sx={{ mb: 2 }}>
            Проект использует стек современных технологий
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ flex: "1 1 200px" }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", color: "primary.main" }}>
                Frontend
              </Typography>
              <Box sx={{ ml: 2 }}>
                {frontendTech.map((tech) => (
                  <Typography key={tech}>• {tech}</Typography>
                ))}
              </Box>
            </Box>

            <Box sx={{ flex: "1 1 200px" }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", color: "primary.main" }}>
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
