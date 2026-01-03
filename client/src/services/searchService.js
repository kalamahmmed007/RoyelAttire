import api from './api';

export const searchProducts = async (query, filters = {}) => {
    const params = { search: query, ...filters };
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/search?${queryString}`);
    return response.data;
};

export const getSearchSuggestions = async (query) => {
    const response = await api.get(`/search/suggestions?q=${query}`);
    return response.data;
};

export const getPopularSearches = async () => {
    const response = await api.get('/search/popular');
    return response.data;
};

export const saveSearchHistory = async (query) => {
    const response = await api.post('/search/history', { query });
    return response.data;
};

export const getSearchHistory = async () => {
    const response = await api.get('/search/history');
    return response.data;
};

export const clearSearchHistory = async () => {
    const response = await api.delete('/search/history');
    return response.data;
};