/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000',
  TIMEOUT: 30000, // 30 seconds
};

/**
 * Order Status
 */
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const ORDER_STATUS_COLORS = {
  pending: 'warning',
  processing: 'info',
  shipped: 'info',
  delivered: 'success',
  cancelled: 'danger',
};

/**
 * Product Status
 */
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
};

/**
 * User Roles
 */
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

/**
 * Payment Methods
 */
export const PAYMENT_METHODS = {
  CARD: 'card',
  PAYPAL: 'paypal',
  COD: 'cod', // Cash on delivery
};

/**
 * Pagination
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMITS: [10, 20, 50, 100],
};

/**
 * File Upload
 */
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  MAX_IMAGES: 5,
};

/**
 * Date Formats
 */
export const DATE_FORMATS = {
  SHORT: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  FULL: 'MMMM dd, yyyy HH:mm',
  TIME: 'HH:mm',
};

/**
 * Chart Colors
 */
export const CHART_COLORS = {
  PRIMARY: '#dc2626',
  SUCCESS: '#22c55e',
  WARNING: '#f59e0b',
  INFO: '#3b82f6',
  DARK: '#1f2937',
};

/**
 * Toast Configuration
 */
export const TOAST_CONFIG = {
  duration: 3000,
  position: 'top-right',
  style: {
    background: '#333',
    color: '#fff',
  },
};

/**
 * Regex Patterns
 */
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
};