// API Constants
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:5000';

// Pagination
export const ITEMS_PER_PAGE = 12;
export const PAGE_SIZE_OPTIONS = [12, 24, 36, 48];

// Order Status
export const ORDER_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
};

export const ORDER_STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800',
};

// Payment Methods
export const PAYMENT_METHODS = {
    CARD: 'card',
    PAYPAL: 'paypal',
    COD: 'cash_on_delivery',
};

// Sort Options
export const SORT_OPTIONS = [
    { value: 'createdAt', label: 'Newest' },
    { value: '-createdAt', label: 'Oldest' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: '-rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name: A to Z' },
    { value: '-name', label: 'Name: Z to A' },
    { value: '-sold', label: 'Best Selling' },
];

// Price Ranges
export const PRICE_RANGES = [
    { min: 0, max: 50, label: 'Under $50' },
    { min: 50, max: 100, label: '$50 - $100' },
    { min: 100, max: 200, label: '$100 - $200' },
    { min: 200, max: 500, label: '$200 - $500' },
    { min: 500, max: 1000, label: '$500 - $1000' },
    { min: 1000, max: Infinity, label: 'Over $1000' },
];

// Rating Options
export const RATING_OPTIONS = [
    { value: 5, label: '5 Stars' },
    { value: 4, label: '4 Stars & Up' },
    { value: 3, label: '3 Stars & Up' },
    { value: 2, label: '2 Stars & Up' },
    { value: 1, label: '1 Star & Up' },
];

// User Roles
export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    VENDOR: 'vendor',
};

// Validation Constants
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 128;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Local Storage Keys
export const STORAGE_KEYS = {
    TOKEN: 'token',
    CART: 'cart',
    WISHLIST: 'wishlist',
    THEME: 'theme',
    RECENTLY_VIEWED: 'recentlyViewed',
    SEARCH_HISTORY: 'searchHistory',
};

// Routes
export const ROUTES = {
    HOME: '/',
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/products/:id',
    CART: '/cart',
    CHECKOUT: '/checkout',
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    ORDERS: '/orders',
    WISHLIST: '/wishlist',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password/:token',
};

// Notifications
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};

// Currency
export const CURRENCY = {
    SYMBOL: '$',
    CODE: 'USD',
};

// Shipping Methods
export const SHIPPING_METHODS = [
    { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '5-7' },
    { id: 'express', name: 'Express Shipping', price: 12.99, days: '2-3' },
    { id: 'overnight', name: 'Overnight Shipping', price: 24.99, days: '1' },
    { id: 'free', name: 'Free Shipping', price: 0, days: '7-14', minOrder: 50 },
];

// Social Media
export const SOCIAL_LINKS = {
    FACEBOOK: 'https://facebook.com',
    TWITTER: 'https://twitter.com',
    INSTAGRAM: 'https://instagram.com',
    YOUTUBE: 'https://youtube.com',
    LINKEDIN: 'https://linkedin.com',
};

// Contact Info
export const CONTACT_INFO = {
    EMAIL: 'support@ecommerce.com',
    PHONE: '+1 (555) 123-4567',
    ADDRESS: '123 Commerce St, New York, NY 10001',
};

// Error Messages
export const ERROR_MESSAGES = {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'Please login to continue.',
    NOT_FOUND: 'Resource not found.',
    VALIDATION: 'Please check your input and try again.',
};

export default {
    API_URL,
    IMAGE_BASE_URL,
    ITEMS_PER_PAGE,
    ORDER_STATUS,
    PAYMENT_METHODS,
    SORT_OPTIONS,
    PRICE_RANGES,
    USER_ROLES,
    STORAGE_KEYS,
    ROUTES,
    CURRENCY,
};