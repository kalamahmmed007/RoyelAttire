import api from './api';

export const uploadImage = async (file, folder = 'products') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    const response = await api.post('/upload/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const uploadMultipleImages = async (files, folder = 'products') => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('images', file);
    });
    formData.append('folder', folder);

    const response = await api.post('/upload/images', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteImage = async (publicId) => {
    const response = await api.delete('/upload/image', {
        data: { publicId },
    });
    return response.data;
};

export const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post('/upload/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};