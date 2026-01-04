import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, updateUserRole, deleteUser } from '../redux/slices/userSlice';
import UserTable from '../components/users/UserTable';
import UserFilters from '../components/users/UserFilters';
import toast from 'react-hot-toast';

const Users = () => {
  const dispatch = useDispatch();
  const { users, total, pages, currentPage, isLoading } = useSelector((state) => state.users);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = () => {
    dispatch(getAllUsers({
      page,
      limit: 10,
      search: searchTerm,
    }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await dispatch(updateUserRole({ id: userId, role: newRole })).unwrap();
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (userId) => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
      fetchUsers();
    } catch (error) {
      throw error;
    }
  };

  const handleExport = () => {
    // Export functionality
    const csvData = filteredUsers.map(user => ({
      'Name': user.name,
      'Email': user.email,
      'Role': user.role,
      'Orders': user.ordersCount || 0,
      'Total Spent': user.totalSpent || 0,
      'Status': user.isActive ? 'Active' : 'Inactive',
      'Joined': new Date(user.createdAt).toLocaleDateString(),
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast.success('Users exported');
  };

  // Filter users (client-side)
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower);
    
    const matchesRole = !roleFilter || user.role === roleFilter;
    
    const matchesStatus = !statusFilter || 
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="mt-1 text-gray-600">
          Manage user accounts and permissions ({total} total)
        </p>
      </div>

      {/* Filters */}
      <UserFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onExport={handleExport}
      />

      {/* Users Table */}
      <UserTable
        users={filteredUsers}
        currentPage={currentPage}
        totalPages={pages}
        onPageChange={handlePageChange}
        onRoleUpdate={handleRoleUpdate}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Users;