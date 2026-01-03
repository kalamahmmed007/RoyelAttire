import api from './api';

export const getProductReviews = async (productId) => {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data;
};

export const createReview = async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
};

export const updateReview = async (id, reviewData) => {
    const response = await api.put(`/reviews/${id}`, reviewData);
    return response.data;
};

export const deleteReview = async (id) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
};

export const getUserReviews = async () => {
    const response = await api.get('/reviews/user');
    return response.data;
};