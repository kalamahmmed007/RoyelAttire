import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiEye, FiPackage, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { format } from 'date-fns';
import socketService from '../../services/socket';
import clsx from 'clsx';

const RecentOrders = () => {
  const navigate = useNavigate();
  const { dashboardStats } = useSelector((state) => state.stats);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (dashboardStats.recentOrders) {
      setOrders(dashboardStats.recentOrders);
    }
  }, [dashboardStats]);

  // Real-time order updates
  useEffect(() => {
    socketService.onNewOrder((newOrder) => {
      setOrders((prev) => [newOrder, ...prev].slice(0, 5));
    });

    socketService.onOrderUpdate((updatedOrder) => {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    return () => {
      socketService.off('newOrder');
      socketService.off('orderUpdate');
    };
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        icon: FiClock,
        className: 'badge-warning',
        label: 'Pending',
      },
      processing: {
        icon: FiPackage,
        className: 'badge-info',
        label: 'Processing',
      },
      shipped: {
        icon: FiPackage,
        className: 'badge-info',
        label: 'Shipped',
      },
      delivered: {
        icon: FiCheckCircle,
        className: 'badge-success',
        label: 'Delivered',
      },
      cancelled: {
        icon: FiXCircle,
        className: 'badge-danger',
        label: 'Cancelled',
      },
    };

    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;

    return (
      <span className={clsx('badge flex items-center gap-1', badge.className)}>
        <Icon className="text-xs" />
        {badge.label}
      </span>
    );
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
          <p className="mt-1 text-sm text-gray-500">Latest customer orders</p>
        </div>
        <button
          onClick={() => navigate('/orders')}
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          View All
        </button>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          <FiPackage className="mx-auto mb-3 text-4xl text-gray-400" />
          <p>No recent orders</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between p-4 transition-all duration-200 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-200 hover:bg-primary-50/30 group"
              onClick={() => navigate(`/orders/${order._id}`)}
            >
              {/* Order Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-gray-900">
                    #{order.orderNumber || order._id?.slice(-6)}
                  </h4>
                  {getStatusBadge(order.status)}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{order.user?.name || 'Customer'}</span>
                  <span>•</span>
                  <span>{order.items?.length || 0} items</span>
                  <span>•</span>
                  <span className="text-xs">
                    {format(new Date(order.createdAt), 'MMM dd, HH:mm')}
                  </span>
                </div>
              </div>

              {/* Amount & Action */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ${order.totalAmount?.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.paymentMethod || 'Card'}
                  </p>
                </div>

                <button
                  className="p-2 text-gray-400 transition-colors duration-200 rounded-lg group-hover:text-primary-600 group-hover:bg-white"
                >
                  <FiEye className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentOrders;