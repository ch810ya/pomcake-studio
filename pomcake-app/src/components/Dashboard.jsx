import { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import './Dashboard.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = ({ salesData, stats }) => {
    // Monthly sales chart data
    const monthlyChartData = useMemo(() => {
        const months = Object.values(salesData.byMonth);

        return {
            labels: months.map(m => m.label),
            datasets: [
                {
                    label: 'Monthly Revenue',
                    data: months.map(m => m.total),
                    backgroundColor: 'rgba(168, 85, 247, 0.8)',
                    borderColor: 'rgba(168, 85, 247, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                },
            ],
        };
    }, [salesData.byMonth]);

    // Category sales chart data
    const categoryChartData = useMemo(() => {
        const categories = Object.entries(salesData.byCategory);

        const colors = [
            'rgba(168, 85, 247, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(251, 146, 60, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(139, 92, 246, 0.8)',
        ];

        return {
            labels: categories.map(([name]) => name),
            datasets: [
                {
                    label: 'Sales by Category',
                    data: categories.map(([, data]) => data.total),
                    backgroundColor: colors,
                    borderColor: colors.map(c => c.replace('0.8', '1')),
                    borderWidth: 2,
                },
            ],
        };
    }, [salesData.byCategory]);

    // Sales trend (line chart)
    const trendChartData = useMemo(() => {
        const months = Object.values(salesData.byMonth);

        return {
            labels: months.map(m => m.label),
            datasets: [
                {
                    label: 'Sales Trend',
                    data: months.map(m => m.total),
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                },
            ],
        };
    }, [salesData.byMonth]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: 'rgba(255, 255, 255, 0.87)',
                    font: {
                        size: 12,
                        family: 'Inter',
                    },
                    padding: 15,
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 14,
                    family: 'Inter',
                },
                bodyFont: {
                    size: 13,
                    family: 'Inter',
                },
                borderColor: 'rgba(168, 85, 247, 0.5)',
                borderWidth: 1,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += 'Rp ' + context.parsed.y.toFixed(2);
                        return label;
                    }
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        family: 'Inter',
                    },
                    callback: function (value) {
                        return 'Rp ' + value;
                    }
                },
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        family: 'Inter',
                    },
                },
            },
        },
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: 'rgba(255, 255, 255, 0.87)',
                    font: {
                        size: 12,
                        family: 'Inter',
                    },
                    padding: 15,
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 14,
                    family: 'Inter',
                },
                bodyFont: {
                    size: 13,
                    family: 'Inter',
                },
                borderColor: 'rgba(168, 85, 247, 0.5)',
                borderWidth: 1,
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += 'Rp ' + context.parsed.toFixed(2);
                        return label;
                    }
                }
            },
        },
    };

    return (
        <div className="dashboard">
            {/* Stats Cards */}
            <div className="stats-grid grid grid-3">
                <div className="stat-card glass-card fade-in">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                        <h3 className="stat-label">Total Revenue</h3>
                        <p className="stat-value">Rp {stats.totalRevenue.toLocaleString('id-ID')}</p>
                    </div>
                </div>

                <div className="stat-card glass-card fade-in" style={{ animationDelay: '0.1s' }}>
                    <div className="stat-icon">📦</div>
                    <div className="stat-content">
                        <h3 className="stat-label">Total Orders</h3>
                        <p className="stat-value">{stats.totalOrders}</p>
                    </div>
                </div>

                <div className="stat-card glass-card fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <h3 className="stat-label">Avg Order Value</h3>
                        <p className="stat-value">Rp {stats.avgOrderValue.toLocaleString('id-ID')}</p>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="charts-grid">
                <div className="chart-container glass-card fade-in" style={{ animationDelay: '0.3s' }}>
                    <h3 className="chart-title">📈 Monthly Sales</h3>
                    <div className="chart-wrapper">
                        <Bar data={monthlyChartData} options={chartOptions} />
                    </div>
                </div>

                <div className="chart-container glass-card fade-in" style={{ animationDelay: '0.4s' }}>
                    <h3 className="chart-title">📉 Sales Trend</h3>
                    <div className="chart-wrapper">
                        <Line data={trendChartData} options={chartOptions} />
                    </div>
                </div>

                <div className="chart-container glass-card fade-in" style={{ animationDelay: '0.5s' }}>
                    <h3 className="chart-title">🎯 Sales by Category</h3>
                    <div className="chart-wrapper">
                        <Doughnut data={categoryChartData} options={doughnutOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
