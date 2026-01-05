/**
 * Email validation
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Password validation
 * At least 8 characters, 1 uppercase, 1 lowercase, 1 number
 */
export const validatePassword = (password) => {
  if (password.length < 8) return false;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasUpperCase && hasLowerCase && hasNumber;
};

/**
 * Phone number validation (US format)
 */
export const validatePhone = (phone) => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return regex.test(phone);
};

/**
 * URL validation
 */
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Required field validation
 */
export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Min length validation
 */
export const validateMinLength = (value, minLength) => {
  if (typeof value !== 'string') return false;
  return value.length >= minLength;
};

/**
 * Max length validation
 */
export const validateMaxLength = (value, maxLength) => {
  if (typeof value !== 'string') return false;
  return value.length <= maxLength;
};

/**
 * Number range validation
 */
export const validateNumberRange = (value, min, max) => {
  const num = Number(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
};

/**
 * Positive number validation
 */
export const validatePositiveNumber = (value) => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};

/**
 * Login form validation
 */
export const validateLoginForm = (values) => {
  const errors = {};

  if (!validateRequired(values.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!validateRequired(values.password)) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

/**
 * Product form validation
 */
export const validateProductForm = (values) => {
  const errors = {};

  if (!validateRequired(values.name)) {
    errors.name = 'Product name is required';
  } else if (!validateMinLength(values.name, 3)) {
    errors.name = 'Product name must be at least 3 characters';
  }

  if (!validatePositiveNumber(values.price)) {
    errors.price = 'Price must be a positive number';
  }

  if (!validateRequired(values.category)) {
    errors.category = 'Category is required';
  }

  if (values.stock && !validateNumberRange(values.stock, 0, 999999)) {
    errors.stock = 'Stock must be between 0 and 999999';
  }

  return errors;
};

/**
 * Category form validation
 */
export const validateCategoryForm = (values) => {
  const errors = {};

  if (!validateRequired(values.name)) {
    errors.name = 'Category name is required';
  } else if (!validateMinLength(values.name, 2)) {
    errors.name = 'Category name must be at least 2 characters';
  }

  return errors;
};