import api from './api';

export const calculateShipping = async (address, items) => {
    const response = await api.post('/shipping/calculate', { address, items });
    return response.data;
};

export const getShippingMethods = async (address) => {
    const response = await api.post('/shipping/methods', { address });
    return response.data;
};

export const validateAddress = async (address) => {
    const response = await api.post('/shipping/validate-address', { address });
    return response.data;
};

export const trackShipment = async (trackingNumber) => {
    const response = await api.get(`/shipping/track/${trackingNumber}`);
    return response.data;
};

export const getEstimatedDelivery = async (address, shippingMethod) => {
    const response = await api.post('/shipping/estimate-delivery', {
        address,
        shippingMethod
    });
    return response.data;
};