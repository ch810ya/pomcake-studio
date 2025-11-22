import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase';
import './AdminLayout.css';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleSignOut = () => {
        auth.signOut();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar glass-card">
                <div className="sidebar-header">
                    <h2>Pomcake Admin</h2>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/admin/dashboard" className={`nav-item ${isActive('/admin/dashboard')}`}>
                        📊 Dashboard
                    </Link>
                    <Link to="/admin/sales" className={`nav-item ${isActive('/admin/sales')}`}>
                        📝 Sales Management
                    </Link>
                    <Link to="/admin/blog" className={`nav-item ${isActive('/admin/blog')}`}>
                        ✍️ Blog Manager
                    </Link>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleSignOut} className="sign-out-btn">
                        Sign Out
                    </button>
                </div>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
