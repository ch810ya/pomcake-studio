import { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Typography,
  Box,
  Paper
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SalesForm.css';

// Custom dark theme for MUI components to match admin panel
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // soft-blue
    },
    background: {
      paper: '#1e293b', // card-bg
      default: '#0f172a', // dark-bg
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#94a3b8',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
        },
      },
    },
  },
});

const SalesForm = ({ onSaleAdded, onSaleUpdated, editingSale, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    customerName: '',
    contact: '',
    cake: '',
    size: '10cm',
    quantity: '',
    orderType: 'Pickup',
    pickupDate: '',
    pickupTime: '',
    price: '',
    payment: 'Pending',
    preparation: 'Pending',
    delivery: 'Pending',
    address: ''
  });

  // Load editing sale data when editingSale changes
  useEffect(() => {
    if (editingSale) {
      setFormData({
        date: editingSale.date || new Date().toISOString().split('T')[0],
        customerName: editingSale.customerName || '',
        contact: editingSale.contact || '',
        cake: editingSale.cake || '',
        size: editingSale.size || '10cm',
        quantity: editingSale.quantity || '',
        orderType: editingSale.orderType || 'Pickup',
        pickupDate: editingSale.pickupDate || '',
        pickupTime: editingSale.pickupTime || '',
        price: editingSale.price || '',
        payment: editingSale.payment || 'Pending',
        preparation: editingSale.preparation || 'Pending',
        delivery: editingSale.delivery || 'Pending',
        address: editingSale.address || ''
      });
    }
  }, [editingSale]);

  const [errors, setErrors] = useState({});

  const cakeOptions = [
    'Four Choco',
    'Pistachio Pomisu',
    'Classic Pomisu',
    'Cookies n Cream',
    'Matcha Strawberry',
    'Passionfruit',
    'Basque Burnt - Original',
    'Basque Burnt - Strawberry',
    'Bento - Choco',
    'Bento - Strawberry',
    'Bento - Oreo',
    'Bento - Passionfruit',
    'Ubi Cilembu',
    'Other'
  ];

  const sizeOptions = ['10cm', '15cm', '18cm', 'Custom'];
  const orderTypeOptions = ['Pickup', 'Delivery'];
  const statusOptions = ['Pending', 'Completed', 'Cancelled'];
  const pickupTimeOptions = [
    '9 am - 11 am',
    '11 am - 1 pm',
    '1 pm - 3 pm',
    '3 pm - 5 pm',
    '5 pm - 7 pm',
    '7 pm - 9 pm'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required';
    if (!formData.cake) newErrors.cake = 'Cake selection is required';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Quantity must be > 0';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be > 0';
    if (!formData.date) newErrors.date = 'Order date is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingSale) {
      onSaleUpdated(editingSale.id, formData);
    } else {
      onSaleAdded(formData);
    }

    if (!editingSale) {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        customerName: '',
        contact: '',
        cake: '',
        size: '10cm',
        quantity: '',
        orderType: 'Pickup',
        pickupDate: '',
        pickupTime: '',
        price: '',
        payment: 'Pending',
        preparation: 'Pending',
        delivery: 'Pending',
        address: ''
      });
      setErrors({});
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper className="sales-form-container glass-card fade-in" elevation={0}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" component="h2" fontWeight="600" color="primary.light">
            {editingSale ? '✏️ Edit Order' : '📝 Add New Order'}
          </Typography>
          {editingSale && (
            <Button variant="outlined" color="secondary" onClick={onCancelEdit}>
              Cancel
            </Button>
          )}
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Order Info */}
          <Typography variant="h6" gutterBottom color="text.secondary" sx={{ mt: 2, mb: 2 }}>
            Order Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Order Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
                helperText={errors.date}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Order Type</InputLabel>
                <Select
                  name="orderType"
                  value={formData.orderType}
                  label="Order Type"
                  onChange={handleChange}
                >
                  {orderTypeOptions.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Customer Info */}
          <Typography variant="h6" gutterBottom color="text.secondary" sx={{ mt: 4, mb: 2 }}>
            Customer Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Customer Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                error={!!errors.customerName}
                helperText={errors.customerName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address (for delivery)"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={formData.orderType === 'Pickup'}
              />
            </Grid>
          </Grid>

          {/* Product Info */}
          <Typography variant="h6" gutterBottom color="text.secondary" sx={{ mt: 4, mb: 2 }}>
            Product Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.cake}>
                <InputLabel>Cake</InputLabel>
                <Select
                  name="cake"
                  value={formData.cake}
                  label="Cake"
                  onChange={handleChange}
                >
                  {cakeOptions.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Size</InputLabel>
                <Select
                  name="size"
                  value={formData.size}
                  label="Size"
                  onChange={handleChange}
                >
                  {sizeOptions.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                error={!!errors.quantity}
                helperText={errors.quantity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Price (Rp)"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>
          </Grid>

          {/* Pickup/Delivery Info */}
          <Typography variant="h6" gutterBottom color="text.secondary" sx={{ mt: 4, mb: 2 }}>
            Pickup/Delivery Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={formData.orderType === 'Pickup' ? 'Pickup Date' : 'Delivery Date'}
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.pickupDate}
                helperText={errors.pickupDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Time Slot</InputLabel>
                <Select
                  name="pickupTime"
                  value={formData.pickupTime}
                  label="Time Slot"
                  onChange={handleChange}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  {pickupTimeOptions.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Status Info */}
          <Typography variant="h6" gutterBottom color="text.secondary" sx={{ mt: 4, mb: 2 }}>
            Order Status
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Payment</InputLabel>
                <Select
                  name="payment"
                  value={formData.payment}
                  label="Payment"
                  onChange={handleChange}
                >
                  {statusOptions.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Preparation</InputLabel>
                <Select
                  name="preparation"
                  value={formData.preparation}
                  label="Preparation"
                  onChange={handleChange}
                >
                  {statusOptions.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Delivery</InputLabel>
                <Select
                  name="delivery"
                  value={formData.delivery}
                  label="Delivery"
                  onChange={handleChange}
                >
                  {statusOptions.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box mt={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ borderRadius: 50, py: 1.5, fontSize: '1.1rem', fontWeight: 600 }}
            >
              {editingSale ? '💾 Update Order' : '✨ Add Order'}
            </Button>
          </Box>
        </form>
      </Paper>
    </ThemeProvider>
  );
};

export default SalesForm;
