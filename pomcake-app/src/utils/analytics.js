export const calculateAnalytics = (sales) => {
    console.log("📊 Calculating analytics for", sales.length, "sales");
    console.log("Sample sale:", sales[0]);

    const totalRevenue = sales.reduce((sum, sale) => {
        const price = Number(sale.price) || 0;
        return sum + price;
    }, 0);

    const totalOrders = sales.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    console.log("💰 Total Revenue:", totalRevenue);
    console.log("📦 Total Orders:", totalOrders);
    console.log("📊 Avg Order Value:", averageOrderValue);

    // Sales by Month
    const monthlyData = {};
    sales.forEach(sale => {
        const date = new Date(sale.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { label: monthName, total: 0, count: 0 };
        }
        monthlyData[monthKey].total += Number(sale.price) || 0;
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
        const category = sale.cake || sale.item || 'Unknown';
        if (!categoryData[category]) {
            categoryData[category] = 0;
        }
        categoryData[category] += Number(sale.price) || 0;
    });

    return {
        totalRevenue,
        totalOrders,
        averageOrderValue,
        salesByMonth,
        salesByCategory: categoryData
    };
};
