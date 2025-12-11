import { Box, Typography, Button, Divider, Grid, Paper } from "@mui/material";
import { useCart } from "../hooks/useCart";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createOrder } from "../api/orderApi";
import { getUsers } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, i) => sum + i.price, 0);

  const sendOrder = async () => {
    if (cart.length === 0) return;

    try {
      const usersResponse = await getUsers(0, 1, auth.sub);
      const user = usersResponse.data.content?.[0];

      if (!user) {
        alert("User not found");
        return;
      }

      const orderDto = {
        userId: user.id,
        status: "PENDING",
        orderItems: cart.map((item) => ({
          quantity: item.quantity || 1,
          item: {
            id: item.id,
            name: item.name,
            price: item.price,
          },
        })),
      };

      await createOrder(orderDto);

      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Failed to create order. Try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Checkout
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="subtitle1">Your cart is empty</Typography>
      ) : (
        <>
          <Paper sx={{ p: 2, mb: 3 }}>
            {cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography>{item.name}</Typography>
                <Typography>{item.price.toFixed(2)} $</Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h6">Total:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="h6">{totalPrice.toFixed(2)} $</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Button variant="contained" fullWidth onClick={sendOrder}>
            Confirm Order
          </Button>
        </>
      )}
    </Box>
  );
}
