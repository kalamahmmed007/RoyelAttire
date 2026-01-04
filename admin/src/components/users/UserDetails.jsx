import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, updateUserRole } from '../../redux/slices/userSlice';
import { 
  FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, 
  FiShoppingCart, FiDollarSign, FiCalendar, FiEdit, FiShield 
} from 'react-icons/fi';
import { format } from 'date-fns';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((state) => state.users);
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [editingRole, setEditingRole] = useState(false);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
      fetchUserOrders();
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setNewRole(currentUser.role);
    }
  }, [currentUser]);

  const fetchUserOrders = async () => {
    try {
      const admin = JSON.parse(localStorage.getItem('admin'));
      const response = await axios.get(`${API_URL}/users/${id}/orders`, {
        headers: { Authorization: `Bearer ${admin?.token}` },
      });
      setUserOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch user orders');
    }
  };

  const handleRoleUpdate = async () => {
    try {
      await dispatch(updateUserRole({ id: user._id, role: newRole })).unwrap();
      toast.success('User role updated successfully');
      setEditingRole(false);
    } catch (error) {
      toast.error('Failed to update user role');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 rounded-full border-primary-200 border-t-primary-500 animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Orders',
      value: user.ordersCount || 0,
      icon: FiShoppingCart,
      color: 'primary',
    },
    {
      label: 'Total Spent',
      value: `$${(user.totalSpent || 0).toFixed(2)}`,
      icon: FiDollarSign,
      color: 'success',
    },
    {
      label: 'Member Since',
      value: format(new Date(user.createdAt), 'MMM yyyy'),
      icon: FiCalendar,
      color: 'info',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/users')}
            className="p-2 transition-colors rounded-lg hover:bg-gray-100"
          >
            <FiArrowLeft className="text-xl" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="mt-1 text-gray-600">{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => setEditingRole(true)}
          className="flex items-center gap-2 btn-primary"
        >
          <FiEdit />
          Update Role
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={clsx(
                  'w-12 h-12 rounded-lg flex items-center justify-center',
                  stat.color === 'primary' && 'bg-primary-100 text-primary-600',
                  stat.color === 'success' && 'bg-success-100 text-success-600',
                  stat.color === 'info' && 'bg-blue-100 text-blue-600'
                )}>
                  <Icon className="text-xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - User Info */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="card">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-24 h-24 text-4xl font-bold rounded-full bg-primary-100 text-primary-600">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <span className={clsx(
                'badge inline-flex items-center gap-1 mt-2',
                user.role === 'admin' ? 'badge-danger' : 'badge-info'
              )}>
                <FiShield className="text-xs" />
                {user.role}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <FiMail className="text-gray-400" />
                <span className="text-sm">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-3 text-gray-700">
                  <FiPhone className="text-gray-400" />
                  <span className="text-sm">{user.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-700">
                <FiCalendar className="text-gray-400" />
                <span className="text-sm">
                  Joined {format(new Date(user.createdAt), 'MMMM dd, yyyy')}
                </span>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="card">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Account Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <span className={clsx(
                  'badge',
                  user.isActive ? 'badge-success' : 'badge-danger'
                )}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Email Verified</span>
                <span className={clsx(
                  'badge',
                  user.isEmailVerified ? 'badge-success' : 'badge-warning'
                )}>
                  {user.isEmailVerified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
            </div>
          </div>

          {/* Addresses */}
          {user.addresses && user.addresses.length > 0 && (
            <div className="card">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Addresses</h3>
              <div className="space-y-4">
                {user.addresses.map((address, index) => (
                  <div key={index} className="p-3 rounded-lg bg-gray-50">
                    <div className="flex items-start gap-2">
                      <FiMapPin className="flex-shrink-0 mt-1 text-gray-400" />
                      <div className="text-sm text-gray-700">
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.zipCode}</p>
                        <p>{address.country}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Order History */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Order History</h3>

            {userOrders.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <FiShoppingCart className="mx-auto mb-3 text-4xl text-gray-400" />
                <p>No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <div
                    key={order._id}
                    className="p-4 transition-all duration-200 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-200 hover:bg-primary-50/30"
                    onClick={() => navigate(`/orders/${order._id}`)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          #{order.orderNumber || order._id?.slice(-8).toUpperCase()}
                        </h4>
                        <p className="mt-1 text-xs text-gray-500">
                          {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                      <span className={clsx(
                        'badge',
                        order.status === 'delivered' && 'badge-success',
                        order.status === 'cancelled' && 'badge-danger',
                        order.status === 'pending' && 'badge-warning',
                        (order.status === 'processing' || order.status === 'shipped') && 'badge-info'
                      )}>
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {order.items?.length || 0} items
                      </span>
                      <span className="font-bold text-gray-900">
                        ${order.totalAmount?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Role Update Modal */}
      {editingRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-xl">
            <h3 className="mb-4 text-xl font-bold text-gray-900">Update User Role</h3>
            
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Select Role
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="input-field"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <p className="mt-2 text-xs text-gray-500">
                Admin users have full access to the admin panel
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditingRole(false)}
                className="flex-1 btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleUpdate}
                className="flex-1 btn-primary"
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;