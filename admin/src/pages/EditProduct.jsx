import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, updateProduct } from '../redux/slices/productSlice';
import ProductForm from '../components/products/ProductForm';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct, isLoading } = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
    fetchCategories();
  }, [id, dispatch]);

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
      await dispatch(updateProduct({ id, productData })).unwrap();
      toast.success('Product updated successfully');
      navigate('/products');
    } catch (error) {
      toast.error(error || 'Failed to update product');
    }
  };

  if (isLoading && !currentProduct) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 rounded-full border-primary-200 border-t-primary-500 animate-spin"></div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="mt-1 text-gray-600">Update product information</p>
        </div>
      </div>

      {/* Form */}
      <ProductForm
        initialData={currentProduct}
        categories={categories}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EditProduct;