import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Paper, Divider, Grid, CircularProgress, useTheme } from "@mui/material";
import { getOrders } from "../api/orderApi";
import { AuthContext } from "../context/AuthContext";
import { getUsers } from "../api/userApi";

const statusColors = (theme, status) => {
  switch (status) {
    case "PENDING":
      return theme.palette.warning.main;
    case "CONFIRMED":
      return theme.palette.info.main;
    case "DELIVERED":
      return theme.palette.success.main;
    case "CANCELLED":
      return theme.palette.error.main;
    default:
      return theme.palette.text.primary;
  }
};

export default function OrdersPage() {
  const { auth } = useContext(AuthContext);
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.sub) return;

      try {
        const usersResponse = await getUsers(0, 1, auth.sub);
        const user = usersResponse.data.content?.[0];
        if (!user) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const filter = { userId: user.id }; 
        const ordersResponse = await getOrders(filter, 0, 10);
        setOrders(ordersResponse.data.content);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [auth.sub]);

  if (loading) {
    return (
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!orders.length) {
    return (
      <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Your Orders
        </Typography>
        <Typography>No orders found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Your Orders
      </Typography>

      {orders.map((order) => {
        const total = order.orderItems?.reduce(
          (sum, item) => sum + item.item.price * item.quantity,
          0
        ) || 0;

        return (
          <Paper key={order.id} sx={{ p: 2, mb: 3 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Order #{order.id}</Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ fontWeight: "bold", color: statusColors(theme, order.status) }}
              >
                {order.status}
              </Typography>
            </Grid>

            <Divider sx={{ my: 1 }} />

            {order.orderItems?.map((item) => (
              <Box
                key={item.id}
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>{item.item.name} x{item.quantity}</Typography>
                <Typography>{(item.item.price * item.quantity).toFixed(2)} $</Typography>
              </Box>
            ))}

            <Divider sx={{ my: 1 }} />

            <Grid container>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Total:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="subtitle1">{total.toFixed(2)} $</Typography>
              </Grid>
            </Grid>
          </Paper>
        );
      })}
    </Box>
  );
}
