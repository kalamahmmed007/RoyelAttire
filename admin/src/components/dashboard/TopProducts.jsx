import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiTrendingUp, FiPackage } from 'react-icons/fi';

const TopProducts = () => {
  const { dashboardStats } = useSelector((state) => state.stats);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    if (dashboardStats.topProducts) {
      setTopProducts(dashboardStats.topProducts);
    }
  }, [dashboardStats]);

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Top Products</h3>
          <p className="mt-1 text-sm text-gray-500">Best selling products</p>
        </div>
        <FiTrendingUp className="text-2xl text-success-500" />
      </div>

      {/* Products List */}
      {topProducts.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          <FiPackage className="mx-auto mb-3 text-4xl text-gray-400" />
          <p>No products data</p>
        </div>
      ) : (
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div
              key={product._id}
              className="flex items-center gap-4 p-3 transition-colors duration-200 rounded-lg hover:bg-gray-50"
            >
              {/* Rank */}
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                  index === 1 ? 'bg-gray-200 text-gray-700' : 
                  index === 2 ? 'bg-orange-100 text-orange-700' : 
                  'bg-gray-100 text-gray-600'}
              `}>
                {index + 1}
              </div>

              {/* Product Image */}
              <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-100 rounded-lg">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <FiPackage className="text-gray-400" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">
                  {product.name}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gray-600">
                    {product.soldCount || 0} sold
                  </span>
                  <span className="text-sm font-semibold text-primary-600">
                    ${product.price?.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Revenue */}
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  ${(product.revenue || 0).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopProducts;