export const createReviewValidation = [
    body('product')
        .notEmpty()
        .withMessage('Product ID is required')
        .isMongoId()
        .withMessage('Invalid product ID'),

    body('rating')
        .notEmpty()
        .withMessage('Rating is required')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),

    body('comment')
        .trim()
        .notEmpty()
        .withMessage('Review comment is required')
        .isLength({ min: 10, max: 500 })
        .withMessage('Comment must be between 10 and 500 characters'),

    body('title')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Title must not exceed 100 characters')
];

// Update review validation
export const updateReviewValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid review ID'),

    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),

    body('comment')
        .optional()
        .trim()
        .isLength({ min: 10, max: 500 })
        .withMessage('Comment must be between 10 and 500 characters'),

    body('title')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Title must not exceed 100 characters')
];

// Review ID validation
export const reviewIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid review ID')
];

// Product reviews query validation
export const reviewQueryValidation = [
    param('productId')
        .isMongoId()
        .withMessage('Invalid product ID'),

    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage('Limit must be between 1 and 50'),

    query('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating filter must be between 1 and 5')
];