import api from './api';

export const getAddresses = async () => {
    const response = await api.get('/addresses');
    return response.data;
};

export const getAddressById = async (id) => {
    const response = await api.get(`/addresses/${id}`);
    return response.data;
};

export const createAddress = async (addressData) => {
    const response = await api.post('/addresses', addressData);
    return response.data;
};

export const updateAddress = async (id, addressData) => {
    const response = await api.put(`/addresses/${id}`, addressData);
    return response.data;
};

export const deleteAddress = async (id) => {
    const response = await api.delete(`/addresses/${id}`);
    return response.data;
};

export const setDefaultAddress = async (id) => {
    const response = await api.put(`/addresses/${id}/default`);
    return response.data;
};