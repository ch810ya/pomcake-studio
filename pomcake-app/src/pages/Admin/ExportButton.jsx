import { saveAs } from 'file-saver';

const ExportButton = ({ sales }) => {
    const handleExport = () => {
        if (!sales || sales.length === 0) {
            alert('No sales data to export.');
            return;
        }

        // Define CSV headers
        const headers = [
            'ID', 'Date', 'Customer Name', 'Contact', 'Address',
            'Cake', 'Size', 'Quantity', 'Price', 'Order Type',
            'Pickup Date', 'Pickup Time', 'Payment Status',
            'Preparation Status', 'Delivery Status', 'Created At'
        ];

        // Convert sales data to CSV rows
        const csvRows = [
            headers.join(','), // Header row
            ...sales.map(sale => {
                return [
                    sale.id,
                    sale.date,
                    `"${(sale.customerName || '').replace(/"/g, '""')}"`,
                    `"${(sale.contact || '').replace(/"/g, '""')}"`,
                    `"${(sale.address || '').replace(/"/g, '""')}"`,
                    `"${(sale.cake || '').replace(/"/g, '""')}"`,
                    sale.size,
                    sale.quantity,
                    sale.price,
                    sale.orderType,
                    sale.pickupDate,
                    sale.pickupTime,
                    sale.payment,
                    sale.preparation,
                    sale.delivery,
                    sale.createdAt
                ].join(',');
            })
        ];

        // Create Blob and download
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const fileName = `pomcake_sales_export_${new Date().toISOString().split('T')[0]}.csv`;

        saveAs(blob, fileName);
    };

    return (
        <button onClick={handleExport} className="btn-secondary">
            📤 Export CSV
        </button>
    );
};

export default ExportButton;
