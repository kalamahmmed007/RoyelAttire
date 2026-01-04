import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAdminProfile } from '../redux/slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if admin exists
    if (!admin) {
      navigate('/login');
      return;
    }

    // Verify admin token periodically
    const verifyToken = async () => {
      try {
        await dispatch(getAdminProfile()).unwrap();
      } catch (error) {
        console.error('Token verification failed:', error);
        navigate('/login');
      }
    };

    verifyToken();

    // Verify token every 5 minutes
    const interval = setInterval(verifyToken, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [admin, dispatch, navigate]);

  return {
    admin,
    isLoading,
    isAuthenticated: !!admin,
    isAdmin: admin?.role === 'admin',
  };
};

export default useAuth;