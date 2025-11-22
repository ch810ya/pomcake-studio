import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';

const ALLOWED_ADMINS = ['pomcakestudio@gmail.com'];

const ProtectedRoute = ({ children }) => {
    // TEMPORARILY DISABLED - Public access for testing
    return children;

    /* 
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
  
    if (loading) {
      return <div className="loading-screen">Loading...</div>;
    }
  
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    if (!ALLOWED_ADMINS.includes(user.email.toLowerCase())) {
      return (
        <div className="unauthorized-container">
          <h1>Access Denied</h1>
          <p>You are not authorized to access the admin portal.</p>
          <p>Logged in as: <strong>{user.email}</strong></p>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      );
    }
  
    return children;
    */
};

export default ProtectedRoute;
