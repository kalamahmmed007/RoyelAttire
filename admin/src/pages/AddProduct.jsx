import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../redux/slices/productSlice';
import ProductForm from '../components/products/ProductForm';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const admin = JSON.parse(localStorage.getItem('admin'));
      const response = await axios.get(`${API_URL}/categories`, {
        headers: { Authorization: `Bearer ${admin?.token}` },
      });
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const handleSubmit = async (productData) => {
    try {
      await dispatch(createProduct(productData)).unwrap();
      toast.success('Product created successfully');
      navigate('/products');
    } catch (error) {
      toast.error(error || 'Failed to create product');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/products')}
          className="p-2 transition-colors rounded-lg hover:bg-gray-100"
        >
          <FiArrowLeft className="text-xl" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="mt-1 text-gray-600">Create a new product in your inventory</p>
        </div>
      </div>

      {/* Form */}
      <ProductForm
        categories={categories}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AddProduct;