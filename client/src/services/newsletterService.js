import api from './api';

export const subscribe = async (email) => {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
};

export const unsubscribe = async (email, token) => {
    const response = await api.post('/newsletter/unsubscribe', { email, token });
    return response.data;
};

export const verifySubscription = async (token) => {
    const response = await api.get(`/newsletter/verify/${token}`);
    return response.data;
};

export const updatePreferences = async (preferences) => {
    const response = await api.put('/newsletter/preferences', preferences);
    return response.data;
};

export const getSubscriptionStatus = async () => {
    const response = await api.get('/newsletter/status');
    return response.data;
};