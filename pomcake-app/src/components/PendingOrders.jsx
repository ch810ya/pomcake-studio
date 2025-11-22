import { useState, useEffect } from 'react';
import { getSales, updateSale } from '../services/db';
import './PendingOrders.css';

const PendingOrders = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPendingOrders = async () => {
        setLoading(true);
        const sales = await getSales();
        // Filter orders that have any pending status
        const pending = sales.filter(sale =>
            sale.payment === 'Pending' ||
            sale.preparation === 'Pending' ||
            sale.delivery === 'Pending'
        );
        setPendingOrders(pending);
        setLoading(false);
    };

    useEffect(() => {
        fetchPendingOrders();
    }, []);

    const handleStatusUpdate = async (orderId, field, newStatus) => {
        const order = pendingOrders.find(o => o.id === orderId);
        if (!order) return;

        const updatedData = {
            ...order,
            [field]: newStatus
        };

        const result = await updateSale(orderId, updatedData);
        if (result.success) {
            fetchPendingOrders(); // Refresh the list
        }
    };

    if (loading) return <div className="loading">Loading pending orders...</div>;

    if (pendingOrders.length === 0) {
        return (
            <div className="no-pending glass-card">
                <h3>🎉 All Caught Up!</h3>
                <p>No pending orders at the moment.</p>
            </div>
        );
    }

    return (
        <div className="pending-orders">
            <h2>⏳ Pending Orders ({pendingOrders.length})</h2>
            <div className="pending-table-container glass-card">
                <table className="pending-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Cake</th>
                            <th>Pickup/Delivery</th>
                            <th>Payment</th>
                            <th>Preparation</th>
                            <th>Delivery</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingOrders.map(order => (
                            <tr key={order.id}>
                                <td>{new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                <td>
                                    <strong>{order.customerName}</strong>
                                    <br />
                                    <small>{order.contact}</small>
                                </td>
                                <td>
                                    {order.cake}
                                    <br />
                                    <small>{order.size} × {order.quantity}</small>
                                </td>
                                <td>
                                    {new Date(order.pickupDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    <br />
                                    <small>{order.pickupTime || 'Not set'}</small>
                                </td>
                                <td>
                                    <select
                                        value={order.payment}
                                        onChange={(e) => handleStatusUpdate(order.id, 'payment', e.target.value)}
                                        className={`status-select status-${order.payment.toLowerCase()}`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={order.preparation}
                                        onChange={(e) => handleStatusUpdate(order.id, 'preparation', e.target.value)}
                                        className={`status-select status-${order.preparation.toLowerCase()}`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={order.delivery}
                                        onChange={(e) => handleStatusUpdate(order.id, 'delivery', e.target.value)}
                                        className={`status-select status-${order.delivery.toLowerCase()}`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingOrders;
