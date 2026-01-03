import api from './api';

export const createPaymentIntent = async (amount) => {
    const response = await api.post('/payment/create-intent', { amount });
    return response.data;
};

export const confirmPayment = async (paymentIntentId) => {
    const response = await api.post('/payment/confirm', { paymentIntentId });
    return response.data;
};