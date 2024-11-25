import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";

const initialItems = [
  { name: "Biskuit", price: 6000, stock: 5 },
  { name: "Chips", price: 8000, stock: 5 },
  { name: "Oreo", price: 10000, stock: 5 },
  { name: "Tango", price: 12000, stock: 5 },
  { name: "Cokelat", price: 15000, stock: 5 },
];

const VendingMachine = () => {
  // Buat copy di awal dengan spread operator
  const [items, setItems] = useState([...initialItems].map(item => ({...item})));
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const insertMoney = (amount) => {
    const validDenominations = [2000, 5000, 10000, 20000, 50000];
    if (!validDenominations.includes(amount)) {
      setMessage("Pecahan uang tidak valid!");
      setOpenSnackbar(true);
      return;
    }

    setBalance(balance + amount);
    setMessage(`Uang Anda: ${balance + amount}`);
    setOpenSnackbar(true);
  };

  const purchaseItem = (index) => {
    const item = items[index];

    if (item.stock <= 0) {
      setMessage(`${item.name} habis!`);
      setOpenSnackbar(true);
      return;
    }

    if (balance < item.price) {
      setMessage("Uang tidak cukup!");
      setOpenSnackbar(true);
      return;
    }

    const updatedItems = [...items];
    updatedItems[index].stock -= 1;
    setItems(updatedItems);
    setBalance(balance - item.price);
    setMessage(`Anda membeli ${item.name}`);
    setOpenSnackbar(true);

    // Sepertinya ini tidak diperlukan
    // setTimeout(() => {
    //   const updatedItemsWithRestock = [...updatedItems];
    //   updatedItemsWithRestock[index].stock += 1;
    //   setItems(updatedItemsWithRestock);
    //   setMessage(`Stok ${item.name} telah ditambahkan.`);
    //   setOpenSnackbar(true);
    // }, 5000);

    // setBalance(balance + item.price);
  };

  const refund = () => {
    setMessage(`Pengembalian uang: ${balance}`);
    setBalance(0);
    setOpenSnackbar(true);
  };

  const resetStock = () => {
    // Reset dengan spread operator
    setItems([...initialItems].map(item => ({...item})));
    setMessage("Stok makanan telah direset.");
    setOpenSnackbar(true);
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        margin: 2,
        padding: 2,
        border: "2px solid #ccc",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h4">Vending Machine - Inspiro</Typography>
      <Grid container spacing={2} sx={{ marginY: 2 }}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Harga: {item.price}</Typography>
                <Typography>Stok: {item.stock}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => purchaseItem(index)}
                >
                  Beli
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6">Masukkan Uang:</Typography>
      <Box sx={{ marginY: 2 }}>
        {[2000, 5000, 10000, 20000, 50000].map((denom) => (
          <Button
            key={denom}
            variant="contained"
            onClick={() => insertMoney(denom)}
            sx={{ margin: 1 }}
          >
            {denom}
          </Button>
        ))}
      </Box>
      <Button variant="contained"
        color="error" // Ubah dari "secondary" menjadi "error"
        onClick={() => refund()}
        sx={{ margin: 1 }}
      >
        Kembalian Uang
      </Button>
      <Button variant="outlined" onClick={resetStock} sx={{ margin: 1 }}>
        Reset Stok
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Typography variant="h6">Saldo: {balance}</Typography>
    </Box>
  );
};

export default VendingMachine;