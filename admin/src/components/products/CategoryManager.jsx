import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiX, FiGrid } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';
import clsx from 'clsx';

const API_URL = import.meta.env.VITE_API_URL;

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const admin = JSON.parse(localStorage.getItem('admin'));
      const response = await axios.get(`${API_URL}/categories`, {
        headers: { Authorization: `Bearer ${admin?.token}` },
      });
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    try {
      const admin = JSON.parse(localStorage.getItem('admin'));
      const config = {
        headers: { Authorization: `Bearer ${admin?.token}` },
      };

      if (editingCategory) {
        // Update
        await axios.put(
          `${API_URL}/categories/${editingCategory._id}`,
          formData,
          config
        );
        toast.success('Category updated successfully');
      } else {
        // Create
        await axios.post(`${API_URL}/categories`, formData, config);
        toast.success('Category created successfully');
      }

      fetchCategories();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (categoryId, categoryName) => {
    if (window.confirm(`Are you sure you want to delete "${categoryName}"?`)) {
      try {
        const admin = JSON.parse(localStorage.getItem('admin'));
        await axios.delete(`${API_URL}/categories/${categoryId}`, {
          headers: { Authorization: `Bearer ${admin?.token}` },
        });
        toast.success('Category deleted successfully');
        fetchCategories();
      } catch (error) {
        toast.error('Failed to delete category');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Categories</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage product categories ({categories.length} total)
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 btn-primary"
        >
          <FiPlus />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 rounded-full border-primary-200 border-t-primary-500 animate-spin"></div>
        </div>
      ) : categories.length === 0 ? (
        <div className="py-12 text-center card">
          <FiGrid className="mx-auto mb-4 text-5xl text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">No categories yet</h3>
          <p className="mb-4 text-gray-600">Create your first category to organize products</p>
          <button
            onClick={() => setShowModal(true)}
            className="mx-auto btn-primary"
          >
            <FiPlus className="inline mr-2" />
            Add Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category._id}
              className="card-hover group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-gray-900">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  {category.productCount || 0} products
                </span>
                
                <div className="flex gap-2 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-gray-600 transition-colors duration-200 rounded-lg hover:text-success-600 hover:bg-success-50"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id, category.name)}
                    className="p-2 text-gray-600 transition-colors duration-200 rounded-lg hover:text-primary-600 hover:bg-primary-50"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 transition-colors rounded-lg hover:bg-gray-100"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter category name"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter category description"
                  rows={3}
                  className="resize-none input-field"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;