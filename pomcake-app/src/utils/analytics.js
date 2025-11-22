export const calculateAnalytics = (sales) => {
    const totalRevenue = sales.reduce((sum, sale) => sum + parseFloat(sale.price || 0), 0);
    const totalOrders = sales.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Sales by Month
    const monthlyData = {};
    sales.forEach(sale => {
        const date = new Date(sale.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { label: monthName, total: 0, count: 0 };
        }
        monthlyData[monthKey].total += parseFloat(sale.price || 0);
        monthlyData[monthKey].count += 1;
    });

    const salesByMonth = Object.keys(monthlyData)
        .sort()
        .reduce((acc, key) => {
            acc[key] = monthlyData[key];
            return acc;
        }, {});

    // Sales by Category (Cake Type)
    const categoryData = {};
    sales.forEach(sale => {
        const category = sale.cake || 'Unknown';
        if (!categoryData[category]) {
            categoryData[category] = 0;
        }
        categoryData[category] += parseFloat(sale.price || 0);
    });

    return {
        totalRevenue,
        totalOrders,
        averageOrderValue,
        salesByMonth,
        salesByCategory: categoryData
    };
};
