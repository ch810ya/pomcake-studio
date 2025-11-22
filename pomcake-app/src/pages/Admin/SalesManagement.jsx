import { useState, useEffect } from 'react';
import SalesForm from '../../components/SalesForm';
import RecentSales from '../../components/RecentSales';
import CSVImport from '../../components/CSVImport';
import ExportButton from './ExportButton';
import { getSales, addSale, updateSale, deleteSale } from '../../services/db';
import './SalesManagement.css';

const SalesManagement = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('entry'); // 'entry', 'history', 'import'
    const [editingSale, setEditingSale] = useState(null);

    const fetchSales = async () => {
        try {
            setLoading(true);
            const data = await getSales();
            setSales(data);
            setError(null);
        } catch (err) {
            console.error("Sales load error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    const handleSaleAdded = async (saleData) => {
        const result = await addSale(saleData);
        if (result.success) {
            await fetchSales();
            alert('Sale added successfully!');
        } else {
            alert('Error adding sale');
        }
    };

    const handleSaleUpdated = async (id, saleData) => {
        const result = await updateSale(id, saleData);
        if (result.success) {
            await fetchSales();
            setEditingSale(null);
            setActiveTab('history');
            alert('Sale updated successfully!');
        } else {
            alert('Error updating sale');
        }
    };

    const handleSaleDeleted = async (id) => {
        if (window.confirm('Are you sure you want to delete this sale?')) {
            const result = await deleteSale(id);
            if (result.success) {
                await fetchSales();
            } else {
                alert('Error deleting sale');
            }
        }
    };

    const handleEditSale = (sale) => {
        setEditingSale(sale);
        setActiveTab('entry');
    };

    const handleCancelEdit = () => {
        setEditingSale(null);
    };

    const handleImportSuccess = () => {
        fetchSales();
        setActiveTab('history');
    };

    if (loading) return <div className="loading">Loading sales data...</div>;

    if (error) return (
        <div className="error-container" style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>
            <h3>Error loading sales</h3>
            <p>{error}</p>
            <button onClick={fetchSales} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Retry</button>
        </div>
    );

    return (
        <div className="sales-management">
            <div className="page-header">
                <h1>Sales Management</h1>
                <div className="header-actions">
                    <ExportButton sales={sales} />
                </div>
            </div>

            <div className="tabs">
                <button
                    className={`tab-btn ${activeTab === 'entry' ? 'active' : ''}`}
                    onClick={() => setActiveTab('entry')}
                >
                    {editingSale ? '✏️ Edit Order' : '📝 Add Order'}
                </button>
                <button
                    className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    📋 Order History
                </button>
                <button
                    className={`tab-btn ${activeTab === 'import' ? 'active' : ''}`}
                    onClick={() => setActiveTab('import')}
                >
                    📥 Import CSV
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'entry' && (
                    <SalesForm
                        onSaleAdded={handleSaleAdded}
                        onSaleUpdated={handleSaleUpdated}
                        editingSale={editingSale}
                        onCancelEdit={handleCancelEdit}
                    />
                )}

                {activeTab === 'history' && (
                    <RecentSales
                        sales={sales}
                        onDelete={handleSaleDeleted}
                        onEdit={handleEditSale}
                    />
                )}

                {activeTab === 'import' && (
                    <CSVImport onImportSuccess={handleImportSuccess} />
                )}
            </div>
        </div>
    );
};

export default SalesManagement;
