// LocalStorage utility functions for sales data management

const STORAGE_KEY = 'pomcake_sales_data';

/**
 * Get all sales records from localStorage
 * @returns {Array} Array of sales records
 */
export const getSalesData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading sales data:', error);
    return [];
  }
};

/**
 * Save a new sales record
 * @param {Object} sale - Sale object with date, item, quantity, price, category
 * @returns {boolean} Success status
 */
export const addSale = (sale) => {
  try {
    const sales = getSalesData();
    const newSale = {
      id: Date.now().toString(),
      ...sale,
      createdAt: new Date().toISOString()
    };
    sales.push(newSale);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
    return true;
  } catch (error) {
    console.error('Error adding sale:', error);
    return false;
  }
};

/**
 * Delete a sales record by ID
 * @param {string} id - Sale ID
 * @returns {boolean} Success status
 */
export const deleteSale = (id) => {
  try {
    const sales = getSalesData();
    const filtered = sales.filter(sale => sale.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting sale:', error);
    return false;
  }
};

/**
 * Update a sales record by ID
 * @param {string} id - Sale ID
 * @param {Object} updatedData - Updated sale data
 * @returns {boolean} Success status
 */
export const updateSale = (id, updatedData) => {
  try {
    const sales = getSalesData();
    const index = sales.findIndex(sale => sale.id === id);

    if (index === -1) {
      console.error('Sale not found:', id);
      return false;
    }

    // Preserve original id and createdAt
    sales[index] = {
      ...sales[index],
      ...updatedData,
      id: sales[index].id,
      createdAt: sales[index].createdAt,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
    return true;
  } catch (error) {
    console.error('Error updating sale:', error);
    return false;
  }
};

/**
 * Calculate total sales revenue
 * @returns {number} Total revenue
 */
export const getTotalRevenue = () => {
  const sales = getSalesData();
  return sales.reduce((total, sale) => {
    // Price is now the total price, not per-unit
    return total + parseFloat(sale.price || 0);
  }, 0);
};

/**
 * Get total number of orders
 * @returns {number} Total orders
 */
export const getTotalOrders = () => {
  return getSalesData().length;
};

/**
 * Calculate average order value
 * @returns {number} Average order value
 */
export const getAverageOrderValue = () => {
  const total = getTotalRevenue();
  const orders = getTotalOrders();
  return orders > 0 ? total / orders : 0;
};

/**
 * Get sales grouped by month
 * @returns {Object} Object with month keys and total sales values
 */
export const getSalesByMonth = () => {
  const sales = getSalesData();
  const monthlyData = {};

  sales.forEach(sale => {
    const date = new Date(sale.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        label: monthName,
        total: 0,
        count: 0
      };
    }

    // Price is now total price
    monthlyData[monthKey].total += parseFloat(sale.price || 0);
    monthlyData[monthKey].count += 1;
  });

  // Sort by month key
  return Object.keys(monthlyData)
    .sort()
    .reduce((acc, key) => {
      acc[key] = monthlyData[key];
      return acc;
    }, {});
};

/**
 * Get sales grouped by category
 * @returns {Object} Object with category keys and total sales values
 */
export const getSalesByCategory = () => {
  const sales = getSalesData();
  const categoryData = {};

  sales.forEach(sale => {
    // Use cake name as category
    const category = sale.cake || sale.item || 'Uncategorized';

    if (!categoryData[category]) {
      categoryData[category] = {
        total: 0,
        count: 0
      };
    }

    // Price is now total price
    categoryData[category].total += parseFloat(sale.price || 0);
    categoryData[category].count += 1;
  });

  return categoryData;
};

/**
 * Get recent sales (last N records)
 * @param {number} limit - Number of records to return
 * @returns {Array} Array of recent sales
 */
export const getRecentSales = (limit = 10) => {
  const sales = getSalesData();
  return sales
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
};
