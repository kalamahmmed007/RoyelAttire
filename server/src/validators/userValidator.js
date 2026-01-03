export const addressValidation = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Full name must be between 2 and 100 characters'),

    body('address')
        .trim()
        .notEmpty()
        .withMessage('Address is required')
        .isLength({ min: 5, max: 200 })
        .withMessage('Address must be between 5 and 200 characters'),

    body('city')
        .trim()
        .notEmpty()
        .withMessage('City is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('City name must be between 2 and 100 characters'),

    body('state')
        .trim()
        .notEmpty()
        .withMessage('State/Province is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('State name must be between 2 and 100 characters'),

    body('postalCode')
        .trim()
        .notEmpty()
        .withMessage('Postal code is required')
        .matches(/^[A-Z0-9\s-]{3,10}$/i)
        .withMessage('Invalid postal code format'),

    body('country')
        .trim()
        .notEmpty()
        .withMessage('Country is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Country name must be between 2 and 100 characters'),

    body('phone')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required')
        .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
        .withMessage('Invalid phone number format'),

    body('isDefault')
        .optional()
        .isBoolean()
        .withMessage('isDefault must be a boolean value')
];

// Update address validation
export const updateAddressValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid address ID'),

    body('fullName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Full name must be between 2 and 100 characters'),

    body('address')
        .optional()
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Address must be between 5 and 200 characters'),

    body('city')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('City name must be between 2 and 100 characters'),

    body('state')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('State name must be between 2 and 100 characters'),

    body('postalCode')
        .optional()
        .trim()
        .matches(/^[A-Z0-9\s-]{3,10}$/i)
        .withMessage('Invalid postal code format'),

    body('country')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Country name must be between 2 and 100 characters'),

    body('phone')
        .optional()
        .trim()
        .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
        .withMessage('Invalid phone number format'),

    body('isDefault')
        .optional()
        .isBoolean()
        .withMessage('isDefault must be a boolean value')
];

// User ID validation
export const userIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid user ID')
];

// Update user role validation (Admin only)
export const updateUserRoleValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid user ID'),

    body('role')
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['user', 'admin', 'moderator'])
        .withMessage('Invalid role. Must be user, admin, or moderator')
];

// Wishlist validation
export const wishlistValidation = [
    body('productId')
        .notEmpty()
        .withMessage('Product ID is required')
        .isMongoId()
        .withMessage('Invalid product ID')
];

export { validate };