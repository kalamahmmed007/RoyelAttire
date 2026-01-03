import User from '../models/User.js';
import Order from '../models/Order.js';

export const updateProfile = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, email, phone },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

export const updatePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id).select('+password');

        const isPasswordMatched = await user.comparePassword(currentPassword);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const addAddress = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (req.body.isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }

        user.addresses.push(req.body);
        await user.save();

        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

export const updateAddress = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        const address = user.addresses.id(req.params.addressId);

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        if (req.body.isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }

        Object.assign(address, req.body);
        await user.save();

        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

export const deleteAddress = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        user.addresses = user.addresses.filter(
            addr => addr._id.toString() !== req.params.addressId
        );

        await user.save();
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

export const addToWishlist = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user._id);

        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        user.wishlist.push(productId);
        await user.save();

        await user.populate('wishlist');
        res.status(200).json({ success: true, wishlist: user.wishlist });
    } catch (error) {
        next(error);
    }
};

export const removeFromWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        user.wishlist = user.wishlist.filter(
            id => id.toString() !== req.params.productId
        );

        await user.save();
        await user.populate('wishlist');

        res.status(200).json({ success: true, wishlist: user.wishlist });
    } catch (error) {
        next(error);
    }
};

export const getWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.status(200).json({ success: true, wishlist: user.wishlist });
    } catch (error) {
        next(error);
    }
};

export const getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort('-createdAt')
            .populate('orderItems.product', 'name images');

        res.status(200).json({ success: true, orders });
    } catch (error) {
        next(error);
    }
};