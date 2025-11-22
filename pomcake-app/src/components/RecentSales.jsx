import './RecentSales.css';

const RecentSales = ({ sales, onDelete, onEdit }) => {
    if (sales.length === 0) {
        return (
            <div className="recent-sales glass-card fade-in">
                <h3 className="section-title">📋 Recent Orders</h3>
                <div className="empty-state">
                    <p>No orders recorded yet. Add your first order! 🎉</p>
                </div>
            </div>
        );
    }

    const formatCurrency = (value) => {
        return `Rp ${parseInt(value || 0).toLocaleString('id-ID')}`;
    };

    const getStatusBadge = (status) => {
        const statusClass = status === 'Completed' ? 'status-completed' :
            status === 'Pending' ? 'status-pending' :
                'status-cancelled';
        return <span className={`status-badge ${statusClass}`}>{status}</span>;
    };

    return (
        <div className="recent-sales glass-card fade-in">
            <h3 className="section-title">📋 Recent Orders</h3>
            <div className="sales-table-container">
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>Order Date</th>
                            <th>Customer</th>
                            <th>Cake</th>
                            <th>Size</th>
                            <th>Qty</th>
                            <th>Total Price</th>
                            <th>Pickup Date</th>
                            <th>Payment</th>
                            <th>Preparation</th>
                            <th>Delivery</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale, index) => (
                            <tr key={sale.id} className="sale-row" style={{ animationDelay: `${index * 0.05}s` }}>
                                <td>{new Date(sale.date).toLocaleDateString()}</td>
                                <td className="customer-name">
                                    <div>{sale.customerName}</div>
                                    {sale.contact && <div className="contact-info">{sale.contact}</div>}
                                </td>
                                <td className="cake-name">{sale.cake}</td>
                                <td>{sale.size}</td>
                                <td>{sale.quantity}</td>
                                <td className="total-cell">{formatCurrency(sale.price)}</td>
                                <td>{new Date(sale.pickupDate).toLocaleDateString()}</td>
                                <td>{getStatusBadge(sale.payment)}</td>
                                <td>{getStatusBadge(sale.preparation)}</td>
                                <td>{getStatusBadge(sale.delivery)}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            type="button"
                                            onClick={() => onEdit(sale)}
                                            className="edit-btn"
                                            title="Edit order"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => onDelete(sale.id)}
                                            className="delete-btn"
                                            title="Delete order"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentSales;
