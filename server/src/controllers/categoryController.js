import Category from '../models/Category.js';
import Product from '../models/Product.js';

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({ isActive: true })
            .populate('parent', 'name slug');

        res.status(200).json({ success: true, categories });
    } catch (error) {
        next(error);
    }
};

export const getCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate('parent', 'name slug');

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ success: true, category });
    } catch (error) {
        next(error);
    }
};

export const createCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({ success: true, category });
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        let category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, category });
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Check if category has products
        const productsCount = await Product.countDocuments({ category: req.params.id });
        if (productsCount > 0) {
            return res.status(400).json({
                message: 'Cannot delete category with existing products'
            });
        }

        await category.deleteOne();
        res.status(200).json({ success: true, message: 'Category deleted' });
    } catch (error) {
        next(error);
    }
};