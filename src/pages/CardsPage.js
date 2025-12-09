import React, { useEffect, useState } from "react";
import { getCards } from "../api/cardApi";
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

export default function CardsPage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getCards().then((res) => setCards(res.data.content));
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>Cards</Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Number</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cards.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.userId}</TableCell>
                <TableCell>{c.number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
