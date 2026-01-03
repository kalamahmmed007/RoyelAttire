import api from './api';

export const getProducts = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/products?${queryString}`);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const getFeaturedProducts = async () => {
    const response = await api.get('/products/featured');
    return response.data;
};

export const getProductsByCategory = async (category) => {
    const response = await api.get(`/products/categories/${category}`);
    return response.data;
};

export const searchProducts = async (query) => {
    const response = await api.get(`/products?search=${query}`);
    return response.data;
};