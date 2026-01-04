import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../redux/slices/orderSlice';
import OrderTable from '../components/orders/OrderTable';
import OrderFilters from '../components/orders/OrderFilters';
import toast from 'react-hot-toast';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, total, pages, currentPage, isLoading } = useSelector((state) => state.orders);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter]);

  const fetchOrders = () => {
    dispatch(getAllOrders({
      page,
      limit: 10,
      status: statusFilter,
    }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ id: orderId, status: newStatus })).unwrap();
      toast.success('Order status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await dispatch(deleteOrder(orderId)).unwrap();
      toast.success('Order deleted');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  const handleExport = () => {
    // Export functionality
    const csvData = orders.map(order => ({
      'Order ID': order.orderNumber || order._id,
      'Customer': order.user?.name,
      'Email': order.user?.email,
      'Amount': order.totalAmount,
      'Status': order.status,
      'Date': new Date(order.createdAt).toLocaleDateString(),
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast.success('Orders exported');
  };

  // Filter orders by search term (client-side)
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.orderNumber?.toLowerCase().includes(searchLower) ||
      order._id?.toLowerCase().includes(searchLower) ||
      order.user?.name?.toLowerCase().includes(searchLower) ||
      order.user?.email?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="mt-1 text-gray-600">
            Manage and track all orders ({total} total)
          </p>
        </div>
      </div>

      {/* Filters */}
      <OrderFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onExport={handleExport}
      />

      {/* Orders Table */}
      <OrderTable
        orders={filteredOrders}
        currentPage={currentPage}
        totalPages={pages}
        onPageChange={handlePageChange}
        onStatusUpdate={handleStatusUpdate}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Orders;