import { useState, useEffect } from 'react';
import './SalesForm.css';

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

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }

    if (!formData.cake.trim()) {
      newErrors.cake = 'Cake selection is required';
    }

    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.date) {
      newErrors.date = 'Order date is required';
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Pickup date is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call appropriate callback based on edit mode
    if (editingSale) {
      onSaleUpdated(editingSale.id, formData);
    } else {
      onSaleAdded(formData);
    }

    // Reset form if not editing
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
    <div className="sales-form-container glass-card fade-in">
      <div className="form-header">
        <h2 className="form-title">
          {editingSale ? '✏️ Edit Order' : '📝 Add New Order'}
        </h2>
        {editingSale && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="btn-secondary cancel-edit-btn"
          >
            ✖ Cancel
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="sales-form">

        {/* Order Information */}
        <div className="form-section">
          <h3 className="section-title">Order Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date" className="form-label">Order Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="orderType" className="form-label">Order Type</label>
              <select
                id="orderType"
                name="orderType"
                value={formData.orderType}
                onChange={handleChange}
              >
                {orderTypeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="form-section">
          <h3 className="section-title">Customer Information</h3>

          <div className="form-group">
            <label htmlFor="customerName" className="form-label">Customer Name *</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className={errors.customerName ? 'error' : ''}
            />
            {errors.customerName && <span className="error-message">{errors.customerName}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contact" className="form-label">Contact Number</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="e.g., 081234567890"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">Address (for delivery)</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Delivery address"
                disabled={formData.orderType === 'Pickup'}
              />
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="form-section">
          <h3 className="section-title">Product Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cake" className="form-label">Cake *</label>
              <select
                id="cake"
                name="cake"
                value={formData.cake}
                onChange={handleChange}
                className={errors.cake ? 'error' : ''}
              >
                <option value="">Select a cake...</option>
                {cakeOptions.map(cake => (
                  <option key={cake} value={cake}>{cake}</option>
                ))}
              </select>
              {errors.cake && <span className="error-message">{errors.cake}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="size" className="form-label">Size</label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
              >
                {sizeOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity" className="form-label">Quantity *</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="0"
                min="1"
                className={errors.quantity ? 'error' : ''}
              />
              {errors.quantity && <span className="error-message">{errors.quantity}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="price" className="form-label">Total Price (Rp) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                step="1000"
                min="0"
                className={errors.price ? 'error' : ''}
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>
          </div>
        </div>

        {/* Pickup/Delivery Information */}
        <div className="form-section">
          <h3 className="section-title">Pickup/Delivery Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pickupDate" className="form-label">
                {formData.orderType === 'Pickup' ? 'Pickup Date *' : 'Delivery Date *'}
              </label>
              <input
                type="date"
                id="pickupDate"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                className={errors.pickupDate ? 'error' : ''}
              />
              {errors.pickupDate && <span className="error-message">{errors.pickupDate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="pickupTime" className="form-label">
                {formData.orderType === 'Pickup' ? 'Pickup Time' : 'Delivery Time'}
              </label>
              <select
                id="pickupTime"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
              >
                <option value="">Select time...</option>
                {pickupTimeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Status Information */}
        <div className="form-section">
          <h3 className="section-title">Order Status</h3>

          <div className="form-row form-row-3">
            <div className="form-group">
              <label htmlFor="payment" className="form-label">Payment</label>
              <select
                id="payment"
                name="payment"
                value={formData.payment}
                onChange={handleChange}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="preparation" className="form-label">Preparation</label>
              <select
                id="preparation"
                name="preparation"
                value={formData.preparation}
                onChange={handleChange}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="delivery" className="form-label">
                {formData.orderType === 'Pickup' ? 'Pickup' : 'Delivery'}
              </label>
              <select
                id="delivery"
                name="delivery"
                value={formData.delivery}
                onChange={handleChange}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {formData.quantity && formData.price && (
          <div className="total-preview">
            <div className="preview-row">
              <span>Total Price:</span>
              <strong>Rp {parseInt(formData.price).toLocaleString('id-ID')}</strong>
            </div>
            <div className="preview-row">
              <span>Price per Unit:</span>
              <strong>Rp {(parseInt(formData.price) / parseInt(formData.quantity)).toLocaleString('id-ID', { maximumFractionDigits: 0 })}</strong>
            </div>
          </div>
        )}

        <button type="submit" className="btn-primary submit-btn">
          {editingSale ? '💾 Update Order' : '✨ Add Order'}
        </button>
      </form>
    </div>
  );
};

export default SalesForm;
