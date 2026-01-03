import api from './api';

export const getNotifications = async () => {
    const response = await api.get('/notifications');
    return response.data;
};

export const getUnreadCount = async () => {
    const response = await api.get('/notifications/unread/count');
    return response.data;
};

export const markAsRead = async (notificationId) => {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return response.data;
};

export const markAllAsRead = async () => {
    const response = await api.put('/notifications/read-all');
    return response.data;
};

export const deleteNotification = async (notificationId) => {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response.data;
};

export const clearAllNotifications = async () => {
    const response = await api.delete('/notifications/clear');
    return response.data;
};

export const updateNotificationPreferences = async (preferences) => {
    const response = await api.put('/notifications/preferences', preferences);
    return response.data;
};