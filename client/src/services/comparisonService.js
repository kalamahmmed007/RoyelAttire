import api from './api';

export const getComparisonList = async () => {
    const response = await api.get('/comparison');
    return response.data;
};

export const addToComparison = async (productId) => {
    const response = await api.post('/comparison/add', { productId });
    return response.data;
};

export const removeFromComparison = async (productId) => {
    const response = await api.delete(`/comparison/remove/${productId}`);
    return response.data;
};

export const clearComparison = async () => {
    const response = await api.delete('/comparison/clear');
    return response.data;
};

export const compareProducts = async (productIds) => {
    const response = await api.post('/comparison/compare', { productIds });
    return response.data;
};