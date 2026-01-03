import api from './api';

export const sendContactMessage = async (messageData) => {
    const response = await api.post('/contact', messageData);
    return response.data;
};

export const getFAQs = async () => {
    const response = await api.get('/contact/faqs');
    return response.data;
};

export const searchFAQs = async (query) => {
    const response = await api.get(`/contact/faqs/search?q=${query}`);
    return response.data;
};

export const getSupportTickets = async () => {
    const response = await api.get('/contact/tickets');
    return response.data;
};

export const createSupportTicket = async (ticketData) => {
    const response = await api.post('/contact/tickets', ticketData);
    return response.data;
};

export const updateSupportTicket = async (ticketId, update) => {
    const response = await api.put(`/contact/tickets/${ticketId}`, update);
    return response.data;
};

export const closeSupportTicket = async (ticketId) => {
    const response = await api.put(`/contact/tickets/${ticketId}/close`);
    return response.data;
};