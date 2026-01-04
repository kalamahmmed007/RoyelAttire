import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Custom hook for handling image uploads
 * Supports single and multiple image uploads with preview
 * 
 * @param {number} maxImages - Maximum number of images allowed (default: 5)
 * @returns {object} - Upload state and functions
 */
const useImageUpload = (maxImages = 5) => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection
  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);

    if (images.length + fileArray.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = fileArray.filter(file => !validTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      toast.error('Only JPG, PNG, and WEBP images are allowed');
      return;
    }

    // Validate file sizes (max 5MB each)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = fileArray.filter(file => file.size > maxSize);

    if (oversizedFiles.length > 0) {
      toast.error('Each image must be less than 5MB');
      return;
    }

    // Add files to state
    setImages(prev => [...prev, ...fileArray]);

    // Create previews
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove image
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Upload images to server
  const uploadImages = async () => {
    if (images.length === 0) return [];

    setIsUploading(true);
    const uploadedUrls = [];

    try {
      const admin = JSON.parse(localStorage.getItem('admin'));

      for (const image of images) {
        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.post(
          `${API_URL}/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${admin?.token}`,
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
      setIsUploading(false);
    }
  };

  // Clear all images
  const clearImages = () => {
    setImages([]);
    setPreviews([]);
  };

  return {
    images,
    previews,
    isUploading,
    handleFileSelect,
    removeImage,
    uploadImages,
    clearImages,
    canAddMore: images.length < maxImages,
  };
};

export default useImageUpload;