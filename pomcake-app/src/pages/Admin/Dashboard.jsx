import { useState, useEffect } from 'react';
import DashboardComponent from '../../components/Dashboard'; // Renamed to avoid conflict
import PendingOrders from '../../components/PendingOrders';
import { getSales } from '../../services/db';
import { calculateAnalytics } from '../../utils/analytics';

const Dashboard = () => {
    const [analytics, setAnalytics] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        salesByMonth: {},
        salesByCategory: {}
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const sales = await getSales();
                const metrics = calculateAnalytics(sales);

                console.log("🎯 Metrics calculated:", metrics);

                setAnalytics({
                    totalRevenue: metrics.totalRevenue,
                    totalOrders: metrics.totalOrders,
                    averageOrderValue: metrics.averageOrderValue,
                    salesByMonth: metrics.salesByMonth,
                    salesByCategory: metrics.salesByCategory
                });

                console.log("✅ Analytics state set");
                setError(null);
            } catch (err) {
                console.error("Dashboard load error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <div className="loading">Loading dashboard...</div>;

    if (error) return (
        <div className="error-container" style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>
            <h3>Error loading dashboard</h3>
            <p>{error}</p>
            <p>Check console for details. Ensure Firestore is created and rules allow access.</p>
            <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Retry</button>
        </div>
    );

    return (
        <div className="admin-dashboard">
            <h1>Dashboard</h1>
            <DashboardComponent
                stats={{
                    totalRevenue: analytics.totalRevenue,
                    totalOrders: analytics.totalOrders,
                    avgOrderValue: analytics.averageOrderValue
                }}
                salesData={{
                    byMonth: analytics.salesByMonth,
                    byCategory: analytics.salesByCategory
                }}
            />
            <PendingOrders />
        </div>
    );
};

export default Dashboard;
