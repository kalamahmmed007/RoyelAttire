import api from './api';

export const getCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
};

export const getCategoryById = async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
};

export const getCategoryBySlug = async (slug) => {
    const response = await api.get(`/categories/slug/${slug}`);
    return response.data;
};

export const getProductsByCategory = async (categoryId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/categories/${categoryId}/products?${queryString}`);
    return response.data;
};