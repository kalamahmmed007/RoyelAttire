import api from './api';

export const validateCoupon = async (code) => {
    const response = await api.post('/coupons/validate', { code });
    return response.data;
};

export const applyCoupon = async (code, cartTotal) => {
    const response = await api.post('/coupons/apply', { code, cartTotal });
    return response.data;
};

export const removeCoupon = async () => {
    const response = await api.post('/coupons/remove');
    return response.data;
};

export const getAvailableCoupons = async () => {
    const response = await api.get('/coupons/available');
    return response.data;
};

export const getUserCoupons = async () => {
    const response = await api.get('/coupons/user');
    return response.data;
};