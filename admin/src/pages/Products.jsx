import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, deleteProduct } from '../redux/slices/productSlice';
import ProductTable from '../components/products/ProductTable';
import ProductFilters from '../components/products/ProductFilters';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

const Products = () => {
  const dispatch = useDispatch();
  const { products, total, pages, currentPage, isLoading } = useSelector(
    (state) => state.products
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, categoryFilter]);

  const fetchCategories = async () => {
    try {
      const admin = JSON.parse(localStorage.getItem('admin'));
      const response = await axios.get(`${API_URL}/categories`, {
        headers: { Authorization: `Bearer ${admin?.token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  };

  const fetchProducts = () => {
    dispatch(
      getAllProducts({
        page,
        limit: 10,
        search: searchTerm,
        category: categoryFilter,
      })
    );
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (productId) => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      fetchProducts();
    } catch (error) {
      throw error;
    }
  };

  // Filter products by search term (client-side)
  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name?.toLowerCase().includes(searchLower) ||
      product.sku?.toLowerCase().includes(searchLower) ||
      product.description?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="mt-1 text-gray-600">
          Manage your product inventory ({total} total)
        </p>
      </div>

      {/* Filters */}
      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      {/* Products Table */}
      <ProductTable
        products={filteredProducts}
        currentPage={currentPage}
        totalPages={pages}
        onPageChange={handlePageChange}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Products;