import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function GoodsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const mockItems = [
      { id: 1, name: "Laptop Dell XPS 15", price: 2699.99 },
      { id: 2, name: "iPhone 15 Pro Max", price: 1599.49 },
      { id: 3, name: "Sony WH-1000XM5", price: 399.99 },
      { id: 4, name: "Apple MacBook Pro 16", price: 3899.99 },
      { id: 5, name: "PlayStation 5 Slim", price: 599.99 },
    ];
    setItems(mockItems);
    setLoading(false);
  }, []);

  const handleButtonClick = () => {
    if (!auth) {
      navigate("/login");
    } else {
      alert("Good added to cart!");
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 6, px: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        Goods
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.2s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    {item.price} $
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ borderRadius: 2 }}
                    onClick={handleButtonClick}
                  >
                    {auth ? "Add to cart" : "Sign in"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
