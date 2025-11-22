import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AdminLayout from '../pages/Admin/AdminLayout';
import Dashboard from '../pages/Admin/Dashboard';
import SalesManagement from '../pages/Admin/SalesManagement';
import BlogManager from '../pages/Admin/BlogManager';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={
                <ProtectedRoute>
                    <AdminLayout />
                </ProtectedRoute>
            }>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="sales" element={<SalesManagement />} />
                <Route path="blog" element={<BlogManager />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
