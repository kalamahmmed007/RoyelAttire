import api from './api';

export const trackProductView = async (productId) => {
    const response = await api.post('/analytics/product-view', { productId });
    return response.data;
};

export const trackAddToCart = async (productId, quantity) => {
    const response = await api.post('/analytics/add-to-cart', { productId, quantity });
    return response.data;
};

export const trackPurchase = async (orderId, amount, products) => {
    const response = await api.post('/analytics/purchase', {
        orderId,
        amount,
        products
    });
    return response.data;
};

export const trackSearch = async (query, resultsCount) => {
    const response = await api.post('/analytics/search', { query, resultsCount });
    return response.data;
};

export const getRecommendedProducts = async (limit = 10) => {
    const response = await api.get(`/analytics/recommendations?limit=${limit}`);
    return response.data;
};

export const getRecentlyViewed = async (limit = 10) => {
    const response = await api.get(`/analytics/recently-viewed?limit=${limit}`);
    return response.data;
};

export const getTrendingProducts = async (limit = 10) => {
    const response = await api.get(`/analytics/trending?limit=${limit}`);
    return response.data;
};