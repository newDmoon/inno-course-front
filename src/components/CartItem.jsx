import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../hooks/useCart";

export default function CartItem({ item }) {
  const { removeFromCart } = useCart();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        borderBottom: "1px solid #ccc",
      }}
    >
      <Box>
        <Typography variant="h6">{item.name}</Typography>
        <Typography>{item.price} $</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={() => removeFromCart(item.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
