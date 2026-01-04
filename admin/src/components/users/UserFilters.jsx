import { FiSearch, FiFilter, FiDownload } from 'react-icons/fi';

const UserFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  roleFilter, 
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  onExport 
}) => {
  return (
    <div className="card">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search by name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input-field"
          />
        </div>

        {/* Role Filter */}
        <div className="relative">
          <FiFilter className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="input-field pl-10 pr-10 min-w-[150px] appearance-none cursor-pointer"
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <FiFilter className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field pl-10 pr-10 min-w-[150px] appearance-none cursor-pointer"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="flex items-center gap-2 btn-dark whitespace-nowrap"
        >
          <FiDownload />
          Export
        </button>
      </div>

      {/* Filter Summary */}
      {(searchTerm || roleFilter || statusFilter) && (
        <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-gray-200">
          <span className="text-sm text-gray-600">Active Filters:</span>
          
          {searchTerm && (
            <span className="flex items-center gap-2 badge bg-primary-100 text-primary-700">
              Search: {searchTerm}
              <button
                onClick={() => setSearchTerm('')}
                className="hover:text-primary-900"
              >
                ×
              </button>
            </span>
          )}

          {roleFilter && (
            <span className="flex items-center gap-2 badge bg-primary-100 text-primary-700">
              Role: {roleFilter}
              <button
                onClick={() => setRoleFilter('')}
                className="hover:text-primary-900"
              >
                ×
              </button>
            </span>
          )}

          {statusFilter && (
            <span className="flex items-center gap-2 badge bg-primary-100 text-primary-700">
              Status: {statusFilter}
              <button
                onClick={() => setStatusFilter('')}
                className="hover:text-primary-900"
              >
                ×
              </button>
            </span>
          )}

          <button
            onClick={() => {
              setSearchTerm('');
              setRoleFilter('');
              setStatusFilter('');
            }}
            className="ml-2 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default UserFilters;