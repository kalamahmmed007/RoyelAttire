import { useState, useEffect } from 'react';
import { FiUpload, FiX, FiPackage } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductForm = ({ 
  initialData = null, 
  categories = [], 
  onSubmit, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    sku: '',
    stock: '',
    category: '',
    status: 'active',
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        comparePrice: initialData.comparePrice || '',
        sku: initialData.sku || '',
        stock: initialData.stock || '',
        category: initialData.category?._id || '',
        status: initialData.status || 'active',
        images: initialData.images || [],
      });
      setImagePreviews(initialData.images || []);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imagePreviews.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }

    setImageFiles((prev) => [...prev, ...files]);

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) return formData.images;

    setUploadingImages(true);
    const uploadedUrls = [...formData.images];

    try {
      for (const file of imageFiles) {
        const formDataImg = new FormData();
        formDataImg.append('image', file);

        // Replace with your actual image upload endpoint
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/upload`,
          formDataImg,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('admin')?.token}`,
            },
          }
        );

        uploadedUrls.push(response.data.url);
      }

      return uploadedUrls;
    } catch (error) {
      toast.error('Failed to upload images');
      throw error;
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    if (!formData.price || formData.price <= 0) {
      toast.error('Valid price is required');
      return;
    }
    if (!formData.category) {
      toast.error('Category is required');
      return;
    }

    try {
      // Upload images first
      const imageUrls = await uploadImages();

      const productData = {
        ...formData,
        images: imageUrls,
        price: parseFloat(formData.price),
        comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
        stock: parseInt(formData.stock) || 0,
      };

      await onSubmit(productData);
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="card">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Basic Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
              className="resize-none input-field"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="SKU-001"
                className="input-field"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & Inventory */}
      <div className="card">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Pricing & Inventory</h3>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Price *
            </label>
            <div className="relative">
              <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">$</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="pl-8 input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Compare at Price
            </label>
            <div className="relative">
              <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">$</span>
              <input
                type="number"
                name="comparePrice"
                value={formData.comparePrice}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="pl-8 input-field"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="input-field"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input-field"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="card">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Product Images</h3>
        
        <div className="space-y-4">
          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="overflow-hidden bg-gray-100 rounded-lg aspect-square">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-primary-500 text-white
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          {imagePreviews.length < 5 && (
            <div>
              <label className="flex flex-col items-center justify-center w-full h-32 transition-colors duration-200 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="mb-2 text-3xl text-gray-400" />
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG or WEBP (Max 5 images)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 btn-outline"
          disabled={isLoading || uploadingImages}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 btn-primary"
          disabled={isLoading || uploadingImages}
        >
          {uploadingImages ? 'Uploading Images...' : isLoading ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;