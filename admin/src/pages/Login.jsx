import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin, reset } from '../redux/slices/authSlice';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (admin) {
      navigate('/dashboard');
    }

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Login successful');
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [admin, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    dispatch(loginAdmin(formData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-primary-500 via-primary-600 to-dark-800">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-white shadow-xl rounded-2xl">
            <span className="text-4xl font-bold text-primary-600">A</span>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white">Admin Panel</h1>
          <p className="text-primary-100">Sign in to manage your store</p>
        </div>

        {/* Login Card */}
        <div className="p-8 bg-white shadow-2xl rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  className="pl-10 input-field"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 input-field"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 transition-colors -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-lg btn-primary"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="p-4 mt-6 rounded-lg bg-gray-50">
            <p className="mb-2 text-xs text-center text-gray-600">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-gray-700">
              <p><strong>Email:</strong> admin@example.com</p>
              <p><strong>Password:</strong> Admin123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-primary-100">
          © 2024 Admin Panel. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;