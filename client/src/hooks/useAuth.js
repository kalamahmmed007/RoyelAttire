import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout, register, loadUser } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, token, isAuthenticated, loading, error } = useSelector(
        (state) => state.auth
    );

    // Login user
    const loginUser = async (credentials) => {
        try {
            const result = await dispatch(login(credentials)).unwrap();
            toast.success('Login successful!');
            return result;
        } catch (error) {
            toast.error(error || 'Login failed');
            throw error;
        }
    };

    // Register user
    const registerUser = async (userData) => {
        try {
            const result = await dispatch(register(userData)).unwrap();
            toast.success('Registration successful!');
            return result;
        } catch (error) {
            toast.error(error || 'Registration failed');
            throw error;
        }
    };

    // Logout user
    const logoutUser = async () => {
        try {
            await dispatch(logout()).unwrap();
            toast.success('Logged out successfully');
            navigate('/login');
        } catch (error) {
            toast.error(error || 'Logout failed');
        }
    };

    // Load user data
    const refreshUser = async () => {
        try {
            await dispatch(loadUser()).unwrap();
        } catch (error) {
            console.error('Failed to load user:', error);
        }
    };

    // Check if user has role
    const hasRole = (role) => {
        return user?.role === role;
    };

    // Check if user is admin
    const isAdmin = () => {
        return user?.role === 'admin';
    };

    return {
        user,
        token,
        isAuthenticated,
        loading,
        error,
        loginUser,
        registerUser,
        logoutUser,
        refreshUser,
        hasRole,
        isAdmin,
    };
};

export default useAuth;