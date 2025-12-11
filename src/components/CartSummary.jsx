import { Box, Typography } from "@mui/material";
import { useCart } from "../hooks/useCart";

export default function CartSummary() {
  const { cart } = useCart();
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Total: {total.toFixed(2)} $</Typography>
    </Box>
  );
}
