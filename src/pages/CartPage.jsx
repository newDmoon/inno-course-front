import { Box, Typography, Button } from "@mui/material";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Your Cart
      </Typography>

      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <CartSummary />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={() => navigate("/checkout")}
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
}
