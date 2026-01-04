import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEdit, FiTrash2, FiClock, FiPackage, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { format } from 'date-fns';
import clsx from 'clsx';
import DataTable from '../common/DataTable';
import toast from 'react-hot-toast';
import socketService from '../../services/socket';

const OrderTable = ({ 
  orders, 
  currentPage, 
  totalPages, 
  onPageChange, 
  onDelete,
  onStatusUpdate,
  isLoading 
}) => {
  const navigate = useNavigate();
  const [localOrders, setLocalOrders] = useState(orders);

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  // Real-time order updates
  useEffect(() => {
    socketService.onNewOrder((newOrder) => {
      setLocalOrders((prev) => [newOrder, ...prev]);
      toast.success('New order received!', {
        icon: '🛍️',
        duration: 3000,
      });
    });

    socketService.onOrderUpdate((updatedOrder) => {
      setLocalOrders((prev) =>
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
    const statusConfig = {
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

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={clsx('badge flex items-center gap-1 w-fit', config.className)}>
        <Icon className="text-xs" />
        {config.label}
      </span>
    );
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await onStatusUpdate(orderId, newStatus);
      toast.success('Order status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await onDelete(orderId);
        setLocalOrders((prev) => prev.filter((o) => o._id !== orderId));
        toast.success('Order deleted');
      } catch (error) {
        toast.error('Failed to delete order');
      }
    }
  };

  const columns = [
    {
      header: 'Order ID',
      key: 'orderNumber',
      render: (order) => (
        <div className="font-mono text-sm">
          #{order.orderNumber || order._id?.slice(-8).toUpperCase()}
        </div>
      ),
    },
    {
      header: 'Customer',
      key: 'user',
      render: (order) => (
        <div>
          <p className="font-medium text-gray-900">{order.user?.name || 'N/A'}</p>
          <p className="text-xs text-gray-500">{order.user?.email}</p>
        </div>
      ),
    },
    {
      header: 'Items',
      key: 'items',
      render: (order) => (
        <span className="text-gray-700">{order.items?.length || 0} items</span>
      ),
    },
    {
      header: 'Amount',
      key: 'totalAmount',
      render: (order) => (
        <div>
          <p className="font-bold text-gray-900">${order.totalAmount?.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{order.paymentMethod || 'Card'}</p>
        </div>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (order) => (
        <select
          value={order.status}
          onChange={(e) => handleStatusChange(order._id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="text-sm bg-transparent border-none cursor-pointer focus:outline-none"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      ),
    },
    {
      header: 'Date',
      key: 'createdAt',
      render: (order) => (
        <div className="text-sm text-gray-600">
          {format(new Date(order.createdAt), 'MMM dd, yyyy')}
          <br />
          <span className="text-xs text-gray-500">
            {format(new Date(order.createdAt), 'HH:mm')}
          </span>
        </div>
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      className: 'text-right',
      render: (order) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/orders/${order._id}`);
            }}
            className="p-2 text-gray-600 transition-colors duration-200 rounded-lg hover:text-primary-600 hover:bg-primary-50"
            title="View Details"
          >
            <FiEye className="text-lg" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(order._id);
            }}
            className="p-2 text-gray-600 transition-colors duration-200 rounded-lg hover:text-primary-600 hover:bg-primary-50"
            title="Delete"
          >
            <FiTrash2 className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={localOrders}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      isLoading={isLoading}
    />
  );
};

export default OrderTable;