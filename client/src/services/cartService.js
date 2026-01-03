import api from './api';

export const getCart = async () => {
    const response = await api.get('/cart');
    return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
    const response = await api.post('/cart/add', { productId, quantity });
    return response.data;
};

export const updateCartItem = async (itemId, quantity) => {
    const response = await api.put(`/cart/update/${itemId}`, { quantity });
    return response.data;
};

export const removeFromCart = async (itemId) => {
    const response = await api.delete(`/cart/remove/${itemId}`);
    return response.data;
};

export const clearCart = async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
};

export const syncCart = async (cartItems) => {
    const response = await api.post('/cart/sync', { items: cartItems });
    return response.data;
};