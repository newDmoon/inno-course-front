import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { getUsers } from "../api/userApi";
import { createCard, deleteCard } from "../api/cardApi";

export default function ProfilePage() {
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [createCardOpen, setCreateCardOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    holder: "",
    expirationDate: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const userEmail = auth.sub;

  useEffect(() => {
    if (!userEmail) {
      setLoading(false);
      return;
    }

    getUsers(0, 1, userEmail)
      .then((res) => {
        const data = res.data.content?.[0] || null;
        setUser(data);
      })
      .catch((err) => console.error("Error fetching profile:", err))
      .finally(() => setLoading(false));
  }, [userEmail]);

  const validateCard = () => {
    const errors = {};

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCardFieldChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCloseCreateCard = () => {
    setCreateCardOpen(false);
    setNewCard({ number: "", holder: "", expirationDate: "" });
    setValidationErrors({});
  };

  const handleCreateCard = async () => {
    if (!validateCard()) return;

    try {
      const dto = {
        ...newCard,
        userId: user.id,
      };
      const res = await createCard(dto);
      setUser((prev) => ({
        ...prev,
        cards: [...prev.cards, res.data],
      }));
      handleCloseCreateCard();
    } catch (err) {
      const apiError = err.response?.data;

      if (apiError?.validationErrors) {
        const backendErrors = apiError.validationErrors.reduce((acc, current) => {
          acc[current.field] = current.message;
          return acc;
        }, {});
        setValidationErrors(backendErrors);
      } else {
        alert(apiError?.message || "An unexpected error occurred.");
      }
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;

    try {
      await deleteCard(cardId);
      setUser((prev) => ({
        ...prev,
        cards: prev.cards.filter((c) => c.id !== cardId),
      }));
    } catch (err) {
      alert("Error deleting card. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box p={3}>
        <Typography variant="h5">Profile not found</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Profile</Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" mb={1}>User Info</Typography>
        <Typography>ID: {user.id}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Name: {user.name || "-"}</Typography>
        <Typography>Surname: {user.surname || "-"}</Typography>
        <Typography>
          Birth Date: {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : "-"}
        </Typography>

        <Button sx={{ mt: 2 }} variant="contained" onClick={() => setCreateCardOpen(true)}>
          Add Card
        </Button>
      </Paper>

      <Typography variant="h5" mb={2}>Cards</Typography>

      {user.cards?.length ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {user.cards.map((card) => (
            <Card
              key={card.id}
              sx={{
                flex: "1 1 250px",
                minHeight: 160,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 2,
                background: "linear-gradient(135deg, #ece9e6, #ffffff)",
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" mb={1}>Number: {card.number}</Typography>
                <Typography>Holder: {card.holder}</Typography>
                <Typography>Expires: {new Date(card.expirationDate).toLocaleDateString()}</Typography>
              </CardContent>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                <Button size="small" color="error" onClick={() => handleDeleteCard(card.id)}>
                  Delete
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography>No cards found</Typography>
      )}

      <Dialog open={createCardOpen} onClose={handleCloseCreateCard}>
        <DialogTitle>Add Card</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Number"
            name="number"
            value={newCard.number}
            onChange={handleCardFieldChange}
            error={!!validationErrors.number}
            helperText={validationErrors.number}
          />

          <TextField
            label="Holder"
            name="holder"
            value={newCard.holder}
            onChange={handleCardFieldChange}
            error={!!validationErrors.holder}
            helperText={validationErrors.holder}
          />

          <TextField
            label="Expiration Date"
            name="expirationDate"
            type="date"
            value={newCard.expirationDate}
            onChange={handleCardFieldChange}
            error={!!validationErrors.expirationDate}
            helperText={validationErrors.expirationDate}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseCreateCard}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateCard}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
