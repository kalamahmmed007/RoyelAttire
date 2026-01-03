import Product from '../models/Product.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import cloudinary from '../config/cloudinary.js';

export const getProducts = async (req, res, next) => {
    try {
        const resultPerPage = 12;
        const productsCount = await Product.countDocuments();

        const apiFeature = new APIFeatures(
            Product.find().populate('category'),
            req.query
        )
            .search()
            .filter()
            .sort()
            .paginate();

        const products = await apiFeature.query;

        res.status(200).json({
            success: true,
            products,
            productsCount,
            resultPerPage
        });
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, product });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, product });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete images from cloudinary
        for (const image of product.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        await product.deleteOne();
        res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error) {
        next(error);
    }
};

export const getFeaturedProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ featured: true }).limit(8);
        res.status(200).json({ success: true, products });
    } catch (error) {
        next(error);
    }
};