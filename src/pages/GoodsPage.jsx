import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../hooks/useCart";
import { getItems } from "../api/itemsApi";

export default function GoodsPage() {
  const [items, setItems] = useState([]);
  const { auth } = useContext(AuthContext);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems();
        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleAdd = (item) => {
    if (!auth) return alert("Sign in first!");
    addToCart(item);
    alert("Added to cart");
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 6 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              flex: "1 1 calc(33.333% - 32px)",
              minWidth: 260,
            }}
          >
            <Card>
              <CardContent>
                <Typography>{item.name}</Typography>
                <Typography>{item.price} $</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" onClick={() => handleAdd(item)}>
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
