import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById, updateOrderStatus } from '../../store/ordersSlice';
import { 
  FiArrowLeft, FiUser, FiMapPin, FiPhone, FiMail, 
  FiPackage, FiTruck, FiCheckCircle, FiClock, FiEdit 
} from 'react-icons/fi';
import { format } from 'date-fns';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import socketService from '../../services/socket';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentOrder, isLoading } = useSelector((state) => state.orders);
  const [order, setOrder] = useState(null);
  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentOrder) {
      setOrder(currentOrder);
      setNewStatus(currentOrder.status);
    }
  }, [currentOrder]);

  // Real-time updates
  useEffect(() => {
    socketService.onOrderUpdate((updatedOrder) => {
      if (updatedOrder._id === id) {
        setOrder(updatedOrder);
        setNewStatus(updatedOrder.status);
      }
    });

    return () => {
      socketService.off('orderUpdate');
    };
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      await dispatch(updateOrderStatus({ id: order._id, status: newStatus })).unwrap();
      toast.success('Order status updated successfully');
      setEditingStatus(false);
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const statusSteps = [
    { value: 'pending', label: 'Pending', icon: FiClock },
    { value: 'processing', label: 'Processing', icon: FiPackage },
    { value: 'shipped', label: 'Shipped', icon: FiTruck },
    { value: 'delivered', label: 'Delivered', icon: FiCheckCircle },
  ];

  const getStatusIndex = (status) => {
    return statusSteps.findIndex(s => s.value === status);
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="border-primary-200 border-t-primary-500 h-12 w-12 animate-spin rounded-full border-4"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  const currentStatusIndex = getStatusIndex(order.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/orders')}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
          >
            <FiArrowLeft className="text-xl" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Order #{order.orderNumber || order._id?.slice(-8).toUpperCase()}
            </h1>
            <p className="mt-1 text-gray-600">
              Placed on {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}
            </p>
          </div>
        </div>

        <button
          onClick={() => setEditingStatus(true)}
          className="btn-primary flex items-center gap-2"
        >
          <FiEdit />
          Update Status
        </button>
      </div>

      {/* Status Timeline */}
      {order.status !== 'cancelled' && (
        <div className="card">
          <h3 className="mb-6 text-lg font-bold text-gray-900">Order Status</h3>
          <div className="flex items-center justify-between">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;

              return (
                <div key={step.value} className="relative flex-1">
                  <div className="flex flex-col items-center">
                    {/* Icon */}
                    <div className={clsx(
                      'w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2',
                      'transition-all duration-300',
                      isCompleted 
                        ? 'bg-success-500 text-white shadow-lg scale-110' 
                        : 'bg-gray-200 text-gray-400'
                    )}>
                      <Icon />
                    </div>

                    {/* Label */}
                    <p className={clsx(
                      'text-sm font-medium text-center',
                      isCompleted ? 'text-gray-900' : 'text-gray-500'
                    )}>
                      {step.label}
                    </p>
                  </div>

                  {/* Line */}
                  {index < statusSteps.length - 1 && (
                    <div className="absolute left-1/2 top-6 -z-10 h-0.5 w-full">
                      <div className={clsx(
                        'h-full transition-all duration-500',
                        index < currentStatusIndex ? 'bg-success-500' : 'bg-gray-200'
                      )} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cancelled Status */}
      {order.status === 'cancelled' && (
        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-center gap-3">
            <div className="bg-primary-500 flex h-12 w-12 items-center justify-center rounded-full text-white">
              <FiCheckCircle className="text-xl" />
            </div>
            <div>
              <h3 className="text-primary-900 text-lg font-bold">Order Cancelled</h3>
              <p className="text-primary-700 text-sm">This order has been cancelled</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Items */}
          <div className="card">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Order Items</h3>
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div key={item._id} className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-white">
                    {item.product?.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <FiPackage className="text-2xl text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.product?.name}</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Quantity: {item.quantity} × ${item.price?.toFixed(2)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${order.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>${order.shippingCost?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>${order.tax?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3 text-xl font-bold text-gray-900">
                <span>Total</span>
                <span className="text-primary-600">${order.totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="card">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Customer</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FiUser className="text-gray-400" />
                <span className="text-gray-700">{order.user?.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-gray-400" />
                <span className="text-gray-700">{order.user?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-gray-400" />
                <span className="text-gray-700">{order.shippingAddress?.phone || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="card">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Shipping Address</h3>
            <div className="flex items-start gap-3">
              <FiMapPin className="mt-1 text-gray-400" />
              <div className="text-gray-700">
                <p>{order.shippingAddress?.street}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                <p>{order.shippingAddress?.zipCode}</p>
                <p>{order.shippingAddress?.country}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="card">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Payment</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Method</span>
                <span className="font-medium text-gray-900">
                  {order.paymentMethod || 'Card'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={clsx(
                  'badge',
                  order.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'
                )}>
                  {order.paymentStatus || 'Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {editingStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h3 className="mb-4 text-xl font-bold text-gray-900">Update Order Status</h3>
            
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="input-field mb-4"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => setEditingStatus(false)}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="btn-primary flex-1"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;