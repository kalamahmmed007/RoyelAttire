import api from './api';

export const updateProfile = async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
};

export const changePassword = async (passwordData) => {
    const response = await api.put('/users/password', passwordData);
    return response.data;
};

export const getUserOrders = async () => {
    const response = await api.get('/users/orders');
    return response.data;
};

export const addAddress = async (address) => {
    const response = await api.post('/users/addresses', address);
    return response.data;
};

export const updateAddress = async (id, address) => {
    const response = await api.put(`/users/addresses/${id}`, address);
    return response.data;
};

export const deleteAddress = async (id) => {
    const response = await api.delete(`/users/addresses/${id}`);
    return response.data;
};