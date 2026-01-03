import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from './constants';

// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password) => {
    return password && password.length >= PASSWORD_MIN_LENGTH;
};

export const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: 'Too weak' };

    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['red', 'orange', 'yellow', 'blue', 'green'];

    return {
        strength,
        label: labels[strength],
        color: colors[strength],
    };
};

// Username validation
export const isValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return (
        username &&
        username.length >= USERNAME_MIN_LENGTH &&
        usernameRegex.test(username)
    );
};

// Phone validation
export const isValidPhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phone && phone.length >= 10 && phoneRegex.test(phone);
};

// Credit card validation (Luhn algorithm)
export const isValidCardNumber = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, '');

    if (!/^\d+$/.test(cleaned)) return false;

    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i], 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
};

// CVV validation
export const isValidCVV = (cvv, cardType = 'visa') => {
    const length = cardType === 'amex' ? 4 : 3;
    return cvv && cvv.length === length && /^\d+$/.test(cvv);
};

// Expiry date validation
export const isValidExpiryDate = (month, year) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);

    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;

    return true;
};

// Postal code validation
export const isValidPostalCode = (postalCode, country = 'US') => {
    const patterns = {
        US: /^\d{5}(-\d{4})?$/,
        CA: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
        UK: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
    };

    const pattern = patterns[country] || patterns.US;
    return pattern.test(postalCode);
};

// URL validation
export const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Form validation helper
export const validateForm = (values, rules) => {
    const errors = {};

    Object.keys(rules).forEach((field) => {
        const value = values[field];
        const fieldRules = rules[field];

        // Required validation
        if (fieldRules.required && (!value || value.toString().trim() === '')) {
            errors[field] = fieldRules.message || `${field} is required`;
            return;
        }

        // Skip other validations if field is empty and not required
        if (!value) return;

        // Min length validation
        if (fieldRules.minLength && value.length < fieldRules.minLength) {
            errors[field] = `${field} must be at least ${fieldRules.minLength} characters`;
            return;
        }

        // Max length validation
        if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
            errors[field] = `${field} must be at most ${fieldRules.maxLength} characters`;
            return;
        }

        // Pattern validation
        if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
            errors[field] = fieldRules.patternMessage || `${field} is invalid`;
            return;
        }

        // Custom validation
        if (fieldRules.validate) {
            const error = fieldRules.validate(value, values);
            if (error) {
                errors[field] = error;
                return;
            }
        }
    });

    return errors;
};

// Sanitize input
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;

    return input
        .trim()
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '');
};

// Price validation
export const isValidPrice = (price) => {
    const priceNum = parseFloat(price);
    return !isNaN(priceNum) && priceNum >= 0;
};

// Quantity validation
export const isValidQuantity = (quantity, max = Infinity) => {
    const qty = parseInt(quantity, 10);
    return !isNaN(qty) && qty > 0 && qty <= max;
};

// Rating validation
export const isValidRating = (rating) => {
    const ratingNum = parseFloat(rating);
    return !isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5;
};

export default {
    isValidEmail,
    isValidPassword,
    getPasswordStrength,
    isValidUsername,
    isValidPhone,
    isValidCardNumber,
    isValidCVV,
    isValidExpiryDate,
    isValidPostalCode,
    isValidURL,
    validateForm,
    sanitizeInput,
    isValidPrice,
    isValidQuantity,
    isValidRating,
};