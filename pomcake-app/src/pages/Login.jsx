import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Login.css';

const Login = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/admin/dashboard');
        }
    }, [user, navigate]);

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error signing in with Google", error);
            alert(`Failed to sign in: ${error.message}`);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="login-container">
            <div className="login-card glass-card">
                <h1>Pomcake Studio</h1>
                <p>Admin Portal Access</p>
                <button onClick={signInWithGoogle} className="google-btn">
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
