import { CURRENCY } from './constants';

// Format currency
export const formatCurrency = (amount, currencyCode = CURRENCY.CODE) => {
    if (typeof amount !== 'number') {
        amount = parseFloat(amount) || 0;
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

// Format number with commas
export const formatNumber = (number) => {
    if (typeof number !== 'number') {
        number = parseFloat(number) || 0;
    }

    return new Intl.NumberFormat('en-US').format(number);
};

// Format date
export const formatDate = (date, options = {}) => {
    if (!date) return '';

    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options,
    };

    return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date));
};

// Format date with time
export const formatDateTime = (date) => {
    if (!date) return '';

    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
};

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date) => {
    if (!date) return '';

    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;

    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

// Format phone number
export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';

    const cleaned = phoneNumber.replace(/\D/g, '');

    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    if (cleaned.length === 11 && cleaned[0] === '1') {
        return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }

    return phoneNumber;
};

// Format card number
export const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return '';

    const cleaned = cardNumber.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];

    return chunks.join(' ');
};

// Mask card number
export const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return '';

    const cleaned = cardNumber.replace(/\s/g, '');
    const last4 = cleaned.slice(-4);

    return `•••• •••• •••• ${last4}`;
};

// Format file size
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Format percentage
export const formatPercentage = (value, decimals = 0) => {
    if (typeof value !== 'number') {
        value = parseFloat(value) || 0;
    }

    return `${value.toFixed(decimals)}%`;
};

// Format rating
export const formatRating = (rating) => {
    if (typeof rating !== 'number') {
        rating = parseFloat(rating) || 0;
    }

    return rating.toFixed(1);
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;

    return `${text.slice(0, maxLength)}...`;
};

// Capitalize first letter
export const capitalize = (text) => {
    if (!text) return '';

    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Title case
export const toTitleCase = (text) => {
    if (!text) return '';

    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// Slugify
export const slugify = (text) => {
    if (!text) return '';

    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Format address
export const formatAddress = (address) => {
    if (!address) return '';

    const parts = [
        address.street,
        address.city,
        address.state,
        address.postalCode,
        address.country,
    ].filter(Boolean);

    return parts.join(', ');
};

// Format discount
export const formatDiscount = (originalPrice, discountedPrice) => {
    if (!originalPrice || !discountedPrice) return '';

    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return `${Math.round(discount)}% OFF`;
};

// Format order status
export const formatOrderStatus = (status) => {
    if (!status) return '';

    return status
        .split('_')
        .map(word => capitalize(word))
        .join(' ');
};

// Format duration
export const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;

    return `${Math.floor(seconds / 86400)}d`;
};

// Parse query string
export const parseQueryString = (queryString) => {
    const params = new URLSearchParams(queryString);
    const result = {};

    for (const [key, value] of params) {
        result[key] = value;
    }

    return result;
};

// Build query string
export const buildQueryString = (params) => {
    const filteredParams = Object.entries(params)
        .filter(([_, value]) => value !== null && value !== undefined && value !== '')
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    return new URLSearchParams(filteredParams).toString();
};

export default {
    formatCurrency,
    formatNumber,
    formatDate,
    formatDateTime,
    formatRelativeTime,
    formatPhoneNumber,
    formatCardNumber,
    maskCardNumber,
    formatFileSize,
    formatPercentage,
    formatRating,
    truncateText,
    capitalize,
    toTitleCase,
    slugify,
    formatAddress,
    formatDiscount,
    formatOrderStatus,
    formatDuration,
    parseQueryString,
    buildQueryString,
};