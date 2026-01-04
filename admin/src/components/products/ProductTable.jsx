import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPackage, FiEye } from 'react-icons/fi';
import DataTable from '../common/DataTable';
import toast from 'react-hot-toast';
import clsx from 'clsx';

const ProductTable = ({ 
  products, 
  currentPage, 
  totalPages, 
  onPageChange, 
  onDelete,
  isLoading 
}) => {
  const navigate = useNavigate();

  const handleDelete = async (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      try {
        await onDelete(productId);
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const columns = [
    {
      header: 'Product',
      key: 'name',
      render: (product) => (
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-100 rounded-lg">
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <FiPackage className="text-gray-400" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">{product.name}</p>
            <p className="text-xs text-gray-500 truncate">{product.category?.name}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'SKU',
      key: 'sku',
      render: (product) => (
        <span className="font-mono text-sm text-gray-600">
          {product.sku || 'N/A'}
        </span>
      ),
    },
    {
      header: 'Price',
      key: 'price',
      render: (product) => (
        <div>
          <p className="font-bold text-gray-900">${product.price?.toFixed(2)}</p>
          {product.comparePrice && product.comparePrice > product.price && (
            <p className="text-xs text-gray-500 line-through">
              ${product.comparePrice.toFixed(2)}
            </p>
          )}
        </div>
      ),
    },
    {
      header: 'Stock',
      key: 'stock',
      render: (product) => (
        <div>
          <span className={clsx(
            'badge',
            product.stock > 10 ? 'badge-success' : 
            product.stock > 0 ? 'badge-warning' : 'badge-danger'
          )}>
            {product.stock} units
          </span>
        </div>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (product) => (
        <span className={clsx(
          'badge',
          product.status === 'active' ? 'badge-success' : 'badge-danger'
        )}>
          {product.status || 'active'}
        </span>
      ),
    },
    {
      header: 'Rating',
      key: 'rating',
      render: (product) => (
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span className="font-medium text-gray-900">
            {product.averageRating?.toFixed(1) || '0.0'}
          </span>
          <span className="text-xs text-gray-500">
            ({product.numReviews || 0})
          </span>
        </div>
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      className: 'text-right',
      render: (product) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${product._id}`);
            }}
            className="p-2 text-gray-600 transition-colors duration-200 rounded-lg hover:text-primary-600 hover:bg-primary-50"
            title="View Details"
          >
            <FiEye className="text-lg" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/edit/${product._id}`);
            }}
            className="p-2 text-gray-600 transition-colors duration-200 rounded-lg hover:text-success-600 hover:bg-success-50"
            title="Edit"
          >
            <FiEdit className="text-lg" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(product._id, product.name);
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
      data={products}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      isLoading={isLoading}
    />
  );
};

export default ProductTable;