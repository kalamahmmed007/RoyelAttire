import CategoryManager from '../components/products/CategoryManager';

const Categories = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <p className="mt-1 text-gray-600">
          Organize your products with categories
        </p>
      </div>

      {/* Category Manager */}
      <CategoryManager />
    </div>
  );
};

export default Categories;