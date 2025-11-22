/**
 * CSV Import Utility for Pomcake Studio
 * Parses CSV data and imports it into the application
 */

import { addSale } from '../services/db';

/**
 * Parse price string (handles "Rp1,000,000" format)
 * @param {string} priceStr - Price string from CSV
 * @returns {number} Parsed price value
 */
const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    // Remove "Rp", commas, and any whitespace
    const cleaned = priceStr.replace(/Rp|,|\s/g, '');
    return parseFloat(cleaned) || 0;
};

/**
 * Parse date string (handles "25-Nov-2024" format)
 * @param {string} dateStr - Date string from CSV
 * @returns {string} ISO date string (YYYY-MM-DD)
 */
const parseDate = (dateStr) => {
    if (!dateStr) return new Date().toISOString().split('T')[0];

    try {
        // Handle "DD-MMM-YYYY" format
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const day = parts[0].padStart(2, '0');
            const monthMap = {
                'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
                'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
                'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
            };
            const month = monthMap[parts[1]] || '01';
            const year = parts[2];
            return `${year}-${month}-${day}`;
        }
    } catch (error) {
        console.error('Error parsing date:', dateStr, error);
    }

    return new Date().toISOString().split('T')[0];
};

/**
 * Map cake name to category
 * @param {string} cakeName - Name of the cake
 * @returns {string} Category
 */
const getCategoryFromCakeName = (cakeName) => {
    if (!cakeName) return 'Other';

    const name = cakeName.toLowerCase();

    if (name.includes('bento')) return 'Cakes';
    if (name.includes('basque')) return 'Cakes';
    if (name.includes('choco') || name.includes('chocolate')) return 'Cakes';
    if (name.includes('pomisu') || name.includes('tiramisu')) return 'Cakes';
    if (name.includes('cookies') || name.includes('cream')) return 'Cakes';
    if (name.includes('matcha')) return 'Cakes';
    if (name.includes('pistachio')) return 'Cakes';
    if (name.includes('passionfruit')) return 'Cakes';
    if (name.includes('ubi')) return 'Cakes';

    return 'Custom Orders';
};

/**
 * Parse a single CSV line (handles quoted values with commas)
 * @param {string} line - CSV line
 * @returns {Array} Array of values
 */
const parseCSVLine = (line) => {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    values.push(current.trim());
    return values;
};

/**
 * Parse CSV text into array of objects
 * @param {string} csvText - Raw CSV text
 * @returns {Array} Array of parsed row objects
 */
export const parseCSV = (csvText) => {
    const lines = csvText.split(/\r?\n/).filter(line => line.trim());
    if (lines.length < 2) return [];

    // Parse header
    const headers = lines[0].split(',').map(h => h.trim());

    // Parse rows
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length > 0) {
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            rows.push(row);
        }
    }

    return rows;
};

/**
 * Convert CSV row to sale object
 * @param {Object} row - Parsed CSV row
 * @returns {Object} Sale object
 */
const csvRowToSale = (row) => {
    return {
        date: parseDate(row['Date'] || row['date']),
        customerName: row['Name'] || row['name'] || '',
        contact: row['Contact'] || row['contact'] || '',
        cake: row['Cake'] || row['cake'] || '',
        size: row['Size'] || row['size'] || '10cm',
        quantity: parseInt(row['Quantity'] || row['quantity'] || '1'),
        orderType: row['Order type'] || row['order type'] || 'Pickup',
        pickupDate: parseDate(row['Date of Pickup'] || row['date of pickup'] || row['Date'] || row['date']),
        pickupTime: row['Time of Pickup'] || row['time of pickup'] || '',
        price: parsePrice(row['Price'] || row['price']),
        payment: row['Payment'] || row['payment'] || 'Pending',
        preparation: row['Preparation'] || row['preparation'] || 'Pending',
        delivery: row['Delivery'] || row['delivery'] || 'Pending',
        address: row['Address'] || row['address'] || ''
    };
};

/**
 * Import sales from CSV text
 * @param {string} csvText - Raw CSV text
 * @returns {Promise<Object>} Result with success count and errors
 */
export const importSalesFromCSV = async (csvText) => {
    const result = {
        success: 0,
        failed: 0,
        errors: []
    };

    try {
        const rows = parseCSV(csvText);

        for (let i = 0; i < rows.length; i++) {
            try {
                const sale = csvRowToSale(rows[i]);

                // Validate sale data
                if (!sale.customerName || !sale.cake || sale.quantity <= 0 || sale.price <= 0) {
                    result.failed++;
                    result.errors.push(`Row ${i + 2}: Invalid data - missing required fields`);
                    continue;
                }

                const response = await addSale(sale);
                if (response.success) {
                    result.success++;
                } else {
                    result.failed++;
                    result.errors.push(`Row ${i + 2}: Failed to add sale - ${response.error}`);
                }
            } catch (error) {
                result.failed++;
                result.errors.push(`Row ${i + 2}: ${error.message}`);
            }
        }
    } catch (error) {
        result.errors.push(`CSV parsing error: ${error.message}`);
    }

    return result;
};

/**
 * Import sales from CSV file
 * @param {File} file - CSV file object
 * @returns {Promise<Object>} Result with success count and errors
 */
export const importSalesFromFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const csvText = e.target.result;
                const result = await importSalesFromCSV(csvText);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsText(file);
    });
};
