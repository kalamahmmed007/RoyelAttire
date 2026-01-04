import { FiSearch, FiFilter, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ProductFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  categoryFilter, 
  setCategoryFilter,
  categories = []
}) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search products by name, SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input-field"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <FiFilter className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-field pl-10 pr-10 min-w-[200px] appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Add Product Button */}
        <button
          onClick={() => navigate('/products/add')}
          className="flex items-center gap-2 btn-primary whitespace-nowrap"
        >
          <FiPlus />
          Add Product
        </button>
      </div>

      {/* Filter Summary */}
      {(searchTerm || categoryFilter) && (
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

          {categoryFilter && (
            <span className="flex items-center gap-2 badge bg-primary-100 text-primary-700">
              Category: {categories.find(c => c._id === categoryFilter)?.name}
              <button
                onClick={() => setCategoryFilter('')}
                className="hover:text-primary-900"
              >
                ×
              </button>
            </span>
          )}

          <button
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('');
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

export default ProductFilters;