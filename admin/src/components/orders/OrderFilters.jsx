import { FiSearch, FiFilter, FiDownload } from 'react-icons/fi';

const OrderFilters = ({ 
  searchTerm, 
  setSearchTerm, 
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
            placeholder="Search by order ID, customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input-field"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <FiFilter className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field pl-10 pr-10 min-w-[200px] appearance-none cursor-pointer"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="flex items-center gap-2 btn-dark"
        >
          <FiDownload />
          Export
        </button>
      </div>

      {/* Filter Summary */}
      {(searchTerm || statusFilter) && (
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

export default OrderFilters;