import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const getProductReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate('user', 'name avatar')
            .sort('-createdAt');

        res.status(200).json({ success: true, reviews });
    } catch (error) {
        next(error);
    }
};

export const createReview = async (req, res, next) => {
    try {
        const { productId, rating, comment } = req.body;

        // Check if user has purchased the product
        const hasPurchased = await Order.findOne({
            user: req.user._id,
            'orderItems.product': productId,
            orderStatus: 'delivered'
        });

        if (!hasPurchased) {
            return res.status(403).json({
                message: 'You can only review products you have purchased'
            });
        }

        // Check if review already exists
        const existingReview = await Review.findOne({
            user: req.user._id,
            product: productId
        });

        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this product' });
        }

        const review = await Review.create({
            user: req.user._id,
            product: productId,
            rating,
            comment
        });

        // Update product ratings
        const reviews = await Review.find({ product: productId });
        const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        await Product.findByIdAndUpdate(productId, {
            'ratings.average': avgRating,
            'ratings.count': reviews.length
        });

        await review.populate('user', 'name avatar');
        res.status(201).json({ success: true, review });
    } catch (error) {
        next(error);
    }
};

export const updateReview = async (req, res, next) => {
    try {
        let review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        review = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('user', 'name avatar');

        // Recalculate product ratings
        const reviews = await Review.find({ product: review.product });
        const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        await Product.findByIdAndUpdate(review.product, {
            'ratings.average': avgRating,
            'ratings.count': reviews.length
        });

        res.status(200).json({ success: true, review });
    } catch (error) {
        next(error);
    }
};

export const deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const productId = review.product;
        await review.deleteOne();

        // Recalculate product ratings
        const reviews = await Review.find({ product: productId });
        const avgRating = reviews.length > 0
            ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
            : 0;

        await Product.findByIdAndUpdate(productId, {
            'ratings.average': avgRating,
            'ratings.count': reviews.length
        });

        res.status(200).json({ success: true, message: 'Review deleted' });
    } catch (error) {
        next(error);
    }
};
