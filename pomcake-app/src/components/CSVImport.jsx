import { useState, useRef } from 'react';
import { importSalesFromFile } from '../utils/csvImport';
import './CSVImport.css';

const CSVImport = ({ onImportComplete }) => {
    const [importing, setImporting] = useState(false);
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.name.endsWith('.csv')) {
            alert('Please select a CSV file');
            return;
        }

        setImporting(true);
        setResult(null);

        try {
            const importResult = await importSalesFromFile(file);
            setResult(importResult);

            if (importResult.success > 0) {
                // Notify parent component to refresh data
                setTimeout(() => {
                    onImportComplete();
                }, 2000);
            }
        } catch (error) {
            setResult({
                success: 0,
                failed: 0,
                errors: [error.message]
            });
        } finally {
            setImporting(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="csv-import-container glass-card fade-in">
            <h2 className="import-title">📥 Import Sales from CSV</h2>
            <p className="import-description">
                Upload your existing sales data from a CSV file. The file should contain columns for Date, Cake, Quantity, and Price.
            </p>

            <div className="import-actions">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />
                <button
                    onClick={handleButtonClick}
                    disabled={importing}
                    className="btn-primary import-btn"
                >
                    {importing ? '⏳ Importing...' : '📂 Select CSV File'}
                </button>
            </div>

            {result && (
                <div className={`import-result ${result.success > 0 ? 'success' : 'error'}`}>
                    <h3>Import Results</h3>
                    <div className="result-stats">
                        <div className="stat-item success">
                            <span className="stat-icon">✅</span>
                            <span className="stat-text">{result.success} records imported successfully</span>
                        </div>
                        {result.failed > 0 && (
                            <div className="stat-item error">
                                <span className="stat-icon">❌</span>
                                <span className="stat-text">{result.failed} records failed</span>
                            </div>
                        )}
                    </div>

                    {result.errors && result.errors.length > 0 && (
                        <div className="error-details">
                            <h4>Errors:</h4>
                            <ul>
                                {result.errors.slice(0, 10).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                                {result.errors.length > 10 && (
                                    <li>... and {result.errors.length - 10} more errors</li>
                                )}
                            </ul>
                        </div>
                    )}

                    {result.success > 0 && (
                        <p className="success-message">
                            🎉 Data imported! Switch to the Dashboard tab to see your updated reports.
                        </p>
                    )}
                </div>
            )}

            <div className="import-help">
                <h4>CSV Format Requirements:</h4>
                <ul>
                    <li>Must be a .csv file</li>
                    <li>Should have headers in the first row</li>
                    <li>Required columns: Date, Cake (item name), Quantity, Price</li>
                    <li>Date format: DD-MMM-YYYY (e.g., 25-Nov-2024)</li>
                    <li>Price format: Can include "Rp" and commas (e.g., Rp240,000)</li>
                </ul>
            </div>
        </div>
    );
};

export default CSVImport;
