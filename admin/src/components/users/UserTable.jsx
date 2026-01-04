import { useNavigate } from 'react-router-dom';
import { FiEye, FiTrash2, FiUser, FiShield, FiMail, FiCalendar } from 'react-icons/fi';
import { format } from 'date-fns';
import DataTable from '../common/DataTable';
import toast from 'react-hot-toast';
import clsx from 'clsx';

const UserTable = ({ 
  users, 
  currentPage, 
  totalPages, 
  onPageChange, 
  onDelete,
  onRoleUpdate,
  isLoading 
}) => {
  const navigate = useNavigate();

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      try {
        await onDelete(userId);
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await onRoleUpdate(userId, newRole);
      toast.success('User role updated successfully');
    } catch (error) {
      toast.error('Failed to update user role');
    }
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: {
        icon: FiShield,
        className: 'badge-danger',
        label: 'Admin',
      },
      user: {
        icon: FiUser,
        className: 'badge-info',
        label: 'User',
      },
    };

    const config = roleConfig[role] || roleConfig.user;
    const Icon = config.icon;

    return (
      <span className={clsx('badge flex items-center gap-1 w-fit', config.className)}>
        <Icon className="text-xs" />
        {config.label}
      </span>
    );
  };

  const columns = [
    {
      header: 'User',
      key: 'name',
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-semibold rounded-full bg-primary-100 text-primary-600">
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">{user.name}</p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FiMail className="text-xs" />
              <span className="truncate">{user.email}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Role',
      key: 'role',
      render: (user) => (
        <select
          value={user.role}
          onChange={(e) => handleRoleChange(user._id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 
                   focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      ),
    },
    {
      header: 'Orders',
      key: 'orders',
      render: (user) => (
        <div className="text-gray-700">
          <span className="font-semibold">{user.ordersCount || 0}</span>
          <span className="ml-1 text-sm text-gray-500">orders</span>
        </div>
      ),
    },
    {
      header: 'Total Spent',
      key: 'totalSpent',
      render: (user) => (
        <div>
          <p className="font-bold text-gray-900">
            ${(user.totalSpent || 0).toFixed(2)}
          </p>
        </div>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (user) => (
        <span className={clsx(
          'badge',
          user.isActive ? 'badge-success' : 'badge-danger'
        )}>
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Joined',
      key: 'createdAt',
      render: (user) => (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <FiCalendar className="text-xs" />
          {format(new Date(user.createdAt), 'MMM dd, yyyy')}
        </div>
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      className: 'text-right',
      render: (user) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/users/${user._id}`);
            }}
            className="p-2 text-gray-600 transition-colors duration-200 rounded-lg hover:text-primary-600 hover:bg-primary-50"
            title="View Details"
          >
            <FiEye className="text-lg" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(user._id, user.name);
            }}
            className="p-2 text-gray-600 transition-colors duration-200 rounded-lg hover:text-primary-600 hover:bg-primary-50"
            title="Delete"
            disabled={user.role === 'admin'}
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
      data={users}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      isLoading={isLoading}
    />
  );
};

export default UserTable;